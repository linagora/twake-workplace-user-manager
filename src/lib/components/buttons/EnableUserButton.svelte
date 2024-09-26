<script lang="ts">
	import DisableIcon from '$components/icons/DisableIcon.svelte';
	import SpinnerIcon from '$components/icons/SpinnerIcon.svelte';
	import { t } from 'svelte-i18n';

	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let handler: () => void = () => {};
</script>

<button
	{disabled}
	on:click={handler}
	type="button"
	class="flex gap-2 rounded-full items-center w-full max-w-[130px] justify-center px-4 py-2 text-sm text-white font-medium {disabled
		? ' bg-slate-500'
		: ' bg-red-600 hover:bg-red-500/80 cursor-pointer shadow-xl'}"
>
	{#if loading}
		<SpinnerIcon />
	{:else}
		<DisableIcon />
	{/if}
	{$t('disable-user')}
</button>
