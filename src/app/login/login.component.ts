import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UsuarioService} from '../services/usuario/usuario.service';
import {Usuario} from '../models/usuario.model';

declare function  init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  auth2: any = []; // The Sign-In object.

  constructor(public router: Router,
              public usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.GoogleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  GoogleInit() {
    gapi.load( 'auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '588911111713-abg4dp5hvs2tbf0kb2i5tabthvrtavdt.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn( document.getElementById('btnGoogle') );
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
     // const profile = googleUser.getBasicProfile();
      const token = googleUser.Zi.id_token;
      this.usuarioService.loginGoogle(token).subscribe(res => {
        window.location.href = '#/dashboard';
       // this.router.navigate(['/dashboard']) ;
        }
      );
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    const usuario =  new Usuario(null, forma.value.email, forma.value.password);
    this.usuarioService.login(usuario, forma.value.recuerdame).subscribe(correcto => this.router.navigate(['/dashboard'])) ;
  }
}
