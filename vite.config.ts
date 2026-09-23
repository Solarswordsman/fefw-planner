/// <reference types="vitest/config" />
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	// Served from the site root on Netlify; no sub-path needed.
	base: "/",
	test: {
		// The tested modules (the tested modules) are pure — no DOM needed.
		environment: "node",
	},
});
