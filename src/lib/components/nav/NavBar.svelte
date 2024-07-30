<script lang="ts">
	import TwpSmallLogo from '$components/logos/TwpSmallLogo.svelte';
	import ConnectedUserDisplay from '$components/user/ConnectedUserDisplay.svelte';
	import LogoutUser from '$components/user/LogoutUser.svelte';
	import { connectedUser } from '$store';
</script>

<nav class="bg-slate-50 h-20 w-full p-5 shadow-xl flex">
	<div class="flex-1">
		<TwpSmallLogo />
	</div>
	{#if $connectedUser}
		<div class="flex-0 flex gap-2 items-center justify-center" data-sveltekit-preload-data="false">
			<ConnectedUserDisplay name={$connectedUser.cn} />
			<LogoutUser />
		</div>
	{/if}
</nav>
