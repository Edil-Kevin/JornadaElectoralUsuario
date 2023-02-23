import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { captureCanvas } from "../components/imprimirFolio";

export const Folios = () => {
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
							Su voto ha sido registrado correctamente
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
							id="folioImpresion"
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
								Su voto no guardará ningún tipo de relación con su cuenta o su
								nombre, es decir, será completamente anónimo. Por esta razón, le
								pedimos que tome nota de los siguientes folios, los cuales
								únicamente usted conocerá y podrá ingresar en el módulo de
								verificación para poder corroborar que el sentido de su voto es el
								mismo que al momento de su emisión. Estos folios solo se mostrarán
								por esta única ocasión, por lo que es importante que los guarde
								adecuadamente y no los comparta con nadie.
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
							<Box display="flex" justifyContent="center" pt={2}>
								<Button
									variant="contained"
									size="large"
									// color="base"
									onClick={captureCanvas}
									sx={{
										boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
										transition: "all 0.5s ease",
										backgroundColor: "#388452",
										// width: "100%",
										// minHeight: { xs: "8rem", md: "10rem" },
										fontSize: { xs: "1.1rem", md: "1.2rem" },
										// borderRadius: "2rem 2rem 2rem 2rem",
										"&:hover": {
											backgroundColor: "#323232 !important",
											transform: "translate(-5px, -5px)",
											boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
										},
									}}
								>
									Descargar folios
								</Button>
							</Box>
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
