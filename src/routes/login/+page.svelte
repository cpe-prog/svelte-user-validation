<script lang="ts">
	import type { PageData } from './$types.js';
	import LoginForm from './login-form.svelte';
	export let data: PageData;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<LoginForm data={data.form} />
