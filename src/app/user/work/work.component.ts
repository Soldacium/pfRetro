import { Component, OnInit } from '@angular/core';
import { AnimationService } from './animation.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  options = ['Carousel', 'List'];
  selectedOption = 0;
  canvas!: HTMLCanvasElement;

  constructor(private animationEngine: AnimationService) { }

  ngOnInit(): void {
    this.setupCanvas();
  }

  setupCanvas(): void{
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    console.log(this.canvas);
    this.animationEngine.init(this.canvas);
    this.animationEngine.render();
  }

  selectOption(option: number): void {
    this.selectedOption = option;
  }

}
