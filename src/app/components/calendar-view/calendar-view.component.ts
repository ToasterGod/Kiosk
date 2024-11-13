import { Component, inject } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { CalendarValue } from '../../models/calendar-value.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss'
})
export class CalendarViewComponent {
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
      this.events = events;
    });
  }
}
