<script lang="ts">
	import { connectedUser } from '$store/user';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ currentUser, usersList } = data);
	$: connectedUser.set(currentUser);
</script>

<pre>

  {#each usersList as user}
		{user.cn}
	{/each}
  
</pre>
