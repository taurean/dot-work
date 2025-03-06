// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://taurean.work",
  output: "server",
  adapter: vercel(),
  integrations: [react()],
});