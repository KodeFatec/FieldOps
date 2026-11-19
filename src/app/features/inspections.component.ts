import { Component } from '@angular/core';
import { InspectionRecord } from '../core/models';
import { FieldOpsDataService } from '../core/fieldops-data.service';

@Component({selector:'app-inspections',templateUrl:'./inspections.component.html',styleUrls:['./feature-page.css'],standalone:false})
export class InspectionsComponent {
  search='';statusFilter='Todos';
  constructor(public readonly data:FieldOpsDataService){}
  get filtered():InspectionRecord[]{return this.data.inspections.filter(i=>(this.statusFilter==='Todos'||i.status===this.statusFilter)&&[i.id,i.client,i.equipment,i.technician].some(v=>v.toLowerCase().includes(this.search.toLowerCase())));}
  statusClass(status:string):string{return status==='Aprovada'?'status-success':status==='Reprovada'?'status-danger':status==='Em andamento'?'status-info':'status-warning';}
}
