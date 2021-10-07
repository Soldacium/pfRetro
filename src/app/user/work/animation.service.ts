import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private cWidth = 800;
  private cHeight = 600;

  private bgColor = 'rgb(40,40,40)';
  private clearSpeed = 0.1; // from 0 to 1
  private animationSpeed = 10; // in ms, time between two columns being colored

  private squareSize = 10; // in px
  // increase chance for non-color square,
  // example: squareGraying 10 means gray squares will be 10 times as common, but setting it to <=1 will make every square colored
  private squareGraying = 10;
  private squares: Square[] = [];
  private squaresPerRow = 55;
  private squaresPerColumn = 0; // calculated at runtime

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.cWidth = window.innerWidth;
    this.cHeight = window.innerHeight;
    this.canvas.width = this.cWidth;
    this.canvas.height = this.cHeight;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.setupEventListeners();
    this.blackRect();
    this.calculateOptimalSquareSize();
  }

  pulse(color: string): void {
    this.changeSquareColors(color);
    this.sendPulseX(0);
  }

  private sendPulseX(x: number): void{
    for (let y = 0; y < this.squaresPerColumn; y++){
      this.squares[y * this.squaresPerRow + x].draw();
    }

    if (x < this.squaresPerRow - 1){
      this.wait(this.animationSpeed).then(() => this.sendPulseX(x + 1));
    }
  }

  private changeSquareColors(color: string): void{
    this.squares.forEach(square => {
      square.color = Math.random() < 1 / this.squareGraying ? color : this.bgColor;
    });
  }

  private calculateOptimalSquareSize(): void {
    const size = this.cWidth / this.squaresPerRow;
    this.squareSize = size;
    this.squares = [];
    this.squaresPerColumn = Math.ceil(this.cHeight / size);
    const distanceBetweenSquares = 6; // in px
    for (let y = 0; y < this.squaresPerColumn; y++){
      for (let x = 0; x < this.squaresPerRow; x++){
        this.squares.push(new Square(
          x * size + x * distanceBetweenSquares,
          y * size + y * distanceBetweenSquares,
          this.ctx, '#ffffff',
          this.squareSize));
      }
    }
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', () => {
      this.cWidth = window.innerWidth;
      this.cHeight = window.innerHeight;
      this.canvas.width = this.cWidth;
      this.canvas.height = this.cHeight;
      this.calculateOptimalSquareSize();
    });
  }

  private clearRect(): void{
    this.ctx.fillStyle = this.bgColor;
    this.ctx.globalAlpha = this.clearSpeed;
    this.ctx.fillRect(0, 0, this.cWidth, this.cHeight);
    this.ctx.globalAlpha = 1;
  }

  private blackRect(): void {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.cWidth, this.cHeight);
  }

  render(): void{
    requestAnimationFrame(() => {
      this.render();
    });
    this.clearRect();
  }

  wait(ms: number): Promise < any > {
    return new Promise(res => setTimeout(res, ms));
  }
}

export class Square {
  constructor(
    private x: number,
    private y: number,
    private ctx: CanvasRenderingContext2D,
    public color: string,
    private size: number,
    ){
  }

  draw(): void{
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}
