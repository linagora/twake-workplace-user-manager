import { env } from '$env/dynamic/private';
import logger from '$services/logger';
import type { ILdapClient, SearchResult } from '$types';
import { Client, Change, Attribute } from 'ldapts';

class LdapClient implements ILdapClient {
	private base: string = '';
	client: Client | undefined;

	public getClient = async (): Promise<Client> => {
		const { LDAP_ADMIN_PASSWORD, LDAP_BASE, LDAP_DN, LDAP_URL } = env;

		if (!LDAP_ADMIN_PASSWORD || !LDAP_BASE || !LDAP_DN || !LDAP_URL) {
			logger.fatal('Missing LDAP credentials, cannot init the LDAP service');
			throw new Error('Missing LDAP configuration');
		}

		this.base = LDAP_BASE;

		try {
			const client = new Client({
				url: LDAP_URL
			});

			await client.bind(LDAP_DN, LDAP_ADMIN_PASSWORD);
			this.client = client;

			return client;
		} catch (error) {
			logger.error('LDAP authentication error', { error });

			throw new Error('LDAP authentication error');
		}
	};

	/**
	 * Performs an LDAP search operation
	 *
	 * @param filter The LDAP filter
	 * @param attributes The attributes to retrieve
	 * @returns {Promise<SearchResult[]>} - the search results
	 * @throws {Error} - if the search fails
	 */
	search = async (filter: string, attributes: string[]): Promise<SearchResult[]> => {
		try {
			const client = await this.getClient();

			const { searchEntries } = await client.search(this.base, {
				filter,
				scope: 'sub',
				attributes
			});

			const results: SearchResult[] = [];

			searchEntries.forEach((entry) => {
				const result: SearchResult = {};

				attributes.forEach((attribute) => {
					const value = entry[attribute];

					if (Buffer.isBuffer(value)) {
						result[attribute] = value.toString();
					} else if (Array.isArray(value)) {
						const firstItem = value[0];

						result[attribute] = Buffer.isBuffer(firstItem) ? firstItem.toString() : firstItem;
					} else {
						result[attribute] = value;
					}
				});

				results.push(result);
			});

			return results;
		} catch (error) {
			logger.error('LDAP search error', { error });

			throw new Error('LDAP search error');
		} finally {
			await this.client?.unbind();
		}
	};

	/**
	 * Find an entry in the LDAP directory
	 *
	 * @param field The field to search on
	 * @param value The value to search for
	 * @param attributes The attributes to retrieve
	 * @returns {Promise<SearchResult[]>} - the search results
	 * @throws {Error} - if the search fails
	 */
	find = async (field: string, value: string, attributes: string[]): Promise<SearchResult[]> => {
		const filter = `(${field}=${value})`;

		try {
			return await this.search(filter, attributes);
		} catch (error) {
			logger.error('LDAP find error', { error });

			throw new Error('LDAP find error');
		}
	};

	/**
	 * Performs an LDAP insert operation
	 *
	 * @param dn The distinguished name
	 * @param entry The entry to insert
	 * @throws {Error} - if the insert fails
	 */
	insert = async <T>(dn: string, entry: T): Promise<void> => {
		try {
			const client = await this.getClient();
			const userDn = `cn=${dn},${this.base}`;

			await client.add(userDn, entry as Record<string, string> | Attribute[]);
		} catch (error) {
			logger.error('LDAP insert error', { error });
			throw new Error('LDAP insert error');
		} finally {
			await this.client?.unbind();
		}
	};

	/**
	 * Performs an LDAP update operation
	 *
	 * @param dn The distinguished name
	 * @param change The change to perform
	 * @throws {Error} - if the update fails
	 */
	update = async (dn: string, change: Change): Promise<void> => {
		try {
			const client = await this.getClient();
			const userDn = `${dn},${this.base}`;

			await client.modify(userDn, [change]);
		} catch (error) {
			logger.error('LDAP update error', { error });
			throw new Error('LDAP update error');
		} finally {
			await this.client?.unbind();
		}
	};
}

export default new LdapClient();
