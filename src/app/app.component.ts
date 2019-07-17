import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DataVisualizationApp';

  private data: any;
  private options: any;

  getData() {
    return [
      { "CountryName": "China", "Pop1995": 1216, "Pop2005": 1297, "Pop2015": 1361, "Pop2025": 1394 },
      { "CountryName": "India", "Pop1995": 920, "Pop2005": 1090, "Pop2015": 1251, "Pop2025": 1396 },
      { "CountryName": "United States", "Pop1995": 266, "Pop2005": 295, "Pop2015": 322, "Pop2025": 351 },
      { "CountryName": "Indonesia", "Pop1995": 197, "Pop2005": 229, "Pop2015": 256, "Pop2025": 277 },
      { "CountryName": "Brazil", "Pop1995": 161, "Pop2005": 186, "Pop2015": 204, "Pop2025": 218 }
    ];
  }

  getChartAxes() {
    return [
      {
        name: "NameAxis",
        type: "categoryX",
        title: "Country",
        label: "CountryName"
      },
      {
        name: "PopulationAxis",
        type: "numericY",
        minimumvalue: 0,
        title: "Milions of People"
      }
    ]
  };

  getChartSeries(){
    return  [
        {
            name: "2015Population",
            type: "column",
            isHighlightingEnabled: true,
            isTransitionInEnabled: true,
            xAxis: "NameAxis",
            yAxis: "PopulationAxis",
            valueMemberPath: "Pop2015"
        },
         {
             name: "2025Population",
             type: "column",
             isHighlightingEnabled: true,
             isTransitionInEnabled: true,
             xAxis: "NameAxis",
             yAxis: "PopulationAxis",
             valueMemberPath: "Pop2025"
         }
    ]
};


  getChartOptions() {
    return {
      width: "100%",
      dataSource: this.data,
      axes: this.getChartAxes(),
      series: this.getChartSeries()
    };
  };


  ngOnInit() {
    this.data = this.getData();
    this.options = this.getChartOptions();
  };

}