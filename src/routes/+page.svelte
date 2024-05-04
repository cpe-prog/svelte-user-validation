<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import Sidebar from '$lib/components/sidebar.svelte';
	let open = false;
</script>

<Sidebar bind:open />
<Navbar bind:sidebar={open} />
<svelte:head>
	<title>Home</title>
</svelte:head>
