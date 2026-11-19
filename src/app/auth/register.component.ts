import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({ selector:'app-register', templateUrl:'./register.component.html', styleUrls:['./auth.component.css'], standalone:false })
export class RegisterComponent {
  name = '';
  email = '';
  company = '';
  role = 'Técnico';
  password = '';
  accepted = false;
  showPassword = false;
  submitted = false;
  constructor(private readonly router: Router) {}
  submit(): void {
    this.submitted = true;
    if (!this.name.trim() || !this.email.trim() || !this.company.trim() || !this.password || !this.accepted) return;
    // A solicitação é apenas demonstrativa até existir um serviço de cadastro no backend.
    void this.router.navigate(['/login']);
  }
}
