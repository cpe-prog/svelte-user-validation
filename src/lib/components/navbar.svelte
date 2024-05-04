<script>
	// @ts-nocheck

	import { Menu } from 'lucide-svelte';
	export let sidebar = false;
</script>

<header class="flex items-center justify-between border-b-2 bg-gray-200 p-2 text-gray-600">
	<nav class="flex">
		<Menu bind:open={sidebar} />
		<h2>hello</h2>
	</nav>

	<nav class="text-bold hidden uppercase text-gray-500 sm:block">
		<a href="/about" class="hover:text-gray-700 hover:no-underline">About</a>
		<a href="/contact" class="hover:text-gray-700 hover:no-underline">Contact</a>
	</nav>
</header>
