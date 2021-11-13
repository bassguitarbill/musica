import { Song } from './main.js';

export default class SheetMusic {
  ctx: CanvasRenderingContext2D;
  
  constructor (readonly song: Song, readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
  }

  draw() {
    const { ctx, canvas, song } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.textAlign = 'left';
    ctx.font = '48px sans';
    ctx.fillText(song.key?.key || '', 50, 50);
    this.drawStaff();
    this.drawClef();
  }

  drawStaff() {
    const { ctx, canvas } = this;
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    const int = STAFF_LINE_INTERVAL;
    for (let i=0; i<NUMBER_OF_LINES_ON_THE_STAFF; i++) {
      ctx.moveTo(STAFF_LR_MARGIN, STAFF_TOP_MARGIN + (int * i));
      ctx.lineTo(canvas.width - STAFF_LR_MARGIN, STAFF_TOP_MARGIN + (int * i));
    }
    ctx.stroke();
  }

  drawClef() {
    // Start from the bottom
    const y = STAFF_TOP_MARGIN + (STAFF_LINE_INTERVAL * (NUMBER_OF_LINES_ON_THE_STAFF - 1));
    const x = STAFF_LR_MARGIN + CLEF_MARGIN;
    const sli = STAFF_LINE_INTERVAL;
    const { ctx } = this;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 5, y + 10);
    ctx.lineTo(x + 10, y);
    ctx.lineTo(x + 5, STAFF_TOP_MARGIN - 10);
    ctx.lineTo(x + 10, STAFF_TOP_MARGIN - 15);
    ctx.lineTo(x + 20, STAFF_TOP_MARGIN);
    ctx.lineTo(x - 10, y - sli);
    ctx.lineTo(x + 10, y);
    ctx.lineTo(x + 30, y - sli);
    ctx.lineTo(x + 10, y - sli - 10);
    ctx.lineTo(x + 5, y - sli - 5);
    ctx.stroke();
    ctx.closePath();
  }
}

const STAFF_TOP_MARGIN = 50
const STAFF_LR_MARGIN = 50;
const STAFF_LINE_INTERVAL = 15;
const NUMBER_OF_LINES_ON_THE_STAFF = 5; // Hey, you never know

const CLEF_MARGIN = 10;