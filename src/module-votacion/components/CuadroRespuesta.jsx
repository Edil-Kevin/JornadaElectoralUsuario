import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

export const CuadroRespuesta = ({ respuesta, eleccion, setEleccion, id }) => {
	const [selected, setSelected] = useState(eleccion.id == id ? true : false);
	// console.log(selected);

	const handleToggle = () => {
		if (selected == false) {
			// setEleccion(`${id}`);
			setEleccion({ id: `${id}`, respuesta: respuesta });
			setSelected(true);
		} else {
			// setEleccion("");
			setEleccion({});
			setSelected(false);
		}
	};

	useEffect(() => {
		eleccion.id == id ? setSelected(true) : setSelected(false);
	}, [eleccion]);

	return (
		<Box
			onClick={handleToggle}
			height="100%"
			borderRadius="0.3rem"
			p={1}
			sx={{
				border: "2px solid",
				borderColor: "#423838",
				cursor: "pointer",
				width: "100%",
				boxShadow: 0,
				display: "flex",
				transition: "all 0.3s ease",
				position: "relative",
				minHeight: "4rem",
				"&:hover": {
					// transform: "translate(-2px, -2px)",
					// boxShadow: 10,
				},
				".active": {
					transition: "all 0.2s ease-out",
					// transform: "scale(150) translateZ(0)",
					transform: "scale(16) translateZ(0)",
					opacity: 1,
				},
			}}
			display="flex"
			alignItems="center"
			justifyContent="center"
			bgcolor="white"
		>
			<Typography variant="body1" color="initial" align="center">
				{respuesta}
			</Typography>
			<Box
				// className={`circulo${id} ${selected === "circulo" + id ? "active" : ""}`}
				sx={{
					// width: "3px",
					position: "absolute",
					// height: "3px",
					// borderRadius: "100%",
					// backgroundColor: "primary.main",
					// opacity: 0.1,
					top: "24%",
					left: "48%",
					zIndex: 0,
					transition: "all 0.1s ease-out",
				}}
			>
				<svg
					className={`${selected ? "active" : ""}`}
					fill="#000000"
					height="3px"
					width="3px"
					version="1.1"
					id="Capa_1"
					// xmlns="http://www.w3.org/2000/svg"
					// xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 460.775 460.775"
					// xml:space="preserve"
					opacity={0.1}
					sx={{
						// zIndex: 0,
						transition: "all 0.1s ease-out",
					}}
				>
					<path
						d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
					/>
				</svg>
			</Box>
		</Box>
	);
};
