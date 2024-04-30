<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Reload } from 'svelte-radix';
	import { Toaster, toast } from 'svelte-sonner';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema, type FormSchema } from './schema';

	$: isSubmitting = false;
	$: isErrorMessage = '';

	export let data: SuperValidated<Infer<FormSchema>>;
	const form = superForm(data, {
		resetForm: false,
		validators: zodClient(formSchema),

		onSubmit: async () => {
			isSubmitting = true;
		},

		onError: () => {
			isSubmitting = false;
			toast.error('Cannot register user');
		}
	});

	const { form: formData, enhance } = form;
</script>

<div class="flex h-screen w-full items-center justify-center">
	<Toaster />
	<form class="w-80" method="POST" use:enhance>
		<div class=" flex items-center justify-center">
			<img width="90" src="/logo.png" alt="svelteui" />
		</div>
		<h2 class="mb-5 text-center">Register to SvelteUI</h2>
		<div class="rounded-lg border border-secondary p-6">
			<div class="mb-3 flex items-center justify-center gap-2">
				<Form.Field {form} name="firstName">
					<Form.Control let:attrs>
						<Form.Label>First Name</Form.Label>
						<Input
							type="text"
							{...attrs}
							bind:value={$formData.firstName}
							placeholder="First Name"
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="lastName">
					<Form.Control let:attrs>
						<Form.Label>Last Name</Form.Label>
						<Input type="text" {...attrs} bind:value={$formData.lastName} placeholder="Last Name" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>

			<Form.Field class="mb-5" {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input type="text" placeholder="email" {...attrs} bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input
						type="password"
						placeholder="password"
						{...attrs}
						bind:value={$formData.password}
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Button
				class={`mt-5 w-full ${isErrorMessage || (isSubmitting && 'hover:cursor-not-allowed')}`}
				disabled={isSubmitting}
				size="sm"
				variant={isSubmitting || isErrorMessage ? 'outline' : 'secondary'}
			>
				{#if isSubmitting}
					<Reload class="mr-2 h-4 w-4 animate-spin" />
					Registering
				{:else}
					Register
				{/if}
			</Form.Button>
		</div>
		<h4 class="mt-4 text-center">
			Have an account? <a class="hover:text-slate-500 hover:underline" href="/login">Login</a>
		</h4>
	</form>
</div>
