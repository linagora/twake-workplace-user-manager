<script lang="ts">
	import LogoutIcon from '$components/icons/LogoutIcon.svelte';
	import TwpSmallLogo from '$components/logos/TwpSmallLogo.svelte';
	import ConnectedUserDisplay from '$components/user/ConnectedUserDisplay.svelte';
	import { connectedUser } from '$store';
</script>

<nav class="bg-slate-50 h-20 w-full p-5 shadow-xl flex">
	<div class="flex-1">
		<TwpSmallLogo />
	</div>
	<div class="flex-0 flex gap-2 items-center justify-center">
		{#if $connectedUser}
			<ConnectedUserDisplay name={$connectedUser.cn} />
			<button type="button" class="hover:bg-gray-400/30 p-2 rounded-full transition duration-450">
				<LogoutIcon />
			</button>
		{/if}
	</div>
</nav>
