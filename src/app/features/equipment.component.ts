import { Component } from '@angular/core';
import { EquipmentRecord } from '../core/models';
import { FieldOpsDataService } from '../core/fieldops-data.service';

@Component({selector:'app-equipment',templateUrl:'./equipment.component.html',styleUrls:['./feature-page.css'],standalone:false})
export class EquipmentComponent {
  search='';statusFilter='Todos';selected:EquipmentRecord|null=null;
  constructor(public readonly data:FieldOpsDataService){}
  get filtered():EquipmentRecord[]{return this.data.equipment.filter(e=>(this.statusFilter==='Todos'||e.status===this.statusFilter)&&[e.code,e.name,e.client,e.location].some(v=>v.toLowerCase().includes(this.search.toLowerCase())));}
  get operationalCount():number{return this.data.equipment.filter(item=>item.status==='Operacional').length;}
  get maintenanceCount():number{return this.data.equipment.filter(item=>item.status==='Em manutenção').length;}
  get pendingCount():number{return this.data.equipment.filter(item=>item.status==='Pendente de inspeção').length;}
  select(item:EquipmentRecord):void{this.selected=item;}
}