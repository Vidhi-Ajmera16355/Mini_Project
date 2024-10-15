// Example: Saving token to local storage
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Example: Retrieving token from local storage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Example: Removing token from local storage
export const removeToken = () => {
  localStorage.removeItem("token");
};
