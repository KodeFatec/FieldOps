import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectionTemplate } from '../core/models';
import { FieldOpsDataService } from '../core/fieldops-data.service';

@Component({selector:'app-template-editor',templateUrl:'./template-editor.component.html',styleUrls:['./feature-page.css'],standalone:false})
export class TemplateEditorComponent implements OnInit {
  template:InspectionTemplate={id:0,name:'',category:'Mecânica & Sistemas Rotativos',version:1,updatedAt:'',sections:[{title:'Identificação do equipamento',items:['Conferir identificação e número de série']}]};
  saved=false;
  constructor(private readonly route:ActivatedRoute,private readonly router:Router,private readonly data:FieldOpsDataService){}
  ngOnInit():void{
    const id=Number(this.route.snapshot.paramMap.get('templateId'));
    const existing=this.data.templates.find(item=>item.id===id);
    if(existing)this.template=JSON.parse(JSON.stringify(existing)) as InspectionTemplate;
  }
  addSection():void{this.template.sections.push({title:`Nova seção ${this.template.sections.length+1}`,items:['Novo item de verificação']});}
  removeSection(index:number):void{if(this.template.sections.length>1)this.template.sections.splice(index,1);}
  addItem(index:number):void{this.template.sections[index].items.push('Novo item de verificação');}
  removeItem(sectionIndex:number,itemIndex:number):void{this.template.sections[sectionIndex].items.splice(itemIndex,1);}
  save():void{
    if(!this.template.name.trim()||this.template.sections.some(s=>!s.title.trim()||s.items.some(i=>!i.trim())))return;
    this.data.saveTemplate({...this.template,version:this.template.id?this.template.version+1:1});
    this.saved=true;
    void this.router.navigate(['/app/inspection-templates']);
  }
}
