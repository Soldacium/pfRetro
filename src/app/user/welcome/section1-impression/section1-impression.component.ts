import { Component, OnInit } from '@angular/core';
import { AnimationService } from './animation.service';

@Component({
  selector: 'app-section1-impression',
  templateUrl: './section1-impression.component.html',
  styleUrls: ['./section1-impression.component.scss']
})
export class Section1ImpressionComponent implements OnInit {

  canvas!: HTMLCanvasElement;
  options = ['Work', 'Contact', 'Blog', 'Doodles'];
  selectedOption = -1;
  constructor(private animationEngine: AnimationService) { }

  ngOnInit(): void {
    this.initAnimation();
    this.nextOption();
    this.bindKeys();
  }

  bindKeys(): void{
    window.addEventListener('keydown', e => {
      console.log(e);
      switch (e.key) {
        case 'ArrowDown':
          this.nextOption();
          break;
        case 'ArrowUp':
          this.previousOption();
          break;
        case 's':
          this.nextOption();
          break;
        case 'w':
          this.previousOption();
          break;
        case 'Enter':
          break;
        default:
          break;
      }
    });
  }

  nextOption(): void{
    if (this.selectedOption < this.options.length - 1){
      this.selectedOption += 1;
    }else{
      this.selectedOption = 0;
    }
    this.animationEngine.changeColors(this.selectedOption);
  }

  previousOption(): void{
    if (this.selectedOption > 0){
      this.selectedOption -= 1;
    }else{
      this.selectedOption = this.options.length - 1;
    }
    this.animationEngine.changeColors(this.selectedOption);
  }

  hoverOption(optionNumber: number): void{
    this.selectedOption = optionNumber;
    this.animationEngine.changeColors(this.selectedOption);
  }

  initAnimation(): void{
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.animationEngine.init(this.canvas);
    this.animationEngine.animate();
  }

}
