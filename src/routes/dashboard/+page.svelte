<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import jsPDF from 'jspdf';
	import autoTable from 'jspdf-autotable';
	import { onMount } from 'svelte';
	import { leftMargin, paperFormats, paperOrientation, rightMargin } from './selection-details';

	let data: { firstName: string; lastName: string; age: number; status: string };

	let selectedFormat: any;
	let selectedOrientation: any;
	let selectedLeftMargin: any;
	let selectedRightMargin: any;

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
		if (orientation === 'portrait') {
			selectedFormat = paperFormats.find((format) => format.value === 'a4');
		}
		const doc = new jsPDF({
			orientation: orientation,
			unit: 'mm',
			format: selectedFormat
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

<main class="flex h-screen w-full items-center justify-center gap-5 p-10">
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant: 'secondary' })}>Generate PDF</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[300px]">
			<Dialog.Header>
				<div class="flex justify-center">
					<h1 class="font-bold">Select format</h1>
				</div>
			</Dialog.Header>
			<div class="grid grid-cols-1 gap-4 py-2">
				<div class="flex items-center gap-2 text-right">
					<Label class="w-24">Page Size:</Label>
					<Select.Root
						onSelectedChange={(e) => {
							selectedFormat = e?.value;
						}}
					>
						<Select.Trigger>
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
				<div class="flex items-center gap-2 text-right">
					<Label class="w-24">Layout:</Label>
					<Select.Root
						onSelectedChange={(e) => {
							selectedOrientation = e?.value;
						}}
					>
						<Select.Trigger>
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
			<div class="grid grid-cols-1 gap-4 py-2">
				<div class="flex justify-center">
					<h1 class="font-bold">Margin</h1>
				</div>
				<div class="grid grid-cols-2 items-center gap-2 text-right">
					<div class="flex items-center gap-2">
						<Label class="w-28">Left:</Label>
						<Select.Root
							onSelectedChange={(e) => {
								selectedOrientation = e?.value;
							}}
						>
							<Select.Trigger>
								<Select.Value placeholder="Left" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each leftMargin as leftX}
										<Select.Item value={leftX.value} label={leftX.label}>{leftX.label}</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</div>
					<div class="flex items-center gap-2">
						<Label class="w-32">Right:</Label>
						<Select.Root
							onSelectedChange={(e) => {
								selectedOrientation = e?.value;
							}}
						>
							<Select.Trigger>
								<Select.Value placeholder="Right" />
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each rightMargin as rightX}
										<Select.Item value={rightX.value} label={rightX.label}
											>{rightX.label}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</div>
				</div>
			</div>
			<Dialog.Footer>
				<Button size="sm" on:click={generatePDF}>Print</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</main>
