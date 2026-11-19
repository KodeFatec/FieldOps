import { AfterViewInit, Component } from '@angular/core';
import { initializeMenuBase } from '../menu-base/menu-base.behavior';
import { initializeDashboardPage } from './dashboard.behavior';

@Component({
  selector: 'app-dashboard',
  templateUrl: './index.html',
  styleUrls: ['./styles.css'],
  standalone: false
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initializeMenuBase();
    initializeDashboardPage();
  }
  selecionarEquipamento(...args: any[]): void {
    const fn = (window as any).selecionarEquipamento;
    if (fn) fn(...args);
  }
  printPage(): void { window.print(); }
  showAlert(message: string): void { window.alert(message); }
}
