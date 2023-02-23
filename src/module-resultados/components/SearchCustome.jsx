import { Box, InputAdornment, TextField } from "@mui/material";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import React from "react";

export const SearchCustome = ({
  name = "",
  buscador = "",
  handleSearch = () => {},
}) => {
  return (
    <Box>
      <TextField
        sx={{
          width: { xl: "350px", md: "300px", xs: "100%" },
        }}
        value={buscador}
        onChange={handleSearch}
        id="outlined-basic"
        label="Buscador"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ScreenSearchDesktopIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
