import { AfterViewInit, Component } from '@angular/core';
import { initializeMenuBase } from '../menu-base/menu-base.behavior';
import { initializeUsersPage } from './script';

@Component({
  selector: 'app-users',
  templateUrl: './index.html',
  styleUrls: ['./styles.css'],
  standalone: false
})
export class UsersComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initializeMenuBase();
    initializeUsersPage();
  }
  selecionarEquipamento(...args: any[]): void {
    const fn = (window as any).selecionarEquipamento;
    if (fn) fn(...args);
  }
  printPage(): void { window.print(); }
  showAlert(message: string): void { window.alert(message); }
}
