import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IgDataChartComponent } from 'igniteui-angular2';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    IgDataChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
