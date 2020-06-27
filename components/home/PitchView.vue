<template>
  <v-container
px-0 pb-0
id="pitch" fluid fill-height primary
>
    <v-layout wrap>
      <v-container py-4>
        <v-flex
lg10 offset-lg1
>
          <v-layout
wrap justify-center
align-center
>
            <v-flex
xs12 md5
lg4 mx-4
>
              <img
                id="hero-logo"
                alt="SkyScraper, by Sibyl Vision"
                src="~/assets//img/logo-dark.svg"
              />
            </v-flex>
            <v-flex
xs12 md4
lg4 mx-4 text-xs-center text-md-left
>
              <span class="headline white--text"
                >The Swiss-army knife of radio capture and analysis.</span
              >
            </v-flex>
          </v-layout>
          <v-layout
wrap align-center
class="my-4 py-4"
>
            <v-flex>
              <v-divider class="grey lighten-1" />
            </v-flex>
            <v-flex
              text-xs-center
              shrink
              px-4
              class="grey--text text--lighten-3"
            >
              <div
class="display-1" v-text="sections.opportunity.title" />
            </v-flex>
            <v-flex>
              <v-divider class="grey lighten-1" />
            </v-flex>
          </v-layout>
          <v-layout
            v-for="(card, idx) in sections.opportunity.cards"
            :key="'opportunity' + idx"
            wrap
            row
            justify-center
          >
            <v-flex
              v-for="(item, i) in card.items"
              :key="'op' + idx + i"
              :class="item.classes + ' pa-2'"
            >
              <v-card
color="grey lighten-4" style="height: 100%;"
>
                <v-card-title :class="item.titleClasses">
                  <div
class="headline" v-text="item.title" />
                </v-card-title>
                <v-card-text>
                  <div v-html="item.content" />
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout
row hidden-sm-and-down
>
            <v-flex class="ma-2 white">
              <v-flex id="funding-needed">
                <v-layout
row align-center
fill-height
>
                  <v-flex>
                    <span class="headline pl-4">Funding needed:</span>
                  </v-flex>
                  <v-flex>
                    <div
                      class="headline font-weight-bold"
                      v-html="
                        '<sup style=\'top: -0.25em\'>$</sup>100<span class=\'grey--text\'>K</span>'
                      "
                    />
                  </v-flex>
                  <v-flex
lg7 md5
sm7 class="pr-3"
>
                    <span>
                      Money raised will go towards hardware certification, our
                      pilot program, metro area demo installation, and
                      pre-market production costs.
                    </span>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-flex>
          </v-layout>
          <v-layout
wrap align-center
class="my-4 py-4"
>
            <v-flex>
              <v-divider class="grey lighten-1" />
            </v-flex>
            <v-flex
              text-xs-center
              shrink
              px-4
              class="grey--text text--lighten-3"
            >
              <div
class="display-1" v-text="sections.sales.title" />
            </v-flex>
            <v-flex>
              <v-divider class="grey lighten-1" />
            </v-flex>
          </v-layout>
          <v-layout
            v-for="(card, idx) in sections.sales.cards"
            :key="'sales' + idx"
            wrap
            row
            justify-center
          >
            <v-flex
              v-for="(item, i) in card.items"
              :key="'sales' + idx + i"
              :class="item.classes + ' pa-2'"
            >
              <v-card
color="grey lighten-4" style="height: 100%;"
>
                <v-card-title :class="item.titleClasses">
                  <div
class="headline" v-text="item.title" />
                </v-card-title>
                <v-card-text>
                  <div v-html="item.content" />
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout
wrap align-center
class="my-4 py-4"
>
            <v-flex>
              <v-divider class="grey lighten-1" />
            </v-flex>
            <v-flex
              text-xs-center
              shrink
              px-4
              class="grey--text text--lighten-3"
            >
              <div class="display-1">
                Financial Outlook
              </div>
            </v-flex>
            <v-flex>
              <v-divider class="grey lighten-1" />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-container>
      <FinancialsTable />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import FinancialsTable from "@/components/FinancialsTable.vue";
  import Vue from "vue";
  import { Component } from "vue-property-decorator";

  @Component({
    name: "PitchView",
    components: { FinancialsTable },
    data() {
      return {
        sections: {
          opportunity: {
            title: "Our Opportunity",
            cards: [
              {
                items: [
                  {
                    title: "The problem",
                    classes: "sm6",
                    titleClasses: "red lighten-1 white--text",
                    content: `<p class="text-justify">Radio usage is exploding and the protocols and technologies driving
                the surge are disparate and complex. Capturing any non-trivial radio traffic requires
                arduous configuration and prior domain knowledge. There is no abstraction
                layer to the airwaves.</p>`,
                  },
                  {
                    title: "Our solution",
                    classes: "sm6",
                    titleClasses: "primary lighten-2 white--text",
                    content: `<p class="text-justify">SkyScraper democratizes radio by unifying the processing of the
              myriad RF technologies in use in a price sensitive package which supports the entire
              spectrum, from century old architectures to yet-finalized future protocols.</p>`,
                  },
                ],
              },
              {
                items: [
                  {
                    title: "Timing",
                    classes: "md12",
                    titleClasses: "primary lighten-5 black--text  ",
                    content: `<p class="text-justify">Over the last decade, advancements in low-power and high frequency
              radio systems have spurred a hardware revolution. From
              <a href="https://en.wikipedia.org/wiki/Direct_TPMS" target="_blank">car tires</a> to
              <a href="https://www.cyberscoop.com/crane-hack-radio-frequency-trend-micro-s4x19/" target="_blank">
              cranes</a>, radios slowly found their way way into most everything around us, well
               before the IoT revolution.
              </p>
              <p>
              With these advancements, the consumer SDR industry took off and the price of associated
              hardware plumeted. However, actually utilizing the newly-accesible tech for anything
              more than listening to broadcast FM or tracking overhead planes is a disjointed process
              fraught with technical woes.</p>
              <p>
              SkyScraper is the first unified abstraction layer built to realize the potential of these
              otherwise extremely powerful devices. Combining the abstraction layer with the (also recent)
              infrastructure management and hardware advancements of the IoT age creates an entirely new
              device class, with commercial and consumer applications anywhere you can find a radio.
              That is to say... everywhere.
              </p>
              `,
                  },
                ],
              },
              {
                items: [
                  {
                    title: "Target markets",
                    classes: "sm6 lg4",
                    titleClasses: "primary lighten-2 white--text",
                    content: `
                <ol style="padding-left: 18px;">
                    <li>Consumer-grade SDR</li>
                    <li>Commercial scanners</li>
                    <li>Journalism</li>
                    <li>Intelligence and security</li>
                </ol>
                `,
                  },
                  {
                    title: "Competition",
                    classes: "sm6 lg8",
                    titleClasses: "primary lighten-2 white--text",
                    content: `
                <div class="layout row wrap">
                    <div class="flex xs4 font-weight-bold">Competition</div>
                    <div class="flex xs8 font-weight-bold">Why SkyScraper is better</div>
                </div>
                <div class="layout row wrap pt-2">
                    <div class="flex xs4">HawkEye 360</div>
                    <div class="flex xs8">Our tech is accesible; we don't rely on satellites</div>
                    <div class="flex xs4">Bastille</div>
                    <div class="flex xs8">No consumer applications</div>
                    <div class="flex xs4">Spire</div>
                    <div class="flex xs8">Local deployment, no satellites required</div>
                    <div class="flex xs4">Uniden</div>
                    <div class="flex xs8">Similar price point, small subset of our features</div>
                </div>
                `,
                  },
                ],
              },
            ],
          },
          sales: {
            title: "Sales & Marketing",
            cards: [
              {
                items: [
                  {
                    title: "Sales channels",
                    classes: "sm6",
                    titleClasses: "green lighten-1 white--text",
                    content: `<p class="text-justify">The consumer SDR market is driven by online discussion forums;
              traction there will be quick upon general market availability. Government sales will be accelerated
              by the unique inter-agency relationships of our founders and advisors.</p>`,
                  },
                  {
                    title: "Marketing activities",
                    classes: "sm6",
                    titleClasses: "primary lighten-2 white--text",
                    content: `<p class="text-justify">We have engaged with novel and inter-disciplinary pilot users whose
               existing processes will be transformed by the use of SkyScraper. They will provide us with
               social-proof, genuine product stories and early press.
               </p>`,
                  },
                ],
              },
            ],
          },
        },
      };
    },
  })
  export default class PitchView extends Vue {
    protected mounted() {
      this.$store.commit("SET_NAV_VISIBLE", false);
    }
  }
</script>
<style lang="scss">
  #pitch {
    #hero-logo {
      width: 100%;
    }

    p.text-justify {
      text-align: justify;
    }

    #funding-needed {
      background-image: url("../../public/img/green-arrow.png");
      height: 74px;
    }
  }
</style>
