import { AfterViewInit, Component } from '@angular/core';
import { initializeMenuBase } from '../menu-base/menu-base.behavior';
import { initializeNonConformitiesPage } from './script';

@Component({selector:'app-non-conformities',templateUrl:'./index.html',styleUrls:['./styles.css'],standalone:false})
export class NonConformitiesComponent implements AfterViewInit {
  
  ngAfterViewInit(): void {
    initializeMenuBase();
    initializeNonConformitiesPage();
  }
}
