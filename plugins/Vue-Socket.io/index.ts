import Listener from "./listener";
import Emitter from "./emitter";
import SocketIO from "socket.io-client";

interface IConstructorArgs {
  connection: string;
  vuex: any;
  debug?: boolean;
  options?: any;
}

export default class VueSocketIO {
  public listener: Listener;
  private io: any;
  private readonly emitter?: any;

  /**
   * lets take all resource
   * @param io
   * @param vuex
   * @param debug
   * @param options
   */
  constructor({ connection, vuex, options }: IConstructorArgs) {
    this.io = this.connect(connection, options);
    this.emitter = new Emitter(vuex);
    this.listener = new Listener(this.io, this.emitter);
  }

  /**
   * Vue.js entry point
   * @param Vue
   */
  public install(Vue: any) {
    Vue.prototype.$socket = this.io;
    Vue.prototype.$vueSocketIo = this;
    // Vue.mixin(Mixin);
  }

  /**
   * registering SocketIO instance
   * @param connection
   * @param options
   */
  public connect(
    connection: string,
    options: SocketIOClient.ConnectOpts | undefined
  ) {
    if (connection && typeof connection === "object") {
      return connection;
    } else if (typeof connection === "string") {
      return (this.io = SocketIO(connection, options));
    } else {
      throw new Error("Unsupported connection type");
    }
  }
}
