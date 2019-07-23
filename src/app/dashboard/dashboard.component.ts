import { Component, OnInit } from '@angular/core';
import { GettingDataService } from '../getting-data.service';
import Chart from 'chart.js';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dataToPrint = Object;
  lineChart: Chart;
  dataChart = [];
  currentMonth = new Date().getMonth();
  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  subscription: Subscription;

  constructor(private service: GettingDataService) {
  }

  getData() {
    this.service.getData().subscribe(data =>
      this.dataToPrint = JSON.parse(JSON.stringify(data))
      , error => console.log(error));
    console.log("hello");
    return this.dataToPrint;
  }


  getOutputPotatoes() {
    var data = []
    this.service.getOutputPotatoes().subscribe(data => data.forEach(element => {
      this.dataChart.push(element)
      this.updateChart()
    }), error => console.log(error))

  }

  updateChart() {
    this.lineChart.update();
  }

  public canvas: any;
  public ctx;
  public chartColor;

  ngOnInit() {

    //setInterval(this.getData(), 1000);

    this.getOutputPotatoes();

    var dayOfMonth = []

    for (var i = 1; i <= 31; i++) {
      dayOfMonth.push(i)
    }

    this.subscription = timer(0, 2000).pipe(
      switchMap(() => this.service.getData())
    ).subscribe(result => this.dataToPrint = JSON.parse(JSON.stringify(result))
      , error => console.log(error));

    this.chartColor = "#FFFFFF";

    var speedCanvas = document.getElementById("speedChart");

    var one = [0, 5, 10, 12, 10, 27, 60, 12, 42, 45, 50, 65]

    var dataFirst = {
      data: this.dataChart,
      fill: false,
      borderColor: '#081e26',
      backgroundColor: 'transparent',
      pointBorderColor: '#081e26',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };


     var two = [0, 5, 10, 0, 20, 27, 30, 34, 42, 45, 55, 63]

    var dataSecond = {
      data: two,
      fill: false,
      borderColor: '#51CACF',
      backgroundColor: 'transparent',
      pointBorderColor: '#51CACF',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    var speedData = {
      labels: dayOfMonth,
      datasets: [dataFirst]
    };

    var chartOptions = {
      legend: {
        display: false,
        position: 'top'
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'y'
          },
          zoom: {
            enabled: true,
            mode: 'xy'
          }
        }
      }
    }

    this.lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });

  }

}
