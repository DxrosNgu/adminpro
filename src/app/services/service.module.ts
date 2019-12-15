import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AdminGuard,
  HospitalService,
  LoginGuardGuard,
  MedicoService,
  SettingsService,
  SharedService,
  SidebarService,
  SubirArchivoService,
  UsuarioService
} from './service.index';
import {HttpClientModule} from '@angular/common/http';
import {ModalUploadService} from '../components/modal-upload/modal-upload.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    LoginGuardGuard,
    AdminGuard,
    ModalUploadService,
    HospitalService,
    MedicoService
  ]
})
export class ServiceModule { }
