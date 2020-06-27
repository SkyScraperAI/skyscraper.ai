import Logger from "./logger";

export default class EventEmitter {
  private readonly store: any;
  private readonly actionPrefix: string;
  private readonly mutationPrefix: string;
  private listeners: Map<any, any>;

  constructor(vuex: any) {
    Logger.info(vuex ? "Vuex adapter enabled" : "Vuex adapter disabled");
    Logger.info(
      vuex.mutationPrefix
        ? "Vuex socket mutations enabled"
        : "Vuex socket mutations disabled"
    );
    Logger.info(
      vuex ? "Vuex socket actions enabled" : "Vuex socket actions disabled"
    );
    this.store = vuex.store;
    this.actionPrefix = vuex.actionPrefix ? vuex.actionPrefix : "SOCKET_";
    this.mutationPrefix = vuex.mutationPrefix;
    this.listeners = new Map();
  }

  /**
   * register new event listener with vue.js component instance
   * @param event
   * @param callback
   * @param component
   */
  public addListener(
    event: any,
    callback: any,
    component: { $options: { name: any } }
  ) {
    if (typeof callback === "function") {
      if (!this.listeners.has(event)) {
        this.listeners.set(event, []);
      }
      this.listeners.get(event).push({ callback, component });
      Logger.info(`#${event} subscribe, component: ${component.$options.name}`);
    } else {
      throw new Error("callback must be a function");
    }
  }

  /**
   * remove a listenler
   * @param event
   * @param component
   */
  public removeListener(event: any, component: { $options: { name: any } }) {
    if (this.listeners.has(event)) {
      const listeners = this.listeners
        .get(event)
        .filter(
          (listener: { component: { $options: { name: any } } }) =>
            listener.component !== component
        );

      if (listeners.length > 0) {
        this.listeners.set(event, listeners);
      } else {
        this.listeners.delete(event);
      }

      Logger.info(
        `#${event} unsubscribe, component: ${component.$options.name}`
      );
    }
  }

  /**
   * broadcast incoming event to components
   * @param event
   * @param args
   */
  public emit(event: string, args: string | undefined) {
    if (this.listeners.has(event)) {
      Logger.info(`Broadcasting: #${event}, Data:`, args);
      this.listeners
        .get(event)
        .forEach(
          (listener: {
            callback: { call: (arg0: any, arg1: string | undefined) => void };
            component: any;
          }) => {
            listener.callback.call(listener.component, args);
          }
        );
    }

    if (event !== "ping" && event !== "pong") {
      this.dispatchStore(event, args);
    }
  }

  /**
   * dispatching vuex actions
   * @param event
   * @param args
   */
  public dispatchStore(event: string, args: string | undefined) {
    if (this.store && this.store._actions) {
      const prefixedEvent = this.actionPrefix + event;
      for (const key of Object.keys(this.store._actions)) {
        const action = key.split("/").pop();
        if (action === prefixedEvent) {
          Logger.info(`Dispatching Action: ${key}, Data:`, args);
          this.store.dispatch(key, args);
        }
      }

      if (this.mutationPrefix) {
        const prefixed = this.mutationPrefix + event;
        for (const key of Object.keys(this.store._mutations)) {
          const mutation = key.split("/").pop();
          if (mutation === prefixed) {
            Logger.info(`Commiting Mutation: ${key}, Data:`, args);
            this.store.commit(key, args);
          }
        }
      }
    }
  }
}
