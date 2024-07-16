import { type User } from '$types';
import { writable } from 'svelte/store';

export const connectedUser = writable<User>();
