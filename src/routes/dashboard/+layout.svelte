<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
</script>

<div>
	<header>
		<Navbar />
	</header>
	<main>
		<slot />
	</main>
	<footer></footer>
</div>
