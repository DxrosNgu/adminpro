import { Injectable } from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient,
              public router: Router) { this.loadToken(); }

  LogOut() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('usuario');
    localStorage.removeItem( 'token' );

    this.router.navigate( ['/login']);
  }

  CrearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario' ;
    return this.http.post(url, usuario)
      .pipe(map((res: any) => {
        Swal.fire({
          type: 'success',
          title: 'Usuario Creado',
          text: usuario.email
        });
        return res.usuario;

      }));
  }

  loginGoogle(token: string){
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token}).pipe(
      map( (resp: any) => {
        console.log(resp);
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }
  login(usuario: Usuario, recordar: boolean) {
    const url = URL_SERVICIOS + '/login';
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(url, usuario)
      .pipe(map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }

  InLoging() {
    if (this.token == null) {
      return false;
    }
    return (this.token.length > 5);
  }

  loadToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }

  }
}
