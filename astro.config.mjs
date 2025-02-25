// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
    site: "https://taurean.work",
    output: "server",
    adapter: vercel(),
});
