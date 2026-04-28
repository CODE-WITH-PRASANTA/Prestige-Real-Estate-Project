import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/cold-leads",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createColdLead = async (leadData) => {
  const response = await API.post("/", leadData);
  return response.data;
};

export const getAllColdLeads = async () => {
  const response = await API.get("/");
  return response.data;
};

export const updateColdLead = async (id, updatedData) => {
  const response = await API.put(`/${id}`, updatedData);
  return response.data;
};

export const deleteColdLead = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};