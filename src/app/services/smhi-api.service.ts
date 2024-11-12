import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ForecastValue } from '../models/forecast-value.model';

@Injectable({
  providedIn: 'root'
})
export class SmhiApiService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.weatherUrl;

  getAllForecasts(): Observable<ForecastValue[]> {
    // console.log(this.baseUrl);
    const url = this.baseUrl + '/Weather/getforecasts';
    return this.http.get<ForecastValue[]>(url);  
  }

  getCurrentForecast():Observable<ForecastValue>{
    const url = this.baseUrl + '/Weather/getcurrentforecast';
    return this.http.get<ForecastValue>(url);  
  }
}
