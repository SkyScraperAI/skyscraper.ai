import NuxtConfigration from "@nuxt/config";

const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const isDev = process.env.NODE_ENV !== "production";

const config: NuxtConfigration = {
  mode: "spa",
  modern: isDev ? false : "client",
  manifest: {
    name: "SkyScraper",
    short_name: "SkyScraper",
  },
  env: {
    apiServer: process.env.API_ENDPOINT
      ? process.env.API_ENDPOINT
      : "http://127.0.0.1:9090",
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "SkyScraper | Unlock the spectrum.",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content: "SkyScraper transforms static into priceless data.",
      },
      { name: "Content-Type", content: "text/html; charset=utf-8" },
      {
        name: "og:title",
        property: "og:title",
        content: "SkyScraper - Unlock the spectrum.",
      },
      { name: "og:url", property: "og:url", content: "https://skyscraper.ai" },
      { name: "og:site_name", property: "og:site_name", content: "SkyScraper" },
      {
        name: "og:image",
        property: "og:image",
        content: "https://skyscraper.ai/img/og-banner.png",
      },
      {
        name: "og:description",
        property: "og:description",
        content: "SkyScraper transforms static into priceless data.",
      },
      { itemprop: "name", content: "SkyScraper" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.styl", "@mdi/font/css/materialdesignicons.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "@/plugins/scrollto", ssr: false },
    { src: "@/plugins/socketio", ssr: false },
    { src: "@/plugins/segment", ssr: false },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/pwa",
    "nuxt-logrocket",
    "@nuxtjs/vuetify",
    "@nuxtjs/webpackmonitor",
  ],
  vuetify: {
    materialIcons: false,
    treeShake: true,
    css: false,
    theme: {
      primary: "#2c303a",
    },
    customProperties: true,
    iconfont: "mdi",
  },
  // module options
  logRocket: {
    logRocketId: "oswcej/sibyl-landing",
    devModeAllowed: false,
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    transpile: [/^vuetify/],
    plugins: [new MomentLocalesPlugin()],
    /*
     ** You can extend webpack config here
     */
    extend(c: any) {
      // Use raw-loader
      c.module.rules.push({
        test: /\.aes$/i,
        use: "raw-loader",
      });
    },
  },
};

export default config;
