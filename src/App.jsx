import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getToken } from "./providers/Micro-Auth/configAuth";
import { AppRouter } from "./router/AppRouter";
import { onLogin } from "./store/auth/authSlice";
import "./styles/generalContainer.css";
import { AppTheme } from "./theme/AppTheme";

function App() {
	return (
		<AppTheme>
			<AppRouter />
		</AppTheme>
	);
}

export default App;
