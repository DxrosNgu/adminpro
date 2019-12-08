import { Component, OnInit } from '@angular/core';
import {Hospital} from '../../models/hospitales.model';
import {HospitalService} from '../../services/hospital/hospital.service';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this.modalUploadService.notificacion
      .subscribe(resp => this.cargarHospitales());
  }

  cargarHospitales() {

    this.cargando = true;

    this.hospitalService.cargarHospitales( this.desde )
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.hospitales = resp;
        this.cargando = false;
      });
  }

  cambiarDesde( valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  actualizarImagen(id: string) {
    this.modalUploadService.mostrarModal('hospitales', id);
  }

  guardarHospital(hospital: Hospital, nameHospital: string) {
    hospital.nombre = nameHospital;
    this.hospitalService.actualizarHospital(hospital)
      .subscribe();
  }

  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta a punto de eliminar a ' + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, seguro!'
    }).then((borrar) => {
      console.log(borrar);
      if (borrar.value) {
        this.hospitalService.borrarHospital(hospital._id).subscribe(resp => {
          this.cargarHospitales();
        });
      }
    });
  }

  crearHospital() {
    Swal.fire({
      title: 'Crear un hospital',
      text: 'Escriba el nombre del hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Crear Hospital!'
    }).then((response ) => {

      if (!response.value || response.value.length === 0) {
        return;
      }

      this.hospitalService.crearHospital(response.value).subscribe( () => { this.cargarHospitales(); });

    });
  }
  buscarHospitales(descripcion: string) {
    if (descripcion.length <= 0) {
      this.cargarHospitales();
    }

    this.cargando = true;
    this.hospitalService.buscarHospital(descripcion)
      .subscribe( (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
    this.cargando = false;
  }

}
