import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {URL_SERVICIOS} from '../../config/config';
import {Hospital} from '../../models/hospitales.model';
import {Usuario} from '../../models/usuario.model';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {SubirArchivoService} from '../subir-archivo/subir-archivo.service';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  private totalHospitales: Hospital;

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService,
    public usuarioService: UsuarioService) {}

  cargarHospitales(desde: number) {
    let url: string;
    if (desde == null) {
      url = URL_SERVICIOS + '/hospital';
    } else {
      url = URL_SERVICIOS + '/hospital?desde=' + desde;
    }
    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
    }));
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
      .pipe(map((resp: any) => resp.hospital));
  }

  borrarHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.usuarioService.token;
    return this.http.delete(url)
      .pipe(map( (resp: any) => {
        Swal.fire({
          type: 'success',
          title: 'Hospital borrado',
          text: resp.hospital.nombre + ' fue eliminado correctamente'
        });
        return true;
      }));
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.usuarioService.token;
    return this.http.post(url, {nombre})
      .pipe(map( (resp: any) => {
        Swal.fire({
          type: 'success',
          titleText: 'Hospital Creado Correctamente',
          text: resp.hospital.nombre
        });
      }));
  }

  buscarHospital(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/Hospital/' + termino;
    return this.http.get(url)
      .pipe(map( (resp: any) =>  resp.Hospital
      ));
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.usuarioService.token;
    return this.http.put(url, hospital)
      .pipe(map((resp: any) => {
      Swal.fire({
        type: 'success',
        title: 'Hospital actualizado',
        text: hospital.nombre
      });

      return true;
    }));
  }
}
