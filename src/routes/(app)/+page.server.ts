import auth from '$services/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import user from '$services/user';

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

	const usersList = await user.listUsers();

	return { currentUser, usersList };
}) satisfies PageServerLoad;
