<script lang="ts">
	import { goto } from "$app/navigation";
	import { carStore } from "$lib/car.store";
	import { addCar, type Car } from "$lib/localstorage";
  import { page } from '$app/stores';

    //не нравится чет длина и как из формы винимаем данные
	function onSubmitCar(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) {
        const form = event.target as HTMLFormElement
    const data = new FormData(form);
    const name = String(data.get('name'));
    const model = String(data.get('model'));
    const year = Number(data.get('year'));
    try {
        const id  = addCar(name, model, year);
        form.reset();
        goto(`/cars/${id}`);
    } catch (error) {
       alert('Error')
    }
    }

    function onCarClick(car: Car) {
      goto(`/cars/${car.id}`);
    }
</script>
<main>
    <section class="formWrapper" >
        <form   on:submit|preventDefault={onSubmitCar} action="?/addCar">
            <label>
              Name
              <input required name="name" type="text">
            </label>
            <label>
              Model
              <input required name="model" type="text">
            </label>
            <label>
              Year
              <input required name="year" type="number">
            </label>
            <button type="submit">Save</button>
          </form>
      </section>
      <section class="ListWrapper"  >
<ul>
  {#each $carStore as car}
    <li class:active={$page.params.carId === car.id}><span role="button" tabindex="0" on:keydown={() =>{onCarClick(car)}} on:click={() =>{onCarClick(car)}}><span>{car.name} {car.model} {car.year}</span></li>
{/each}
</ul>
      </section>
      <section class="carDetail">
    <slot/>
      </section>
</main>

<style>
  .active {
    color: red;
  }
</style>