/**
 * formats a url by adding a trailing slash if it doesn't have one
 *
 * @param {string} url - the url to check
 * @returns {string} - the url with a trailing slash if it doesn't have one
 */
export const getUrl = (url: string): string => (url.endsWith('/') ? url : `${url}/`);

/**
 * Extracts the domain name from a subdomain string.
 *
 * @param {string} domain - The input subdomain string.
 * @returns {string} The extracted domain name.
 */
export const extractMainDomain = (domain: string): string => {
	const domainWithoutPort = domain.split(':')[0];

	if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domainWithoutPort)) {
		return domainWithoutPort;
	}

	const parts = domainWithoutPort.split('.');

	if (parts.length <= 2) {
		return domainWithoutPort;
	}

	return parts.slice(-2).join('.');
};
