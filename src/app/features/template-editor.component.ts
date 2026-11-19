import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectionTemplate } from '../core/models';
import { FieldOpsDataService } from '../core/fieldops-data.service';

@Component({selector:'app-template-editor',templateUrl:'./template-editor.component.html',styleUrls:['./feature-page.css'],standalone:false})
export class TemplateEditorComponent implements OnInit {
  template:InspectionTemplate={id:0,name:'',category:'Mecânica & Sistemas Rotativos',version:1,updatedAt:'',sections:[{title:'Identificação do equipamento',items:['Conferir identificação e número de série']}]};
  saved=false;
  private readonly standardSeeds:Record<string,{title:string;category:string;description:string;sections:Array<{title:string;items:string[]}>}>={
    'NR-10':{title:'Segurança em instalações e serviços em eletricidade',category:'Elétrica & Automação',description:'Checklist inicial para instalações e serviços em eletricidade.',sections:[{title:'Condições da instalação',items:['Identificação e sinalização de circuitos e painéis','Integridade de cabos, conexões e invólucros']},{title:'Proteções e documentação',items:['Condição de barreiras e dispositivos de proteção','Diagramas e registros aplicáveis disponíveis']},{title:'Segurança da atividade',items:['EPI e EPC previstos disponíveis','Área de trabalho sinalizada e acesso controlado']}]},
    'NR-12':{title:'Segurança no trabalho em máquinas e equipamentos',category:'Mecânica & Sistemas Rotativos',description:'Checklist inicial para máquinas e equipamentos.',sections:[{title:'Proteções da máquina',items:['Proteções fixas e móveis presentes','Dispositivos de intertravamento acessíveis']},{title:'Comandos e operação',items:['Comandos identificados','Parada de emergência acessível']}]},
    'NR-13':{title:'Caldeiras, vasos de pressão, tubulações e tanques',category:'Mecânica & Sistemas Rotativos',description:'Checklist inicial para equipamentos abrangidos pela NR-13.',sections:[{title:'Identificação e documentação',items:['Identificação do equipamento legível','Prontuário e registros de inspeção disponíveis']},{title:'Integridade aparente',items:['Verificar corrosão, vazamento ou deformação','Inspecionar suportes e conexões']}]},
    'NR-18':{title:'Segurança e saúde no trabalho na construção',category:'Construção Civil',description:'Checklist inicial para canteiros de obras.',sections:[{title:'Organização do canteiro',items:['Circulação e acessos desobstruídos','Áreas de vivência organizadas']},{title:'Proteção coletiva',items:['Aberturas protegidas contra quedas','Proteções coletivas nas frentes de trabalho']}]},
    'NR-33':{title:'Segurança e saúde em espaços confinados',category:'Segurança do Trabalho',description:'Checklist de apoio à preparação de entrada em espaço confinado.',sections:[{title:'Preparação e autorização',items:['Espaço identificado e acesso controlado','Permissão de Entrada e Trabalho preparada']},{title:'Avaliação e monitoramento',items:['Avaliação atmosférica antes da entrada','Comunicação e monitoramento definidos']}]},
    'NR-35':{title:'Trabalho em altura',category:'Segurança do Trabalho',description:'Checklist inicial para atividades com risco de queda.',sections:[{title:'Planejamento da atividade',items:['Análise de risco e autorização disponíveis','Condições climáticas avaliadas']},{title:'Acesso e proteção',items:['Acessos e proteções coletivas em condições de uso','Sistema individual contra quedas adequado']}]}
  };
  constructor(private readonly route:ActivatedRoute,private readonly router:Router,private readonly data:FieldOpsDataService){}
  ngOnInit():void{
    const id=Number(this.route.snapshot.paramMap.get('templateId'));
    const existing=this.data.templates.find(item=>item.id===id);
    if(existing){this.template=JSON.parse(JSON.stringify(existing)) as InspectionTemplate;return;}
    const standard=this.route.snapshot.queryParamMap.get('standard');
    const seed=standard?this.standardSeeds[standard]:undefined;
    if(seed){this.template={id:0,name:`Checklist ${standard} — ${seed.title}`,category:seed.category,version:1,updatedAt:'',sections:seed.sections.map(section=>({title:section.title,items:[...section.items]}))};}
  }
  addSection():void{this.template.sections.push({title:`Nova seção ${this.template.sections.length+1}`,items:['Novo item de verificação']});}
  removeSection(index:number):void{if(this.template.sections.length>1)this.template.sections.splice(index,1);}
  addItem(index:number):void{this.template.sections[index].items.push('Novo item de verificação');}
  removeItem(sectionIndex:number,itemIndex:number):void{this.template.sections[sectionIndex].items.splice(itemIndex,1);}
  save():void{
    if(!this.template.name.trim()||this.template.sections.some(section=>!section.title.trim()||section.items.some(item=>!item.trim())))return;
    this.data.saveTemplate({...this.template,version:this.template.id?this.template.version+1:1});
    this.saved=true;
    void this.router.navigate(['/app/inspection-templates']);
  }
}