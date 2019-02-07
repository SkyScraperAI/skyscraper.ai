import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  data() {
    return {};
  },
  render: (h) => h("div"),
})
export default class AvBase extends Vue {
  private ctxWrapper?: any;
  private ctx?: any;
  private analyser: any;
  private audioCtx: any;
  private audio: any;
  private audioSrc = "";
  /**
   * prop: 'ref-link'
   * Refrence to Audio element. When provided, then local audio element
   * is not created and use refrence to the element. Component will
   * search only for its parent refs.
   */
  @Prop({
    type: String,
  }) private refLink?: string;
  /**
   * prop: 'audio-controls'
   * Audio element controls attribute. When provided should
   * display audio element with controls
   */
  private audioControls = false;
  /**
   * prop: 'cors-anonym'
   * CORS requests for this element will not have the credentials flag set.
   * Set crossOrigin property of audio element to 'anonymous'.
   * Default: null
   */
  private corsAnonym = true;
  /**
   * prop: 'audio-class'
   * Audio element css class name.
   */
  private audioClass?: string;
  /**
   * prop: 'canv-width'
   * Canvas element width. Default 300
   */
  private canvWidth = 1200;
  /**
   * prop: 'canv-height'
   * Canvas element height. Default 80
   */
  private canvHeight = 100;
  /**
   * prop: 'canv-class'
   * Canvas element css class name.
   */
  private canvClass?: "";
  /**
   * prop: 'canv-top'
   * Canvas element position on top relatively to audio element.
   * Default: false
   */
  private canvTop = false;
  /**
   * prop: 'canv-fill-color'
   * Canvas fill background color. Can be string RGB color or canvas gradients array.
   * Default is transperent.
   */
  private canvFillColor?: [string, any[]];

  public mounted() {
    this.createHTMLElements();
    this.setAnalyser();
    this.mainLoop();
  }

  public createHTMLElements() {
    const canv = document.createElement("canvas");
    const canvDiv = document.createElement("div");
    let audioDiv = null;
    let audio = null;

    if (this.refLink) {
      audio = this.$parent.$refs[this.refLink];
    } else {
      audio = document.createElement("audio");
      audioDiv = document.createElement("div");
      audio.setAttribute("src", this.audioSrc);
      if (this.audioControls) {
        audio.setAttribute("controls", "true");
      }
      if (this.audioClass) {
        audio.setAttribute("class", this.audioClass);
      }
      if (this.corsAnonym) {
        audio.crossOrigin = "anonymous";
      }
      audioDiv.appendChild(audio);
      this.$el.appendChild(audioDiv);
    }

    if (this.canvClass) {
      canv.setAttribute("class", this.canvClass);
    }
    if (this.canvWidth) {
      canv.setAttribute("width", String(this.canvWidth));
    }
    if (this.canvHeight) {
      canv.setAttribute("height", String(this.canvHeight));
    }
    canvDiv.appendChild(canv);

    if (this.canvTop) {
      this.$el.insertBefore(canvDiv, audioDiv);
    } else {
      this.$el.appendChild(canvDiv);
    }
    // Output to Canvas, taking into account devices such as iPhone 4 with Retina Display
    const hidefCanvas = canv;
    const hidefContext = hidefCanvas.getContext("2d") as CanvasRenderingContext2D;

    if (window.devicePixelRatio) {
      const hidefCanvasWidth = hidefCanvas.width;
      const hidefCanvasHeight = hidefCanvas.height;
      const hidefCanvasCssWidth = hidefCanvasWidth;
      const hidefCanvasCssHeight = hidefCanvasHeight;

      hidefCanvas.setAttribute("width", String(hidefCanvasWidth * window.devicePixelRatio));
      hidefCanvas.setAttribute("height", String(hidefCanvasHeight * window.devicePixelRatio));
      hidefCanvas.style.width = String(hidefCanvasCssWidth);
      hidefCanvas.style.height = String(hidefCanvasCssHeight);

      hidefContext.scale(window.devicePixelRatio, window.devicePixelRatio);

      this.ctxWrapper = canv;
      this.ctx = canv.getContext("2d");

      this.audio = audio;
    }
  }

  /**
   * Set audio context analyser.
   */
  public setAnalyser() {
    let src = null;
    let ctx = null;
    if (this.refLink) {
      if (this.$avAudioRefs[this.refLink]) {
        src = this.$avAudioRefs[this.refLink].src;
        ctx = this.$avAudioRefs[this.refLink].ctx;
        this.analyser = ctx.createAnalyser();
      } else {
        ctx = new AudioContext();
        this.analyser = ctx.createAnalyser();
        src = ctx.createMediaElementSource(this.audio);
        this.$avAudioRefs[this.refLink] = { src, ctx };
      }
    } else {
      ctx = new AudioContext();
      this.analyser = ctx.createAnalyser();
      src = ctx.createMediaElementSource(this.audio);
    }

    src.connect(this.analyser);
    // this.analyser.fftSize = this.fftSize;
    this.analyser.connect(ctx.destination);

    this.audioCtx = ctx;
  }

  public beforeDestroy() {
    if (this.audioCtx) {
      this.audioCtx.close();
    }
  }

  private mainLoop() {
    /* istanbul ignore next */
    return null;
  }
}
