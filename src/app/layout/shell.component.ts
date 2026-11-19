import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
  standalone: false
})
export class ShellComponent {
  collapsed = false;
  mobileMenuOpen = false;
  constructor(private readonly router: Router) {}
  toggleSidebar(): void { this.collapsed = !this.collapsed; }
  toggleMobileMenu(): void { this.mobileMenuOpen = !this.mobileMenuOpen; }
  closeMobileMenu(): void { this.mobileMenuOpen = false; }
  logout(): void { void this.router.navigate(['/login']); }
}
