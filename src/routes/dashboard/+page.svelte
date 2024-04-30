<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<main class="flex h-screen w-full items-center justify-center">
	<form method="POST" use:enhance>
		<button>SignOut</button>
	</form>
	<h1>hello {data.firstName + ' ' + data.lastName}</h1>
</main>
