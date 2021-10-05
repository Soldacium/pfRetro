import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private cWidth = 800;
  private cHeight = 600;

  private mouse = {
    x: 0,
    y: 0
  };

  private bgColor = 'black';
  private clearSpeed = 1; // from 0 to 1

  private squareSize = 10; // in px
  private squareFrequency = 1; // 60 = 1s
  private squareGraying = 100; // increase chance for non-color square
  private squareGrayColor = 'rgb(60,60,60)'; // color of "non color" sqares
  private maxDistance = 120;
  private squareSpeed = 1.5; // px / frame
  private squareColors = ['black', 'black', 'black', 'black'];
  private squares: Square[] = [];

  private timer = 0;

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

    this.defineColors();
  }

  private defineColors(): void{
    this.bgColor = getComputedStyle(document.documentElement)
      .getPropertyValue(`--colorBackground`)
      .toLocaleLowerCase()
      .trim();
    for (let i = 0; i < this.squareColors.length; i++){
      const colorString = getComputedStyle(document.documentElement)
      .getPropertyValue(`--colorAccent${i + 1}`)
      .toLocaleLowerCase()
      .trim();
      this.squareColors[i] = colorString;
    }

    for (let i = 0; i < this.squareGraying; i++){
      this.squareColors.push(this.squareGrayColor);
    }
  }

  private addSquare(): void{
    const randY = Math.floor(Math.random() * this.cHeight);
    const randDirection = Math.random() < 0.5 ? 1 : -1;
    const X = randDirection === 1 ? 0 : this.cWidth;
    const randColor = this.squareColors[Math.floor(Math.random() * (this.squareColors.length + this.squareGraying))];
    this.squares.push(new Square(X, randY, randDirection, this.ctx, randColor, this.squareSize, this.squareSpeed));
  }

  private animateSquares(): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.squares.length; i++){
      this.squares[i].draw();
      if (this.squares[i].distance > this.maxDistance){
        this.squares.splice(i, 1);
        i--;
      }
    }
  }

  private clearRect(): void{
    this.ctx.fillStyle = this.bgColor; // this.bgColor;
    this.ctx.globalAlpha = this.clearSpeed;
    this.ctx.fillRect(0, 0, this.cWidth, this.cHeight);
    this.ctx.globalAlpha = 1;
  }

  render(): void{
    requestAnimationFrame(() => {
      this.render();
    });

    this.clearRect();
    this.timer += 1; // one frame, 1/60s
    if (this.timer % this.squareFrequency === 0){
      this.addSquare();
    }
    this.animateSquares();
  }
}

export class Square {

  distance = 0;

  constructor(
    private x: number,
    private y: number,
    private direction: 1 | -1,
    private ctx: CanvasRenderingContext2D,
    private color: string,
    private size: number,
    private speed: number
    ){
  }

  draw(): void{
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.x += this.direction * this.speed;
    this.distance += this.speed;
    this.size -= this.speed / 15;
  }
}
