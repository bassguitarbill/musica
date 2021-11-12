import { chooseOneFromArray, KEY_SIGNATURES, MAJOR_KEY_SIGNATURES, MINOR_KEY_SIGNATURES } from "./main.js";

export default class KeyPicker {
  readonly ctx: CanvasRenderingContext2D;
  readonly center: number;

  readonly minorRadius;
  readonly randomRadius;

  constructor(readonly canvas: HTMLCanvasElement, readonly chooseKey: Function) {
    this.ctx = canvas.getContext('2d')!;
    this.center = canvas.width / 2;
    this.minorRadius = this.center / 1.5;
    this.randomRadius = this.center / 3;

    this.canvas.addEventListener('click', this.onClick.bind(this));
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // let's draw the top guy

    this.drawMajorKeys();
    this.drawMinorKeys();
    this.drawRandomButton();
  }

  drawMajorKeys() {
    const { ctx, center } = this;
    MAJOR_KEY_SIGNATURES.forEach((_key, i) => {
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, center, Math.PI * (((2 * i)-7)/12), Math.PI * (((2 * i)-5)/12));
      ctx.moveTo(center, center);
      ctx.fillStyle = i % 2 === 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
      ctx.fill();
      ctx.closePath();
    });
  }

  drawMinorKeys() {
    const { ctx, center, minorRadius } = this;
    MINOR_KEY_SIGNATURES.forEach((_key, i) => {
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, minorRadius, Math.PI * (((2 * i)-7)/12), Math.PI * (((2 * i)-5)/12));
      ctx.moveTo(center, center);
      ctx.fillStyle = i % 2 === 1 ? PRIMARY_COLOR : SECONDARY_COLOR;
      ctx.fill();
      ctx.closePath();
    });
  }
  
  drawRandomButton() {
    const { ctx, center, randomRadius } = this;
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, randomRadius, 0, Math.PI * 2);
    ctx.fillStyle = TERTIARY_COLOR;
    ctx.fill();
    ctx.closePath();
  }

  onClick(ev: MouseEvent) {
    const { offsetX, offsetY } = ev;
    const { center, randomRadius, minorRadius, chooseKey } = this;
    // Get the distance squared
    const distanceSquared = (offsetX - center) ** 2 + (offsetY - center) ** 2;
    if (distanceSquared < randomRadius ** 2) {
      chooseKey(chooseOneFromArray(KEY_SIGNATURES));
      return;
    }
    // Get the angle
    const angle = Math.atan2(offsetY - center, offsetX - center) + Math.PI;
    let sector = (Math.floor((angle * 6 / Math.PI) + 0.5) - 3) % 12;
    sector = sector < 0 ? sector + 12 : sector; 
    // console.log(sector);
    if (distanceSquared < minorRadius ** 2) {
      chooseKey(MINOR_KEY_SIGNATURES[sector]);
      return;
    } else if (distanceSquared < center ** 2) {
      chooseKey(MAJOR_KEY_SIGNATURES[sector]);
      return;
    }
    return;
  }
}

// https://colorhunt.co/palette/142f43ffab4cff5f7eb000b9
const PRIMARY_COLOR = '#FFAB4C';
const SECONDARY_COLOR = '#FF5F7E';
const TERTIARY_COLOR = '#B000B9';
//const TEXT_COLOR = '#142F43';