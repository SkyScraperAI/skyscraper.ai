import {IOpenMHzResponse, IOpenMHzTalkgroupResponse, IOpenMHzTalkgroups} from "@/types/openmhz";
import axios from "axios";
import {sortBy} from "lodash";

const MAX_STORED_TX = 4;
export const state = () => {
  return {
    messages: [] as IOpenMHzResponse[],
    talkgroups: {} as unknown as IOpenMHzTalkgroups,
    system: "wmata",
    systemName: "Washington Metro Transit Authority",
    systemType: "Motorola Type II Smartnet",
    systemVoice: "Analog and APCO-25 Common Air Interface",
    systemLocation: "Washington, DC",
    passphrase: undefined,
  };
};
export const mutations = {
  ADD_MESSAGE: (s: { messages: any[]; }, payload: any) => {
    if (s.messages.length >= MAX_STORED_TX) {
      const oldestMessage = s.messages[0];
      const sorted = sortBy(
        s.messages.slice(1, MAX_STORED_TX),
        (m) => new Date(m.time),
      );
      sorted.shift();
      sorted.push(payload);
      s.messages = [oldestMessage, ...sorted];
    } else {
      s.messages.push(payload);
    }
  },
  SET_TALKGROUPS: (s: { talkgroups: any; }, payload: any) => {
    s.talkgroups = payload;
  },
  SET_PASSPHRASE: (s: { passphrase: any; }, payload: any) => {
    s.passphrase = payload;
  },
};
export const getters = {
  MESSAGES: (s: { messages: any; }) => {
    return s.messages;
  },
  TALKGROUPS: (s: { talkgroups: any; }) => s.talkgroups,
  SYSTEM: (s: { system: any; }) => s.system,
  SYSTEM_NAME: (s: { systemName: any; }) => s.systemName,
  SYSTEM_TYPE: (s: { systemType: any; }) => s.systemType,
  SYSTEM_VOICE: (s: { systemVoice: any; }) => s.systemVoice,
  SYSTEM_LOCATION: (s: { systemLocation: any; }) => s.systemLocation,
  ACTIVE_TX: (s: { messages: any[]; }) => s.messages[0],
  PASSPHRASE: (s: { passphrase: any; }) => s.passphrase,
};
export const actions = {
  "SOCKET_new message"(ctx:
                         {
                           state: { talkgroups: {}; }; getters: { TALKGROUPS: any[]; };
                           commit: (arg0: string, arg1: IOpenMHzResponse) => void;
                         },
                       payload: string) {
    const message = JSON.parse(payload) as IOpenMHzResponse;
    if (Object.keys(ctx.state.talkgroups).length > 0) {
      const tg = ctx.getters.TALKGROUPS[message.talkgroupNum];
      if (tg) {
        message.talkgroup = tg;
        ctx.commit("ADD_MESSAGE", message);
      }
    }
  },
  "SHIFT_MESSAGES"(ctx: { state: { messages: { shift: () => void; }; }; }) {
    ctx.state.messages.shift();
  },
  "FETCH_TALKGROUPS"(ctx: { state: { system: any; }; commit: (arg0: string, arg1: IOpenMHzTalkgroups) => void; }) {
    axios({
      url: `https://api.openmhz.com/${ctx.state.system}/talkgroups`,
      method: "get",
    }).then((response) => {
      if (response.status === 200) {
        const tgs = (response.data as IOpenMHzTalkgroupResponse).talkgroups;
        ctx.commit("SET_TALKGROUPS", tgs);
      }
    });
  },
};

