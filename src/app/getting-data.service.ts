import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GettingDataService {

  
  constructor(private http: HttpClient) { }

  public getData(): Observable<any[]> {
    //console.log(environment.apiUrl + '/generate/data')
    return this.http.get<any[]>(environment.apiUrl + '/generate/data');
  }
}
