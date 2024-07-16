<script lang="ts">
	export let label: string;
	export let placeholder: string = '';
	export let value: string | undefined;
	export let name: string;
	export let required: boolean = true;
	export let disabled: boolean = false;
</script>

<div class="relative mt-6 w-full">
	<input
		{required}
		id={name}
		{name}
		bind:value
		{placeholder}
		{disabled}
		type="password"
		class="h-10 rounded-[4px] ring-1 focus:outline-none px-4 text-sm leading-6 tracking-tight text-left peer w-full placeholder:text-transparent ring-gray-200 focus:ring-blue-500"
	/>
	<label
		for={name}
		class="absolute left-0 bg-white px-1 duration-100 ease-linear ml-1 -translate-y-2.5 translate-x-2 text-xs font-medium leading-4"
		>{label}</label
	>
</div>
