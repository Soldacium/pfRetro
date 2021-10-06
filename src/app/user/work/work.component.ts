import { Component, OnInit } from '@angular/core';
import { AnimationService } from './animation.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  options = ['List', 'Carousel'];
  selectedOption = 1;
  canvas!: HTMLCanvasElement;

  constructor(private animationEngine: AnimationService) { }

  ngOnInit(): void {
    this.setupCanvas();
  }

  setupCanvas(): void{
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.animationEngine.init(this.canvas);
    this.animationEngine.render();
    this.animationEngine.pulse('#aaaaaa');
  }

  selectOption(option: number): void {
    this.selectedOption = option;
  }

}
