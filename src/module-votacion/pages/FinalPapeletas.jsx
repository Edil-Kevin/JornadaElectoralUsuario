import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const FinalPapeletas = () => {
	const { folios } = useSelector((state) => state.votante);
	const navigate = useNavigate();

	const handleRegresar = () => {
		navigate("/home");
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
			// pb="3rem"
		>
			<Container maxWidth="lg">
				<Box
					sx={{
						minHeight: "10rem",
						height: "auto",
						boxShadow: 1,
						backgroundColor: "base.main",
						borderRadius: { xs: "0.5rem", md: "1rem" },
						p: { xs: "1rem", md: "2rem" },

						pb: "2rem",
					}}
				>
					<Box>
						<Typography
							color="#323232"
							align="center"
							mb="2rem"
							sx={{
								fontSize: {
									xs: "1.5rem",
									md: "2rem",
								},
							}}
						>
							Su respuesta ha sido registrado correctamente
						</Typography>
						<Typography
							color="error"
							align="center"
							mb="2rem"
							sx={{
								fontSize: {
									xs: "1rem",
									md: "1.5rem",
								},
							}}
						>
							¡Nota importante!
						</Typography>
					</Box>
					<Box
						sx={{
							height: "auto",
							width: "100%",
						}}
						display="flex"
						justifyContent="center"
					>
						<Box
							sx={{
								height: "auto",
								boxShadow: 1,
								backgroundColor: "#323232",
								borderRadius: { xs: "0.5rem", md: "1rem" },
								p: "2rem",
								width: { xs: "100%", md: "85%" },
							}}
							display="flex"
							flexDirection="column"
						>
							<Typography
								color="base.main"
								align="justify"
								mb="2rem"
								sx={{
									fontSize: {
										xs: "1rem",
										md: "1.5rem",
									},
								}}
							>
								Su respuesta no guardará ningún tipo de relación con su cuenta o su
								nombre, es decir, será completamente anónimo, por esta razón, favor
								de tomar nota de los siguientes folios, los cuales únicamente usted
								conocerá y podrá ingresar en el módulo de verificación para poder
								corroborar que el sentido de su respuesta es el mismo que al momento
								de su emisión. Estos folios solo se mostrarán por esta única
								ocación, por eso es importante que los guarde de manera adecuada.
							</Typography>
							{folios.map((folio, index) => (
								<React.Fragment key={folio.folioBoleta}>
									<Typography
										color="base.main"
										align="center"
										mb="1rem"
										variant="h6"
									>
										{folio.nombreEleccion}
									</Typography>
									<Typography
										color="#323232"
										align="center"
										mb="1rem"
										sx={{
											fontSize: {
												xs: "1rem",
												md: "1.3rem",
											},
											backgroundColor: "base.main",
											p: "1rem",
											borderRadius: "1rem",
										}}
										// variant="h6"
									>
										{folio.folioBoleta}
									</Typography>
								</React.Fragment>
							))}
						</Box>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							pt: 2,
						}}
					>
						{/* <Button color="base">Regresar</Button> */}
						<Box sx={{ flex: "1 1 auto" }} />

						<Button
							color="darkButton"
							type="submit"
							variant="contained"
							onClick={handleRegresar}
						>
							Regresar
						</Button>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};
