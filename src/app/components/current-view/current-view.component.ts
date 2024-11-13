import { Component, inject } from '@angular/core';
import { BarometerService } from '../../services/barometer.service';
import { SmhiService } from '../../services/smhi.service';
import { ForecastValue } from '../../models/forecast-value.model';
import { BarometerValue } from '../../models/barometer-value.model';
import { environment } from '../../environments/environment';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Component({
  selector: 'app-current-view',
  standalone: true,
  imports: [],
  templateUrl: './current-view.component.html',
  styleUrl: './current-view.component.scss'
})
export class CurrentViewComponent {
  private barometerApi = inject(BarometerService);
  private smhiApi = inject(SmhiService);
  public barometerValue?: BarometerValue;
  public smhiValue?: ForecastValue;
  private smhiUrl: string = environment.weatherUrl;
  private barometerUrl: string = environment.barometerUrl;
  private barometerHubConnectionBuilder!: HubConnection;
  private smhiHubConnectionBuilder!: HubConnection;

  ngOnInit() {
    console.log("ng oninit");
    this.getSmhiValue();
    this.getBarometerValue();
  }

  getSmhiValue() {
    this.smhiApi.getCurrentForecast().then((value) => {
      this.smhiValue = value;
      console.log(this.smhiValue);
    });

    const url = this.smhiUrl + '/signalr';

    this.smhiHubConnectionBuilder = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(LogLevel.Information)
      .build();

    this.smhiHubConnectionBuilder
      .start()
      .then(() => console.log('Connection started.......!'))
      .catch(err => console.log('Error while connect with server' + err));

    this.smhiHubConnectionBuilder.on('SendsmhiBarometerUpdate', (result: ForecastValue) => {
      this.smhiValue = result;
      console.log('Received new smhiValue: ');
      console.log(result);
      console.log('smhiValue: ');
      console.log(this.smhiValue);
    });
  }

  getBarometerValue() {

    this.barometerApi.getLatestValue().then((value) => {
      this.barometerValue = value;
      console.log(this.barometerValue);
    });

    const url = this.barometerUrl + '/signalr';

    this.barometerHubConnectionBuilder = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(LogLevel.Information)
      .build();

    this.barometerHubConnectionBuilder
      .start()
      .then(() => console.log('Connection started.......!'))
      .catch(err => console.log('Error while connect with server' + err));

    this.barometerHubConnectionBuilder.on('SendBarometerUpdate', (result: BarometerValue) => {
      this.barometerValue = result;
      console.log('Received new barometerValue: ');
      console.log(result);
      console.log('barometerValue: ');
      console.log(this.barometerValue);
    });
  }
}
