<script lang="ts">
	import NavBar from '$components/nav/NavBar.svelte';
</script>

<div class="flex flex-col gap-2">
	<NavBar />
	<div class="lg:px-20 lg:py-10">
		<slot />
	</div>
</div>
