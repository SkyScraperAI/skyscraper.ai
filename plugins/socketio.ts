const VueSocketIO = require("vue-socket.io");
import Vue from "vue";
import { Store } from "vuex";

export const socketAndStore = (store: Store<any>) => {
    const socketIo = new VueSocketIO({
        connection: "https://api.openmhz.com",
        vuex: {
            store,
            actionPrefix: "SOCKET_",
            mutationPrefix: "SOCKET_",
        },
    });

    Vue.use(socketIo);
};

