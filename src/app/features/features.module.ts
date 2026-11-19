import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModalModule, NgbPaginationModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard.component';
import { ClientsComponent } from './clients.component';
import { UsersComponent } from './users.component';
import { EquipmentComponent } from './equipment.component';
import { InspectionsComponent } from './inspections.component';
import { ReviewsComponent } from './reviews.component';
import { TemplatesComponent } from './templates.component';
import { TemplateEditorComponent } from './template-editor.component';
import { StandardPickerComponent } from './standard-picker.component';
import { NonConformitiesComponent } from './non-conformities.component';

@NgModule({
 declarations:[DashboardComponent,ClientsComponent,UsersComponent,EquipmentComponent,InspectionsComponent,ReviewsComponent,TemplatesComponent,TemplateEditorComponent,StandardPickerComponent,NonConformitiesComponent],
 imports:[CommonModule,FormsModule,RouterModule,NgbModalModule,NgbPaginationModule,NgbDropdownModule]
})
export class FeaturesModule {}
