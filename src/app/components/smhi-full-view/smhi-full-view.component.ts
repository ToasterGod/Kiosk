import { Component, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { interval, Subscription } from 'rxjs';
import { SmhiService } from '../../services/smhi.service';
import { ForecastValue } from '../../models/forecast-value.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-smhi-full-view',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './smhi-full-view.component.html',
  styleUrl: './smhi-full-view.component.scss'
})
export class SmhiFullViewComponent {
  private api = inject(SmhiService);
  public forecast?: ForecastValue;
  public forecasts?: ForecastValue[];
  public noonValues?: ForecastValue[];
  private updateSubscription?: Subscription;
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
    this.api.getAllForecasts().then((forecasts) => {
      console.log(forecasts);
      this.forecasts = forecasts;
      this.forecast = forecasts[0];
      this.noonValues = forecasts!.filter((forecast) => {
        let test = new Date(forecast!.validTime!).getUTCHours();
        console.log(test);
        return test == 12;
      });
    });
    console.log(this.noonValues);
  }
}
