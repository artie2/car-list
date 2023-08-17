<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getCar, type Car, deleteCar } from '$lib/localstorage';

	const carId = $page.params.carId;
	let car: Car;
	$: {
		const carId = $page.params.carId;
		car = getCar(carId);
	}
	function onDeleteCar() {
		deleteCar(carId);
		goto('/cars');
	}
</script>

{#if car.name}
	<h3>Car Detail</h3>
	<p>Name : <strong>{car.name}</strong></p>
	<p>Model : <strong>{car.model}</strong></p>
	<p>Year : <strong>{car.year}</strong></p>
	{#if car.image && car.image !== ''}
		<img alt={car.id} src={car.image} />
	{/if}
    <div class="text-align-right"><button class="formButton delete" on:click={onDeleteCar}>Delete</button></div>
{/if}

<style lang="scss">
	img {
		border-radius: 4px;
        width: 100%;
	}

    .text-align-right{
        text-align: right;
    }

	.formButton.delete {
        right: 0;
		color: #fe275e;
		border: 1px solid #fe275e;
		background: white;
		&:focus,
		&:hover {
			outline: none;
			background: #fe275e;
			color: white;
		}
	}
</style>
