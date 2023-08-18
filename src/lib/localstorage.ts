import { carStore } from "./car.store";
import { clearError, errorStore } from "./error.store";

export interface Car {
    id: string
    name: string
    model: string
    year: number
    image?: string
}

export function getCars(): Car[] {
    if (typeof window === 'undefined') return []
    const aData = localStorage.getItem('cars');
    if (!aData) return [];
    return JSON.parse(aData);
}

export function getCar(carId: string): Car {
    if (typeof window === 'undefined') return {} as Car;
    const data = getCars();
    const found = data.find((car: Car) => car.id === carId);
    if (!found) {
        const message = 'Car was not found';
        errorHandle(message);
        return {} as Car;
    }
    clearError();
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
        clearError();
        const car = {
            id, name, model, year, image
        }
        data.unshift(car);
        localStorage.setItem('cars', JSON.stringify(data))
        carStore.set(data);
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
        clearError();
        data.splice(carIndex, 1);
        localStorage.setItem('cars', JSON.stringify(data));
        carStore.set(data);
        return true
    }
}

function errorHandle(message: string): void {
    errorStore.set(message);
}