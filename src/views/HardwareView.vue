<template>
  <v-container fluid grid-list-md dark class="white--text primary" id="hardware">
    <v-layout wrap fill-height style="max-width: 1500px; margin: 0 auto;" px-4 pb-4>
      <v-flex xs12>
        <h4 class="text-xs-center headline">Join the waiting list.</h4>
        <h3 class="text-xs-center title py-3 mb-3">SkyScraper ships this summer.</h3>
      </v-flex>
      <v-flex
        v-for="(l, idx) in priceLevels"
        :key="l.name"
        pa-0
        sm6
        md4
        lg4
        :class="{'sm12': $vuetify.breakpoint.smAndDown && idx == 2, 'sm-6': $vuetify.breakpoint.mdAndUp}"
      >
        <v-card
          style="z-index: 1; height: 100%; display: flex; flex-direction: column;"
          flat
          tile
          :class="l.bodyColor"
        >
          <v-card-title :class="l.color">
            <span class="white--text title mx-auto" v-text="l.name"></span>
          </v-card-title>
          <v-card-title>
            <span class="subheading mx-auto" v-text="l.subtitle"></span>
          </v-card-title>
          <v-card-text class="grow py-0">
            <v-subheader class="px-0" v-if="idx === 0">Features</v-subheader>
            <v-subheader v-else class="px-0">{{priceLevels[idx - 1].name + ', plus...'}}</v-subheader>
            <p
              v-for="(item, i) in featuresAtPricePoint(idx)"
              :key="'level-idx-feat-'+i"
              class="px-0"
              v-text="item.text"
            ></p>
          </v-card-text>

          <v-card-text class="px-3 pb-0">
            <p class="caption" v-html="l.description"></p>
          </v-card-text>
          <v-btn
            v-if="l.waitlist"
            class="mx-3 mb-4 red lighten-1 clearbit-overlay"
            data-form-id="9782d888-335f-46ab-ba66-beca3d572ecf"
            data-theme="default"
            large
            outline
          >Join the waiting list</v-btn>
          <v-btn
            v-else
            large
            class="clearbit-overlay mx-3 mb-4 red lighten-1"
            outline
            data-form-id="fe245108-fd5e-47a1-8ff7-c5fc27effedd"
            data-theme="default"
          >Early Access</v-btn>
          <v-divider></v-divider>
          <v-card-actions style="display: block;" class="px-0 py-0">
            <v-list dense class="transparent py-0">
              <v-list-tile
                v-for="(s, i) in specs"
                :key="l.name + s.name"
                :class="i % 2 === 0 ? 'grey lighten-4': 'white'"
              >
                <v-list-tile-content>{{s.name}}:</v-list-tile-content>
                <v-list-tile-content class="align-end text-xs-right">
                  <span style="margin-left: auto" v-html="s.values[idx]"></span>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  data() {
    return {
      specs: [
        {
          name: "RF Bandwidth",
          values: ["25MHz", "55MHz", "100MHz"]
        },
        {
          name: "CPU",
          values: [
            "ARM Cortex-A15 & Cortex-A7",
            "Intel i7-8559U",
            "ARM Cortex-A57<br>NVIDIA Denver2"
          ]
        },
        {
          name: "Compute Cores",
          values: ["4 @ 2.0GHz<br>4 @ 1.3GHz", "4 @ 2.7GHz", "6 @ 2.0GHz"]
        },
        {
          name: "FPGA",
          values: ["No", "Cyclone V FPGA", "2x Cyclone V FPGA"]
        },
        {
          name: "Network",
          values: ["Ethernet", "WiFi, Ethernet", "WiFi, Ethernet, LTE"]
        },
        {
          name: "GPU",
          values: ["None", "None", "NVIDIA Pascal"]
        },
        {
          name: "Storage",
          values: ["MicroSD", "M.2 PCIe, MicroSD, USB", "M.2 PCIe, eMMC, USB"]
        },
        {
          name: "Antenna Mount",
          values: ["SMA", "SMA", "SMA, Type-N"]
        }
      ],
      features: [
        {
          text: "Voice Demodulation",
          enabled: true,
          color: "primary",
          levels: [true, false, false]
        },
        {
          text: "ADSB and AIS Capture",
          enabled: true,
          color: "primary",
          levels: [true, false, false]
        },
        {
          text: "Satellite Tracking & Reception",
          enabled: true,
          color: "primary",
          levels: [true, false, false]
        },
        {
          text: "Basic Alerting",
          enabled: true,
          color: "primary",
          levels: [true, false, false]
        },
        {
          text: "Spectrum Monitoring",
          enabled: true,
          color: "primary",
          levels: [true, false, false]
        },
        {
          text: "Remote Data Storage",
          enabled: true,
          color: "primary",
          levels: [true, false, false]
        },
        {
          text: "SkyScraper Command Interface",
          enabled: true,
          color: "primary",
          levels: [true, false, false]
        },
        {
          text: "Speech Transcription",
          enabled: true,
          color: "primary",
          levels: [false, true, false]
        },
        {
          text: "Remote Access",
          enabled: true,
          color: "primary",
          levels: [false, true, false]
        },
        {
          text: "Trunked System Discovery",
          enabled: true,
          color: "primary",
          levels: [false, true, false]
        },
        {
          text: "Extensible Processing Pipelines",
          enabled: true,
          color: "primary",
          levels: [false, true, false]
        },
        {
          text: "Environment Monitoring",
          enabled: true,
          color: "primary",
          levels: [false, true, false]
        },
        {
          text: "Dynamic Alert Triggers",
          enabled: true,
          color: "primary",
          levels: [false, true, false]
        },
        {
          text: "ISM + BTLE Demodulation",
          enabled: true,
          color: "primary",
          levels: [false, true, false]
        },
        {
          text: "Translation",
          enabled: true,
          color: "primary",
          levels: [false, false, true]
        },
        {
          text: "Keyword Mention Triggers",
          enabled: true,
          color: "primary",
          levels: [false, false, true]
        },
        {
          text: "IMSI Detection",
          enabled: true,
          color: "primary",
          levels: [false, false, true]
        },
        {
          text: "At-Rest Encryption",
          enabled: true,
          color: "primary",
          levels: [false, false, true]
        },
        {
          text: "Popup GSM Network",
          enabled: true,
          color: "primary",
          levels: [false, false, true]
        },
        {
          text: "FDE & Remote Wipe",
          enabled: true,
          color: "primary",
          levels: [false, false, true]
        }
      ],
      priceLevels: [
        {
          name: "Kilo",
          subtitle: "The Scanner of Tomorrow",
          waitlist: true,
          color: "red lighten-2",
          bodyColor: "grey lighten-3",
          description: `Kilo shares public safety radio and vehicle telemetry to the SkyScraper Network.`
        },
        {
          name: "Mega",
          subtitle: "RF SIGINT, Tamed",
          color: "red",
          bodyColor: "grey lighten-4",
          description: `Requires network connectivity for transcription.`
        },
        {
          name: "Giga",
          subtitle: "Portable RF Powerhouse",
          color: "red darken-3",
          description: `Designed for field deployments in unpredictable network environments.
                        Local transcription and translation, on-edge ML processing via hardware GPU.
                        Remote access via WWAN.`
        }
      ]
    };
  }
})
export default class HardwareView extends Vue {
  private priceLevels: any[] = [];
  private features: any[] = [];
  private featuresAtPricePoint(idx: number) {
    return this.features.filter((f) => {
      return f.levels[idx] === true;
    });
  }
}
</script>

<style lang="scss">
.strikethrough {
  text-decoration: black line-through solid;
}

#vl_popup
  > div.vlns.vl-modal-dialog
  > div
  > div.vlns.vl-modal-footer-classic
  > a {
  display: none;
}

.cb-overlay {
  .forms-theme-default h2 {
    margin: 0 auto 15px auto;
  }
  .cb-form {
    h2 {
      text-align: center;
    }
  }
  .cb-submission {
    font-family: "Roboto Mono", monospace !important;
  }

  .cb-field.cb-focus {
    label {
      color: #f44336 !important;
    }
  }

  button,
  input,
  select,
  textarea {
    border-radius: 0 !important;
  }

  .cb-button {
    background-image: none !important;
    background-color: #ef5350 !important;
    border-color: #ef5350 !important;
    color: white;
  }
}
</style>
