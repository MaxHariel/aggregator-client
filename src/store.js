import { writable } from 'svelte/store';

export const emailState = writable();
export const passwordState = writable();

export const jwt = writable();