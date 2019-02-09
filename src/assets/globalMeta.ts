import { MetaInfo } from "vue-meta";

const globalMeta: MetaInfo = {
  titleTemplate: "%s | Sibyl Vision",
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "description", content: "Radios power our digital world. " +
        "The data that surrounds us is valuable and untapped. SkyScraper transforms static into priceless data."  },
    { name: "Content-Type", content: "text/html; charset=utf-8" },


  ],
  link: [
    { rel: "canonical", href: "https://sibylvision.com/" },
  ],
  script: [
    // { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js', async: true, defer: true }
  ],
};

export default globalMeta;
