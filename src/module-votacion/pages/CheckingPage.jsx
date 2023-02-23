import { Box, Typography } from "@mui/material";
import React from "react";
import styles from "../styles/checking.module.css";

export const CheckingPage = () => {
	return (
		<Box
			display="flex"
			flexDirection="center"
			justifyContent="center"
			alignContent="center"
			height="100%"
			width="100%"
		>
			{/* <Typography
				variant="h6"
				color="initial"
				className={`${styles.loader}`}
				align="center"
				display="flex"
				flexDirection="center"
				justifyContent="center"
				alignContent="center"
				top="50%"
			></Typography> */}
			<Box className={`${styles.loader}`} top="45%"></Box>
		</Box>
	);
};
