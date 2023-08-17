<script lang="ts">
	import { goto } from '$app/navigation';
	import { carStore } from '$lib/car.store';
	import { addCar, deleteCar, type Car } from '$lib/localstorage';
	import { page } from '$app/stores';
	import { compressImage } from '$lib/utils';

	$: selectedCarId = $page.params.carId;

	let errorMessage = '';

	async function onSubmitCar(
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const name = String(data.get('name'));
		const model = String(data.get('model'));
		const year = Number(data.get('year'));
		const carImageFile = data.get('carImage') as File;
		let carImage = '';

		//if file is attached to, then compressit and convert to string
		if (carImageFile && carImageFile.name !== '') carImage = await compressImage(carImageFile);
		try {
			const id = addCar(name, model, year, carImage);
			form.reset();
			goto(`/cars/${id}`);
			errorMessage = '';
		} catch (error: any) {
			errorMessage = error;
		}
	}

	function onCarClick(car: Car) {
		goto(`/cars/${car.id}`);
	}

	function onDeleteCar(id: string) {
		try {
			deleteCar(id);
			if (selectedCarId === id) goto(`/cars`);
			errorMessage = '';
		} catch (error: any) {
			errorMessage = error;
		}
	}
</script>

<main>
	<section class="formWrapper">
		<h4>Add Car to the list</h4>
		{#if errorMessage !== ''}<span class="errorMessage">{errorMessage}</span>{/if}
		<form on:submit|preventDefault={onSubmitCar}>
			<div class="inputs">
				<input placeholder="Name" required name="name" type="text" />

				<input placeholder="Model" required name="model" type="text" />

				<input placeholder="Year" required name="year" type="number" />
				<label class="labelFileInput">
					Upload Image
					<input type="file" accept="image/*" name="carImage" />
				</label>
			</div>
			<button class="formButton" type="submit">Save</button>
		</form>
	</section>
	<div class="main">
		<section class="ListWrapper">
			<ul class="carList">
				{#each $carStore as car}
					<li class:active={selectedCarId === car.id}>
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
		</section>
		<section class="carDetail">
			<slot />
		</section>
	</div>
</main>

<style lang="scss">
	$input-color: #70788a;
	$input-border: #cdd9ed;
	$input-background: #fff;
	$input-placeholder: #a4a9b3;
	$input-border-focus: #275efe;
	$buttom-color-focus: #fff;
	$button-background-focus: #678efe;
	$button-delete-color: red;

	:global(body) {
		min-height: 100vh;
		font-family: 'Mukta Malar', Arial;
		background: #f5f9ff;
		display: flex;
		justify-content: center;

		.main {
			max-width: 900px;
			margin: 0 auto;
			padding: 20px 0;
			display: flex;
			justify-content: stretch;
			gap: 3rem;

			.carDetail {
				flex: 3;
			}

			.ListWrapper {
				flex: 2;
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
			}
		}

		.formWrapper {
			max-width: 900px;
			flex: 1;
			text-align: center;

			form {
				.inputs {
					padding: 0 0 1rem 0;
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;

					input {
						padding: 8px 16px;
						line-height: 25px;
						font-size: 1rem;
						font-weight: 500;
						font-family: inherit;
						border-radius: 6px;
						color: $input-color;
						border: 1px solid $input-border;
						background: $input-background;
						transition: border 0.3s ease;
						&::placeholder {
							color: $input-placeholder;
						}
						&:focus {
							outline: none;
							border-color: $input-border-focus;
						}
						&[type='file'] {
							display: none;
						}
					}

					label.labelFileInput {
						cursor: pointer;
						justify-items: center;
						align-content: center;
						color: $input-color;
						border: 1px solid $input-border;
						padding: 0.5em 0.8em;
						border-radius: 2em;
						transition: 0.5s;
						&:hover,
						&:focus,
						&:active {
							border-color: $button-background-focus;
							color: $button-background-focus;
						}
					}
				}
			}
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
</style>
