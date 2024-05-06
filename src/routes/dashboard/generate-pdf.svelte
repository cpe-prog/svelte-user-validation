<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import jsPDF from 'jspdf';
	import autoTable from 'jspdf-autotable';
	import { Loader } from 'lucide-svelte';
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
		autoTable(doc, {
			styles: { fillColor: [0, 0, 0] },
			head: [['Name', 'age', 'status']],
			body: [[`${data.firstName + ' ' + data.lastName}`, `${data.age}`, `${data.status}`]]
		});
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
