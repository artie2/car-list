<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="errorPage">
<h1>{$page.error?.message}</h1>
<h3>Sorry, something went wrong.</h3>
<a href="/">Home Page</a>
</div>

<style lang="scss">
	.errorPage{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		h3{
			margin-bottom: 4rem;
		}
	}
</style>