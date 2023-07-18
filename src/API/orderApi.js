import axios from "axios";
import { URL } from "./API";

export const getOrder = async (id) => {
  const { data } = await axios.get(`${URL}/order/${id}`);
  return data;
};
