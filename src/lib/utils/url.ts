
/**
 * formats a url by adding a trailing slash if it doesn't have one
 *
 * @param {string} url - the url to check
 * @returns {string} - the url with a trailing slash if it doesn't have one
 */
export const getUrl = (url: string): string => (url.endsWith('/') ? url : `${url}/`);
