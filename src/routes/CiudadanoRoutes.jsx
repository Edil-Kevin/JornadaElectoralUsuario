import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../module-auth/routes/AuthRoutes";
import { AppBarCustom } from "../module-home/components/AppBarCustom";
import { Topbar } from "../module-home/components/Topbar";
import { HomeRoutes } from "../module-home/routes/HomeRoutes";

export const CiudadanoRoutes = () => {
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
					<AppBarCustom />
					{/* <Topbar /> */}
					<Routes>
						<Route path="/*" element={<HomeRoutes />} />
						{/* <ResultadosRoutes /> */}
						{/* <VerificacionRoutes /> */}
					</Routes>
				</main>
			</div>
		</>
	);
};
