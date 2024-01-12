import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateVfdComponent } from './pages/vfd/manage-vfd/create-vfd/create-vfd.component';
import { UpdateVfdComponent } from './pages/vfd/manage-vfd/update-vfd/update-vfd.component';
import { MoveVfdComponent } from './pages/vfd/manage-vfd/move-vfd/move-vfd.component';
import { DeleteVfdComponent } from './pages/vfd/manage-vfd/delete-vfd/delete-vfd.component';
import { VFDToolbarComponent } from './pages/vfd/vfd-toolbar/vfd-toolbar.component';
import { ManageVfdComponent } from './pages/vfd/manage-vfd/manage-vfd.component';
import { ManageModelsComponent } from './pages/models/manage-models/manage-models.component';
import { CreateModelComponent } from './pages/models/manage-models/create-model/create-model.component';
import { UpdateModelComponent } from './pages/models/manage-models/update-model/update-model.component';
import { DeleteModelComponent } from './pages/models/manage-models/delete-model/delete-model.component';
import { ModelsToolbarComponent } from './pages/models/models-toolbar/models-toolbar.component';
import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { DeleteParamsComponent } from './pages/models/manage-models/update-model/delete-params/delete-params.component';
import { ManageRulesComponent } from './pages/decision-rules/manage-rules.component';
import { CreateRuleComponent } from './pages/decision-rules/manage-rules/create-rule/create-rule.component';
import { RulesToolbarComponent } from './pages/decision-rules/rules-toolbar/rules-toolbar/rules-toolbar.component';
import { UpdateRuleComponent } from './pages/decision-rules/manage-rules/update-rule/update-rule.component';
import { CreateRuleTableComponent } from './pages/rule-tables/manage-rule-tables/manage-rule-tables/create-rule-table/create-rule-table.component';
import { RuleTableToolbarComponent } from './pages/rule-tables/rule-table-toolbar/rule-table-toolbar.component';
import { ManageRuleTablesComponent } from './pages/rule-tables/manage-rule-tables/manage-rule-tables/manage-rule-tables.component';
import { RuleDetailsModalComponent } from './pages/rule-tables/rule-details-modal/rule-details-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UpdateRuleTableComponent } from './pages/rule-tables/manage-rule-tables/manage-rule-tables/update-rule-table/update-rule-table.component';
import { AlertComponent } from './components/alert-component/alert.component';
import { ManageCgateGroupsComponent } from './pages/cgateGroups/manage-cgate-groups/manage-cgate-groups.component';
import { CgateToolbarComponent } from './pages/cgates/cgate-toolbar/cgate-toolbar.component';
import { CgateGroupToolbarComponent } from './pages/cgateGroups/cgateGroup-toolbar/cgateGroup-toolbar.component';
import { CreateCgateGroupComponent } from './pages/cgateGroups/manage-cgate-groups/create-cgate-group/create-cgate-group.component';
import { UpdateCgateGroupComponent } from './pages/cgateGroups/manage-cgate-groups/update-cgate-group/update-cgate-group.component';
import { ManageCgatesComponent } from './pages/cgates/manage-cgates/manage-cgates.component';
import { CreateCgateComponent } from './pages/cgates/manage-cgates/create-cgate/create-cgate.component';
import { UpdateCgateComponent } from './pages/cgates/manage-cgates/update-cgate/update-cgate.component';
import { SitesToolbarComponent } from './pages/sites/sites-toolbar/sites-toolbar.component';
import { CreateLocalSiteComponent } from './pages/sites/local-sites/manage-local-sites/create-local-site/create-local-site.component';
import { UpdateLocalSiteComponent } from './pages/sites/local-sites/manage-local-sites/update-local-site/update-local-site.component';
import { ManageSitesComponent } from './pages/sites/manage-sites/manage-sites.component';
import { CreateRemoteSiteComponent } from './pages/sites/remote-sites/create-remote-site/create-remote-site.component';
import { UpdateRemoteSiteComponent } from './pages/sites/remote-sites/update-remote-site/update-remote-site.component';
import { AgGridModule } from 'ag-grid-angular';
import { InformationPartenaireComponent } from './components/information-partenaire/information-partenaire.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AnnuaireComponent } from './components/annuaire/annuaire.component';
import { ModeleCommunicationComponent } from './components/modele-communication/modele-communication.component';
import { ConnectToServerComponent } from './pages/connect-to-server/connect-to-server.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    HomeComponent,
    CreateVfdComponent,
    UpdateVfdComponent,
    MoveVfdComponent,
    DeleteVfdComponent,
    VFDToolbarComponent,
    ManageVfdComponent,
    ManageModelsComponent,
    CreateModelComponent,
    UpdateModelComponent,
    DeleteModelComponent,
    ModelsToolbarComponent,
    DeleteParamsComponent,
    ManageRulesComponent,
    CreateRuleComponent,
    RulesToolbarComponent,
    UpdateRuleComponent,
    CreateRuleTableComponent,
    RuleTableToolbarComponent,
    ManageRuleTablesComponent,
    RuleDetailsModalComponent,
    UpdateRuleTableComponent,
    AlertComponent,
    ManageCgateGroupsComponent,
    CgateToolbarComponent,
    CreateCgateGroupComponent,
    UpdateCgateGroupComponent,
    ManageCgatesComponent,
    CreateCgateComponent,
    CgateGroupToolbarComponent,
    UpdateCgateComponent,
    SitesToolbarComponent,
    CreateLocalSiteComponent,
    UpdateLocalSiteComponent,
    ManageSitesComponent,
    CreateRemoteSiteComponent,
    UpdateRemoteSiteComponent,
    InformationPartenaireComponent,
    NavbarComponent,
    DashboardComponent,
    AnnuaireComponent,
    ModeleCommunicationComponent,
    ConnectToServerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AgGridModule,
  ],
  providers: [BsDropdownConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
