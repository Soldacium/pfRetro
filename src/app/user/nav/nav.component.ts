import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  showMenu = false;
  colorSpread =  40;
  squares = Array(140).fill(0);
  selectedOption = 1;
  options = ['Work', 'Contact', 'Blog', 'Doodles'];

  constructor(public router: Router) { }

  ngOnInit(): void {
    this.randomiseSquareColors();
    this.bindKeys();
  }

  randomiseSquareColors(): void {
    for (let i = 0; i < 84; i++){
      this.squares[i] = Math.floor(Math.random() * this.colorSpread);
    }
  }

  bindKeys(): void{
    window.addEventListener('keydown', e => {
      if (this.showMenu){
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
      }
    });
  }

  nextOption(): void{
    if (this.selectedOption < this.options.length - 1){
      this.selectedOption += 1;
    }else{
      this.selectedOption = 0;
    }
  }

  previousOption(): void{
    if (this.selectedOption > 0){
      this.selectedOption -= 1;
    }else{
      this.selectedOption = this.options.length - 1;
    }
  }

  hoverOption(optionNumber: number): void{
    this.selectedOption = optionNumber;
  }

}
