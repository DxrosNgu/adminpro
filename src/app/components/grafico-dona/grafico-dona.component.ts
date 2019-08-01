import {Component, Input, OnInit} from '@angular/core';
import {Color, Label, MultiDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input('titulo') leyenda: string = 'Leyenda';

  @Input() doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  @Input() doughnutChartType: ChartType = 'doughnut';
  doughnutColor: Color[] = [{backgroundColor: ['rgb(99, 191, 63)', 'rgb(231, 61, 39)', 'rgb(39, 55, 231)']}];
  constructor() { }

  ngOnInit() {
      // console.log(this.doughnutChartLabels);
  }

}
