<template>
  <v-container>
    <v-layout id="wave"></v-layout>
  </v-container>
</template>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import * as three from "three";

@Component({})
export default class Wave extends Vue {
  public SEPARATION = 40;
  public AMOUNTX = 130;
  public AMOUNTY = 35;

  public container = document.getElementById("wave") as HTMLElement;
  public camera: three.PerspectiveCamera = new three.PerspectiveCamera(
    120,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  public scene: three.Scene = new three.Scene();
  public renderer = new three.CanvasRenderer();

  public particles: three.Sprite[] = [];
  public particle?: three.Sprite = new three.Sprite();
  public count = 0;

  public windowHalfX = window.innerWidth / 2;
  public windowHalfY = window.innerHeight / 2;

  protected mounted() {
    if (this.container) {
      this.container.className += this.container.className ? " waves" : "waves";
    }

    this.camera.position.y = 150; // changes how far back you can see i.e the particles towards horizon
    this.camera.position.z = 300; // This is how close or far the particles are seen

    this.camera.rotation.x = 0.35;

    const PI2 = Math.PI * 2;
    const material = new three.SpriteCanvasMaterial({
      color: 0x939393, // changes color of particles
      program(context) {
        context.beginPath();
        context.arc(0, 0, 0.1, 0, PI2, true);
        context.fill();
      }
    });

    let i = 0;

    for (let ix = 0; ix < this.AMOUNTX; ix++) {
      for (let iy = 0; iy < this.AMOUNTY; iy++) {
        this.particle = this.particles[i++] = new three.Sprite(material);
        this.particle.position.x =
          ix * this.SEPARATION - (this.AMOUNTX * this.SEPARATION) / 2;
        this.particle.position.z =
          iy * this.SEPARATION - (this.AMOUNTY * this.SEPARATION - 10);
        this.scene.add(this.particle);
      }
    }

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff, 1);
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener("resize", this.onWindowResize, false);
  }

  private onWindowResize() {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate() {
    requestAnimationFrame(this.animate);

    this.render();
  }

  private render() {
    let i = 0;

    for (let ix = 0; ix < this.AMOUNTX; ix++) {
      for (let iy = 0; iy < this.AMOUNTY; iy++) {
        this.particle = this.particles[i++];
        this.particle.position.y =
          Math.sin((ix + this.count) * 0.5) * 20 +
          Math.sin((iy + this.count) * 0.5) * 20;
        this.particle.scale.x = this.particle.scale.y =
          (Math.sin((ix + this.count) * 0.3) + 2) * 4 +
          (Math.sin((iy + this.count) * 0.5) + 1) * 4;
      }
    }

    this.renderer.render(this.scene, this.camera);

    // This increases or decreases speed
    this.count += 0.2;
  }
}
</script>

<style lang="scss">
canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>

