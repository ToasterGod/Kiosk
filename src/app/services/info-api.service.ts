import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { InfoValue } from '../models/info-value.model';

@Injectable({
  providedIn: 'root'
})
export class InfoApiService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.infoUrl;
  
  constructor() {}
  
  getAllEvents(): Observable<InfoValue[]> {
    console.log(this.baseUrl);
    const url = this.baseUrl + '/content';
    return this.http.get<InfoValue[]>(url);
  }
}
