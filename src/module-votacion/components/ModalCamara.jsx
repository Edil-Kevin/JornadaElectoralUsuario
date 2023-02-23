import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Container,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	Modal,
	OutlinedInput,
	Typography,
} from "@mui/material";

import Webcam from "react-webcam";

import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onCompararSelfies, onEnviarTokenSms } from "../../store/votante/votanteThunks";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	// width: "70rem",
	height: "auto",
	bgcolor: "background.paper",
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
	// height: "auto",
};
export const ModalCamara = ({
	statusModalCamara,
	handleCloseModalCamara,
	handleOpenModal,
	setIsOnModalToken,
}) => {
	const { statusVerificacion, selfieVerificada } = useSelector((state) => state.votante);
	const { username } = useSelector((state) => state.auth);
	const [foto, setfoto] = useState({
		status: false,
		data: null,
	});
	const [fileImage, setFileImage] = useState(null);
	const [page, setPage] = useState(0);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const webcamRef = useRef(null);
	const dispatch = useDispatch();

	const nextPage = () => setPage((p) => p + 1);
	const prevPage = () => setPage((p) => p - 1);

	useEffect(() => {
		if (selfieVerificada) {
			setPage(2);
			dispatch(onEnviarTokenSms(username));
			// ! DESACTIVAR EL IF EN COMENZARVOTACION
		}
	}, [selfieVerificada]);

	const cerrarCamaraAbrirToken = () => {
		setIsOnModalToken(true);
		handleCloseModalCamara();
		handleOpenModal();
	};

	const showImage = async () => {
		setfoto({ status: true, data: webcamRef.current.getScreenshot() });
		const blob = await convert(webcamRef.current.getScreenshot());
		const file = new File(
			[blob],
			`fileName${Math.floor(Math.random() * (90000 - 1) + 1)}.jpeg`,
			{
				type: "image/jpeg",
			}
		);

		setFileImage(file);
		console.log("FILE", file);
	};
	const newImage = () => {
		setfoto({ status: false, data: null });
	};

	const closeModalData = () => {
		handleCloseModalCamara();
		setfoto({
			status: false,
			data: null,
		});
	};

	const convert = async (base64Data) => {
		const base64 = await fetch(base64Data);
		const blob = await base64.blob();
		return blob;
	};

	const compararSelfies = () => {
		setIsSubmitted(true);
		dispatch(onCompararSelfies(fileImage, username, handleOpenModal));
	};

	return (
		<Modal
			open={statusModalCamara}
			onClose={closeModalData}
			sx={{ marginX: "1rem", zIndex: 9999 }}
			// hidden={true}
		>
			<Container maxWidth="lg" sx={style}>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					// justifyContent="center"
					height="auto"
					sx={{
						// pb: "2rem",
						px: { xs: "0.5rem", md: "2rem" },
						overflowY: "auto",
					}}
				>
					<Box>
						<Typography
							variant="h5"
							color="#323232"
							display="flex"
							justifyContent="center"
							align="center"
							mb="1rem"
						>
							{selfieVerificada ? "Identificación exitosa" : "Identificarme"}
						</Typography>
						{page === 1 ? (
							<Typography
								variant="body2"
								color="#323232"
								display="flex"
								justifyContent="center"
								mb="1rem"
								align="center"
							>
								{selfieVerificada
									? "Identificación exitosa"
									: "Procura que tu cara abarque todo el ovalo punteado"}
							</Typography>
						) : (
							<></>
						)}
					</Box>

					{page === 0 ? (
						<Box>
							<Typography
								variant="body1"
								color="#323232"
								display="flex"
								justifyContent="center"
								align="justify"
								mb="1rem"
							>
								A continuación deberás tomarte una selfie para compararla de nuevo
								con tu foto de credencial de lector, con el fin de que podamos
								asegurarnos de que la persona que está a punto de comenzar la
								votación seas realmente tú.
							</Typography>
						</Box>
					) : page === 1 ? (
						<>
							{statusVerificacion === "checking" ? (
								<Box py={3}>
									<CircularProgress />
								</Box>
							) : (
								<>
									<Grid container>
										<Grid item xs={12}>
											<Box
												width="auto"
												display="flex"
												justifyContent="center"
												justifyItems="center"
												// bgcolor="#323232"
												overflow="hidden"
											>
												{foto.status ? (
													<img src={foto.data} />
												) : (
													<>
														<Box
															marginTop="30px"
															height="270px"
															width="185px"
															position="absolute"
															// bgcolor="black"
															border="5px dashed"
															borderColor="#fed300"
															borderRadius="50%"
														></Box>
														<Webcam
															screenshotFormat="image/jpeg"
															audio={false}
															height={330}
															ref={webcamRef}
															videoConstraints={{
																facingMode: "user",
															}}
														/>
													</>
												)}
											</Box>
										</Grid>
									</Grid>
									<Box
										sx={{
											display: "flex",
											flexDirection: "row",
											width: "100%",
											pt: 1,
										}}
										justifyContent="center"
									>
										<Button
											variant="contained"
											sx={{ backgroundColor: "#3f51b5" }}
											onClick={foto.status ? newImage : showImage}
										>
											{foto.status ? "Tomar otra foto" : "Tomar foto"}
										</Button>
									</Box>
								</>
							)}
						</>
					) : page === 2 ? (
						<>
							<Box>
								<Typography
									variant="body1"
									color="#323232"
									display="flex"
									justifyContent="center"
									align="justify"
									mb="1rem"
								>
									Te has identificado correctamente. Hemos enviado un token de
									verificación a tu teléfono, el cual tendrás que ingresar en el
									siguiente paso.
								</Typography>
							</Box>
						</>
					) : (
						<></>
					)}
					{isSubmitted &&
					!selfieVerificada &&
					statusVerificacion !== "checking" &&
					page === 1 ? (
						<Box pt={2}>
							<Alert severity="error">
								Algo salió mal, intenta tomarte una foto más clara
							</Alert>
						</Box>
					) : (
						<></>
					)}

					{statusVerificacion === "checking" ? (
						<></>
					) : (
						<Box
							// height="10%"
							sx={{
								display: "flex",
								flexDirection: "row",
								pt: 4,
								width: "100%",
							}}
						>
							<Button
								color="error"
								variant="outlined"
								disabled={selfieVerificada && page === 2}
								onClick={page === 0 ? closeModalData : prevPage}
							>
								Regresar
							</Button>

							<Box sx={{ flex: "1 1 auto" }} />

							{selfieVerificada ? (
								<Button
									variant="contained"
									// disabled={!foto.status}
									onClick={cerrarCamaraAbrirToken}
								>
									Siguiente
								</Button>
							) : (
								<Button
									variant="contained"
									disabled={!foto.status && page === 1}
									onClick={page === 1 ? compararSelfies : nextPage}
								>
									{page === 1 ? "Identificarme" : "Siguiente"}
								</Button>
							)}
						</Box>
					)}
				</Box>
			</Container>
		</Modal>
	);
};
