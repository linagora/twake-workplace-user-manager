import type { toggleUserSchema } from '$schemas/user';
import { writable } from 'svelte/store';
import type { Infer, SuperValidated } from 'sveltekit-superforms/server';

export const toggleForm = writable<SuperValidated<Infer<typeof toggleUserSchema>>>();
