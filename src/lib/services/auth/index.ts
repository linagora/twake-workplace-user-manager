import { env } from '$env/dynamic/private';
import logger from '$services/logger';
import type { AuthResponse, IAuthService, SessionResponse, TokenResponse } from '$types';
import { getUrl } from '$utils';

class AuthService implements IAuthService {
	private portal: string = '';
	public cookieName: string = 'lemonldap';

	/**
	 * The auth service constructor
	 *
	 * @example
	 * const authService = new AuthService();
	 */
	constructor() {
		if (!env.AUTH_URL) {
			logger.error('Auth service: missing auth URL');
			return;
		}

		this.portal = getUrl(env.AUTH_URL);
	}

	/**
	 * Fetches the login token from the auth provider
	 *
	 * @returns {Promise<string | undefined>} - the login token or undefined if an error occured
	 * @description This method is used to fetch the login token from the lemon portal.
	 * it will be used in the login process to authenticate the user.
	 * @example
	 * const token = await authService.fetchToken();
	 */
	fetchToken = async (): Promise<string | undefined> => {
		try {
			const response = await fetch(this.portal, {
				headers: {
					Accept: 'application/json'
				}
			});

			const { token } = (await response.json()) as TokenResponse;

			return token;
		} catch (error) {
			logger.error('Auth service: failed to fetch login token', { error });
		}
	};

	/**
	 * Logs in the user with the provided credentials
	 *
	 * @param user The user name
	 * @param password The user password
	 * @returns {Promise<string>} - the user id
	 * @example
	 * const userId = await authService.login('username', 'password');
	 * @throws {Error} - if the credentials are invalid or if the login token is invalid
	 */
	login = async (user: string, password: string): Promise<string> => {
		try {
			const token = await this.fetchToken();

			if (!token) {
				throw new Error('invalid login token');
			}

			const response = await fetch(this.portal, {
				method: 'POST',
				headers: {
					Accept: 'application/json'
				},
				body: new URLSearchParams({ user, password, token })
			});

			const { id } = (await response.json()) as AuthResponse;

			if (!id) {
				throw new Error('invalid credentials');
			}

			return id;
		} catch (error) {
			logger.error('Auth service: login failed', { error });
			throw error;
		}
	};

	/**
	 * Validates the user session
	 *
	 * @param cookie The user session cookie
	 * @returns {Promise<boolean>} - true if the session is valid, false otherwise
	 * @example
	 * const isValid = await authService.validateToken('session-cookie');
	 */
	validateToken = async (cookie: string): Promise<boolean> => {
		try {
			const response = await fetch(this.portal, {
				headers: {
					Accept: 'application/json',
					Cookie: `${this.cookieName}=${cookie}`
				}
			});

			const { result }: { result: number } = await response.json();

			return result === 1;
		} catch (error) {
			logger.error('Auth service: failed to validate the user session', { error });
			return false;
		}
	};

	/**
	 * Fetches the currently connected user session
	 *
	 * @param cookie The user session cookie
	 * @returns {Promise<string | undefined>} - the user id or undefined if an error occured
	 * @example
	 * const userId = await authService.fetchConnectedUser('session-cookie');
	 */
	fetchConnectedUser = async (cookie: string): Promise<string | undefined> => {
		try {
			const response = await fetch(`${this.portal}/mysession?whoami`, {
				headers: {
					Accept: 'application/json',
					Cookie: `${this.cookieName}=${cookie}`
				}
			});

			const { result }: SessionResponse = await response.json();

			if (result === 0) {
				throw Error('invalid session');
			}

			return result;
		} catch (error) {
			logger.error('Auth service: failed to fetch connected user', { error });
		}
	};

	/**
	 * Logs out the user
	 *
	 * @param cookie The user session cookie
	 * @example
	 * await authService.logout('session-cookie');
	 */
	logout = async (cookie: string): Promise<void> => {
		try {
			await fetch(`${this.portal}/?logout=1`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					Cookie: `${this.cookieName}=${cookie}`
				}
			});
		} catch (error) {
			logger.error('Auth service: failed to logout', { error });
		}
	};
}

export default new AuthService();
