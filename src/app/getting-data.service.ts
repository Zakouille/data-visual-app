import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GettingDataService {

  
  constructor(private http: HttpClient) { }

  //const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  public getData(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/generate/data');
  }

  public getOutputPotatoes(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/get/output/potatoes');
  }
}
