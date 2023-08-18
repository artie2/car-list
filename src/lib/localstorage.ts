import { carStore } from "./stores/car.store";
import { errorStore } from "./stores/error.store";


export interface Car {
    id: string
    name: string
    model: string
    year: number
    image?: string
}

export function getCars(): Car[] {
    if (typeof window === 'undefined' || !window.localStorage) return []
    const aData = localStorage.getItem('cars');
    return !aData ? [] : JSON.parse(aData);
}

export function getCar(carId: string): Car | undefined {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const data = getCars();
    const found = data.find((car: Car) => car.id === carId);
    if (!found) {
        const message = 'Car was not found';
        errorHandle(message);
        return;
    }
    errorStore.clearError();
    return found;
}

export function addCar(name: string, model: string, year: number, image: string): string {
    const data = getCars();
    const id = `${name}-${model}-${year}`;
    const existingCar = data.find(car => car.id === id);
    if (existingCar) {
        errorHandle('A car is already in the list');
        return ''
    } else {
        errorStore.clearError();
        const car = {
            id, name, model, year, image
        }
        data.unshift(car);
        localStorage.setItem('cars', JSON.stringify(data))
        carStore.setCars(data);
        return id;
    }
}


export function deleteCar(carId: string): boolean {
    const data = getCars();
    const carIndex = data.findIndex(car => car.id === carId);
    if (carIndex === -1) {
        const message = 'Car was not found';
        errorHandle(message);
        return false
    } else {
        errorStore.clearError();
        data.splice(carIndex, 1);
        localStorage.setItem('cars', JSON.stringify(data));
        carStore.setCars(data);
        return true
    }
}

function errorHandle(message: string): void {
    errorStore.setError(message);
}