const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

const isDev = process.env.NODE_ENV !== "production";
export default {
  mode: "spa",
  modern: isDev ? false : "client",
  devtools: isDev,
  devtool: "eval-source-map",
  manifest: {
    name: "SkyScraper",
    short_name: "SkyScraper"
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "SkyScraper | Unlock the spectrum.",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "canonical", href: "https://skyscraper.ai/", id: "canonical" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content: `Radios power our world. The data that surrounds us is
        valuable and untapped. Exploding radio usage and complex protocols make
        analysis difficult. SkyScraper transforms static into priceless data.`,
      },
      { name: "Content-Type", content: "text/html; charset=utf-8" },
      { name: "og:title", property: "og:title", content: "SkyScraper - Unlock the spectrum." },
      { name: "og:url", property: "og:url", content: "https://skyscraper.ai" },
      { name: "og:site_name", property: "og:site_name", content: "SkyScraper" },
      { name: "og:image", property: "og:image", content: "https://skyscraper.ai/img/og-banner.png" },
      {
        name: "og:description",
        property: "og:description",
        content: "Radios power our world. The data that surrounds us is valuable and untapped. Exploding radio usage and complex protocols make analysis difficult. SkyScraper transforms static into priceless data."
      },
      { itemprop: "name", content: "SkyScraper" },
      { itemprop: "url", content: "https://skyscraper.ai" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.styl"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "@/plugins/vuetify", ssr: false },
    { src: "@/plugins/scrollto", ssr: false },
    { src: "@/plugins/socketio", ssr: false },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "nuxt-logrocket",
  ],
  // module options
  logRocket: {
    logRocketId: "oswcej/sibyl-landing",
    devModeAllowed: false
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    transpile: ["vuetify/lib"],
    loaders: {
      stylus: {
        import: ["~assets/style/app.styl", "~assets/style/variables.styl"],
      },
    },
    plugins: [new MomentLocalesPlugin()],
    /*
     ** You can extend webpack config here
     */
    extend(config: any, ctx: any) {
      // Use raw-loader
      config.module.rules.push({
        test: /\.aes$/i,
        use: "raw-loader",
      });
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        // config.module.rules.push({
        //   enforce: "pre",
        //   test: /\.(js|vue)$/,
        //   loader: "eslint-loader",
        //   exclude: /(node_modules)/,
        // });
      }
    },
  },
};
