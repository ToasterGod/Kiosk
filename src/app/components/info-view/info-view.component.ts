import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { InfoValue } from '../../models/info-value.model';
import { InfoService } from '../../services/info.service';

@Component({
  selector: 'app-info-view',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './info-view.component.html',
  styleUrl: './info-view.component.scss'
})
export class InfoViewComponent {
  private api = inject(InfoService);
  public events?: InfoValue[] = [];

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
