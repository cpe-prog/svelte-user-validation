<script lang="ts">
	import type { PageData } from './$types.js';
	import RegisterForm from './register-form.svelte';
	export let data: PageData;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<RegisterForm data={data.form} />
