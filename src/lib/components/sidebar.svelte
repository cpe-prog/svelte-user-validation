<script>
	export let open = false;
</script>

<aside
	class={`absolute h-full w-56 border-r-2  shadow-lg transition-all duration-300 ${open ? 'left-[0]' : 'left-[-100%]'}`}
>
	<nav class="p-12 text-xl">
		<a class="block" href="#about">About</a>
		<a class="block" href="#contact">Contact</a>
	</nav>
</aside>
