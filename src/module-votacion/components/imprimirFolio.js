import jsPDF from "jspdf";

import * as htmlToImage from "html-to-image";
import html2canvas from "html2canvas";

export const captureCanvas = () => {
	// const node = document.getElementById("reporteInicialHTML");
	let doc = new jsPDF("p", "px", "letter"); // using defaults: orientation=portrait, unit=mm, size=A4
	let scale2 = doc.internal.pageSize.width / 250;

	html2canvas(document.getElementById("folioImpresion"), {
		scale: scale2,
		logging: false,
		useCORS: true,
		allowTaint: true,
		imageTimeout: 5000,
	}).then((canvas) => {
		let image = canvas.toDataURL("image/jpeg", 1.0);
		// let img = new Image();
		// img.src = canvas.toDataURL("image/jpeg", 1.0);
		doc.addImage(image, "JPEG", 0, 0, canvas.width / 4.08, canvas.height / 4.08);
		doc.save("misFolios.pdf"); //Download the rendered PDF.
		// doc.output("dataurlnewwindow", { filename: "fichero.pdf" });
	});
};
