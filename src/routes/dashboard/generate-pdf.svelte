<script lang="ts">
	import { Loader } from 'lucide-svelte';

	import Button from '$lib/components/ui/button/button.svelte';
	import jsPDF from 'jspdf';
	import { onMount } from 'svelte';

	let data: { title: string; content: string; date: string };

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

		doc.text(`Title: ${data.title}`, 10, 20);
		doc.text(`Date: ${data.date}`, 10, 30);
		doc.text(`Content:`, 10, 40);
		doc.text(data.content, 10, 50);

		const blob = doc.output('blob');
		const downloadLink = document.createElement('a');
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.download = 'report.pdf';
		downloadLink.click();

		URL.revokeObjectURL(downloadLink.href);
	}
</script>

{#if data}
	<h1>Report: {data.title}</h1>
	<p>Date: {data.date}</p>
	<p>{data.content}</p>

	<Button on:click={generatePDF}>Download PDF</Button>
{:else}
	<Loader class="animate-spin" />
	<p>Generating data...</p>
{/if}
