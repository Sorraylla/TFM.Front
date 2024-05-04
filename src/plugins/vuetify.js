// src/plugins/vuetify.js
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";

export default createVuetify({
	theme: {
		defaultTheme: "light",
		themes: {
			light: {
				colors: {
					primary: "#382b54", // Ejemplo de color Verde para el primario
					secondary: "#7156a8", // Ejemplo de color Naranja para el secundario
				},
			},
		},
	},
});
