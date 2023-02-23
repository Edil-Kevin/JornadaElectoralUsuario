import { Route, Routes } from "react-router-dom";
import { AppBarAuth } from "../../module-auth/components/AppBarAuth";
import { AppBarCustom } from "../../module-home/components/AppBarCustom";
import { AppBarVotacion } from "../components/AppBarVotacion";
import { Boletas } from "../pages/Boletas";
import { EditarBoleta } from "../pages/EditarBoleta";
import { EditarPapeleta } from "../pages/EditarPapeleta";
import { FinalPapeletas } from "../pages/FinalPapeletas";
import { Folios } from "../pages/Folios";
import { InicioVotante } from "../pages/InicioVotante";
import { Papeletas } from "../pages/Papeletas";
import { Prueba } from "../pages/Prueba";
import { RespuestasPapeletas } from "../pages/RespuestasPapeletas";
import { TiempoAgotado } from "../pages/TiempoAgotado";
import { VotosRegistrados } from "../pages/VotosRegistrados";

const statusVotante = "votando";

export const VotacionRoutes = () => {
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
					{statusVotante === "votando" ? <AppBarVotacion /> : <AppBarCustom />}

					{/* <Topbar /> */}
					<Routes>
						<Route path="prueba" element={<Prueba />} />
						<Route path="inicio" element={<InicioVotante />} />
						<Route path="boletas" element={<Boletas />} />
						<Route path="tiempoAgotado" element={<TiempoAgotado />} />
						<Route path="votosRegistrados" element={<VotosRegistrados />} />
						<Route path="folios" element={<Folios />} />
						<Route path="editarBoleta/:noBoleta" element={<EditarBoleta />} />
						<Route path="papeletas" element={<Papeletas />} />
						<Route path="finalPapeletas" element={<FinalPapeletas />} />
						<Route path="respuestasPapeletas" element={<RespuestasPapeletas />} />
						<Route path="editarPapeleta/:noPapeleta" element={<EditarPapeleta />} />
					</Routes>
				</main>
			</div>
		</>
	);
};
