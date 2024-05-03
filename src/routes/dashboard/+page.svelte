<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import GeneratePdf from './generate-pdf.svelte';
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<main class="flex h-screen w-full items-center justify-center gap-5">
	<h1>hello {data.firstName + ' ' + data.lastName}</h1>

	<GeneratePdf />
</main>
