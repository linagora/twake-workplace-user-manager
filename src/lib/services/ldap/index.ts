import client from '$services/ldap/client';
import logger from '$services/logger';

export const init = async (): Promise<void> => {
	try {
		await client.getClient();
	} catch (error) {
		logger.error('LDAP connection error, retrying...', { error });
		setTimeout(init, 5000);
	}
};

export default client;
