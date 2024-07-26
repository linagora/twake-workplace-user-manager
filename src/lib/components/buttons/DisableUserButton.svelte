<script lang="ts">
	import DisableIcon from '$components/icons/DisableIcon.svelte';
	import SpinnerIcon from '$components/icons/SpinnerIcon.svelte';
	import { t } from 'svelte-i18n';

	export let loading: boolean = false;
	export let disabled: boolean = false;
	export let handler: () => void = () => {};
</script>

<button
	{disabled}
	on:click={handler}
	type="button"
	class="flex gap-2 items-center w-full max-w-[130px] justify-center px-4 py-2 text-sm font-medium {disabled
		? 'text-white bg-slate-500'
		: 'text-gray-900 bg-white hover:bg-gray-100 cursor-pointer shadow'}"
>
	{#if loading}
		<SpinnerIcon />
	{:else}
		<DisableIcon />
	{/if}
	{$t('disable-user')}
</button>
