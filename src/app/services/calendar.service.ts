import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CalendarApiService } from './calendar-api.service';
import { CalendarValue } from '../models/calendar-value.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private api = inject(CalendarApiService);

  async getAllEvents(): Promise<CalendarValue[]> {
    return await lastValueFrom(this.api.getAllEvents());
  }
}
