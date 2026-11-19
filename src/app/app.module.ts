import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientsComponent } from './clients/clients.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { UsersComponent } from './users/users.component';
import { InspectionsComponent } from './inspections/inspections.component';
import { ReviewComponent } from './review/review.component';
import { NonConformitiesComponent } from './non-conformities/non-conformities.component';
import { TemplatesComponent } from './inspection templates/templates.component';
import { TemplateEditorComponent } from './inspection templates/templateId/edit/editor.component';
import { NewTemplateComponent } from './inspection templates/templateId/new/new-template.component';
import { NewStandardComponent } from './inspection templates/templateId/new/nova-nr.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../login/cadastro/register.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, ClientsComponent, EquipmentComponent, UsersComponent,
    InspectionsComponent, ReviewComponent, NonConformitiesComponent, TemplatesComponent, TemplateEditorComponent,
    NewTemplateComponent, NewStandardComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, NgbModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
