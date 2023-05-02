import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'wal-operations-graphics',
  templateUrl: './operations-graphics.component.html',
  styleUrls: ['./operations-graphics.component.css']
})
export class OperationsGraphicsComponent implements OnInit, OnDestroy {


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input('barChar') barChartProps!: ChartData<'bar'>;

  public barChartOptions: ChartConfiguration<any>['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,

      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  // events
  public chartClicked({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }


  public chartHovered({event, active}: { event?: ChartEvent, active?: {}[] }): void {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  constructor() {

  }
}
