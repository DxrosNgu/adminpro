import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graphics1Component} from './graphics1/graphics1.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PromesasComponent} from './promesas/promesas.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {AdminGuard, LoginGuardGuard, VerificaTokenGuard} from '../services/service.index';
import {ProfileComponent} from './profile/profile.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {HospitalesComponent} from './hospitales/hospitales.component';
import {MedicosComponent} from './medicos/medicos.component';
import {MedicoComponent} from './medicos/medico.component';
import {BusquedaComponent} from './busqueda/busqueda.component';

const pagesRoutes: Routes = [
      {path: 'dashboard',
        component: DashboardComponent,
        canActivate: [VerificaTokenGuard],
        data: {titulo: 'Dashboard'}
      },
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
      {path: 'graficas1', component: Graphics1Component, data: {titulo: 'Graficos'} },
      {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
      {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajuste del Tema'} },
      {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
      {path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'}},
      {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'} },
      // Mantenimientos
      {
        path: 'usuarios',
        component: UsuariosComponent,
        data: {titulo: 'Mantenimiento de Usuarios'},
        canActivate: [AdminGuard]
        },
      {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
      {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'}},
      {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Medico'}},
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'}


];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);
