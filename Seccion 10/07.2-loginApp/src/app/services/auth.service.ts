import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyArHBjyY6AUds_AyyxeQuL39NyAPt_dDK8';
  userToken: string;
  // crear - https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // login - https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) { 
    this.leerToken();
  }

  login( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url}signInWithPassword?key=${ this.apiKey }`,
      authData
    ).pipe( map( resp => {
      this.guardarToken( resp['idToken']);
      return resp;
    })
    );
  }

  logout() {

    localStorage.removeItem('token');
  }

  nuevoUsuario( usuario: UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url}signUp?key=${ this.apiKey }`,
      authData
    ).pipe( map( resp => {
      this.guardarToken( resp['idToken']);
      return resp;
    })
    );

  }

  private guardarToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem( 'expira', hoy.getTime().toString() );
  }

  leerToken() {

    if( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {

    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiracion = new Date();
    expiracion.setTime(expira);

    if ( expiracion > new Date() ) {
        return true;
    } else {
      return false;
    }
  }
}
