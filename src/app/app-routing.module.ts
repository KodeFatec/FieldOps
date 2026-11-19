import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'app', redirectTo: 'app/dashboard', pathMatch: 'full' },
  { path: 'app/dashboard', component: DashboardComponent },
  { path: 'app/clients', component: ClientsComponent },
  { path: 'app/equipment', component: EquipmentComponent },
  { path: 'app/users', component: UsersComponent },
  { path: 'app/inspections', component: InspectionsComponent },
  { path: 'app/review', component: ReviewComponent },
  { path: 'app/non-conformities', component: NonConformitiesComponent },
  { path: 'app/inspection-templates', component: TemplatesComponent },
  { path: 'app/inspection-templates/new/edit', component: TemplateEditorComponent },
  { path: 'app/inspection-templates/new', component: NewTemplateComponent },
  { path: 'app/inspection-templates/new-nr', component: NewStandardComponent },
  { path: 'app/inspection-templates/:templateId/edit', component: TemplateEditorComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
