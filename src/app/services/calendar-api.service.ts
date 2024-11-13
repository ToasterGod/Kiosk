import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { CalendarValue } from '../models/calendar-value.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarApiService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.calendarUrl;

  getAllEvents(): Observable<CalendarValue[]> {
    // console.log(this.baseUrl);
    const url = this.baseUrl + '/events/upcoming';
    return this.http.get<CalendarValue[]>(url);
  }
}
