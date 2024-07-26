import ldap from '$services/ldap';
import logger from '$services/logger';
import type { IUserService, User } from '$types';
import { userAttributes } from '$utils';
import { Attribute, Change } from 'ldapts';

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

	/**
	 * Disables a user in the LDAP directory
	 *
	 * @param {string} cn the common name of the user
	 * @returns {Promise<void>}
	 */
	disableUser = async (cn: string): Promise<void> => {
		try {
			const modification = new Attribute({
				type: 'pwdAccountLockedTime',
				values: ['000001010000Z']
			});

			const change = new Change({
				operation: 'replace',
				modification
			});

			await ldap.update(`cn=${cn},ou=users`, change);
		} catch (error) {
			logger.error('Failed to disable user from LDAP', { error });
			throw error;
		}
	};

  /**
   * Enables a user in the LDAP directory
   *
   * @param {string} cn the common name of the user
   * @returns {Promise<void>}
   */
  enableUser = async (cn: string): Promise<void> => {
    try {
      const modification = new Attribute({
				type: 'pwdAccountLockedTime',
				values: []
			});

      const change = new Change({
        operation: 'delete',
        modification
      });

      await ldap.update(`cn=${cn},ou=users`, change);
    } catch (error) {
      logger.error('Failed to enable user from LDAP', { error });
      throw error;
    }
  };
}

export default new UserService();
