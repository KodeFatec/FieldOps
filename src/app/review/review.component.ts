import { AfterViewInit, Component } from '@angular/core';
import { initializeMenuBase } from '../menu-base/menu-base.behavior';

@Component({selector:'app-review',templateUrl:'./index.html',styleUrls:['./styles.css'],standalone:false})
export class ReviewComponent implements AfterViewInit {
  
  ngAfterViewInit(): void {
    initializeMenuBase();
    
  }
}
