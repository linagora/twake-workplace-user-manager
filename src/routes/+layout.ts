import { browser } from '$app/environment';
import logger from '$services/logger';
import { getLocaleFromNavigator, locale, waitLocale } from 'svelte-i18n';
import type { LayoutLoad } from './$types';
import '$lib/i18n';

export const load: LayoutLoad = async () => {
	if (browser) {
		const detectedLocale = getLocaleFromNavigator();
		logger.info(`Detected locale: ${detectedLocale}`);

		locale.set(detectedLocale);
	}

	await waitLocale();
};
