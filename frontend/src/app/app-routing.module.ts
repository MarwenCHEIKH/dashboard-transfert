import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth.guard';
import { CreateVfdComponent } from './pages/vfd/manage-vfd/create-vfd/create-vfd.component';
import { MoveVfdComponent } from './pages/vfd/manage-vfd/move-vfd/move-vfd.component';
import { UpdateVfdComponent } from './pages/vfd/manage-vfd/update-vfd/update-vfd.component';
import { DeleteVfdComponent } from './pages/vfd/manage-vfd/delete-vfd/delete-vfd.component';
import { ManageVfdComponent } from './pages/vfd/manage-vfd/manage-vfd.component';
import { ManageModelsComponent } from './pages/models/manage-models/manage-models.component';
import { CreateModelComponent } from './pages/models/manage-models/create-model/create-model.component';
import { UpdateModelComponent } from './pages/models/manage-models/update-model/update-model.component';
import { DeleteModelComponent } from './pages/models/manage-models/delete-model/delete-model.component';
import { DeleteParamsComponent } from './pages/models/manage-models/update-model/delete-params/delete-params.component';
import { ManageRulesComponent } from './pages/decision-rules/manage-rules.component';
import { CreateRuleComponent } from './pages/decision-rules/manage-rules/create-rule/create-rule.component';
import { UpdateRuleComponent } from './pages/decision-rules/manage-rules/update-rule/update-rule.component';
import { CreateRuleTableComponent } from './pages/rule-tables/manage-rule-tables/manage-rule-tables/create-rule-table/create-rule-table.component';
import { ManageRuleTablesComponent } from './pages/rule-tables/manage-rule-tables/manage-rule-tables/manage-rule-tables.component';
import { UpdateRuleTableComponent } from './pages/rule-tables/manage-rule-tables/manage-rule-tables/update-rule-table/update-rule-table.component';
import { ManageCgateGroupsComponent } from './pages/cgateGroups/manage-cgate-groups/manage-cgate-groups.component';
import { CreateCgateGroupComponent } from './pages/cgateGroups/manage-cgate-groups/create-cgate-group/create-cgate-group.component';
import { UpdateCgateGroupComponent } from './pages/cgateGroups/manage-cgate-groups/update-cgate-group/update-cgate-group.component';
import { ManageCgatesComponent } from './pages/cgates/manage-cgates/manage-cgates.component';
import { CreateCgateComponent } from './pages/cgates/manage-cgates/create-cgate/create-cgate.component';
import { UpdateCgateComponent } from './pages/cgates/manage-cgates/update-cgate/update-cgate.component';
import { ManageSitesComponent } from './pages/sites/manage-sites/manage-sites.component';
import { CreateLocalSiteComponent } from './pages/sites/local-sites/manage-local-sites/create-local-site/create-local-site.component';
import { UpdateLocalSiteComponent } from './pages/sites/local-sites/manage-local-sites/update-local-site/update-local-site.component';
import { CreateRemoteSiteComponent } from './pages/sites/remote-sites/create-remote-site/create-remote-site.component';
import { UpdateRemoteSiteComponent } from './pages/sites/remote-sites/update-remote-site/update-remote-site.component';
import { InformationPartenaireComponent } from './components/information-partenaire/information-partenaire.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AnnuaireComponent } from './components/annuaire/annuaire.component';
import { ConnectToServerComponent } from './pages/connect-to-server/connect-to-server.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'connect', component: ConnectToServerComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'info-partenaires',
        component: InformationPartenaireComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'annuaire',
        component: AnnuaireComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'manage-vfd',
    component: ManageVfdComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create-vfd',
        component: CreateVfdComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update-vfd',
        component: UpdateVfdComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'move-vfd',
        component: MoveVfdComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'delete-vfd',
        component: DeleteVfdComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'manage-models',
    component: ManageModelsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create-model',
        component: CreateModelComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update-model/modify',
        component: UpdateModelComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update-model/delete',
        component: DeleteParamsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'delete-model',
        component: DeleteModelComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'manage-rules',
    component: ManageRulesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create-rule',
        component: CreateRuleComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update-rule',
        component: UpdateRuleComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'manage-rule-tables',
    component: ManageRuleTablesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create-table',
        component: CreateRuleTableComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update-table',
        component: UpdateRuleTableComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'manage-cgateGroups',
    component: ManageCgateGroupsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create-cgateGroup',
        component: CreateCgateGroupComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update-cgateGroup',
        component: UpdateCgateGroupComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'manage-cgates',
    component: ManageCgatesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create-cgate',
        component: CreateCgateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update-cgate',
        component: UpdateCgateComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'manage-cgates',
    component: ManageCgatesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create-cgate',
        component: CreateCgateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update-cgate',
        component: UpdateCgateComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'manage-sites',
    component: ManageSitesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'create-localSite',
        component: CreateLocalSiteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update-localSite',
        component: UpdateLocalSiteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create-remoteSite',
        component: CreateRemoteSiteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'update-remoteSite',
        component: UpdateRemoteSiteComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
