<script lang="ts">
	import { goto } from "$app/navigation";
	import { carStore } from "$lib/car.store";
	import { addCar, type Car } from "$lib/localstorage";
  import { page } from '$app/stores';
	import { compressImage } from "$lib/utils";

    //не нравится чет длина и как из формы винимаем данные
	async function onSubmitCar(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) {
        const form = event.target as HTMLFormElement
    const data = new FormData(form);
    const name = String(data.get('name'));
    const model = String(data.get('model'));
    const year = Number(data.get('year'));
    const carImageFile = data.get('carImage') as File;
    const carImage = await compressImage(carImageFile);
    try {
        const id  = addCar(name, model, year, carImage);
        form.reset();
        goto(`/cars/${id}`);
    } catch (error) {
       alert(error)
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
            <label>
              Car Image
              <input type="file" accept="image/*" name="carImage" />
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