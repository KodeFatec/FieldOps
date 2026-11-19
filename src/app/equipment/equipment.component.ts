import { AfterViewInit, Component } from '@angular/core';
import { initializeMenuBase } from '../menu-base/menu-base.behavior';
import { initializeEquipmentPage } from './script';

@Component({
  selector: 'app-equipment',
  templateUrl: './index.html',
  styleUrls: ['./styles.css'],
  standalone: false
})
export class EquipmentComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    initializeMenuBase();
    initializeEquipmentPage();
  }
  selecionarEquipamento(...args: any[]): void {
    const fn = (window as any).selecionarEquipamento;
    if (fn) fn(...args);
  }
  printPage(): void { window.print(); }
  showAlert(message: string): void { window.alert(message); }
}
