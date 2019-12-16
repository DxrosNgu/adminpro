import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService,
              public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    console.log('Inicio de verificación');
    const token = this.usuarioService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirado = this.tokenExpirado(payload.exp);
    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.tokenRenovado( payload.exp);
  }

  tokenRenovado(fechaExp: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const tokenExp = new Date(fechaExp * 1000); // Esta en minisegundos por eso se multiplica por 1000
      const ahora = new Date();

      ahora.setTime( ahora.getTime() + (1 * 60 * 60 * 1000));
     if (tokenExp.getTime() > ahora.getTime()) {
       resolve(true);
     } else {
       this.usuarioService.renuevaToken()
         .subscribe( () => {
           resolve(true);
         }, () => {
           this.router.navigate(['/login']);
           reject(false);
         }) ;
     }

      resolve(true);
    });
  }

  tokenExpirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;
    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
  }
}
