import auth from '$services/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import user from '$services/user';
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

	const currentUser = await user.fetchUser(currentUserId);

	if (!currentUser) {
		redirect(302, '/login');
	}

	const form = await superValidate(zod(toggleUserSchema), { id: 'toggle-user' });
	const usersList = await user.listUsers();

	return { currentUser, usersList, form };
}) satisfies PageServerLoad;

export const actions = {
	disable: async ({ request }) => {
		const form = await superValidate(request, zod(toggleUserSchema));

		try {
			if (!form.valid) {
				return setError(form, 'Invalid data');
			}

			await user.disableUser(form.data.cn);

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

			await user.disableUser(form.data.cn);

			return { form };
		} catch (error) {
			logger.error('Failed to enable user', { error });
			return setError(form, 'Failed to enable user');
		}
	}
} satisfies Actions;
