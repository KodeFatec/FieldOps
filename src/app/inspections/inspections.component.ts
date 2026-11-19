import { AfterViewInit, Component } from '@angular/core';
import { initializeMenuBase } from '../menu-base/menu-base.behavior';

@Component({selector:'app-inspections',templateUrl:'./index.html',styleUrls:['./styles.css'],standalone:false})
export class InspectionsComponent implements AfterViewInit {
  
  ngAfterViewInit(): void {
    initializeMenuBase();
    
  }
}
