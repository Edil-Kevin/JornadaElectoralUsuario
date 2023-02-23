import { Box, TextField, Typography } from "@mui/material";
import React from "react";

export const ReenvioEmail = () => {
  return (
    <Box display={"flex"} width="100%" justifyContent={"center"}>
      <Box
        width="90%"
        height={"200px"}
        sx={{ boxShadow: 3, mt: 5, background: "#fff", pt: 3 }}
      >
        <Typography
          textAlign={"center"}
          sx={{
            fontSize: { lg: "22px", md: "18px", xs: "15px" },
            fontWeight: "bold",
          }}
        >
          Reenvio de Email
        </Typography>

        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Box>
    </Box>
  );
};
