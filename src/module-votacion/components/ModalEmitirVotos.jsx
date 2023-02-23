import { Button, Container, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: { xs: "95%", md: "50%" },
	bgcolor: "background.paper",
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
	pb: 4,
	// height: "90%",
};

let contador = 0;
const velocidad = 500;

export const ModalEmitirVotos = ({ modalStatus }) => {
	const { errorMessage, statusPeticion } = useSelector((state) => state.votante);
	const [tick, setTick] = useState(contador);
	const navigate = useNavigate();
	useEffect(() => {
		const interval = setInterval(() => {
			contador++;
			setTick(contador);
			if (contador === 3) contador = 0;
		}, velocidad);

		return () => clearInterval(interval);
	}, []);

	const handleRegresar = () => {
		console.log("NAVEGA");
		navigate("/votacion/inicio");
	};

	return (
		<Modal
			open={modalStatus}
			// onClose={closeModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ overflowY: "auto", height: "100%" }}>
					<Box>
						{statusPeticion === "fail" && errorMessage !== "" ? (
							<>
								<Typography
									id="modal-modal-title"
									variant="h5"
									color="#323232"
									align="center"
									display="flex"
									justifyContent="center"
									// p={2}
									// justifyItems="center"
									// alignContent="center"
									// alignItems="center"
								>
									Fallo al emitir voto. Intenta más tarde.
								</Typography>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										pt: 4,
									}}
								>
									<Box sx={{ flex: "1 1 auto" }} />
									<Button
										sx={{
											"&.Mui-disabled": {
												color: "#f8f7f3 !important",
												border: "1px solid #f8f7f3 !important",
											},
										}}
										color="darkButton"
										variant="contained"
										onClick={handleRegresar}
									>
										Regresar
									</Button>
								</Box>
							</>
						) : (
							<>
								<Typography
									id="modal-modal-title"
									variant="h4"
									color="#323232"
									align="center"
									display="flex"
									justifyContent="center"
									// justifyItems="center"
									// alignContent="center"
									// alignItems="center"
								>
									Emitiendo votos
								</Typography>
								<Typography
									variant="h4"
									color="#323232"
									display="flex"
									justifyContent="center"
								>
									{tick === 1 ? "." : tick === 2 ? ".." : tick === 3 ? "..." : ""}
								</Typography>
								<Box m={"2rem"}>
									<Typography variant="body1" color="initial" align="center">
										Este proceso puede tardar unos segundos.
									</Typography>
								</Box>
							</>
						)}
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};
