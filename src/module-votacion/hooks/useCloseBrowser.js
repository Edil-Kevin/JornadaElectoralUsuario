import React, { useEffect, useState } from "react";

export const useCloseBrowser = (message = "Estas seguro?") => {
	useEffect(() => {
		window.onbeforeunload = () => message;

		return () => {
			window.onbeforeunload = null;
		};
	}, [isDirty]);

	// const routerPrompt = <Prompt when />;

	return <div>useCloseBrowser</div>;
};
