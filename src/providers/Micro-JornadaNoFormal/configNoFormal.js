import axios from "axios";

export const jornadaNoFormalApi = axios.create({
  baseURL: "https://ms-jornada-no-formal.herokuapp.com/",
});
