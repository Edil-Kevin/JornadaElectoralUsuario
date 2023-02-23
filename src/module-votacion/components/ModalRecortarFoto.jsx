import {
	Box,
	Button,
	Container,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	Modal,
	OutlinedInput,
	Typography,
} from "@mui/material";
// import "cropperjs/src/css/cropper.css";
import "cropperjs/dist/cropper.css";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import React from "react";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	// width: "70rem",
	height: "90%",
	bgcolor: "background.paper",
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
	// height: "auto",
};

export const ModalRecortarFoto = ({
	statusModalRecorte,
	handleCloseModalRecorte,
	imagenes,
	setImagenes,
	refImagen,
	setRefVisible,
	handleCrop,
	rotateLeft,
	rotateRight,
}) => {
	return (
		<Modal
			open={statusModalRecorte}
			onClose={handleCloseModalRecorte}
			sx={{ marginX: "1rem", zIndex: 9999 }}
			// hidden={true}
		>
			<Container maxWidth="lg" sx={style}>
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					// justifyContent="center"
					height="100%"
					sx={{
						p: "2rem",
						// overflowY: "auto",
					}}
				>
					<Box>
						<Typography
							variant="h5"
							color="#323232"
							display="flex"
							justifyContent="center"
							align="justify"
							mb="2rem"
						>
							Verificar mi cuenta
						</Typography>
					</Box>
					<Grid container height="100%">
						<Grid item xs={12}>
							<Box height="100%" bgcolor="#323232" overflow="hidden">
								{/* <div> */}
								<img
									src=""
									style={{
										display: "block",
										width: "auto",
										maxWidth: "100%",
										height: "auto",
										// maxHeight: "100%",
									}}
									className="img-cropper"
									id="img-cropper"
									ref={(el) => {
										refImagen.current = el;
										setRefVisible(!!el);
									}}
								/>
								{/* </div> */}
							</Box>
						</Grid>
						{/* <Grid item xs={12}></Grid> */}
					</Grid>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							width: "100%",
							pt: 1,
						}}
						justifyContent="space-evenly"
					>
						<Button
							variant="contained"
							sx={{ backgroundColor: "#3f51b5" }}
							onClick={rotateLeft}
						>
							<RotateLeftIcon color="white" />
						</Button>

						<Button
							variant="contained"
							sx={{ backgroundColor: "#3f51b5" }}
							onClick={rotateRight}
						>
							<RotateRightIcon color="white" />
						</Button>
					</Box>
					<Box
						// height="10%"
						sx={{
							display: "flex",
							flexDirection: "row",
							// pt: 4,
							width: "100%",
						}}
					>
						<Button
							color="error"
							variant="outlined"
							onClick={() => {
								setImagenes({
									...imagenes,
									[imagenes.current]: { name: "" },
									current: "",
								});
								handleCloseModalRecorte();
							}}
						>
							Regresar
						</Button>

						<Box sx={{ flex: "1 1 auto" }} />

						<Button
							variant="contained"
							// type="submit"
							onClick={() => {
								handleCloseModalRecorte();
								handleCrop();
							}}
						>
							Cortar
						</Button>
					</Box>
				</Box>
			</Container>
		</Modal>
	);
};
