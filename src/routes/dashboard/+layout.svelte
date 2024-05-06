<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import Sidebar from '$lib/components/sidebar.svelte';

	let open = false;
</script>

<div>
	<header>
		<Navbar bind:sidebar={open} />
		<Sidebar bind:open />
	</header>
	<main>
		<slot />
	</main>
	<footer></footer>
</div>
