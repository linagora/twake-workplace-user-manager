<script lang="ts">
	import EnableIcon from '$components/icons/EnableIcon.svelte';
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
	class="flex gap-2 rounded-full items-center w-full max-w-[130px] text-white justify-center px-4 py-2 text-sm font-medium {disabled
		? ' bg-slate-500'
		: ' bg-emerald-600 hover:bg-emerald-500/80 cursor-pointer shadow'}"
>
	{#if loading}
		<SpinnerIcon />
	{:else}
		<EnableIcon />
	{/if}
	{$t('enable-user')}
</button>
