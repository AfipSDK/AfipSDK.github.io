import db from "@astrojs/db";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import simpleStackForm from "simple-stack-form";
import { defineConfig } from "astro/config";
import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
  site: "https://afipsdk.com",
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "github-dark-dimmed",
      },
      gfm: true,
    }),
    icon(),
    sitemap(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    db(),
    simpleStackForm(),
    partytown({
			config: {
			  forward: ["dataLayer.push"],
			},
		}),
  ],
  output: "static",
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      theme: 'monokai',
      // Alternatively, provide multiple themes
      // https://shiki.style/guide/dual-themes
      // themes: {
      //   light: 'github-light',
      //   dark: 'github-dark',
      // },
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://shiki.style/languages
      // Enable word wrap to prevent horizontal scrolling
      // wrap: true,
      // Add custom transformers: https://shiki.style/guide/transformers
      // Find common transformers: https://shiki.style/packages/transformers
      // transformers: [],
    },
  },
});
