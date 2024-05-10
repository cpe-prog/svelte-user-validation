<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Toaster, toast } from 'svelte-sonner';
	import { margins, paperFormats, paperOrientation } from './selection-details';

	let selectedFormat: any;
	let selectedOrientation: any;
	let selectedMargin: any;

	async function generatePDF() {
		try {
			var res = await fetch(
				`/api/pdf/627bc49f-0f30-4f82-b443-21479ca87a11/?pageSize=${selectedFormat}&&orientation=${selectedOrientation}&&margin=${selectedMargin}`
			);
			console.log('has result');
			if (!res.ok) {
				toast.info('Please complete page settings');
				return;
			}

			var blob = await res.blob();

			if (blob.size === 0) {
				return;
			}

			const _url = window.URL.createObjectURL(blob);
			window.open(_url, '_blank');
		} catch (error) {
			console.log('error url');
		}
	}
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<main class="flex h-screen w-full items-center justify-center gap-5 p-14">
	<Toaster richColors />
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant: 'secondary' })}>Generate PDF</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[300px]">
			<Dialog.Header>
				<h1 class="font-bold">Page Settings</h1>
			</Dialog.Header>
			<div class="py-2">
				<div class="mb-3">
					<Label class="w-24">Page Size</Label>
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
				<div class="mb-3">
					<Label class="w-24">Paper Orientation</Label>
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
				<div class="mb-3">
					<Label class="w-24">Margin</Label>
					<Select.Root
						onSelectedChange={(e) => {
							selectedMargin = e?.value;
						}}
					>
						<Select.Trigger>
							<Select.Value placeholder="Select Margin" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								{#each margins as margin}
									<Select.Item value={margin.value} label={margin.label.toString()}
										>{margin.label}</Select.Item
									>
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				</div>
			</div>

			<Dialog.Footer>
				<Button size="sm" on:click={generatePDF}>Print</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</main>
