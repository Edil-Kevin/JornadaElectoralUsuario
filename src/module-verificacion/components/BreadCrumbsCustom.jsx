import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";


export const BreadCrumbsCustom = ({ routes = [], currentRoute = "" }) => {

  const breadcrumbs = routes.map((route) => (
    <Link key={route.name} underline="hover" to={route.url}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {route.name === "VERIFICACIÓN" && (
          <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
        )}
        <Typography sx={{ fontSize: { md: "17px", xs: "13px" } }}>
          {route.name}
        </Typography>
      </Box>
    </Link>
  ));

  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pl: 1,
        width: "100%",
        mb: 2,
        mt: { xl: 2, md: 0, xs: 0 },
      }}
    >
      <Breadcrumbs maxItems={2} separator={<NavigateNextIcon />} aria-label="breadcrumb">
        {breadcrumbs}
        <Typography
          sx={{
            fontWeight: "",
            color: "#511079",
            fontSize: { md: "16px", xs: "12px" },
            fontFamily: "'Kanit', sans-serif",
          }}
          key="3"
          color="text.primary"
        >
          {currentRoute}
        </Typography>
      </Breadcrumbs>
    </Stack>
  );
};
