import { writable } from 'svelte/store';
import { getCars } from './localstorage';


const initialCars = getCars();
export const carStore = writable(initialCars);