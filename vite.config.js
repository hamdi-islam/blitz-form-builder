import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import dts from "vite-plugin-dts";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsConfigPaths(), dts({ rollupTypes: true })],
    build: {
        lib: {
            entry: resolve(__dirname, "lib/main.ts"),
            name: "blitz-form-builder",
            // the proper extensions will be added
            fileName: "blitz-form-builder",
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: "react",
                    "react-dom": "react-dom",
                    "react/jsx-runtime": "react/jsx-runtime",
                },
            },
        },
    },
});
