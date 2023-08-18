<script lang="ts">
	import { goto } from '$app/navigation';
	import { addCar } from '$lib/localstorage';
	import { compressImage } from '$lib/utils';

	async function onSubmitCar(event: SubmitEvent) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const name = String(data.get('name'));
		const model = String(data.get('model'));
		const year = Number(data.get('year'));
		const carImageFile = data.get('carImage') as File;
		let carImage = '';

		//if file is attached to, then compress it and convert to string
		if (carImageFile && carImageFile.name !== '') carImage = await compressImage(carImageFile);
		const id = addCar(name, model, year, carImage);
		if (id !== '') {
			form.reset();
			goto(`/${id}`);
		}
	}
</script>

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

<style lang="scss">
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
				&:hover,
				&:focus,
				&:active {
					border-color: $button-background-focus;
					color: $button-background-focus;
				}
			}
		}
	}
</style>
