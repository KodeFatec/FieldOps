import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({selector:'app-root',template:'<router-outlet></router-outlet>',standalone:false})
export class AppComponent implements OnInit {
  constructor(private readonly router:Router) {}
  ngOnInit():void {
    this.setTheme(this.router.url);
    this.router.events.pipe(filter((event):event is NavigationEnd=>event instanceof NavigationEnd))
      .subscribe(event=>this.setTheme(event.urlAfterRedirects));
  }
  private setTheme(url:string):void {
    document.documentElement.setAttribute('data-bs-theme',url==='/login'||url==='/register'?'light':'dark');
  }
}
