import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Card, CardContent, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { onAddCandidaturaNoRegistrada } from "../../store/votante/votanteSlice";
export const TarjetaCandidaturaNoRegistrada = ({
	id,
	nombre,
	setSeleccionados,
	seleccionados,
	max,
	candidaturaNoRegistrada,
	handleChange,
	setCandidaturaNoRegistrada,
	noBoleta,
}) => {
	const [selected, setSelected] = useState(null);
	// const { candidaturaNoRegistrada: previo } = useSelector((state) => state.votante);

	console.log("ME RENDERIZO HIJO", candidaturaNoRegistrada);
	const handleToggle = () => {
		if (seleccionados.includes(200)) return;
		if (selected == null) {
			// if (seleccionados.length === max) return;
			// setSeleccionados((actual) => [...actual, id]);
			setSeleccionados((actual) => [id]);
			setSelected("circulo" + id);
		} else {
			let nuevo = seleccionados.filter((seleccionado) => {
				if (seleccionado === id) return;
				else return seleccionado;
			});

			setSeleccionados(nuevo);
			setSelected(null);
		}
	};

	const marcar = () => {
		setSelected("circulo" + id);
		// setCandidaturaNoRegistrada(previo[noBoleta - 1]);
	};

	useEffect(() => {
		seleccionados.find((idE) => idE === id) ? marcar() : setSelected(null);
	}, [seleccionados]);

	return (
		<Card
			sx={{
				cursor: "pointer",
				width: "100%",
				borderRadius: "0.5rem",
				border: "2px solid",
				borderColor: "#423838",
				boxShadow: 0,
				display: "flex",
				transition: "all 0.3s ease",
				position: "relative",
				".active": {
					transition: "all 0.2s ease-out",
					transform: "scale(30) translateZ(0)",
					opacity: 1,
				},
			}}
		>
			<CardContent
				sx={{ display: "flex", width: "100%", position: "relative", zIndex: 9999 }}
				onClick={(event) => {
					event.stopPropagation();
					// console.log("circulo" + id);
					handleToggle();
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={4}>
						<Box
							display="flex"
							height="100%"
							justifyContent="center"
							alignItems="center"
						>
							<img
								alt="logo"
								src={
									"https://w7.pngwing.com/pngs/527/663/png-transparent-logo-person-user-person-icon-rectangle-photography-computer-wallpaper.png"
								}
								style={{
									// transition: "width 0.5s, height 0.5s",
									width: "5rem",
									height: "5rem",
									userSelect: "none",
									WebkitTouchCallout: "none",
									WebkitUserSelect: "none",
									MozUserSelect: "none",
									msUserSelect: "none",
								}}
							/>
						</Box>
					</Grid>
					<Grid item xs={8} display="flex" alignContent="center" alignItems="center">
						<Box width="100%">
							<Typography
								sx={{ fontSize: { xs: 8, md: 12 }, userSelect: "none" }}
								color="black"
								gutterBottom
								align="center"
							>
								Candidatura no registrada
							</Typography>
							<Typography
								sx={{ fontSize: { xs: 7, md: 11 }, userSelect: "none" }}
								color="text.secondary"
								gutterBottom
								align="center"
							>
								Representante
							</Typography>
							<TextField
								name="password"
								value={candidaturaNoRegistrada}
								onChange={handleChange}
								fullWidth
								// color="base"
								// focused
								variant="outlined"
								label="Ingresa el nombre del candidato"
								type="text"
								error={selected !== null && candidaturaNoRegistrada === ""}
								helperText={
									selected !== null &&
									candidaturaNoRegistrada === "" &&
									"Especifica un candidato"
								}
								sx={{
									zIndex: 9999,
								}}
							></TextField>
						</Box>
					</Grid>
				</Grid>
			</CardContent>
			<Box
				// className={`circulo${id} ${selected === "circulo" + id ? "active" : ""}`}
				sx={{
					// width: "3px",
					position: "absolute",
					// height: "3px",
					// borderRadius: "100%",
					// backgroundColor: "primary.main",
					// opacity: 0.1,
					top: "35%",
					left: "17%",
					// zIndex: 0,
					transition: "all 0.1s ease-out",
				}}
			>
				<svg
					className={`circulo${id} ${selected === "circulo" + id ? "active" : ""}`}
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
						zIndex: 9998,
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
		</Card>
	);
};
