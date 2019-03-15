<template>
  <v-layout wrap>
    <v-flex xs12 class="pa-4">
      <apexchart :options="options" :series="series" type="bar"></apexchart>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
  import {IFinancials} from "@/assets/financials";
  import Vue from "vue";
  import VueApex from "vue-apexcharts";
  import {Component, Prop} from "vue-property-decorator";

  @Component({
    name: "OperatingExpensesChart",
    components: {
      apexchart: VueApex,
    },
    data() {
      return {};
    },
  })
  export default class OperatingExpensesChart extends Vue {
    private get labels() {
      return Object.keys(this.financials);
    }

    private static formatDollars(v: number) {
      const negative = v < 0;
      const a = Math.abs(v);
      const f = a.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
      return negative ? `-$${f}` : `$${f}`;
    }

    @Prop(Object) public financials!: IFinancials;
    series = [{
      name: "Salaries & Benefits",
      data: this.getFinancials("Salaries and Benefits"),
    }, {
      name: "Advertising & Mkting",
      data: this.getFinancials("Advertising & Marketing (Acquisition Costs)"),
    }, {
      name: "Legal and Accounting",
      data: this.getFinancials("Legal and Accounting"),
    }, {
      name: "Overhead",
      data: this.getFinancials("Overhead"),
    }, {
      name: "Product & Materials",
      data: this.getFinancials("Product & Materials")
    }, {
      name: "Product Development",
      data: this.getFinancials("Product Development")
    }];
    options = {
      chart: {
        // width: "100%",
        height: 300,
        type: "bar",
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: true,
        },
        fontFamily: "Noto Sans TC",
      },
      title: {
        text: "Operating Expenses, First 24 Months",
        align: "center",
        style: {
          fontSize: "20px",
        },
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: this.labels
      },
      yaxis: {
        labels: {
          formatter: OperatingExpensesChart.formatDollars,
        },
        min: 0,
        forceNiceScale: true
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    };

    private getFinancials(key: string) {
      return Object.keys(this.financials)
        .map((k) => {
          return this.financials[k][key];
        });
    }
  }
</script>

<style>
  .apexcharts-title-text {
    font-size: 24px !important;
    font-weight: 400;
    line-height: 32px !important;
    letter-spacing: normal !important;
    font-family: 'Exo 2', sans-serif !important;
  }
</style>
