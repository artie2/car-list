import { getCars, type Car } from '$lib/localstorage';
import { writable } from 'svelte/store';

const createCarStore = () => {
    const privateCarStore = writable<Car[]>([], () => {
        const initialCars = getCars();
        privateCarStore.set(initialCars);
    });

    return {
        subscribe: privateCarStore.subscribe,

        setCars: (cars: Car[]) => {
            privateCarStore.set(cars);
        },
    };
};

export const carStore = createCarStore();
