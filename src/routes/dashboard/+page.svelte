<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { toast } from 'svelte-sonner';
	import { leftMargin, paperFormats, paperOrientation, rightMargin } from './selection-details';

	let selectedFormat: any;
	let selectedOrientation: any;
	let selectedLeftMargin: any;
	let selectedRightMargin: any;

	async function generatePDF() {
		try {
			var res = await fetch('/api/pdf/fda58994a40541068772bd5c495d7f3cs');
			console.log('has result');
			if (!res.ok) {
				toast.error('Invalid url');
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

<main class="flex h-screen w-full items-center justify-center gap-5 p-10">
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant: 'secondary' })}>Generate PDF</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[300px]">
			<Dialog.Header>
				<div class="flex justify-center">
					<h1 class="font-bold">Select format</h1>
					<p></p>
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
								selectedLeftMargin = e?.value;
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
								selectedRightMargin = e?.value;
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
