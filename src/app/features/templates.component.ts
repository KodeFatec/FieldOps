import { Component } from '@angular/core';
import { FieldOpsDataService } from '../core/fieldops-data.service';

@Component({selector:'app-templates',templateUrl:'./templates.component.html',styleUrls:['./feature-page.css'],standalone:false})
export class TemplatesComponent {
  search='';
  constructor(public readonly data:FieldOpsDataService){}
  get filtered(){return this.data.templates.filter(t=>[t.name,t.category].some(v=>v.toLowerCase().includes(this.search.toLowerCase())));}
}
