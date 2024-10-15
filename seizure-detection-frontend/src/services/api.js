import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Adjust based on your setup

export const loginService = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data; // Returns { token, user }
};

export const registerService = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email,
    password,
  });
  return response.data; // Returns { message }
};

export const createSeizureEvent = async (token, userId, description) => {
  const response = await axios.post(
    `${API_URL}/seizures`,
    { userId, description },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data; // Returns seizure event
};

export const getSeizureEvents = async (token, userId) => {
  const response = await axios.get(`${API_URL}/seizures/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // Returns array of seizure events
};
