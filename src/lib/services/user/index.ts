import ldap from '$services/ldap';
import logger from '$services/logger';
import type { IUserService, User } from '$types';
import { userAttributes } from '$utils';

class UserService implements IUserService {
	/**
	 * Fetch a user from LDAP by its common name (cn)
	 *
	 * @param {string} cn the common name of the user
	 * @returns {Promise<User | null>} the user or null if not found
	 */
	fetchUser = async (cn: string): Promise<User | null> => {
		try {
			const user = (await ldap.find('cn', cn, userAttributes)) as unknown as User[];

			return user[0] || null;
		} catch (error) {
			logger.error('Failed to fetch user from LDAP', { error });

			return null;
		}
	};

	/**
	 * Lists the users in the LDAP directory
	 *
	 * @returns {Promise<User[]>} - the list of users
	 */
	listUsers = async (): Promise<User[]> => {
		try {
			return (await ldap.find('cn', '*', userAttributes)) as unknown as User[];
		} catch (error) {
			logger.error('Failed to list users from LDAP', { error });

			return [];
		}
	};
}

export default new UserService();
