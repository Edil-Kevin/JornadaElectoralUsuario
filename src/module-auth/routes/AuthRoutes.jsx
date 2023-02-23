import { Route, Routes } from "react-router-dom";
import { AppBarCustom } from "../../module-home/components/AppBarCustom";
import { AppBarAuth } from "../components/AppBarAuth";
import { EstablecerContrasenia } from "../pages/EstablecerContrasenia";
import { LoginVotacionPage } from "../pages/LoginVotacionPage";
import { ReenviarToken } from "../pages/ReenviarToken";
import { RestablecerContrasenia } from "../pages/RestablecerContrasenia";
import { SuccessPage } from "../pages/SuccessPage";
import { TokenRenviadoExito } from "../pages/TokenRenviadoExito";

export const AuthRoutes = () => {
	return (
		<>
			<div className="app">
				<main
					className="content"
					style={{
						display: "flex",
						flexDirection: "column",
						backgroundColor: "#f8f7f3",
						// overflowX: "hidden",
						backgroundImage:
							"repeating-radial-gradient( circle at 0 0, transparent 0, #fafaf7 120px ), repeating-linear-gradient( #efefef55, #efefef )",
					}}
				>
					<AppBarAuth />
					{/* <Topbar /> */}
					<Routes>
						<Route path="login" element={<LoginVotacionPage />} />
						<Route
							path="establecerPassword/:token"
							element={<EstablecerContrasenia />}
						/>
						<Route path="success" element={<SuccessPage />} />
						<Route path="reenviarToken" element={<ReenviarToken />} />
						<Route path="succesToken" element={<TokenRenviadoExito />} />
						<Route path="restablecer" element={<RestablecerContrasenia />} />
					</Routes>
				</main>
			</div>
		</>
	);
};
