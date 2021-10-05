import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppType } from '@shared/models/app-type.model';
import { App } from '@shared/models/app.model';
import { Apps } from '../apps';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  currentApp = 0;
  apps: App[] = Apps;
  appTypesList: AppType[] = ['Project', 'Python', 'Web'];

  @Input()
  appNumberSize = 0;

  @Input()
  totalSize = 0;

  ngOnInit(): void {
    // this.setappNumbers();
  }

  nextApp(): void {
    this.currentApp < this.apps.length ? this.currentApp += 1 : console.log('no');
  }

  prevApp(): void {
    this.currentApp > 0 ? this.currentApp -= 1 : console.log('no');
  }

  focusOn(appNumber: number): void{
    this.currentApp = appNumber;
  }

  getAbsolute(num: number): number{
    if (Math.abs(num) < 0){
      return 0;
    }
    return Math.abs(num);
  }

  goToappNumber(appNumber: number): void {
    this.currentApp = appNumber;
  }

  getTypeNumber(type: string): number{
    let typeNum = -1;
    this.appTypesList.forEach((appType, i) => {
      if (type === appType){
        typeNum = i;
      }
    });
    return typeNum;
  }


}
