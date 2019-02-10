import { IOpenMHzResponse, IOpenMHzTalkgroupResponse, IOpenMHzTalkgroups } from "@/types/openmhz";
import axios from "axios";
import { sortBy } from "lodash";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import VuexPersistence from "vuex-persist";

const MAX_STORED_TX = 4;

Vue.use(Vuex);

export interface IRootState {
  messages: IOpenMHzResponse[];
  talkgroups: IOpenMHzTalkgroups;
  system: string;
  systemName: string;
  systemType: string;
  systemVoice: string;
  systemLocation: string;
}

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
});

const store: StoreOptions<IRootState> = {
  state: {
    messages: [] as IOpenMHzResponse[],
    talkgroups: {} as IOpenMHzTalkgroups,
    system: "wmata",
    systemName: "Washington Metro Transit Authority",
    systemType: "Motorola Type II Smartnet",
    systemVoice: "Analog and APCO-25 Common Air Interface",
    systemLocation: "Washington, DC",
  },
  mutations: {
    ADD_MESSAGE: (state, payload) => {
      if (state.messages.length >= MAX_STORED_TX) {
        const oldestMessage = state.messages[0];
        const sorted = sortBy(state.messages.slice(1, MAX_STORED_TX), (m) => new Date(m.time));
        sorted.shift();
        sorted.push(payload);
        state.messages = [oldestMessage, ...sorted];
      } else {
        state.messages.push(payload);
      }
    },
    SET_TALKGROUPS: ((state, payload) => {
      state.talkgroups = payload;
    }),
  },
  getters: {
    MESSAGES: (state) => {
      return state.messages;
    },
    TALKGROUPS: (state) => state.talkgroups,
    SYSTEM: (state) => state.system,
    SYSTEM_NAME: (state) => state.systemName,
    SYSTEM_TYPE: (state) => state.systemType,
    SYSTEM_VOICE: (state) => state.systemVoice,
    SYSTEM_LOCATION: (state) => state.systemLocation,
    ACTIVE_TX: (state) => state.messages[0],
  },
  actions: {
    "SOCKET_new message"(ctx, payload) {
      const message = JSON.parse(payload) as IOpenMHzResponse;
      if (Object.keys(ctx.state.talkgroups).length > 0) {
        const tg = ctx.getters.TALKGROUPS[message.talkgroupNum];
        if (tg) {
          message.talkgroup = tg;
          ctx.commit("ADD_MESSAGE", message);
        }
      }
    },
    "SHIFT_MESSAGES"(ctx) {
      ctx.state.messages.shift();
    },
    "FETCH_TALKGROUPS"(ctx) {
      axios({
        url: `https://api.openmhz.com/${ ctx.state.system }/talkgroups`,
        method: "get",
      })
        .then((response) => {
          if (response.status === 200) {
            const tgs = (response.data as IOpenMHzTalkgroupResponse).talkgroups;
            ctx.commit("SET_TALKGROUPS", tgs);
          }
        });
    },
  },
  plugins: [vuexLocal.plugin],
};

export default new Vuex.Store<IRootState>(store);

