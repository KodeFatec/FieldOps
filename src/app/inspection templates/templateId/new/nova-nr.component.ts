import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeMenuBase } from '../../../menu-base/menu-base.behavior';
import { initializeNewStandard } from './new-standard.behavior';

@Component({selector:'app-new-standard',templateUrl:'./nova-nr.html',styleUrls:['./nova-nr.css'],standalone:false})
export class NewStandardComponent implements AfterViewInit {
  constructor(private readonly router: Router) {}
  ngAfterViewInit(): void {
    initializeMenuBase();
    initializeNewStandard(url => void this.router.navigateByUrl(url));
  }
}
