import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const purpleTheme = createTheme({
	palette: {
		base: {
			main: "#f8f7f3",
			contrastText: "#323232",
		},
		darkButton: {
			main: "#323232",
			dark: "#388452",
			light: "blue",
			contrastText: "#f8f7f3",
		},
		baseButton: {
			main: "#f8f7f3",
			dark: "#f8f7f3",
			light: "#f8f7f3",
			contrastText: "#f8f7f3",
		},
		primary: {
			main: "#543884", //7e328b
		},
		secondary: {
			main: "#543884",
		},
		error: {
			main: red.A700,
		},
		linearProgress: {
			main: "#fed300",
		},
	},
});
