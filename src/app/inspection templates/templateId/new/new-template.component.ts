import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeMenuBase } from '../../../menu-base/menu-base.behavior';
import { initializeNewTemplate } from './new-template.behavior';

@Component({selector:'app-new-template',templateUrl:'./index.html',styleUrls:['./styles.css'],standalone:false})
export class NewTemplateComponent implements AfterViewInit {
  constructor(private readonly router: Router) {}
  ngAfterViewInit(): void {
    initializeMenuBase();
    initializeNewTemplate(url => void this.router.navigateByUrl(url));
  }
}
