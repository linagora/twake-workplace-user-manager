import { Change, Client } from 'ldapts';

export interface ILdapClient {
	search: (filter: string, attributes: string[]) => Promise<SearchResult[]>;
	find: (field: string, value: string, attributes: string[]) => Promise<SearchResult[]>;
	insert: <T>(dn: string, entry: T) => Promise<void>;
	update: (dn: string, change: Change) => Promise<void>;
	getClient: () => Promise<Client>;
}

export type SearchResult = Record<string, string | string[] | number>;
export interface IAuthService {
	fetchToken: () => Promise<string | undefined>;
	login: (user: string, password: string) => Promise<string>;
	logout: (cookie: string) => Promise<void>;
	validateToken: (cookie: string) => Promise<boolean>;
	fetchConnectedUser: (cookie: string) => Promise<string | undefined>;
}

export interface AuthAPIResponse {
	error?: string;
	result: number;
}

export interface AuthResponse extends AuthAPIResponse {
	id: string;
}

export interface TokenResponse extends AuthAPIResponse {
	token: string;
}

export interface User {
	uid: string;
	cn: string;
	sn: string;
	givenName: string;
	userPassword: string;
	mobile: string;
	displayName?: string;
	mail?: string;
	objectclass: 'inetOrgPerson';
	pwdAccountLockedTime?: number;
}

export interface SessionResponse extends Omit<AuthAPIResponse, 'result'> {
	result: 0 | 'string';
}

export interface IUserService {
	fetchUser: (cn: string) => Promise<User | null>;
	listUsers: () => Promise<User[]>;
	disableUser: (cn: string) => Promise<void>;
	enableUser: (cn: string) => Promise<void>;
}

export type usersStatusFilter = 'active' | 'inactive' | 'all';
