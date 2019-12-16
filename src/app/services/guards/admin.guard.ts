import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate  {
  constructor(public usuarioService: UsuarioService,
              public router: Router) {}

  canActivate() {
    if (this.usuarioService.usuario.role === 'ADMIN_ROLE' ) {
      return true;
    } else {
      console.log('Bloqueado por el ADMIN GUARD');
      this.usuarioService.LogOut();
      return false;
    }
  }
}
