<template>
  <v-card style="max-height: 480px !important;">
    <v-card-title id="player-title" class="red darken-2 white--text subheading">
      <v-layout align-center>
        <v-flex shrink>
          <v-btn
            :aria-label="isPlaying ? 'Pause' : 'Play'"
            :disabled="!activeTx"
            class="mr-4 white"
            fab
            small
            @click="playToggleClicked()"
          >
            <v-icon v-if="!isPlaying">
              mdi-play
            </v-icon>
            <v-icon v-else>
              mdi-pause
            </v-icon>
          </v-btn>
        </v-flex>
        <v-flex pa-0>
          <v-layout class="pt-2"
column>
            <v-flex class="my-1 py-0"
>
              <span class="subheading">{{ systemName }}</span>
            </v-flex>
            <v-flex class="my-0 pb-3 pt-0"
>
              <span class="body-1">{{ systemType }}</span>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-flex class="pa-0">
      <v-layout pl-3
pt-3 row>
        <v-flex v-if="activeTx" md4 xs6>
          <span
            class="caption font-weight-light"
            v-text="timeAgo(activeTx.time)"
          />
          <h3
class="mt-1" v-text="activeTx.talkgroup.alpha" />
          <span
            class="body-2 ellipsis"
            style="display: block;"
            v-text="activeTx.talkgroup.description"
          />
          <v-flex class="px-0 pb-0 pt-1">
            <span
              class="monospaced subheading"
              v-text="formatFrequency(activeTx.freq)"
            />
          </v-flex>
        </v-flex>
        <v-flex class="py-0 pl-2"
md8 xs6>
          <v-flex
            id="waveform"
            :class="activeTx ? '' : 'd-none'"
            class="px-0 py-1"
            style="height: 100%;"
          />
        </v-flex>
      </v-layout>
      <v-data-table
        id="openmhz-table"
        :headers="headers"
        :items="messages"
        :loading="!haveTransmissions"
        :total-items="3"
        item-key="_id"
        no-data-text="Waiting for transmissions..."
        no-results-text="Waiting for transmissions..."
        style="height: 100% !important; max-height: 100% !important;"
      >
        <template slot="items" :selected="true" slot-scope="props">
          <tr
            v-if="activeTx"
            :key="props.item && props.item._id ? props.item._id : 0"
            :class="
              props.item && props.item._id === activeTx._id
                ? 'grey lighten-2 black--text'
                : ''
            "
          >
            <td class="caption">
              {{ props.item.time | moment }}
            </td>
            <td class="caption hidden-md-and-down">
              {{ props.item.talkgroup.alpha }}
            </td>
            <td class="caption text-truncate text-no-wrap">
              {{ props.item.talkgroup.description }}
            </td>
          </tr>
        </template>
        <template v-if="messages.length < 4" slot="footer">
          <tr
            v-for="(_, idx) in Array(4 - messages.length)"
            :key="'ee-tr-r-' + idx"
          >
            <td />
            <td />
            <td class="hidden-md-and-down" />
          </tr>
        </template>
      </v-data-table>
    </v-flex>
  </v-card>
</template>
<script lang="ts">
import { parseZone as moment } from "moment";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import webAudioTouchUnlock from "web-audio-touch-unlock";
import { IOpenMHzResponse } from "~/types/openmhz";

let WaveSurfer: any;
if (process.client) {
  WaveSurfer = require("wavesurfer.js");
}
@Component({
  data() {
    return {
      paused: true,
      headers: [
        {
          text: "Transmit Time",
          sortable: false,
          value: false,
          width: "160px",
        },
        {
          text: "Alpha Tag",
          align: "left",
          sortable: false,
          value: false,
          class: "hidden-md-and-down",
        },
        {
          text: "Talkgroup",
          sortable: false,
          value: false,
        },
      ],
    };
  },
  filters: {
    moment(timestamp: string) {
      const date = new Date(timestamp);
      return moment(date).format("LTS").toString();
    },
    talkgroupMode: (tgMode: string) => {
      switch (tgMode) {
        case "D":
          return "Digital";
        case "A":
          return "Analog";
        default:
          return tgMode;
      }
    },
  },
})
export default class OpenMHzPlayer extends Vue {
  public isPlaying = false;
  public systemName = this.$store.getters["trunked/SYSTEM_NAME"];
  public systemType = this.$store.getters["trunked/SYSTEM_TYPE"];
  private userInteracted = false;
  private shortName = this.$store.getters["trunked/SYSTEM"];
  private wavesurfer: any;

  get activeTx() {
    return this.$store.getters["trunked/ACTIVE_TX"];
  }

  get player() {
    return this.$refs.radioAudio as HTMLMediaElement;
  }

  get haveTransmissions() {
    return this.messages.length > 0;
  }

  get messages(): IOpenMHzResponse[] {
    return this.$store.getters["trunked/MESSAGES"];
  }

  @Watch("activeTx", { immediate: false })
  public activeTxChanged(oldTx: IOpenMHzResponse, newTx: IOpenMHzResponse) {
    if (!oldTx || !newTx || oldTx._id !== newTx._id) {
      this.$nextTick(() => {
        if (this.activeTx && this.activeTx.url) {
          this.wavesurfer.load(this.activeTx.url);
        }
      });
    }
  }

  public playToggleClicked() {
    this.userInteracted = true;
    this.wavesurfer.playPause();
    this.$nextTick(() => {
      this.$forceUpdate();
    });
  }

  public timeAgo(d: string) {
    return moment(d).fromNow();
  }

  public formatFrequency(hertz: number) {
    return Number(hertz / 1000000).toFixed(4) + " MHz";
  }

  audioUnlock() {
    if (!process.client) {
      return;
    }
    const context = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    webAudioTouchUnlock(context)
      .then((unlocked: boolean) => {
        if (unlocked) {
          debugger;
          // AudioContext was unlocked from an explicit user action, sound should start playing now
        } else {
          debugger;
          // There was no need for unlocking, devices other than iOS
        }
      })
      .catch((reason: any) => {
        debugger;
        console.error(reason);
      });
  }

  protected mounted() {
    this.setupSocket();
    this.startSocket();
    this.fetchTalkgroups();
    this.setupWaveSurfer();
    // this.audioUnlock();
  }

  private setupWaveSurfer() {
    this.$nextTick(() => {
      this.wavesurfer = WaveSurfer.create({
        container: "#waveform",
        waveColor: "#424242",
        progressColor: "transparent",
        cursorColor: "#2d2d2d",
        normalize: true,
        responsive: true,
        height: 120,
      });
      this.wavesurfer.on("ready", () => {
        if (this.userInteracted) {
          this.wavesurfer.play();
        }
        this.$forceUpdate();
      });
      this.wavesurfer.on("error", (e: Error) => {
        console.error(e);
        this.isPlaying = false;
        this.$forceUpdate();
        // this.$store.dispatch("trunked/SHIFT_MESSAGES");
      });
      this.wavesurfer.on("finish", () => {
        this.isPlaying = false;
        this.$forceUpdate();
        this.$store.dispatch("trunked/SHIFT_MESSAGES");
      });
      this.wavesurfer.on("audioprocess", () => {
        this.isPlaying = true;
      });
      this.wavesurfer.on("pause", () => {
        this.isPlaying = false;
      });
      if (this.activeTx) {
        this.wavesurfer.load(this.activeTx.url);
      }
      this.$forceUpdate();
    });
  }

  private fetchTalkgroups() {
    this.$store.dispatch("trunked/FETCH_TALKGROUPS");
  }

  private setupSocket() {
    this.$socket.on("reconnect", () => {
      // tslint:disable-next-line
      this.startSocket();
    });
  }

  private startSocket() {
    this.$socket.emit("start", {
      filterCode: "",
      filterType: "all",
      filterName: "",
      shortName: this.shortName,
    });
  }
}
</script>
<style lang="scss">
audio {
  width: 100%;
}

canvas {
  width: 100% !important;
}

#waveform {
  height: 83px;
}
</style>
