<script>
	export let open = false;
	import { Menu } from 'lucide-svelte';
</script>

<button
	class={`mr-4 cursor-pointer border-none text-gray-500 hover:text-gray-700 focus:outline-none `}
	class:open
	on:click={() => (open = !open)}
>
	<Menu />
</button>
