import {
	AppBar,
	Avatar,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/hourglass.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { onLogoutThunk } from "../../store/auth/authThunks";
import { TemporizadorVotacion } from "./TemporizadorVotacion";
const pages = ["Inicio", "Resultados", "Verificación", "Información"];
const settings = ["Ingresar"];
const settings2 = ["Cerrar sesión"];
const votando = false;

export const AppBarVotacion = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const {
		status,
		jornadaActual,
		horaComienzoVotacion,
		jornadaFormal,
		jornadaNoFormal,
		consultaCiudadana,
	} = useSelector((state) => state.votante);
	const { status: logged, username } = useSelector((state) => state.auth);
	const [time, setTime] = useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	console.log("TIME SETEADO", time);

	useEffect(() => {
		if (jornadaActual !== null) {
			const horaSeparada = jornadaActual.requestConfigJornada.tiempoDuracionVoto.split(":");
			const horaSeparadaInt = horaSeparada.map((numero) => parseInt(numero, 10));
			console.log("TIEMPO horaSeparadaInt", horaSeparadaInt);
			const horaComienzo = new Date(horaComienzoVotacion);
			console.log("horaComienzoVotacion", horaComienzo);

			horaComienzo.setHours(horaComienzo.getHours() + horaSeparadaInt[0]);
			horaComienzo.setMinutes(horaComienzo.getMinutes() + horaSeparadaInt[1]);
			horaComienzo.setSeconds(horaComienzo.getSeconds() + horaSeparadaInt[2]);

			const timeTemp = new Date(horaComienzo);
			setTime(timeTemp);

			// const time = new Date();
			// time.setSeconds(time.getSeconds() + 10);
			// setTime(time);
		}
	}, [jornadaActual]);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const goInicio = (event) => {
		setAnchorElNav(null);
		navigate("/home");
	};

	const goVotar = () => {
		setAnchorElNav(null);
		if (logged === "logged") navigate("/votacion/inicio");
		else navigate("/pasosVerificacion");
	};

	const goResultados = () => {
		setAnchorElNav(null);
		navigate("/resultados");
	};

	const goVerificacion = () => {
		setAnchorElNav(null);
		navigate("/verificacion");
	};

	const goInformacion = () => {
		setAnchorElNav(null);
		navigate("/informacion");
	};

	const goAyuda = () => {
		setAnchorElNav(null);
		navigate("/ayuda");
	};

	const handleCerrarSesion = () => {
		dispatch(onLogoutThunk(() => navigate("/home")));
		setAnchorElUser(null);
	};

	// aqui
	return (
		<AppBar
			position="static"
			sx={{
				"&": {
					backgroundColor: "#323232",
					boxShadow: 0,
				},
			}}
		>
			<Box pl={{ xs: "1rem", md: "6rem" }} pr={{ xs: "1rem", md: "6rem" }}>
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1, width: "100%" }} display="flex" justifyContent="left">
						{status === "noVotando" && (
							// <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
							// 	<img
							// 		alt="logo"
							// 		src="../../images/CEE600x321.png"
							// 		style={{
							// 			transition: "width 0.5s, height 0.5s",
							// 			width: "8rem",
							// 		}}
							// 	/>
							// </Box>
							<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleOpenNavMenu}
									color="base"
								>
									<MenuIcon />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorElNav}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "left",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									open={Boolean(anchorElNav)}
									onClose={handleCloseNavMenu}
									sx={{
										display: { xs: "block", md: "none" },
										zIndex: 9999,
									}}
								>
									{/* {pages.map((page) => ( */}
									<MenuItem key={"inicio"} onClick={goInicio} color="black">
										<Typography textAlign="center" sx={{ color: "black" }}>
											Inicio
										</Typography>
									</MenuItem>
									<MenuItem key={"votar"} onClick={goVotar} color="black">
										<Typography textAlign="center" sx={{ color: "black" }}>
											Votar
										</Typography>
									</MenuItem>
									<MenuItem
										key={"resultados"}
										onClick={goResultados}
										color="black"
									>
										<Typography textAlign="center" sx={{ color: "black" }}>
											Resultados
										</Typography>
									</MenuItem>
									<MenuItem
										key={"verificacion"}
										onClick={goVerificacion}
										color="black"
									>
										<Typography textAlign="center" sx={{ color: "black" }}>
											Verificacion
										</Typography>
									</MenuItem>
									<MenuItem
										key={"información"}
										onClick={goInformacion}
										color="black"
									>
										<Typography textAlign="center" sx={{ color: "black" }}>
											Información
										</Typography>
									</MenuItem>
									<MenuItem key={"ayuda"} onClick={goAyuda} color="black">
										<Typography textAlign="center" sx={{ color: "black" }}>
											Ayuda
										</Typography>
									</MenuItem>
									{/* ))} */}
								</Menu>
							</Box>
						)}

						<Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
							<img
								alt="logo"
								// src="../../images/CEE600x321.png"
								src="./images/CEE600x321.png"
								style={{
									transition: "width 0.5s, height 0.5s",
									width: "8rem",
								}}
							/>
						</Box>

						<Box sx={{ flexGrow: 2, display: { xs: "flex", md: "none" } }}>
							{status === "votando" && (
								<>
									<div className="hourglass"></div>
									{time !== null ? (
										<TemporizadorVotacion
											time={time}
											idProceso={
												jornadaActual.tipoJornada === "JornadaFormal"
													? jornadaFormal.idJornada
													: jornadaActual.tipoJornada ===
													  "JornadaNoFormal"
													? jornadaNoFormal.idJornada
													: consultaCiudadana.idJornada
											}
											curp={username}
										/>
									) : (
										<> </>
									)}
								</>
							)}
						</Box>
					</Box>

					<Box sx={{ flexGrow: 1, width: "100%" }} display="flex" justifyContent="center">
						{status === "votando" ? (
							<></>
						) : (
							// <Box sx={{ display: { xs: "flex", md: "none" }, mr: 0, flexGrow: 1 }}>
							// 	<img
							// 		alt="logo"
							// 		// src="../../images/CEE600x321.png"
							// 		src="/images/CEE600x321.png"
							// 		style={{
							// 			transition: "width 0.5s, height 0.5s",
							// 			width: "8rem",
							// 		}}
							// 	/>
							// </Box>
							<>
								<Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
									<img
										alt="logo"
										// src="../../images/CEE600x321.png"
										src="./images/CEE600x321.png"
										style={{
											transition: "width 0.5s, height 0.5s",
											width: "8rem",
										}}
									/>
								</Box>
								<Box
									sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
									alignItems={"center"}
									justifyContent={"space-evenly"}
								>
									{/* {pages.map((page) => ( */}
									<Button
										key={"inicio"}
										onClick={goInicio}
										sx={{ my: 2, color: "base.main", display: "block" }}
									>
										Inicio
									</Button>
									<Button
										key={"resultados"}
										onClick={goResultados}
										sx={{ my: 2, color: "base.main", display: "block" }}
									>
										Resultados
									</Button>
									<Button
										key={"verificacion"}
										onClick={goVerificacion}
										sx={{ my: 2, color: "base.main", display: "block" }}
									>
										Verificacion
									</Button>
									<Button
										key={"informacion"}
										onClick={goInformacion}
										sx={{ my: 2, color: "base.main", display: "block" }}
									>
										Información
									</Button>
									<Button
										key={"ayuda"}
										onClick={goAyuda}
										sx={{ my: 2, color: "base.main", display: "block" }}
									>
										Ayuda
									</Button>
									{/* ))} */}
								</Box>
							</>
						)}

						<Box
							sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
							alignItems={"center"}
							justifyContent={"center"}
						>
							{status === "votando" && (
								<>
									<div className="hourglass"></div>

									{time !== null ? (
										<TemporizadorVotacion
											time={time}
											idProceso={
												jornadaActual.tipoJornada === "JornadaFormal"
													? jornadaFormal.idJornada
													: jornadaActual.tipoJornada ===
													  "JornadaNoFormal"
													? jornadaNoFormal.idJornada
													: consultaCiudadana.idJornada
											}
											curp={username}
											tipoJornada={jornadaActual.tipoJornada}
										/>
									) : (
										<> </>
									)}
								</>
							)}
						</Box>
					</Box>

					{/* <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenUserMenu}
							color="base"
						>
							<LoginIcon />
						</IconButton>
						<Typography variant="caption" color="initial">
							Salir
						</Typography>
					</Box> */}

					<Box sx={{ flexGrow: 1, width: "100%" }} display="flex" justifyContent="right">
						{status === "votando" ? (
							<Box sx={{ display: { xs: "flex", md: "none" }, mr: 0, flexGrow: 1 }}>
								<img
									alt="logo"
									// src="../../images/CEE600x321.png"
									src="./images/CEE600x321.png"
									style={{
										transition: "width 0.5s, height 0.5s",
										width: "8rem",
									}}
								/>
							</Box>
						) : (
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Abrir opciones">
									<IconButton onClick={handleOpenUserMenu} size="large">
										<AccountCircleIcon color="base" fontSize="10rem" />
										<Typography
											variant="body1"
											color="base.main"
											ml={2}
											display={{ xs: "none", lg: "flex" }}
										>
											{/* José */}
										</Typography>
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{/* {settings2.map((setting) => ( */}
									<MenuItem onClick={handleCerrarSesion}>
										<Typography textAlign="center">Cerrar sesión</Typography>
									</MenuItem>
									{/* // ))} */}
								</Menu>
							</Box>
						)}
					</Box>

					{/* <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
						<Button
							variant="contained"
							size="large"
							color="base"
							sx={{
								zIndex: 9999,
								boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
								transition: "all 0.5s ease",
								// backgroundColor: "#543884",
								width: "100%",
								// borderRadius: "2rem 2rem 2rem 2rem",
								"&:hover": {
									// backgroundColor: "#7E328B !important",
									transform: "translate(-5px, -5px)",
									boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
								},
							}}
						>
							Regresar
						</Button>
					</Box> */}
				</Toolbar>
				{/* </Container> */}
			</Box>
		</AppBar>
	);
};
