import { writable } from 'svelte/store';
import { getCars, type Car } from '../localstorage';

const initialCars = getCars();

const createCarStore = () => {
    const privateCarStore = writable<Car[]>(initialCars);

    return {
        subscribe: privateCarStore.subscribe,

        setCars: (cars: Car[]) => {
            privateCarStore.set(cars);
        },
    };
};

export const carStore = createCarStore();