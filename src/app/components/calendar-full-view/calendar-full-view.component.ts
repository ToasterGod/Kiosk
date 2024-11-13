import { Component, inject } from '@angular/core';
import { CalendarValue } from '../../models/calendar-value.model';
import { CalendarService } from '../../services/calendar.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar-full-view',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './calendar-full-view.component.html',
  styleUrl: './calendar-full-view.component.scss'
})
export class CalendarFullViewComponent {
  private api = inject(CalendarService);
  public events?: CalendarValue[] = [];
  
  ngOnInit() {
    this.getEvents();
  }
  
  calculateLocale(date: Date) {
    date = new Date(date);
    var offset = date.getTimezoneOffset() * -1;
    date.setTime(date.getTime() + offset * 60000);
    return date;
  }
  
  getEvents() {
    this.api.getAllEvents().then((events) => {
      console.log(events);
      this.events = events;
    });
  }
}
