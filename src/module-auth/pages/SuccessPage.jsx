import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const SuccessPage = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/auth/login");
	};

	return (
		<Box display="flex" height="100%" alignItems="center">
			<Container
				maxWidth="lg"
				sx={{
					minHeight: "10rem",
					height: "auto",
					boxShadow: 1,
					backgroundColor: "#323232",
					borderRadius: { xs: "0.5rem", md: "1rem" },
					p: "2rem",
					// pl: "2rem",
				}}
			>
				<Box display="flex" flexDirection="column" alignItems="center">
					<Typography
						variant="h5"
						color="base.main"
						display="flex"
						justifyContent="center"
						align="center"
						mb="2rem"
					>
						CONTRASEÑA ESTABLECIDA CON ÉXITO
					</Typography>
					<Button
						variant="contained"
						size="large"
						color="base"
						onClick={handleClick}
						sx={{
							boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
							transition: "all 0.5s ease",
							// backgroundColor: "#543884",
							width: { xs: "100%", md: "30%" },
							// borderRadius: "2rem 2rem 2rem 2rem",
							"&:hover": {
								// backgroundColor: "#7E328B !important",
								transform: "translate(-5px, -5px)",
								boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
							},
						}}
					>
						INICIAR SESIÓN
					</Button>
				</Box>
			</Container>
		</Box>
	);
};
