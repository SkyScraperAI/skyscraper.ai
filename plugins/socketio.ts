import Vue from "vue";
import VueSocket from "./Vue-Socket.io";

interface INuxtApp {
  app: any;
}

export default ({ app: { store } }: INuxtApp) => {
  const socketIo = new VueSocket({
    connection: "https://api.openmhz.com",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  });
  Vue.use(socketIo);

  return socketIo;
};

