import Emitter = SocketIOClient.Emitter;

export default class VueSocketIOListener {
  /**
   * socket.io-client reserved event keywords
   * @type {string[]}
   */
  public static staticEvents = [
    "connect",
    "error",
    "disconnect",
    "reconnect",
    "reconnect_attempt",
    "reconnecting",
    "reconnect_error",
    "reconnect_failed",
    "connect_error",
    "connect_timeout",
    "connecting",
    "ping",
    "pong",
  ];
  private io: any;
  private emitter: SocketIOClient.Emitter;

  constructor(io: any, emitter: Emitter) {
    this.io = io;
    this.register();
    this.emitter = emitter;
  }

  /**
   * Listening all socket.io events
   */
  public register() {
    this.io.onevent = (packet: { data: [any, ...any[]] }) => {
      const [event, ...args] = packet.data;

      if (args.length === 1) {
        this.onEvent(event, args[0]);
      } else {
        this.onEvent(event, args);
      }
    };
    VueSocketIOListener.staticEvents.forEach((event) =>
      this.io.on(event, (args: any) => this.onEvent(event, args))
    );
  }

  /**
   * Broadcast all events to vuejs environment
   */
  public onEvent(event: string, args: any) {
    this.emitter.emit(event, args);
  }
}
