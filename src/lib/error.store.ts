import { writable } from 'svelte/store';

export const errorStore = writable<string | null>(null);

export const clearError = () => {
    errorStore.set(null);
};