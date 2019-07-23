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
  dataChart = [];
  currentMonth = new Date().getMonth();
  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  subscription: Subscription;
  statusText: string;


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
    this.service.getOutputPotatoes().subscribe(data => 
      this.dataChart.push(JSON.parse(JSON.stringify(data))
      , error => console.log(error)))
    
      console.log(this.dataChart)
  }

  public canvas: any;
  public ctx;
  public chartColor;
  // public chartEmail;
  // public chartHours;

  ngOnInit() {

    //setInterval(this.getData(), 1000);

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

    var dataFirst = {
      data: this.dataChart,
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var dataSecond = {
      data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
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
      datasets: [dataFirst, dataSecond]
    };

    var chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });
  }

}
