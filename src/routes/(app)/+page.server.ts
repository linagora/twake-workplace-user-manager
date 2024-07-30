import auth from '$services/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import User from '$services/user';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { toggleUserSchema } from '$schemas/user';
import logger from '$services/logger';

export const load = (async ({ parent }) => {
	const { cookie } = await parent();

	const currentUserId = await auth.fetchConnectedUser(cookie);

	if (!currentUserId) {
		redirect(302, '/login');
	}

	const currentUser = await User.fetchUser(currentUserId);

	if (!currentUser) {
		redirect(302, '/login');
	}

	if (!currentUser.dn.includes('ou=admin')) {
		redirect(302, '/login');
	}

	const form = await superValidate(zod(toggleUserSchema), { id: 'toggle-user' });
	const usersList = await User.listUsers();

	return { currentUser, usersList, form };
}) satisfies PageServerLoad;

export const actions = {
	disable: async ({ request }) => {
		const form = await superValidate(request, zod(toggleUserSchema));

		try {
			if (!form.valid) {
				return setError(form, 'Invalid data');
			}

			await User.disableUser(form.data.cn.toLocaleLowerCase());

			return { form };
		} catch (error) {
			logger.error('Failed to disable user', { error });
			return setError(form, 'Failed to disable user');
		}
	},

	enable: async ({ request }) => {
		const form = await superValidate(request, zod(toggleUserSchema));

		try {
			if (!form.valid) {
				return setError(form, 'Invalid data');
			}

			await User.enableUser(form.data.cn.toLocaleLowerCase());

			return { form };
		} catch (error) {
			logger.error('Failed to enable user', { error });
			return setError(form, 'Failed to enable user');
		}
	}
} satisfies Actions;
