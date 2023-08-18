<script lang="ts">
	import { errorStore } from '$lib/stores/error.store';
	import Form from '$lib/components/form.svelte';
	import CarList from '$lib/components/car-list.svelte';
</script>

<main>
	<section class="formWrapper">
		<h4>Add Car to the list</h4>
		{#if $errorStore}<span class="errorMessage">{$errorStore}</span>{/if}
		<Form />
	</section>
	<div class="contentWrapper">
		<section class="ListWrapper">
			<CarList />
		</section>
		<section class="carDetail">
			<slot />
		</section>
	</div>
</main>

<style lang="scss">
	:global(body) {
		min-height: 100vh;
		font-family: 'Mukta Malar', Arial;
		background: #f5f9ff;
		display: flex;
		justify-content: center;

		.errorMessage {
			color: $button-delete-color;
		}

		main {
			.contentWrapper {
				max-width: 900px;
				margin: 0 auto;
				padding: 20px 0;
				display: flex;
				justify-content: stretch;
				gap: 3rem;

				.carDetail {
					flex: 3;
				}
			}
			.formWrapper {
				max-width: 900px;
				flex: 1;
				text-align: center;
			}

			:global(.formButton) {
				cursor: pointer;
				appearance: none;
				padding: 0.4rem 1.5rem;
				line-height: 25px;
				font-size: 1rem;
				font-weight: 500;
				font-family: inherit;
				border-radius: 6px;
				transition: 0.5s;
				color: $input-color;
				border: 1px solid $input-border-focus;
				background: $input-background;
				color: $input-border-focus;
				&:focus,
				&:hover {
					outline: none;
					border-color: $input-border-focus;
					background: $input-border-focus;
					color: white;
				}
			}
		}
	}
</style>
