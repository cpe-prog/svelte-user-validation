<script lang="ts">
	import Header from '$lib/components/header.svelte';
</script>

<div>
	<header>
		<Header />
	</header>
	<main>
		<slot />
	</main>
	<footer></footer>
</div>
