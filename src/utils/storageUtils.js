export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
}

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
}

export const getLocalStorageItem = (key) => {
  return localStorage.getItem(key);
}