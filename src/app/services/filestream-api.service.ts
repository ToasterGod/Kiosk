import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { FilestreamValue } from '../models/filestream-value.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilestreamApiService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.calendarUrl;

  getAllFiles(): Observable<FilestreamValue[]> {
    // console.log(this.baseUrl);
    const url = this.baseUrl + '/events/upcoming';
    return this.http.get<FilestreamValue[]>(url);
  }
}
