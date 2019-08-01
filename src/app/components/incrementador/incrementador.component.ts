import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() porcentaje: number = 50;

  @Output('cambioValor') cambioValor: EventEmitter<number> = new EventEmitter();
  constructor() {

  }

  ngOnInit() {
    console.log('Leyenda', this.leyenda);
    console.log('Progreso', this.porcentaje);
  }

  CambiarValor( valor: number ) {
    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }
    if (this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    }
    this.porcentaje = this.porcentaje + valor;
    this.cambioValor.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus();
  }

  onChange(newValue: number) {

  //  const elemHTML: any = document.getElementsByName('porcentaje')[0];

    if (newValue >= 100) {
      this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }
   // elemHTML.value = Number(this.porcentaje);
    this.txtProgress.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
  }

}
