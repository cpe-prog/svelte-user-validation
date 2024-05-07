<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import jsPDF from 'jspdf';
	import autoTable from 'jspdf-autotable';
	import { onMount } from 'svelte';
	import { paperFormats, paperOrientation } from './selection-details';

	let data: { firstName: string; lastName: string; age: number; status: string };

	let selectedFormat: unknown;
	let selectedOrientation: unknown;

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
		const orientation = selectedOrientation;
		const format = selectedFormat;
		const doc = new jsPDF({
			orientation: orientation,
			unit: 'mm',
			format: format
		});

		autoTable(doc, {
			theme: 'striped',
			styles: {
				font: 'helvetica',
				lineColor: [0, 0, 0]
			},
			tableWidth: 100,
			margin: { top: 30, left: 30 },
			head: [['Name', 'Age', 'Status']],
			body: [[`${data.firstName} ${data.lastName}`, `${data.age}`, `${data.status}`]]
		});

		const blobPDF = new Blob([doc.output('blob')], { type: 'application/pdf' });
		const url = URL.createObjectURL(blobPDF);
		window.open(url, '_blank');
	}
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<main class="flex h-screen w-full items-center justify-center gap-5">
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant: 'secondary' })}>Generate PDF</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[300px]">
			<Dialog.Header>
				<div class="flex justify-center">
					<h1>Select format</h1>
				</div>
			</Dialog.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right">Paper Size</Label>
					<Select.Root
						onSelectedChange={(e) => {
							selectedFormat = e?.value;
							console.log(selectedFormat);
						}}
					>
						<Select.Trigger class="w-[180px]">
							<Select.Value placeholder="Select Size" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								{#each paperFormats as format}
									<Select.Item value={format.value} label={format.label}>{format.label}</Select.Item
									>
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right">Layout</Label>
					<Select.Root
						onSelectedChange={(e) => {
							selectedOrientation = e?.value;
							console.log(selectedOrientation);
						}}
					>
						<Select.Trigger class="w-[180px]">
							<Select.Value placeholder="Select Layout" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								{#each paperOrientation as orientation}
									<Select.Item value={orientation.value} label={orientation.label}
										>{orientation.label}</Select.Item
									>
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				</div>
			</div>
			<Dialog.Footer>
				<Button on:click={generatePDF}>Print</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</main>
