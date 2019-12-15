import { Injectable } from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import Swal from 'sweetalert2';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SubirArchivoService} from '../subir-archivo/subir-archivo.service';
import {tryCatch} from 'rxjs/internal-compatibility';
import {Observable, throwError} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(public http: HttpClient,
              public router: Router,
              public subirArchivoService: SubirArchivoService) { this.loadToken(); }

  LogOut() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('usuario');
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'menu' );

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

      }), catchError( err => {
        Swal.fire(err.message, err.statusText, 'error');
        return throwError(err);
      }));
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    console.log(url);
    return this.http.post(url, {token}).pipe(
      map( (resp: any) => {
        console.log(resp);
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      })
    );
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
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
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }), catchError( err => {
        Swal.fire('Error en el login', err.error.mensaje, 'error');
        return throwError(err);
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
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
      .pipe(map( (resp: any) => {
        if (usuario._id === this.usuario._id) {
          const usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }

        Swal.fire({
          type: 'success',
          title: 'Usuario actualizado',
          text: usuario.nombre
        });

        return true;
      }), catchError( err => {
        Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err);
      }));
  }

  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then( (resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire({
          title: 'Imagen actualizada',
          text: this.usuario.img,
          type: 'success'
        });
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch( resp => {
        console.log(resp);
    });
  }

  cargarUsuarios(desde: number) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuario(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/Usuario/' + termino;
    return this.http.get(url)
      .pipe(map( (resp: any) => resp.Usuario));
  }

  borrarUsuario(id: string) {
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete(url)
      .pipe(map(resp => {
        Swal.fire({
          title: 'Usuario borrado',
          text: 'Usuario borrado correctamente',
          type: 'success'
        });
      }));
  }
}
