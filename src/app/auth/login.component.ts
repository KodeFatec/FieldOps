import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({ selector:'app-login', templateUrl:'./login.component.html', styleUrls:['./auth.component.css'], standalone:false })
export class LoginComponent {
  email = '';
  password = '';
  remember = true;
  showPassword = false;
  submitted = false;
  constructor(private readonly router: Router) {}
  submit(): void {
    this.submitted = true;
    if (!this.email.trim() || !this.password) return;
    // O protótipo original não possuía API de autenticação; este fluxo continua demonstrativo.
    void this.router.navigate(['/app/dashboard']);
  }
}
