import { Component, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ForecastValue } from '../../models/forecast-value.model';
import { SmhiService } from '../../services/smhi.service';

@Component({
  selector: 'app-smhi-view',
  standalone: true,
  imports: [],
  templateUrl: './smhi-view.component.html',
  styleUrl: './smhi-view.component.scss'
})
export class SmhiViewComponent {
  private api = inject(SmhiService);
  public forecast?: ForecastValue;
  public baseUrl: string = environment.weatherUrl;

  ngOnInit() {
    this.getForecasts();
  }

  calculateLocale(date: Date) {
    date = new Date(date);
    var offset = date.getTimezoneOffset() * -1;
    date.setTime(date.getTime() + offset * 60000);
    return date;
  }

  getForecasts() {
    this.api.getCurrentForecast().then((forecast) => {
      console.log(forecast);
      this.forecast = forecast;
    });
  }
}
