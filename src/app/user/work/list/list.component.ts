import { Component, OnInit } from '@angular/core';
import { AppType } from '@shared/models/app-type.model';
import { App } from '@shared/models/app.model';
import { Apps } from '../apps';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  currentApp = 0;
  apps: App[] = Apps;
  appTypesList: AppType[] = ['Project', 'Python', 'Web'];

  constructor() { }

  ngOnInit(): void {
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
