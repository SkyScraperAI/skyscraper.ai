<template>
  <v-layout id="financials-table">
    <v-flex class="px-2 my-2">
      <v-tabs
        v-if="haveCleartext"
        v-model="activeTab"
        grow
        color="primary lighten-2"
        dark
        slider-color="red lighten-2"
      >
        <v-tab v-for="tab in tabs()" :key="tab">{{ tab }}</v-tab>
        <v-tab-item v-for="tab in tabs()" :key="'finTab' + tab"></v-tab-item>
      </v-tabs>
      <v-flex v-else class="md6 offset-md3">
        <v-card>
          <v-card-title class="red headline justify-center white--text"
            >Detailed financials are encrypted
          </v-card-title>
          <v-card-text>
            <v-text-field
              type="password"
              :error="wrongPassword"
              append-outer-icon="mdi-lock"
              @click:append-outer="submitPassword"
              ref="password"
              clearable
              color="grey darken-1"
              :hint="hint"
              persistent-hint
              v-model="passwordInput"
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import { AES, enc } from "crypto-js";

const encryptedFinancials = require("!!raw-loader!~/assets/financials.aes");

@Component({
  data() {
    return {
      haveCleartext: false,
      wrongPassword: false,
      passwordInput: "",
    };
  },
})
export default class FinancialsTable extends Vue {
  get passphrase() {
    return this.$store.getters.PASSPHRASE;
  }

  protected activeTab = "B2C";
  protected haveCleartext = false;
  protected wrongPassword = false;
  protected passwordInput = "";
  protected hint =
    "Ping <a href='mailto:hello@sibylvision.com'>hello@sibylvision.com</a> to request access.";
  private financials: any = {};
  public mounted() {
    if (this.passphrase) {
      this.decryptFinancials();
    }
  }

  public decryptFinancials() {
    try {
      const f = AES.decrypt(encryptedFinancials, this.passphrase).toString(
        enc.Utf8
      );
      this.financials = JSON.parse(f);
      this.haveCleartext = true;
    } catch (e) {
      this.wrongPassword = true;
      this.passwordInput = "";
      this.hint = "Try again.";
    }
  }

  public tabs() {
    return Object.keys(this.financials).sort();
  }

  public valueFilter(rowName: string, value: number) {
    const r = rowName.toLowerCase();
    if (r.indexOf("percent") >= 0) {
      return `${Number(value * 100).toFixed(2)}%`;
    }
    if (
      r.indexOf("cash") >= 0 ||
      r.indexOf("net") >= 0 ||
      r.indexOf("cogs") >= 0 ||
      r.indexOf("sga") >= 0 ||
      r.indexOf("gross") >= 0
    ) {
      const v = value.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      return value < 0
        ? `($${v.substring(1, v.length - 2)})`
        : `$${v.substring(0, v.length - 2)}`;
    }
    return Math.round(value);
  }

  protected keyFilter(rowName: string) {
    let r = rowName.replace(/([A-Z])/g, " $1");
    r = r.charAt(0).toUpperCase() + r.slice(1);
    r = r.replace("Cogs", "COGS");
    r = r.replace("Sga", "SGA");
    return r;
  }

  protected submitPassword() {
    this.$store.commit("SET_PASSPHRASE", this.passwordInput);
    this.decryptFinancials();
  }
}
</script>
<style lang="scss">
#financials-table {
  .v-messages__message {
    height: 20px;
  }
}
</style>
