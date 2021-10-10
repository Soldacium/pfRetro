import { Component, OnInit } from '@angular/core';
import { AnimationService } from './animation.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [AnimationService]
})
export class PostComponent implements OnInit {

  canvas!: HTMLCanvasElement;

  constructor(private animationEngine: AnimationService) { }

  ngOnInit(): void {
    this.initCanvas();
  }

  initCanvas(): void{
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.animationEngine.init(this.canvas);
    this.animationEngine.render();

  }

}
