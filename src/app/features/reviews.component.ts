import { Component } from '@angular/core';
import { FieldOpsDataService } from '../core/fieldops-data.service';

@Component({selector:'app-reviews',templateUrl:'./reviews.component.html',styleUrls:['./feature-page.css'],standalone:false})
export class ReviewsComponent {
  selectedId='INS-2026-017';message='';
  constructor(public readonly data:FieldOpsDataService){}
  get pending(){return this.data.inspections.filter(item=>item.status==='Aguardando revisão');}
  select(id:string):void{this.selectedId=id;this.message='';}
  approve():void{this.data.updateInspection(this.selectedId,'Aprovada');this.message='Inspeção aprovada no estado demonstrativo.';}
  reject():void{this.data.updateInspection(this.selectedId,'Reprovada');this.message='Inspeção reprovada no estado demonstrativo.';}
}
