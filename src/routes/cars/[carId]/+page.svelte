<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getCar, type Car, deleteCar } from '$lib/localstorage.store';
	import { onMount } from 'svelte';
    
  const carId = $page.params.carId;
  let car: Car;
  onMount(()=>{
     car = getCar(carId);
  })
	function onDeleteCar() {
		deleteCar(carId);
        goto('/cars')
	}
</script>


<h3>{carId}</h3>

{#if car}
<p> car : {car.name}</p>
<button on:click={onDeleteCar}>Delete</button>
{/if}