import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import auth from '$services/auth';

export const load = (async ({ cookies }) => {
	const cookie = cookies.get(auth.cookieName);

	if (cookie) {
		await auth.logout(cookie);
	}

	redirect(302, '/login');
}) satisfies PageServerLoad;
