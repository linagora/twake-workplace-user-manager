<script lang="ts">
	import UsersList from '$components/lists/UsersList.svelte';
	import { toggleForm } from '$store/form';
	import { connectedUser } from '$store/user';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ currentUser, usersList, form } = data);
	$: connectedUser.set(currentUser);
	$: toggleForm.set(form);
</script>

<div class="py-5 bg-white rounded lg:shadow-2xl w-full lg:px-2">
	<UsersList users={usersList} />
</div>
