import auth from '$services/auth';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const cookie = cookies.get(auth.cookieName);

	if (!cookie) {
		redirect(302, '/login');
	}

	if (await auth.validateToken(cookie)) {
		redirect(302, '/');
	}
  
}) satisfies LayoutServerLoad;
