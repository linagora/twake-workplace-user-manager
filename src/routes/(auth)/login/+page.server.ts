import { loginSchema } from '$schemas/login';
import type { Actions, PageServerLoad } from './$types';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import auth from '$services/auth';
import logger from '$services/logger';
import { extractMainDomain } from '$utils';
import { redirect, type Redirect } from '@sveltejs/kit';
import User from '$services/user';

export const load = (async ({ cookies }) => {
	const cookie = cookies.get(auth.cookieName);

	if (cookie && (await auth.validateToken(cookie))) {
		redirect(302, '/');
	}

	const form = await superValidate(zod(loginSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, url, cookies }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return setError(form, 'Invalid credentials', { status: 400 });
		}

		try {
			const { username, password } = form.data;

			const cookie = await auth.login(username, password);

			if (!cookie) {
				throw new Error('Invalid credentials');
			}

			const userId = await auth.fetchConnectedUser(cookie);

			if (!userId) {
				throw new Error('Invalid user session');
			}

			const user = await User.fetchUser(userId);

			if (!user) {
				throw new Error('Invalid user');
			}

			if (!user.dn.includes('ou=admin')) {
				throw new Error('Forbidden');
			}

			cookies.set(auth.cookieName, cookie, {
				domain: extractMainDomain(url.host),
				path: '/'
			});

			redirect(302, '/');
		} catch (error) {
			if ((error as Redirect).location) {
				throw error;
			}

			form.data.password = '';
			logger.error('Login failed', { error });

			return setError(form, 'Invalid credentials', { status: 400 });
		}
	}
} satisfies Actions;
