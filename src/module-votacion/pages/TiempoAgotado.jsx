import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const TiempoAgotado = () => {
	const navigate = useNavigate();

	const handleRegresar = () => {
		navigate("/votacion/inicio");
	};
	return (
		<Box
			display={"flex"}
			sx={{
				height: "auto",
				flexGrow: 1,
				overflowY: { sx: "none", md: "auto" },
			}}
			pt="2rem"
			pb="2rem"
			zIndex={9998}
			alignItems="center"
		>
			<Container maxWidth="md">
				<Box
					bgcolor="white"
					m={0}
					width="100%"
					borderRadius="2rem"
					height="auto"
					p={{ xs: "1rem", md: "2rem" }}
				>
					<Box pb={1} display="flex" flexDirection="column">
						<Typography variant="h2" align="center" color="error" width="100%">
							Tiempo agotado
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							pt: 2,
						}}
						justifyContent="center"
					>
						{/* <Button color="base">Regresar</Button> */}
						{/* <Box sx={{ flex: "1 1 auto" }} /> */}

						<Button
							color="darkButton"
							onClick={handleRegresar}
							variant="contained"
							size="large"
						>
							Regresar
						</Button>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};
