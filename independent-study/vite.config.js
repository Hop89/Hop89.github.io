import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // User/organization sites (repo named <user>.github.io) should use "/".
  base: "/",
});
