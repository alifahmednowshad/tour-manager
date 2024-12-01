// src/api.js

import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Update with your actual backend URL

export const fetchData = async (table) => {
  try {
    const response = await axios.get(`${BASE_URL}/${table}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const createData = async (table, data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${table}`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating data", error);
    throw error;
  }
};

export const updateData = async (table, id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${table}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data", error);
    throw error;
  }
};

export const deleteData = async (table, id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${table}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data", error);
    throw error;
  }
};
