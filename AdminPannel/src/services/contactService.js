import axios from "axios";

const API = "http://localhost:5000/api/contact";

// GET contact
export const getContact = async () => {
  return await axios.get(API);
};

// SAVE contact
export const saveContact = async (data) => {
  return await axios.post(API, data);
};