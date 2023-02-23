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

const pages = ["Inicio", "Resultados", "Verificación", "Información"];
const settings = ["Ingresar"];

export const AppBarAuth = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const navigate = useNavigate();

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
		navigate("/pasosVerificacion");
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

	return (
		<AppBar
			position="static"
			sx={{
				"&": {
					backgroundColor: "transparent",
					boxShadow: 0,
					paddingTop: "1rem",
				},
			}}
		>
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
				</Toolbar>
			</Box>
		</AppBar>
	);
};
