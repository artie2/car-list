import { writable } from 'svelte/store';

//manage error messages in the application globally

function createErrorStore() {

    const privateErrorStore = writable<string | null>(null);
    return {
        subscribe: privateErrorStore.subscribe,

        clearError() {
            privateErrorStore.set(null);
        },
        setError(message: string) {
            privateErrorStore.set(message);
        }
    }
}

export const errorStore = createErrorStore();