<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema, type FormSchema } from './schema';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<div class="flex h-screen w-full items-center justify-center">
	<form class=" w-80" method="POST" use:enhance>
		<div class=" flex items-center justify-center">
			<img width="90" src="/logo.png" alt="svelteui" />
		</div>
		<h2 class="mb-5 text-center">Register to SvelteUI</h2>
		<div class="rounded-lg border border-secondary p-6">
			<Form.Field class="mb-5" {form} name="fullname">
				<Form.Control let:attrs>
					<Form.Label>Full Name</Form.Label>
					<Input type="text" {...attrs} bind:value={$formData.fullname} placeholder="Full Name" />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
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
			<Form.Button class="mt-5 w-full" size="sm" variant="secondary">Register</Form.Button>
		</div>
		<h4 class="mt-4 text-center">
			Have an account? <a class="hover:text-slate-500 hover:underline" href="/login">Login</a>
		</h4>
	</form>
</div>
