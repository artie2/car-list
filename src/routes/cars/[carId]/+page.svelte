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


<h3>{carId}</h3>

{#if car}
<p> car : {car.name}</p>
{#if car.image}
<img alt={car.id} src={car.image} />
{/if}
<button on:click={onDeleteCar}>Delete</button>
{/if}