import { AfterViewInit, Component } from '@angular/core';
import { initializeMenuBase } from '../../../menu-base/menu-base.behavior';
import { initializeNewTemplate } from './new-template.behavior';

@Component({selector:'app-new-template',templateUrl:'./index.html',styleUrls:['./styles.css'],standalone:false})
export class NewTemplateComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initializeMenuBase();
    initializeNewTemplate();
  }
}
