import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { DataService } from 'src/app/services/data.service';
import { BaseChartDirective } from 'ng2-charts';

const questionLevelLabel = {
  5: 'All Problems',
  1: 'Top 10 Problems',
  3: 'Top 25 Problems',
};

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  questionLevelLabel = questionLevelLabel;
  public doughnutChartLabels: string[] = [
    'Easy Solved',
    'Medium Solved',
    'Hard Solved',
    'Unsolved',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: this.dataService.statsChartData,
        backgroundColor: ['#22a467', '#f89f2d', '#f53738', '#4a4a4a'],
        borderWidth: 0,
      },
    ],
  };
  public doughnutChartType: ChartConfiguration<'doughnut'>['type'] = 'doughnut';
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '85%',
  };

  constructor(public dataService: DataService) {
    this.dataService.statsUpdateEvent.subscribe((status: boolean) => {
      this.doughnutChartData.datasets[0].data = this.dataService.statsChartData;
      this.chart?.chart?.update();
    });
  }
}
