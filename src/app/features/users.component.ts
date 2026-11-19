import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRecord } from '../core/models';
import { FieldOpsDataService } from '../core/fieldops-data.service';

@Component({selector:'app-users',templateUrl:'./users.component.html',styleUrls:['./feature-page.css'],standalone:false})
export class UsersComponent {
  @ViewChild('editor',{static:true}) editor!:TemplateRef<unknown>;
  search='';roleFilter='Todos';draft:UserRecord=this.emptyUser();
  constructor(public readonly data:FieldOpsDataService,private readonly modal:NgbModal){}
  get filtered():UserRecord[]{return this.data.users.filter(u=>(this.roleFilter==='Todos'||u.role===this.roleFilter)&&[u.name,u.email,u.role].some(v=>v.toLowerCase().includes(this.search.toLowerCase())));}
  get activeCount():number{return this.data.users.filter(user=>user.status==='Ativo').length;}
  get technicianCount():number{return this.data.users.filter(user=>user.role==='Técnico').length;}
  get supervisorCount():number{return this.data.users.filter(user=>user.role==='Supervisor').length;}
  initials(name:string):string{
    const parts=name.trim().split(/\s+/).filter(Boolean);
    if(!parts.length)return '';
    return (parts[0].charAt(0)+(parts.length>1?parts[parts.length-1].charAt(0):'')).toUpperCase();
  }
  private emptyUser():UserRecord{return {id:0,name:'',email:'',phone:'',role:'Técnico',status:'Ativo',lastAccess:'Nunca acessou'};}
  create():void{this.draft=this.emptyUser();this.modal.open(this.editor,{centered:true});}
  edit(user:UserRecord):void{this.draft={...user};this.modal.open(this.editor,{centered:true});}
  save(modal:NgbActiveModal):void{if(!this.draft.name.trim()||!this.draft.email.trim())return;this.data.saveUser(this.draft);modal.close();}
  toggle(user:UserRecord):void{if(user.role==='Administrador'&&user.status==='Ativo')return;this.data.toggleUserStatus(user.id);}
}