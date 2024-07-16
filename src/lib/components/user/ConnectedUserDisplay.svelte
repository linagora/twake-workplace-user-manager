<script lang="ts">
	import UserIcon from '$components/icons/UserIcon.svelte';

	export let name: string;
</script>

<div class="flex items-center justify-center gap-1 hover:bg-gray-400/30 rounded-full px-5 transition duration-450">
	<UserIcon />

	{name}
</div>
