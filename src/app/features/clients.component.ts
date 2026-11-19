import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientRecord } from '../core/models';
import { FieldOpsDataService } from '../core/fieldops-data.service';

@Component({selector:'app-clients',templateUrl:'./clients.component.html',styleUrls:['./feature-page.css'],standalone:false})
export class ClientsComponent {
  @ViewChild('editor',{static:true}) editor!:TemplateRef<unknown>;
  search='';statusFilter='Todos';draft:ClientRecord=this.emptyClient();
  constructor(public readonly data:FieldOpsDataService,private readonly modal:NgbModal){}
  get filtered():ClientRecord[]{return this.data.clients.filter(c=>(this.statusFilter==='Todos'||c.status===this.statusFilter)&&[c.name,c.code,c.cnpj,c.email].some(v=>v.toLowerCase().includes(this.search.toLowerCase())));}
  private emptyClient():ClientRecord{return {id:0,code:'',name:'',legalName:'',cnpj:'',email:'',phone:'',segment:'Manufatura',status:'Ativo',manager:'Mariana Souza'};}
  create():void{this.draft=this.emptyClient();this.modal.open(this.editor,{size:'lg',centered:true});}
  edit(client:ClientRecord):void{this.draft={...client};this.modal.open(this.editor,{size:'lg',centered:true});}
  save(modal:NgbActiveModal):void{if(!this.draft.name.trim()||!this.draft.email.trim()||!this.draft.cnpj.trim())return;this.data.saveClient(this.draft);modal.close();}
  toggle(client:ClientRecord):void{this.data.toggleClientStatus(client.id);}
}
