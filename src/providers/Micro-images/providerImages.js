import { votanteAPI } from "../Micro-Votante/votanteConfig";
import { imagesAPI } from "./configImages";

export const subirImagenes = async ({ credFrontalCrop, credTraseraCrop, selfieCrop }) => {
	try {
		// await timeout(2000);

		const formData1 = new FormData();
		formData1.append("file", credFrontalCrop);

		const formData2 = new FormData();
		formData2.append("file", credTraseraCrop);

		const formData3 = new FormData();
		formData3.append("file", selfieCrop);

		const linkCredFrontalCrop = await imagesAPI.post("file/upload", formData1);
		const linkCredTraseraCrop = await imagesAPI.post("file/upload", formData2);
		const linkCredSelfieCrop = await imagesAPI.post("file/upload", formData3);

		console.log("LINKS", linkCredFrontalCrop, linkCredTraseraCrop, linkCredSelfieCrop);

		return {
			ok: true,
			linkCredFrontalCrop: linkCredFrontalCrop.data.link,
			linkCredTraseraCrop: linkCredTraseraCrop.data.link,
			linkCredSelfieCrop: linkCredSelfieCrop.data.link,
		};
	} catch (error) {
		return { ok: false };
	}
};
export const subirSelfie = async (selfie) => {
	try {
		const formData1 = new FormData();
		formData1.append("file", selfie);

		const linkSelfie = await imagesAPI.post("file/upload", formData1);

		console.log("LINK SELFIE", linkSelfie);

		return {
			ok: true,
			linkSelfie: linkSelfie.data.link,
		};
	} catch (error) {
		return { ok: false };
	}
};
export const compararSelfies = async (linkSelfie, curp) => {
	try {
		const { data } = await votanteAPI.get(`${curp}/images_comparision`);
		console.log("LINK DE LA SELFIE YA GUARDADA", data.selfie);

		const url = `https://validcredenciales.herokuapp.com/api/selfie?nombreUser=${linkSelfie}&nombreUser2=${data.selfie}`;
		// const url = `https://ms-bio.herokuapp.com/api/selfie?nombreUser=${linkSelfie}&nombreUser2=${data.selfie}`;

		let okResp = false;
		let verif = false;
		const response = await fetch(url, {
			mode: "cors",
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("RESPUESTA SELFIE", data);
				okResp = true;
				verif = data.data;
			})
			.catch((error) => {
				console.log("ERROR DE PETICIÓN SELFIE COMP.", error);
				okResp = false;
				verif = data.data;
			});

		console.log("VERIFICACIÓN DE LA SELFIE: ", verif);

		return {
			ok2: okResp,
			selfieVerificada: verif,
		};
	} catch (error) {
		console.log("ERROR", error.message);
		return { ok: false };
	}
};
export const verificarCredencial = async ({
	linkCredFrontalCrop,
	linkCredTraseraCrop,
	linkCredSelfieCrop,
}) => {
	const uriCredFrontalCrop = encodeURIComponent(linkCredFrontalCrop);
	const uriCredTraseraCrop = encodeURIComponent(linkCredTraseraCrop);
	const uriCredSelfieCrop = encodeURIComponent(linkCredSelfieCrop);

	console.log("URIS", uriCredFrontalCrop, uriCredTraseraCrop, uriCredSelfieCrop);

	try {
		// const url = `https://ms-bio.herokuapp.com/api/usuario?nombreUser=${uriCredSelfieCrop}&nombreUser2=${uriCredFrontalCrop}`;
		const url = `https://validcredenciales.herokuapp.com/api/usuario?nombreUser=${uriCredSelfieCrop}&nombreUser2=${uriCredFrontalCrop}`;

		let okResp = false;
		let verif = false;

		const response = await fetch(url, {
			mode: "cors",
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("DATAA?", data);
				okResp = true;
				verif = data.data;
			})
			.catch((error) => {
				console.log("ERROR DE PETICIÓN", error);
				okResp = false;
				verif = data.data;
			});

		return {
			ok1: okResp,
			verificado: verif,
		};
	} catch (error) {
		return { ok1: false };
	}
};

export const verificarFrenteDeCredencial = async ({ linkCredFrontalCrop }) => {
	const uriCredFrontalCrop = encodeURIComponent(linkCredFrontalCrop);

	try {
		const url = `https://validcredenciales.herokuapp.com/api/credencial?nombreUser=${uriCredFrontalCrop}`;
		// https://validcredenciales.herokuapp.com/api/credencial?nombreUser=https://imagesvotacion.s3.eu-north-1.amazonaws.com/1675827520926_fileName17079.jpeg

		let okResp = false;
		let verif = false;

		const response = await fetch(url, {
			mode: "cors",
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("VERIFICACIÓN FRENTE CREDENCIAL", data);
				okResp = true;
				verif = data.data;
			})
			.catch((error) => {
				console.log("ERROR DE PETICIÓN FRENTE CREDENCIAL", error);
				okResp = false;
				verif = data.data;
			});

		return {
			ok: okResp,
			esCredencial: verif,
		};
	} catch (error) {
		return { ok1: false };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
