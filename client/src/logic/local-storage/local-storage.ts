// import { EmptyObject } from 'redux';
// import { store } from '../redux';
// import { AuthState, UiConfigState } from '../redux/root-reduces';

export const setLocalStorage = (value: string, key: string): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  const storageItem = localStorage.getItem(key);
  if (!storageItem) {
    return null;
  }

  return JSON.parse(storageItem);
};
