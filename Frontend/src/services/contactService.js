import axios from "axios";

const API = "http://localhost:5000/api/contact";

export const getContact = () => axios.get(API);
export const saveContact = (data) => axios.post(API, data);