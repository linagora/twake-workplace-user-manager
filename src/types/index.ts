import ldapts from 'ldapts';

export interface ILdapClient {
	search: (filter: string, attributes: string[]) => Promise<SearchResult[]>;
	find: (field: string, value: string, attributes: string[]) => Promise<SearchResult[]>;
	insert: <T>(dn: string, entry: T) => Promise<void>;
	update: (dn: string, change: ldapts.Change) => Promise<void>;
	getClient: () => Promise<ldapts.Client>;
}

export type SearchResult = Record<string, string | string[] | number>;
