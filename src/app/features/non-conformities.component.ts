import { Component } from '@angular/core';
import { FieldOpsDataService } from '../core/fieldops-data.service';
import { NonConformityRecord } from '../core/models';

@Component({selector:'app-non-conformities',templateUrl:'./non-conformities.component.html',styleUrls:['./feature-page.css'],standalone:false})
export class NonConformitiesComponent {
  search='';severityFilter='Todas';
  constructor(public readonly data:FieldOpsDataService){}
  get filtered():NonConformityRecord[]{return this.data.nonConformities.filter(item=>(this.severityFilter==='Todas'||item.severity===this.severityFilter)&&[item.code,item.title,item.equipment,item.owner].some(v=>v.toLowerCase().includes(this.search.toLowerCase())));}
}
