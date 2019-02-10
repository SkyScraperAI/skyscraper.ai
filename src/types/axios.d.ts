// 1. Make sure to import 'vue' before declaring augmented types
import Vue from "vue";
import { AxiosStatic } from "axios";

declare module "vue/types/vue" {
  interface Vue {
    $http: AxiosStatic;
  }
}
