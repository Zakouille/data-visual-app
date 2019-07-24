import { Component, OnInit } from '@angular/core';
import { GettingDataService } from '../getting-data.service';
import Chart from 'chart.js';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import 'chartjs-plugin-zoom';
import * as moment from 'moment';

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
  currentDay = new Date().getDate();
  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  now = moment();
  timeFormat = 'MM/DD/YYYY HH:mm';


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

  resetZoomChart() {
    this.lineChart.resetZoom();
  }

   randomScalingFactor() {
    return Math.round(Math.random() * 100 * (Math.random() > 0.5 ? -1 : 1));
  }
   randomColorFactor() {
    return Math.round(Math.random() * 255);
  }
   randomColor(opacity) {
    return 'rgba(' + this.randomColorFactor() + ',' + this.randomColorFactor() + ',' + this.randomColorFactor() + ',' + (opacity || '.3') + ')';
  }
  newDate(days) {
    var day = this.now.clone().add(days, 'd').toDate();
    console.log(day)
    return day
  }

  newMonth() {

    var month = []

    for (var i = 1; i <= 31; i++) {
      month.push(this.newDate(i))
    }

    // console.log(month)
  }

   newDateString(days) {
    return this.now.clone().add(days, 'd').format(this.timeFormat);
  }

  public canvas: any;
  public ctx;
  public chartColor;

  ngOnInit() {

    //setInterval(this.getData(), 1000);

    this.getOutputPotatoes();

    // this.newMonth()

    var dayOfMonth = []
    var hourOfDay = []

    console.log(this.currentDay)
    for (var i = 1; i <= this.currentDay; i++) {
      dayOfMonth.push(i)
    }

    for (var i = 0; i <= 24; i++) {
      hourOfDay.push(i)
    }

    this.subscription = timer(0, 2000).pipe(
      switchMap(() => this.service.getData())
    ).subscribe(result => this.dataToPrint = JSON.parse(JSON.stringify(result))
      , error => console.log(error));

    this.chartColor = "#FFFFFF";

    var speedCanvas = document.getElementById("speedChart");

    var data = {
      data: this.dataChart,
      fill: false,
      borderColor: '#081e26',
      backgroundColor: 'transparent',
      pointBorderColor: '#081e26',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };


    var speedData = {
      labels: dayOfMonth,
      datasets: [data]

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
            mode: 'x',
          },
        }
      }
    }
  
    var arrayOfDay = []

    for (var i = 0; i < 31; i++) {
      arrayOfDay.push(this.newDate(i))
    }

    var arrayOfData = []

    for (var i = 0; i < 100; i++) {
      arrayOfData.push(this.randomScalingFactor())
    }

    var config = {
			type: 'line',
			data: {
				labels: arrayOfDay, // Date Objects
				datasets: [{
					label: 'Potatoes',
					data: arrayOfData,
					fill: false,
          borderColor: '#081e26',
      backgroundColor: 'transparent',
      pointBorderColor: '#081e26',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,        
        }, ]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Chart.js Time Scale'
				},
				scales: {
					xAxes: [{
						type: 'time',
						time: {
							parser: this.timeFormat,
							// round: 'day'
							tooltipFormat: 'll HH:mm'
						},
						scaleLabel: {
							display: true,
							labelString: 'Date'
						},
						ticks: {
							maxRotation: 0
						}
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'value'
						}
					}]
				},
				plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x'
            },
            zoom: {
              enabled: true,
              mode: 'x',
            },
          }
        }
			}
		};


    // this.lineChart = new Chart(speedCanvas, {
    //   type: 'line',
    //   hover: false,
    //   data: speedData,
    //   options: config
    // });

    this.lineChart = new Chart(speedCanvas, config);

  }

}
