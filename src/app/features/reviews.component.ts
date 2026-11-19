import { Component } from '@angular/core';
import { InspectionRecord } from '../core/models';
import { FieldOpsDataService } from '../core/fieldops-data.service';

@Component({selector:'app-reviews',templateUrl:'./reviews.component.html',styleUrls:['./feature-page.css'],standalone:false})
export class ReviewsComponent {
  selectedId='INS-2026-017';message='';
  constructor(public readonly data:FieldOpsDataService){}
  get pending():InspectionRecord[]{return this.data.inspections.filter(item=>item.status==='Aguardando revisão');}
  get selectedInspection():InspectionRecord|undefined{return this.data.inspections.find(item=>item.id===this.selectedId);}
  select(id:string):void{this.selectedId=id;this.message='';}
  approve():void{this.data.updateInspection(this.selectedId,'Aprovada');this.message='Inspeção aprovada no estado demonstrativo.';}
  reject():void{this.data.updateInspection(this.selectedId,'Reprovada');this.message='Inspeção reprovada no estado demonstrativo.';}
}