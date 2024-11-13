import { Component, inject } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NewsValue } from '../../models/news-value.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news-full-view',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './news-full-view.component.html',
  styleUrl: './news-full-view.component.scss'
})
export class NewsFullViewComponent {
  private api = inject(NewsService);
  public events?: NewsValue[] = [];
  
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
      this.events = events;//.slice(0, 2);
    });
  }
}
