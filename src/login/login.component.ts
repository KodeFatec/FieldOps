// @ts-nocheck
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
 selector:'app-login',
 templateUrl:'./index.html',
 styleUrls:['./styles.css'],
 standalone:false
})
export class LoginComponent implements AfterViewInit {
 constructor(private readonly router:Router) {}
 ngAfterViewInit():void {
  const password=document.getElementById('password');
  const passwordToggle=document.getElementById('passwordToggle');
  passwordToggle?.addEventListener('click',()=>{
    const isHidden=password.type==='password';
    password.type=isHidden?'text':'password';
    passwordToggle.setAttribute('aria-label',isHidden?'Ocultar senha':'Mostrar senha');
    passwordToggle.innerHTML=`<i class="bi ${isHidden?'bi-eye-slash':'bi-eye'}" aria-hidden="true"></i>`;
  });
  document.getElementById('loginForm')?.addEventListener('submit',(event)=>{
    event.preventDefault();
    const form=event.currentTarget;
    form.classList.add('was-validated');
    if(!form.checkValidity())return;
    void this.router.navigate(['/app/dashboard']);
  });
 }
}
