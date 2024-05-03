<script lang="ts">
	import jsPDF from 'jspdf';
	import { onMount } from 'svelte';

	import { Button } from '$lib/components/ui/button';
	import { Loader } from 'lucide-svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	onMount(async () => {
		try {
			const response = await fetch('/api/data');
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			data = await response.json();
		} catch (err) {
			console.error('Error fetching data:', err);
		}
	});

	function generatePDF() {
		const doc = new jsPDF();

		doc.text(`First Name: ${data.firstName}`, 10, 20);
		doc.text(`Last Name: ${data.lastName}`, 10, 30);
		doc.text(`Email: ${data.email}`, 10, 40);
		doc.text(`Content: ${data.content}`, 10, 45);
		doc.text(`Report generated on ${new Date().toLocaleString()}`, 10, 50);

		const blob = doc.output('blob');
		const downloadLink = document.createElement('a');
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.download = 'report.pdf';
		downloadLink.click();

		URL.revokeObjectURL(downloadLink.href);
	}
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<main class="flex h-screen w-full items-center justify-center gap-5">
	{#if data}
		<h1>Report: {data.firstName}</h1>
		<p>Date: {data.lastName}</p>
		<p>{data.email}</p>
		<p>{data.content}</p>

		<Button on:click={generatePDF}>Download PDF</Button>
	{:else}
		<Loader class="animate-spin" />
		<p>Generating data...</p>
	{/if}
</main>
