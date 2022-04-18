export const saveToLocalstorage = (key, value) => {
    localStorage.setItem(key, value);
  };
  
  export const getFromLocalstorage = (key) => {
    return localStorage.getItem(key);
  };
  
  export const deleteFromLocalstorage = (key) => {
    localStorage.removeItem(key);
  };