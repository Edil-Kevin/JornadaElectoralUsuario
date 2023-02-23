import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Grid, SvgIcon } from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const shadow = 5;
const borde = "3rem";
let contador = 4;
const velocidad = 5000;
// const logged = true;

export const HomePage = () => {
	const { status: logged } = useSelector((state) => state.auth);
	const [tick, setTick] = useState("circuloAuto0");
	const navigate = useNavigate();

	useEffect(() => {
		const interval = setInterval(() => {
			contador++;
			setTick("circuloAuto" + contador);
			if (contador === 5) contador = 0;
		}, velocidad);

		return () => clearInterval(interval);
	}, []);

	const goVotar = () => {
		if (logged !== "logged") navigate("/pasosVerificacion");
		else navigate("/votacion/inicio");
	};

	const goVerificar = () => {
		navigate("/verificacion");
	};

	return (
		<Box
			display={"flex"}
			sx={{
				height: "auto",

				flexGrow: 1,
				overflowY: "auto",
			}}
			pt="2rem"
			pb="2rem"
			pl="2rem"
			pr="2rem"
		>
			<Grid
				container
				spacing={{ xs: 2, sm: 2, md: 2, lg: 5 }}
				direction={{ xs: "row", lg: "column" }}
				minHeight="600px"
			>
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
					<Box
						onClick={goVotar}
						boxShadow={shadow}
						display="flex"
						flexDirection={"column"}
						justifyContent={"center"}
						alignItems="center"
						borderRadius={borde}
						height="100%"
						onMouseOver={(event) => {
							event.stopPropagation();
							setTick("circuloAuto1");
						}}
						sx={{
							cursor: "pointer",
							backgroundColor: "primary.main",
							height: "100%",
							transition: "all 0.5s ease",
							width: "100%",
							overflow: "hidden",
							position: "relative",

							"&:hover": {
								transform: "translate(-5px, -5px)",
								boxShadow: 10,
							},
							":hover .circulo1": {
								transition: "all 0.5s ease-out",
								transform: "scale(380) translateZ(0)",
								opacity: 1,
							},
							".active": {
								transition: "all 0.5s ease-out",
								transform: "scale(380) translateZ(0)",
								opacity: 1,
							},
						}}
					>
						<Box
							color={"base.main"}
							display="flex"
							flexDirection={"column"}
							justifyContent={"center"}
							justifyItems="center"
							alignItems="center"
						>
							{tick === "circuloAuto1" ? (
								<Box position={"absolute"}>
									<Typography
										position={"relative"}
										sx={{
											fontSize: {
												xs: "0.8rem",
												sm: "1rem",
												md: "1rem",
												lg: "2rem",
												xl: "2rem",
											},
										}}
										zIndex={9998}
										px="10%"
										color={"black"}
										textAlign="center"
									>
										¡Entra a tu votación o consulta correspondiente dando click
										aquí!
									</Typography>
								</Box>
							) : (
								<Box position="absolute" display="flex" flexDirection="column">
									<HowToVoteIcon
										sx={{
											height: {
												xs: "7rem",
												sm: "8rem",
												md: "8rem",
												lg: "15rem",
												xl: "17rem",
											},
											width: "auto",
											margin: 0,
											padding: 0,
										}}
									/>
									<Typography
										variant="h2"
										color={"base.main"}
										textAlign="center"
										position={"relative"}
										sx={{
											fontSize: {
												xs: "3rem",
												sm: "3rem",
												md: "3rem",
												lg: "5rem",
												xl: "5rem",
											},
										}}
									>
										Votar
									</Typography>
								</Box>
							)}
						</Box>
						<Box
							className={`circulo1 ${tick === "circuloAuto1" ? "active" : ""}`}
							sx={{
								width: "3px",
								position: "absolute",
								height: "3px",
								borderRadius: "100%",
								background: "#f8f7f3",
								opacity: 0.1,
								top: "50%",
								left: "50%",
								zIndex: 0,
								transition: "all 0.5s ease-out",
							}}
						></Box>
					</Box>
				</Grid>

				<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
					<Box
						boxShadow={shadow}
						display="flex"
						flexDirection={"column"}
						justifyContent={"center"}
						justifyItems="center"
						alignItems="center"
						flexWrap={"wrap"}
						borderRadius={borde}
						onMouseOver={(event) => {
							event.stopPropagation();
							setTick("circuloAuto2");
						}}
						sx={{
							cursor: "pointer",
							backgroundColor: "primary.main",
							height: "100%",
							transition: "all 0.5s ease",
							width: "100%",
							overflow: "hidden",
							position: "relative",

							"&:hover": {
								transform: "translate(-5px, -5px)",
								boxShadow: 10,
							},
							":hover .circulo2": {
								transition: "all 0.5s ease-out",
								transform: "scale(250) translateZ(0)",
								opacity: 1,
							},
							".active": {
								transition: "all 0.5s ease-out",
								transform: "scale(250) translateZ(0)",
								opacity: 1,
							},
						}}
					>
						<Box
							color={"base.main"}
							display="flex"
							flexDirection={"column"}
							justifyContent={"center"}
							justifyItems="center"
							alignItems="center"
						>
							{tick === "circuloAuto2" ? (
								<Box position={"absolute"}>
									<Typography
										position={"relative"}
										sx={{
											fontSize: {
												xs: "0.8rem",
												sm: "1rem",
												md: "1rem",
												lg: "2rem",
												xl: "2rem",
											},
										}}
										zIndex={9998}
										px="10%"
										color={"black"}
										textAlign="center"
									>
										¿Quieres verificar los resultados de votaciones y/o
										consultas previas? ¡Da click aquí!
									</Typography>
								</Box>
							) : (
								<Box position="absolute" display="flex" flexDirection="column">
									<BarChartIcon
										sx={{
											height: {
												xs: "4rem",
												sm: "6rem",
												md: "9rem",
												lg: "10rem",
												xl: "12rem",
											},
											width: "auto",
											margin: 0,
											padding: 0,
										}}
									/>

									<Typography
										sx={{
											fontSize: {
												xs: "1rem",
												sm: "1rem",
												md: "1rem",
												lg: "2rem",
												xl: "2rem",
											},
										}}
										position={"relative"}
										color={"base.main"}
										textAlign="center"
									>
										Resultados
									</Typography>
								</Box>
							)}
						</Box>
						<Box
							className={`circuloAuto2 ${tick === "circuloAuto2" ? "active" : ""}`}
							onMouseOver={() => {}}
							sx={{
								width: "3px",
								position: "absolute",
								height: "3px",
								borderRadius: "100%",
								background: "#f8f7f3",
								opacity: 0.1,
								top: "50%",
								left: "50%",
								zIndex: 0,
								transition: "all 0.5s ease-out",
							}}
						></Box>
					</Box>
				</Grid>

				<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
					<Box
						onClick={goVerificar}
						boxShadow={shadow}
						display="flex"
						flexDirection={"column"}
						justifyContent={"center"}
						justifyItems="center"
						alignItems="center"
						flexWrap={"wrap"}
						borderRadius={borde}
						onMouseOver={(event) => {
							event.stopPropagation();
							setTick("circuloAuto3");
						}}
						sx={{
							cursor: "pointer",
							backgroundColor: "primary.main",
							height: "100%",
							transition: "all 0.5s ease",
							width: "100%",
							overflow: "hidden",
							position: "relative",

							"&:hover": {
								transform: "translate(-5px, -5px)",
								boxShadow: 10,
							},
							":hover .circulo3": {
								transition: "all 0.5s ease-out",
								transform: "scale(250) translateZ(0)",
								opacity: 1,
							},
							".active": {
								transition: "all 0.5s ease-out",
								transform: "scale(250) translateZ(0)",
								opacity: 1,
							},
						}}
					>
						<Box
							color={"base.main"}
							display="flex"
							flexDirection={"column"}
							justifyContent={"center"}
							justifyItems="center"
							alignItems="center"
						>
							{tick === "circuloAuto3" ? (
								<Box position={"absolute"}>
									<Typography
										position={"relative"}
										sx={{
											fontSize: {
												xs: "0.8rem",
												sm: "1rem",
												md: "1rem",
												lg: "2rem",
												xl: "2rem",
											},
										}}
										zIndex={9998}
										px="10%"
										color={"black"}
										textAlign="center"
									>
										¿Quieres verificar que realizaste correctamente tu voto? ¡Da
										click aquí!
									</Typography>
								</Box>
							) : (
								<Box position="absolute" display="flex" flexDirection="column">
									<DomainVerificationIcon
										sx={{
											height: {
												xs: "4rem",
												sm: "6rem",
												md: "9rem",
												lg: "10rem",
												xl: "12rem",
											},
											position: "relative",
											width: "auto",
											margin: 0,
											padding: 0,
										}}
									/>
									<Typography
										// variant="h5"
										color={"base.main"}
										textAlign="center"
										sx={{
											fontSize: {
												xs: "1rem",
												sm: "1rem",
												md: "1rem",
												lg: "2rem",
												xl: "2rem",
											},
										}}
										position={"relative"}
									>
										Verificar mi voto
									</Typography>
								</Box>
							)}
						</Box>
						<Box
							className={`circulo3 ${tick === "circuloAuto3" ? "active" : ""}`}
							sx={{
								width: "3px",
								position: "absolute",
								height: "3px",
								borderRadius: "100%",
								background: "#f8f7f3",
								opacity: 0.1,
								top: "50%",
								left: "50%",
								zIndex: 0,
								transition: "all 0.5s ease-out",
							}}
						></Box>
					</Box>
				</Grid>

				<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
					<Box
						boxShadow={shadow}
						display="flex"
						flexDirection={"column"}
						justifyContent={"center"}
						alignItems="center"
						borderRadius={borde}
						onMouseOver={(event) => {
							event.stopPropagation();
							setTick("circuloAuto4");
						}}
						sx={{
							cursor: "pointer",
							backgroundColor: "primary.main",
							height: "100%",
							transition: "all 0.5s ease",
							width: "100%",
							overflow: "hidden",
							position: "relative",

							"&:hover": {
								transform: "translate(-5px, -5px)",
								boxShadow: 10,
							},
							":hover .circulo4": {
								transition: "all 0.5s ease-out",
								transform: "scale(250) translateZ(0)",
								opacity: 1,
							},
							".active": {
								transition: "all 0.5s ease-out",
								transform: "scale(250) translateZ(0)",
								opacity: 1,
							},
						}}
					>
						<Box
							color={"base.main"}
							display="flex"
							flexDirection={"column"}
							justifyContent={"center"}
							justifyItems="center"
							alignItems="center"
						>
							{tick === "circuloAuto4" ? (
								<Box position={"absolute"}>
									<Typography
										position={"relative"}
										sx={{
											fontSize: {
												xs: "0.8rem",
												sm: "1rem",
												md: "1rem",
												lg: "2rem",
												xl: "2rem",
											},
										}}
										zIndex={9998}
										px="10%"
										color={"black"}
										textAlign="center"
									>
										¿Necesitas información sobre los diferentes procesos? ¡Da
										click aquí!
									</Typography>
								</Box>
							) : (
								<Box position="absolute" display="flex" flexDirection="column">
									<InfoIcon
										sx={{
											height: {
												xs: "4rem",
												sm: "6rem",
												md: "9rem",
												lg: "10rem",
												xl: "12rem",
											},
											width: "auto",
											margin: 0,
											padding: 0,
										}}
									/>
									<Typography
										color={"base.main"}
										textAlign="center"
										sx={{
											fontSize: {
												xs: "1rem",
												sm: "1rem",
												md: "1rem",
												lg: "2rem",
												xl: "2rem",
											},
										}}
										position={"relative"}
									>
										Información
									</Typography>
								</Box>
							)}
						</Box>
						<Box
							className={`circulo4 ${tick === "circuloAuto4" ? "active" : ""}`}
							sx={{
								width: "3px",
								position: "absolute",
								height: "3px",
								borderRadius: "100%",
								background: "#f8f7f3",
								opacity: 0.1,
								top: "50%",
								left: "50%",
								zIndex: 0,
								transition: "all 0.5s ease-out",
							}}
						></Box>
					</Box>
				</Grid>

				<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
					<Box
						boxShadow={shadow}
						display="flex"
						flexDirection={"column"}
						justifyContent={"center"}
						alignItems="center"
						borderRadius={borde}
						onMouseOver={(event) => {
							event.stopPropagation();
							setTick("circuloAuto5");
						}}
						sx={{
							cursor: "pointer",
							backgroundColor: "primary.main",
							height: "100%",
							transition: "all 0.5s ease",
							width: "100%",
							overflow: "hidden",
							position: "relative",

							"&:hover": {
								transform: "translate(-5px, -5px)",
								boxShadow: 10,
							},
							":hover .circulo5": {
								transition: "all 0.5s ease-out",
								transform: "scale(250) translateZ(0)",
								opacity: 1,
							},
							".active": {
								transition: "all 0.5s ease-out",
								transform: "scale(250) translateZ(0)",
								opacity: 1,
							},
						}}
					>
						<Box
							color={"base.main"}
							display="flex"
							flexDirection={"column"}
							justifyContent={"center"}
							justifyItems="center"
							alignItems="center"
						>
							{tick === "circuloAuto5" ? (
								<Box position={"absolute"}>
									<Typography
										position={"relative"}
										sx={{
											fontSize: {
												xs: "0.8rem",
												sm: "1rem",
												md: "1rem",
												lg: "2rem",
												xl: "2rem",
											},
										}}
										zIndex={9998}
										px="10%"
										color={"black"}
										textAlign="center"
									>
										¿Necesitas ayuda? ¡Da click aquí!
									</Typography>
								</Box>
							) : (
								<Box position="absolute" display="flex" flexDirection="column">
									<PsychologyAltIcon
										sx={{
											height: {
												xs: "4rem",
												sm: "6rem",
												md: "9rem",
												lg: "10rem",
												xl: "12rem",
											},
											width: "auto",
											margin: 0,
											padding: 0,
										}}
									/>
									<Typography
										color={"base.main"}
										textAlign="center"
										sx={{
											fontSize: {
												xs: "1rem",
												sm: "1rem",
												md: "1rem",
												lg: "2rem",
												xl: "2rem",
											},
										}}
										position={"relative"}
									>
										Ayuda
									</Typography>
								</Box>
							)}
						</Box>
						<Box
							className={`circulo5 ${tick === "circuloAuto5" ? "active" : ""}`}
							sx={{
								width: "3px",
								position: "absolute",
								height: "3px",
								borderRadius: "100%",
								background: "#f8f7f3",
								opacity: 0.1,
								top: "50%",
								left: "50%",
								zIndex: 0,
								transition: "all 0.5s ease-out",
							}}
						></Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};
