import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  cWidth = 800;
  cHeight = 600;

  mouse = {
    x: 0,
    y: 0
  };

  bgColor = 'black';
  clearSpeed = 1; // from 0 to 1

  squareSize = 10; // in px
  squareFrequency = 10;
  squareSpeed = 0.01; // px / frame
  squareColors = ['black', 'black', 'black', 'black'];
  squares: Square[] = [];

  constructor() { }

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.cWidth = window.innerWidth;
    this.cHeight = window.innerHeight;
    this.canvas.width = this.cWidth;
    this.canvas.height = this.cHeight;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.canvas.addEventListener('mousemove', (event) => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    });
  }

  defineColors(): void{
    for (let i = 0; i < this.squareColors.length; i++){
      const colorString = getComputedStyle(document.documentElement)
      .getPropertyValue(`--colorAccent${i + 1}`)
      .toLocaleLowerCase()
      .trim();
      this.squareColors[i] = colorString;
    }
  }

  addSquare(): void{
    const randY = Math.floor(Math.random() * this.cHeight);
    const randDirection = Math.random() < 0.5 ? 1 : -1;
    const X = randDirection === 1 ? 0 : this.cWidth;
    const randColor = this.squareColors[Math.floor(Math.random() * this.squareColors.length)];
    this.squares.push(new Square(X, randY, randDirection, this.ctx, randColor));
  }

  animateSquares(): void {
    for (const square of this.squares){
      console.log('');
    }
  }

  clearRect(): void{
    this.ctx.fillStyle = this.bgColor;
    this.ctx.globalAlpha = this.clearSpeed;
    this.ctx.fillRect(0, 0, this.cWidth, this.cHeight);
    this.ctx.globalAlpha = 1;

  }



  render(): void{
    requestAnimationFrame(() => {
      this.render();
    });

    this.clearRect();
  }
}

export class Square {
  // direction 1 = go right; -1 go left;

  constructor(
    private x: number,
    private y: number,
    private direction: 1 | -1,
    private ctx: CanvasRenderingContext2D,
    private color: string){
  }

  draw(): void{
    // this.ctx.
  }
}
