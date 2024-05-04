<script lang="ts">
	import { Loader } from 'lucide-svelte';

	import Button from '$lib/components/ui/button/button.svelte';
	import jsPDF from 'jspdf';
	import { onMount } from 'svelte';

	let data: { firstName: string; lastName: string; age: number; status: string };

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
		doc.text(`Name: ${data.firstName + ' ' + data.lastName}`, 10, 20);
		doc.text(`Age: ${data.age}`, 10, 30);
		doc.text(`Status: ${data.status}`, 10, 40);
		const blobPDF = new Blob([doc.output('blob')], { type: 'application/pdf' });
		const blobUrl = URL.createObjectURL(blobPDF);
		window.open(blobUrl, '_blank');
	}
</script>

{#if data}
	<h1>Name: {data.firstName + ' ' + data.lastName}</h1>
	<p>Age: {data.age}</p>
	<p>Status: {data.status}</p>

	<Button on:click={generatePDF}>Download PDF</Button>
{:else}
	<Loader class="animate-spin" />
	<p>Loading data...</p>
{/if}
