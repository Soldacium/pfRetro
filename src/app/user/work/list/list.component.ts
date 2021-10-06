import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppType } from '@shared/models/app-type.model';
import { App } from '@shared/models/app.model';
import { AnimationService } from '../animation.service';
import { Apps } from '../apps';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  currentApp = 0;
  apps: App[] = Apps;
  appTypesList: AppType[] = ['Project', 'Python', 'Web'];

  mouse = {
    x: 0,
    y: 0
  };

  constructor() { }

  ngOnInit(): void {
    this.setupMouse();
  }

  ngAfterViewInit(): void {
    this.setupApps();
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

  setupMouse(): void{
    window.addEventListener('mousemove', (e) => {
      this.mouse = {
        x: e.x,
        y: e.y
      };
    });
  }

  setupApps(): void{
    this.apps.forEach((app, i) => {
      const appElement = document.getElementById(`app-${i}`) as HTMLDivElement;
      console.log(appElement.offsetWidth);
      const hoverScale = 1.5;
      appElement.addEventListener('mousemove', (e) => {
        appElement.style.transform = `
        perspective(1000px)
        translateZ(${hoverScale * 100}px)
        rotateY(${((this.mouse.x - (appElement.getBoundingClientRect().left + appElement.offsetWidth * hoverScale / 2)) / appElement.offsetWidth * hoverScale / 2) * 20}deg)
        rotateX(${((this.mouse.y - (appElement.getBoundingClientRect().top + appElement.offsetHeight * hoverScale / 2)) / appElement.offsetHeight * hoverScale / 2) * (-20)}deg)`;
      }); //
    });
  }

  hoverElement(elementNumber: number): void{
    console.log(elementNumber);
  }

}
