<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<form method="post" use:enhance>
	<button>Sign out</button>
</form>

<div>
	<h1>Hello {data.firstName + ' ' + data.lastName}!</h1>
</div>
