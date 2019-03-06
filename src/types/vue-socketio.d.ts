import Vue from "vue";
import { Socket } from "socket.io";

declare module "vue/types/vue" {
  interface Vue {
    sockets: any;
    $socket: Socket;
    $avAudioRefs: any;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    sockets?: any;
  }
}
