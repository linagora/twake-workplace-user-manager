/**
 * the list of the user attributes in LDAP
 */
export const userAttributes = [
	'dn',
	'cn',
	'sn',
	'givenName',
	'mobile',
	'mail',
	'pwdAccountLockedTime'
];

/**
 * LDAP modification attribute to disable a user
 * Holds the time that the user's account was locked.
 * A locked account means that the password may no longer be used to authenticate.
 * A value of 000001010000Z means the account has been locked permanently, and that only a password administrator can unlock the account.
 */
export const disableUserAttribute = {
	type: 'pwdAccountLockedTime',
	values: ['000001010000Z']
};

/**
 * LDAP modification attribute to enable a user
 * Removes the pwdAccountLockedTime attribute, effectively enabling the user's account.
 * @see disableUserAttribute
 */
export const enableUserAttribute = {
	type: 'pwdAccountLockedTime',
	values: []
};
