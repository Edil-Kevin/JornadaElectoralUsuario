import {
	Box,
	Button,
	Grid,
	Modal,
	Typography,
} from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: { xl: "50rem", lg: "50rem", sm: "40rem", xs: "30rem" },
	height: { xl: "25rem", lg: "25rem", sm: "37rem", xs: "45rem" },
	bgcolor: "background.paper",
	border: '2px solid #fff',
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
};

export const ModalBoleta = ({ statusModal, handleToggleModal }) => {
	const onCancel = () => {
		handleToggleModal();
	};

	return (
		<Modal
			open={statusModal}
			onClose={handleToggleModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>

				<Typography id="modal-modal-title" variant= "h4"  color="initial" align="center" mr={5} ml={5} mb={2}>
                    BOLETA
				</Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Button 
                        onClick={onCancel}
                        startIcon={<ReplyIcon />}
                        sx={{
                            backgroundColor: "#511079",
                            color: "#fff",
                            fontSize: {
                                xl: "0.9rem",
                                lg: "0.9rem",
                                sm: "0.9rem",
                                xs: "0.9Srem",
                            },
                            textAlign: "center",
                            // width: "10rem",
                            width: {
                                xs: "100%",
								sm: "80%",
								md: "50%",
								lg: "25%",
								xl: "25%",
                            },
                            height: "2.5rem",
                            "&:hover": {
                                // background: "linear-gradient(45deg, #7E328B 30%, #7E328B 90%)",
                                // color: "#FFFFFF",
                                color: "#511079",
                                // boxShadow: "9px 10px 4px rgba(0, 0, 0, 0.37)",
                                // transform: "translate(-2px, -2px)",
                                // transition: "all 0.5s ease",
                            },
                        }}>
                        Regresar
                    </Button>
                </Box>
			</Box>
		</Modal>
	);
};
