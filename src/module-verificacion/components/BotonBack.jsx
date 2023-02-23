import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";



export const BotonBack = ({ url = "" }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(url);
  };

  return (
    <Button
      type="submit"
    //   className={styles.boton}
    borderRadius="10px"
      variant="contained"
      color="primary"
    //   style={styleButton}
      onClick={onClick}
      sx={{
        mt: 2,
        width: { sm: `150px`, xs: "150px" },
      }}
    >
      <ReplyAllIcon />
      Regresar
    </Button>
  );
};
