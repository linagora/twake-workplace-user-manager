<script lang="ts">
	import EnableIcon from '$components/icons/EnableIcon.svelte';
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
	class="flex gap-2 items-center w-full max-w-[130px] justify-center px-4 py-2 text-sm font-medium {disabled
		? 'text-white bg-slate-500'
		: 'text-gray-900 bg-white hover:bg-gray-100 cursor-pointer shadow-xl'}"
>
	{#if loading}
		<SpinnerIcon />
	{:else}
		<EnableIcon />
	{/if}
	{$t('enable-user')}
</button>
