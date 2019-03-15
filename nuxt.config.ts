// const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
const isDev = process.env.NODE_ENV !== "production";
export default {
  mode: "spa",
  modern: isDev ? false : "client",
  devtools: isDev,
  devtool: 'eval-source-map',
  parallel: true,
  extractCSS: true,
  /*
   ** Headers of the page
   */
  head: {
    title: "SkyScraper",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "canonical", href: "https://skyscraper.ai/", id: "canonical" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content: `Meet the Swiss-army knife of radio capture and analysis.`,
      },
      { name: "Content-Type", content: "text/html; charset=utf-8" },

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
  ],
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
    transpile: ["vuetify/lib"],
    // plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/app.styl", "~assets/style/variables.styl"],
      },
    },
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
