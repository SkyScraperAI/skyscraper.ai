/* tslint:disable:no-bitwise */
import axios, { AxiosResponse } from "axios";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import BaseMixin from "./AvBase";

@Component({
  name: "waveform",
  mixins: [BaseMixin],
  data() {
    return {
      ctxWrapper: null,
      ctx: null,
      audio: null,
      duration: null,
      peaks: [],
    };
  },
})
export default class AvWaveform extends Vue {
  private ctxWrapper?: any;
  private ctx?: any;
  private audio?: any;
  private duration?: any;
  private peaks: any[] = [];
  private canvWidth = 500;
  private canvHeight = 50;
  private playedLineWidth = 0.25;
  private playedLineColor = "#2c303a";
  private noplayedLineWidth = 0.5;
  private noplayedLineColor = "#dd3d3d";
  private playtime = false;
  private playtimeWithMs = true;
  private playtimeFontSize = 10;
  private playtimeFontFamily = `"Roboto Mono", monospaced`;
  private playtimeFontColor = "grey";
  private playtimeTextBottom = false;
  private playtimeSlider = true;
  private playtimeSliderColor = "#2c303a";
  private playtimeSliderWidth = 1;
  private playtimeClickable = false;

  private mounted() {
    const conf = {
      responseType: "arraybuffer",
      onDownloadProgress: this.downloadProgress,
    };
    axios.get(this.audio.src, conf)
      .then((response) => {
        if (response.status === 200) {
          return this.decode(response);
        }
      })
      .catch((err) => {
        console.error(`Failed to get file '${ this.audio.src }'`);
        console.log(err);
      });
  }

  private decode(response: AxiosResponse) {
    /* istanbul ignore next */
    const ctx = new AudioContext();
    /* istanbul ignore next */
    ctx.decodeAudioData(response.data)
      .then((audioBuffer) => this.setPeaks(audioBuffer))
      .catch((err) => {
        console.error("Failed to decode audio data.");
        console.log(err);
      });
  }

  private mainLoop() {
    /* istanbul ignore next */
    return null;
  }

  private setAnalyser() {
    /* istanbul ignore next */
    return null;
  }

  private setPeaks(buffer: AudioBuffer) {
    const peaks = [];
    let min = 0;
    let max = 0;
    let top = 0;
    let bottom = 0;
    const segSize = Math.ceil(buffer.length / (this.canvWidth * window.devicePixelRatio));
    const width = this.canvWidth;
    const height = this.canvHeight;
    this.duration = this.audio.duration;

    for (let c = 0; c < buffer.numberOfChannels; c++) {
      const data = buffer.getChannelData(c);
      for (let s = 0; s < width; s++) {
        const start = ~~(s * segSize);
        const end = ~~(start + segSize);
        min = 0;
        max = 0;
        for (let i = start; i < end; i++) {
          min = data[i] < min ? data[i] : min;
          max = data[i] > max ? data[i] : max;
        }
        // merge multi channel data
        if (peaks[s]) {
          peaks[s][0] = peaks[s][0] < max ? max : peaks[s][0];
          peaks[s][1] = peaks[s][1] > min ? min : peaks[s][1];
        }
        peaks[s] = [max, min];
      }
    }
    // set peaks relativelly to canvas dimensions
    for (let i = 0; i < peaks.length; i++) {
      max = peaks[i][0];
      min = peaks[i][1];
      top = ((height / 2) - (max * height / 2));
      bottom = ((height / 2) - (min * height / 2));
      peaks[i] = [top, bottom === top ? top + 1 : bottom];
    }
    this.peaks = peaks;

    if (this.playtimeClickable) {
      this.ctxWrapper.addEventListener("click", (e: { offsetX: number; }) => this.updateTime(e));
    }
    this.waveform();
  }

  /**
   * Draw wave form.
   */
  private waveform() {
    const peaks = this.peaks;
    const time = this.audio.currentTime;
    const playX = this.playX(time);
    let x = 0;
    this.ctx.clearRect(0, 0, this.canvWidth, this.canvHeight);
    x = this.draw(peaks.slice(0, playX), this.playedLineWidth, this.playedLineColor, x);
    this.draw(peaks.slice(playX), this.noplayedLineWidth, this.noplayedLineColor, x);
    this.drawSlider(time);
    if (this.playtime) {
      this.drawTime(time);
    }

    requestAnimationFrame(this.waveform);
  }

  /**
   * Draw segment.
   */
  private draw(data: any, lineWidth: number, color: string, x: number) {
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    data.forEach((v: any[]) => {
      this.ctx.moveTo(x, v[0]);
      this.ctx.lineTo(x, v[1]);
      x++;
    });
    this.ctx.stroke();
    return x;
  }

  /**
   * Formatted string of current play time.
   * @param {Number} Current play time
   * @return {String}
   */
  private timeFormat(timeSec: string) {
    let frmStr = "";
    const time = parseFloat(timeSec);
    if (isNaN(time)) {
      return frmStr;
    }

    const min = ~~(time / 60);
    const sec = ~~(time % 60);
    const ms = ~~(time % 1 * 1000);

    frmStr = (min < 10) ? `0${ min }:` : `${ min }:`;
    frmStr += `0${ sec }`.substr(-2);
    if (this.playtimeWithMs) {
      frmStr += "." + `00${ ms }`.substr(-3);
    }

    return frmStr;
  }

  /**
   * Draw play time next to slider.
   * @param {Number} Played time sec.millisec.
   * @return {Void}
   */
  private drawTime(time: string) {
    const timeStr = this.timeFormat(time);
    const offset = 3;
    const textWidth = ~~this.ctx.measureText(timeStr).width;
    const playX = this.playX(time);
    const textX = playX > (this.canvWidth - textWidth - offset)
      ? playX - textWidth - offset
      : playX + offset;
    const textY = this.playtimeTextBottom
      ? this.canvHeight - this.playtimeFontSize + offset
      : this.playtimeFontSize + offset;
    this.ctx.fillStyle = this.playtimeFontColor;
    this.ctx.font = `${ this.playtimeFontSize }px ${ this.playtimeFontFamily }`;
    this.ctx.fillText(timeStr, textX, textY);
  }

  /**
   * Draw played slider.
   * @param {Number} Played time sec.millisec.
   * @return {Void}
   */
  private drawSlider(time: number) {
    const playX = this.playX(time);
    this.ctx.lineWidth = this.playtimeSliderWidth;
    this.ctx.strokeStyle = this.playtimeSliderColor;
    this.ctx.beginPath();
    this.ctx.moveTo(playX, 0);
    this.ctx.lineTo(playX, this.canvHeight);
    this.ctx.stroke();
  }

  private playX(time: any) {
    return ~~(time / this.duration * this.canvWidth);
  }

  private updateTime(e: { offsetX: number; }) {
    this.audio.currentTime = e.offsetX / this.canvWidth * this.duration;
  }

  /**
   * Audio source download progress
   */
  private downloadProgress(ev: { loaded: number; total: number; }) {
    const progressX = Math.round(ev.loaded / ev.total * this.canvWidth);
    this.ctx.clearRect(0, 0, this.canvWidth, this.canvHeight);
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.noplayedLineColor;
    this.ctx.moveTo(0, this.canvHeight / 2);
    this.ctx.lineTo(progressX, this.canvHeight / 2);
    this.ctx.stroke();
  }
}

