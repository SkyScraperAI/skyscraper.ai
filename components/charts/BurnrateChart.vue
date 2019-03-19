<template>
  <v-layout wrap>
    <v-flex xs12 class="pa-4">
      <apexchart :options="options" :series="series" type="line"></apexchart>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import { IFinancials } from "@/assets/financials";
import Vue from "vue";
import VueApex from "vue-apexcharts";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "BurnrateChart",
  components: {
    apexchart: VueApex,
  },
  data() {
    return {};
  },
})
export default class BurnrateChart extends Vue {
  private get endingCash() {
    return Object.keys(this.financials).map((k) => {
      return this.financials[k]["Ending Cash Balance"];
    });
  }

  private get netBurn() {
    return Object.keys(this.financials).map((k) => {
      return this.financials[k]["Net Burn"];
    });
  }

  private static formatDollars(v: number) {
    const negative = v < 0;
    const a = Math.abs(v);
    const f = a.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    return negative ? `-$${f}` : `$${f}`;
  }

  @Prop(Object) protected financials!: IFinancials;
  protected series = [
    {
      name: "Net Burn",
      type: "column",
      data: this.netBurn,
    },
    {
      name: "Ending Cash Balance",
      type: "line",
      data: this.endingCash,
    },
  ];
  protected options = {
    chart: {
      // width: '100%',
      height: 300,
      fontFamily: "Noto Sans TC",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    theme: {
      // palette: "palette6",
    },
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "Cash and Burnrate",
      align: "center",
      style: {
        fontSize: "20px",
      },
    },
    labels: Object.keys(this.financials),
    yaxis: [
      {
        title: {
          text: "Net Burn",
        },
        labels: {
          formatter: BurnrateChart.formatDollars,
        },
      },
      {
        opposite: true,
        title: {
          text: "Ending Cash Balance",
        },
        labels: {
          formatter: BurnrateChart.formatDollars,
        },
        tooltip: {
          enabled: true,
        },
      },
    ],
    legend: {
      offsetY: -10,
    },
  };
}
</script>

<style>
.apexcharts-title-text {
  font-size: 24px !important;
  font-weight: 400;
  line-height: 32px !important;
  letter-spacing: normal !important;
  font-family: "Exo 2", sans-serif !important;
}
</style>
