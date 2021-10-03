import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  options = ['Carousel', 'List'];
  selectedOption = 0;

  constructor() { }

  ngOnInit(): void {
  }

  selectOption(option: number): void {
    this.selectedOption = option;
  }

}
