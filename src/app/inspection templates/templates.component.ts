import { AfterViewInit, Component } from '@angular/core';
import { initializeMenuBase } from '../menu-base/menu-base.behavior';
import { initializeTemplatesPage } from './script';
import { Router } from '@angular/router';

@Component({selector:'app-templates',templateUrl:'./index.html',styleUrls:['./styles.css'],standalone:false})
export class TemplatesComponent implements AfterViewInit {
  constructor(private readonly router: Router) {}
  ngAfterViewInit(): void {
    initializeMenuBase();
    initializeTemplatesPage(url => this.router.navigateByUrl(url));
  }
}
