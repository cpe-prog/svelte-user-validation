<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Template } from '@pdfme/common';
	import { generate } from '@pdfme/generator';
	import { Loader } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { Toaster, toast } from 'svelte-sonner';

	let data: { firstName: string; lastName: string; age: number; status: string };

	const template: Template = {
		basePdf: 'https://pdfme.com/sample.pdf',
		schemas: [
			{
				firstName: {
					type: 'text',
					position: { x: 0, y: 0 },
					width: 10,
					height: 10
				},
				lastName: {
					type: 'text',
					position: { x: 10, y: 10 },
					width: 10,
					height: 10
				}
			}
		]
	};
	const inputs = [
		{
			firstName: 'sample',
			lastName: 'sample'
		}
	];
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

	async function generatePdf() {
		try {
			const pdf = await generate({ template, inputs });
			const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
			const url = URL.createObjectURL(blob);
			window.open(url);
			toast.success('Pdf Generated successfully!');
		} catch (error) {
			toast.error('Cannot generate pdf!');
		}
	}
</script>

{#if data}
	<Toaster expand={false} richColors position="bottom-right" />
	<h1>Name: {data.firstName + ' ' + data.lastName}</h1>
	<p>Age: {data.age}</p>
	<p>Status: {data.status}</p>

	<Button on:click={generatePdf}>Download PDF</Button>
{:else}
	<Loader class="animate-spin" />
	<p>Loading data...</p>
{/if}
