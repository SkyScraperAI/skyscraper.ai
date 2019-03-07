import { MetaInfo } from "vue-meta";

const globalMeta: MetaInfo = {
  titleTemplate: "%s | Unlocking the Spectrum",
  htmlAttrs: {
    lang: "en",
  },
  meta: [
    { name: "canonical", href: "https://skyscraper.ai/", id: "canonical" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content: `Meet the Swiss-army knife of radio capture and analysis.`,
    },
    { name: "Content-Type", content: "text/html; charset=utf-8" },
  ],
  script: [
    // { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js', async: true, defer: true }
  ],
};

export default globalMeta;
