import { loginSchema } from '$schemas/login';
import type { Actions, PageServerLoad } from './$types';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import auth from '$services/auth';
import logger from '$services/logger';
import { extractMainDomain } from '$utils';
import { redirect } from '@sveltejs/kit';

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

			cookies.set(auth.cookieName, cookie, {
				domain: extractMainDomain(url.host),
				path: '/'
			});

			redirect(302, '/');
		} catch (error) {
			form.data.password = '';
			logger.error('Login failed', { error });

			return setError(form, 'Invalid credentials', { status: 400 });
		}
	}
} satisfies Actions;
