import axios from "axios";

export const tokenApi = axios.create({
	baseURL: "https://ms-jornada-token-email.herokuapp.com/",
});

export const tokenSmsApi = axios.create({
	baseURL: "https://ms-jornada-token-sms.herokuapp.com/",
});
