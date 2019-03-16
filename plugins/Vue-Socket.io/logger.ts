/**
 * shitty logger class
 */
export class VueSocketIOLogger {
  private prefix: string;
  private debug: boolean;

  constructor() {
    this.debug = false;
    this.prefix = "%cVue-Socket.io: ";
  }

  public info(text: string, data = "") {
    if (this.debug) {
      window.console.info(this.prefix + `%c${text}`,
        "color: blue; font-weight: 600", "color: #333333", data);
    }
  }

  public error() {
    if (this.debug) {
      window.console.error(this.prefix, ...arguments);
    }
  }

  public warn() {
    if (this.debug) {
      window.console.warn(this.prefix, ...arguments);
    }

  }

  public event(text: string, data = "") {
    if (this.debug) {
      window.console.info(this.prefix + `%c${text}`,
        "color: blue; font-weight: 600", "color: #333333", data);
    }
  }
}

export default new VueSocketIOLogger();
