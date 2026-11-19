import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({selector:'app-standard-picker',templateUrl:'./standard-picker.component.html',styleUrls:['./feature-page.css'],standalone:false})
export class StandardPickerComponent {
  readonly standards=[
    {code:'NR-10',title:'Segurança em instalações e serviços em eletricidade',category:'Elétrica & Automação'},
    {code:'NR-12',title:'Segurança no trabalho em máquinas e equipamentos',category:'Mecânica & Sistemas Rotativos'},
    {code:'NR-13',title:'Caldeiras, vasos de pressão, tubulações e tanques',category:'Mecânica & Sistemas Rotativos'},
    {code:'NR-18',title:'Segurança e saúde no trabalho na construção',category:'Construção Civil'},
    {code:'NR-33',title:'Segurança e saúde em espaços confinados',category:'Segurança do Trabalho'},
    {code:'NR-35',title:'Trabalho em altura',category:'Segurança do Trabalho'}
  ];
  selected=this.standards[0].code;
  constructor(private readonly router:Router){}
  useStandard():void{void this.router.navigate(['/app/inspection-templates/new'],{queryParams:{standard:this.selected}});}
}
