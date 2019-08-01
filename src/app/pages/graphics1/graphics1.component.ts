import { Component, OnInit } from '@angular/core';
import {ChartType} from 'chart.js';
import {Label, MultiDataSet} from 'ng2-charts';

@Component({
  selector: 'app-graphics1',
  templateUrl: './graphics1.component.html',
  styles: []
})
export class Graphics1Component implements OnInit {
  private titulo1: string;
  private titulo2: string;
  private titulo3: string;
  private titulo4: string;


  constructor() { }

 public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  graficos: any = {
    grafico1: {
      labels: ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      data:  [24, 30, 46],
      type: 'doughnut',
      leyenda: 'El pan se come con'
    },
    grafico2: {
      labels: ['Hombres', 'Mujeres'],
      data:  [4500, 6000],
      type: 'doughnut',
      leyenda: 'Entrevistados'
    },
    grafico3: {
      labels: ['Si', 'No'],
      data:  [95, 5],
      type: 'doughnut',
      leyenda: '¿Le dan gases los frijoles?'
    },
    grafico4: {
      labels: ['No', 'Si'],
      data:  [85, 15],
      type: 'doughnut',
      leyenda: '¿Le importa que le den gases?'
    },
  };
  private GraficType: string;
  private Grafic4Data: MultiDataSet;
  private Grafic4Labels: Label[];
  private Grafic3Data: MultiDataSet;
  private Grafic3Labels: Label[];
  private Grafic2Data: MultiDataSet;
  private Grafic2Labels: Label[];
  private Grafic1Data: MultiDataSet;
  private Grafic1Labels: Label[];

  ngOnInit() {
    this.GraficType = this.graficos.grafico1.type;
    this.Grafic1Labels = this.graficos.grafico1.labels;
    this.Grafic1Data = this.graficos.grafico1.data;
    this.titulo1 = this.graficos.grafico1.leyenda;

    this.Grafic2Labels = this.graficos.grafico2.labels;
    this.Grafic2Data = this.graficos.grafico2.data;
    this.titulo2 = this.graficos.grafico2.leyenda;

    this.Grafic3Labels = this.graficos.grafico3.labels;
    this.Grafic3Data = this.graficos.grafico3.data;
    this.titulo3 = this.graficos.grafico3.leyenda;

    this.Grafic4Labels = this.graficos.grafico4.labels;
    this.Grafic4Data = this.graficos.grafico4.data;
    this.titulo4 = this.graficos.grafico4.leyenda;

  }
}
