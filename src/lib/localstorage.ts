import { carStore } from "./car.store";

export interface Car {
    id: string
    name: string
    model: string
    year: number
}

export function getCars(): Car[] {
    if (typeof window === 'undefined') return []
    const aData = localStorage.getItem('cars');
    if (!aData) return [];
    return JSON.parse(aData);
}

export function getCar(carId: string): Car {
    var data = localStorage.getItem('cars')
    if (!data) throw new Error('no Cars was found');
    const parsedData = JSON.parse(data);
    const found = parsedData.find((car: Car) => car.id === carId);
    if (!found) throw new Error('Car was not found');
    return found;
}

export function addCar(name: string, model: string, year: number): string {
    const data = getCars();
    const id = `${name}-${model}-${year}`;
    const existingCar = data.find(car => car.id === id);

    if (existingCar) {
        throw new Error('A car is already in the list');
    }
    const car = {
        id, name, model, year
    }
    data.push(car);
    localStorage.setItem('cars', JSON.stringify(data))
    carStore.set(data);
    return id;
}


export function deleteCar(carId: string): void {
    const data = getCars();
    const carIndex = data.findIndex(car => car.id === carId);

    if (carIndex === -1) {
        throw new Error('Car not found');
    }
    data.splice(carIndex, 1);
    localStorage.setItem('cars', JSON.stringify(data));
    carStore.set(data);
}