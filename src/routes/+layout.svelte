<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="description" content="Twake Workplace user manager" />
	<meta name="keywords" content="user, management, ldap, twake" />
	<meta name="author" content="LINAGORA" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Twake workplace user manager</title>
</svelte:head>

<div class="min-h-screen w-full lg:bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% overflow-hidden flex flex-col">
	<slot />
	<Toaster />
</div>
