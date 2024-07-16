<script lang="ts">
	import UsersList from '$components/lists/UsersList.svelte';
	import { connectedUser } from '$store/user';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ currentUser, usersList } = data);
	$: connectedUser.set(currentUser);
</script>

<div class="p-5 bg-white rounded shadow-xl w-full lg:px-10">
	<UsersList users={usersList} />
</div>
