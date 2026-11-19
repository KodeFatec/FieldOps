import { AfterViewInit, Component } from '@angular/core';
import { initializeMenuBase } from '../menu-base/menu-base.behavior';
import { initializeClientsPage } from './script';

@Component({
  selector: 'app-clients',
  templateUrl: './index.html',
  styleUrls: ['./styles.css'],
  standalone: false
})
export class ClientsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initializeMenuBase();
    initializeClientsPage();
  }
  selecionarEquipamento(...args: any[]): void {
    const fn = (window as any).selecionarEquipamento;
    if (fn) fn(...args);
  }
  printPage(): void { window.print(); }
  showAlert(message: string): void { window.alert(message); }
}
