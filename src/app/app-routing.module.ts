import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { DashboardComponent } from './features/dashboard.component';
import { ClientsComponent } from './features/clients.component';
import { UsersComponent } from './features/users.component';
import { EquipmentComponent } from './features/equipment.component';
import { InspectionsComponent } from './features/inspections.component';
import { ReviewsComponent } from './features/reviews.component';
import { TemplatesComponent } from './features/templates.component';
import { TemplateEditorComponent } from './features/template-editor.component';
import { StandardPickerComponent } from './features/standard-picker.component';
import { NonConformitiesComponent } from './features/non-conformities.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'app',
    component: ShellComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'equipment', component: EquipmentComponent },
      { path: 'inspections', component: InspectionsComponent },
      { path: 'inspections/:inspectionId/review', component: ReviewsComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'inspection-templates', component: TemplatesComponent },
      { path: 'inspection-templates/new', component: TemplateEditorComponent },
      { path: 'inspection-templates/new-standard', component: StandardPickerComponent },
      { path: 'inspection-templates/:templateId/edit', component: TemplateEditorComponent },
      { path: 'non-conformities', component: NonConformitiesComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
