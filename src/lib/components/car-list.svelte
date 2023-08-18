<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { deleteCar, type Car } from '$lib/localstorage';
	import { carStore } from '$lib/stores/car.store';
	import { fade } from 'svelte/transition';

	$: selectedCarId = $page.params.carId;

	function onCarClick(car: Car) {
		goto(`/${car.id}`);
	}

	function onDeleteCar(id: string) {
		const deleted = deleteCar(id);
		//if delete selected car we need to navigate to home
		if (deleted && selectedCarId === id) goto(`/`);
	}
</script>

<ul class="carList">
	{#each $carStore as car}
		<li transition:fade class:active={selectedCarId === car.id}>
			<span
				role="button"
				tabindex="0"
				on:keydown={() => {
					onCarClick(car);
				}}
				on:click={() => {
					onCarClick(car);
				}}>{car.name} {car.model} {car.year}</span
			>
			<button
				class="deleteButton"
				on:click={() => {
					onDeleteCar(car.id);
				}}>x</button
			>
		</li>{/each}
</ul>

<style lang="scss">
	.carList {
		padding: 0;

		li {
			display: flex;
			cursor: pointer;
			margin-bottom: 10px;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid $input-border;

			&.active,
			&:hover {
				transition: all 1s ease;
				border-bottom: 1px solid $input-border-focus;
			}
			.deleteButton {
				border: none;
				background: none;
				outline: none;
				&:hover,
				:focus {
					color: $button-delete-color;
				}
			}
			span {
				flex: 1;
				padding: 5px 10px;
			}
		}
	}
</style>
