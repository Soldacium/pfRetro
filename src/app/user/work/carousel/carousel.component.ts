import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppType } from '@shared/models/app-type.model';
import { App } from '@shared/models/app.model';
import { AnimationService } from '../animation.service';
import { Apps } from '../apps';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {

  currentAppId = 0;
  apps: App[] = Apps;
  currentApp = this.apps[0];
  appTypesList: AppType[] = ['Project', 'Python', 'Web'];
  mouse = {
    x: 0,
    y: 0
  };
  color = '';
  virtualScroll = 0;

  @Input()
  appNumberSize = 0;

  @Input()
  totalSize = 0;

  constructor(private animationEngine: AnimationService){
  }

  ngOnInit(): void {
    this.setupMouse();
    this.setupKeys();
  }

  ngAfterViewInit(): void {
    this.setupApps();
  }

  nextApp(): void {
    this.currentAppId < this.apps.length ? this.currentAppId += 1 : console.log('no');
    this.setCurrentAppToCurrent();
  }

  prevApp(): void {
    this.currentAppId > 0 ? this.currentAppId -= 1 : console.log('no');
    this.setCurrentAppToCurrent();
  }

  focusOn(appNumber: number): void{
    this.currentAppId = appNumber;
    this.setCurrentAppToCurrent();
  }

  setCurrentAppToCurrent(): void{
    this.currentApp = this.apps[this.currentAppId];
    const accentNum = this.getTypeNumber(this.currentApp.type);
    console.log(accentNum);
    this.color = getComputedStyle(document.documentElement)
    .getPropertyValue(`--colorAccent${accentNum}`)
    .toLocaleLowerCase()
    .trim();
    this.animationEngine.pulse(this.color);
  }

  getAbsolute(num: number): number{
    if (Math.abs(num) < 0){
      return 0;
    }
    return Math.abs(num);
  }

  goToappNumber(appNumber: number): void {
    this.currentAppId = appNumber;
  }

  getTypeNumber(type: string): number{
    let typeNum = -1;
    this.appTypesList.forEach((appType, i) => {
      if (type === appType){
        typeNum = i;
      }
    });
    return typeNum + 1;
  }

  setupMouse(): void{
    window.addEventListener('mousemove', (e) => {
      this.mouse = {
        x: e.x,
        y: e.y
      };
    });

    const scrollNeeded = 200;
    window.addEventListener('wheel', (e) => {
      if (this.virtualScroll + e.deltaY >= 0 && this.virtualScroll + e.deltaY < this.apps.length * scrollNeeded - 100){
        this.virtualScroll += e.deltaY;
        if (this.virtualScroll % scrollNeeded === 0){
          this.focusOn(Math.floor(this.virtualScroll / scrollNeeded));
        }
      }
      console.log(this.virtualScroll);
    });
  }

  setupApps(): void{
    this.apps.forEach((app, i) => {
      const appElement = document.getElementById(`app-${i}`) as HTMLDivElement;
      console.log(appElement.offsetWidth);
      const hoverScale = 1;
      appElement.addEventListener('mousemove', (e) => {
          appElement.style.transform = `
          perspective(1000px)
          translateZ(${hoverScale * 400}px)
          rotateY(${((this.mouse.x - (appElement.getBoundingClientRect().left + appElement.offsetWidth * hoverScale / 2)) / appElement.offsetWidth * hoverScale / 2) * 20}deg)
          rotateX(${((this.mouse.y - (appElement.getBoundingClientRect().top + appElement.offsetHeight * hoverScale / 2)) / appElement.offsetHeight * hoverScale / 2) * (-20)}deg)`;
      }); //
    });
  }

  setupKeys(): void {
    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowDown':
          this.nextApp();
          break;
        case 'ArrowUp':
          this.prevApp();
          break;
        case 's':
          this.nextApp();
          break;
        case 'w':
          this.prevApp();
          break;
        case 'Enter':
          break;
        default:
          break;
      }
    });
  }

}
