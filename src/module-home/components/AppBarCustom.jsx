import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "../../store/auth/authSlice";
import { onLogoutThunk } from "../../store/auth/authThunks";

const pages = ["Inicio", "Resultados", "Verificación", "Información"];
const settings = ["Ingresar"];
const settings2 = ["Cerrar sesión"];

// const logged = true;

export const AppBarCustom = () => {
	const { status: logged } = useSelector((state) => state.auth);
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

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

	const handleCerrarSesion = () => {
		dispatch(onLogoutThunk(() => navigate("/home")));
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

	const hanldeIngresar = () => {
		setAnchorElUser(null);
		navigate("/auth/login");
	};

	return (
		<AppBar
			position="static"
			sx={{
				"&": {
					backgroundColor: "transparent",
					boxShadow: 0,
					paddingTop: "1rem",
					color: "#fff",
				},
			}}
		>
			{/* <Container maxWidth="xl"> */}
			<Box pl={{ xs: "1rem", md: "6rem" }} pr={{ xs: "1rem", md: "6rem" }}>
				<Toolbar disableGutters>
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

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="black"
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
							<MenuItem key={"resultados"} onClick={goResultados} color="black">
								<Typography textAlign="center" sx={{ color: "black" }}>
									Resultado
								</Typography>
							</MenuItem>
							<MenuItem key={"verificacion"} onClick={goVerificacion} color="black">
								<Typography textAlign="center" sx={{ color: "black" }}>
									Verificacion
								</Typography>
							</MenuItem>
							<MenuItem key={"información"} onClick={goInformacion} color="black">
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

					<Box
						sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
						alignItems={"center"}
						justifyContent={"space-evenly"}
					>
						{/* {pages.map((page) => ( */}
						<Button
							key={"inicio"}
							onClick={goInicio}
							sx={{ my: 2, color: "black", display: "block" }}
						>
							Inicio
						</Button>
						<Button
							key={"Votar"}
							onClick={goVotar}
							sx={{ my: 2, color: "black", display: "block" }}
						>
							Votar
						</Button>
						<Button
							key={"resultados"}
							onClick={goResultados}
							sx={{ my: 2, color: "black", display: "block" }}
						>
							Resultados
						</Button>
						<Button
							key={"verificacion"}
							onClick={goVerificacion}
							sx={{ my: 2, color: "black", display: "block" }}
						>
							Verificacion
						</Button>
						<Button
							key={"informacion"}
							onClick={goInformacion}
							sx={{ my: 2, color: "black", display: "block" }}
						>
							Información
						</Button>
						<Button
							key={"ayuda"}
							onClick={goAyuda}
							sx={{ my: 2, color: "black", display: "block" }}
						>
							Ayuda
						</Button>
						{/* ))} */}
					</Box>

					{logged === "logged" ? (
						<></>
					) : (
						<Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenUserMenu}
								color="black"
							>
								<LoginIcon />
							</IconButton>
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
								{/* {settings.map((setting) => ( */}
								<MenuItem onClick={hanldeIngresar}>
									<Typography textAlign="center">Ingresar</Typography>
								</MenuItem>
								{/* ))} */}
							</Menu>
						</Box>
					)}

					{logged === "logged" ? (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu}>
									<Avatar alt="Jemy Sharp" src="/static/images/avatar/2.jpg" />
									<Typography
										variant="body1"
										color="initial"
										ml={2}
										display={{ xs: "none", lg: "flex" }}
									></Typography>
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
									<Typography textAlign="center">Cerrar Sesión</Typography>
								</MenuItem>
								{/* ))} */}
							</Menu>
						</Box>
					) : (
						<Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
							<Button
								variant="contained"
								size="large"
								onClick={hanldeIngresar}
								sx={{
									boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
									transition: "all 0.5s ease",
									backgroundColor: "#543884",
									width: "100%",
									// borderRadius: "2rem 2rem 2rem 2rem",
									"&:hover": {
										backgroundColor: "#7E328B !important",
										transform: "translate(-5px, -5px)",
										boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
									},
								}}
							>
								Ingresar
							</Button>
						</Box>
					)}
				</Toolbar>
				{/* </Container> */}
			</Box>
		</AppBar>
	);
};
