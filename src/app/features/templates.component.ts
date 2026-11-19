import { Component } from '@angular/core';
import { InspectionTemplate } from '../core/models';
import { FieldOpsDataService } from '../core/fieldops-data.service';

@Component({selector:'app-templates',templateUrl:'./templates.component.html',styleUrls:['./feature-page.css'],standalone:false})
export class TemplatesComponent {
  search='';
  constructor(public readonly data:FieldOpsDataService){}
  get filtered():InspectionTemplate[]{return this.data.templates.filter(t=>[t.name,t.category].some(v=>v.toLowerCase().includes(this.search.toLowerCase())));}
  itemCount(template:InspectionTemplate):number{return template.sections.reduce((total,section)=>total+section.items.length,0);}
}