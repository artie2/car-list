<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>{$page.error?.message}</h1>
<p>Sorry, something went wrong.</p>
<a href="/cars">Home Page</a>