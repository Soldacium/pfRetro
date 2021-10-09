import { Component, OnInit } from '@angular/core';
import { AnimationService } from './animation.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  tags = ['Python', 'Machine learning', 'Web development', 'Commercial', 'Tutorial', 'TIL', 'Doodles', 'Thoughts'];

  constructor(private animationEngine: AnimationService) { }

  ngOnInit(): void {
  }

}
