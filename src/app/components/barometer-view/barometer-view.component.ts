import { Component, inject } from '@angular/core';
import { BarometerService } from '../../services/barometer.service';
import { BarometerValue } from '../../models/barometer-value.model';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { environment } from '../../environments/environment';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Component({
  selector: 'app-barometer-view',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './barometer-view.component.html',
  styleUrl: './barometer-view.component.scss'
})
export class BarometerViewComponent {
  private api = inject(BarometerService);
  public values?: BarometerValue[] = [];
  private hubConnectionBuilder!: HubConnection;
  private baseUrl: string = environment.barometerUrl;

  multi: any[] = [];
  view: [number, number] = [1000, 400]; //How to adjust width?

  legend: boolean = true;
  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Tidpunkt';
  yAxisLabel: string = 'Värde';

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB'],
  };

  ngOnInit() {
    console.log("ng oninit");
    this.getValues();
    const url = this.baseUrl + '/signalr';

    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl(url)
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnectionBuilder
      .start()
      .then(() => console.log('Connection started.......!'))
      .catch(err => console.log('Error while connect with server' + err));

    this.hubConnectionBuilder.on('SendBarometerUpdate', (result: BarometerValue) => {
      this.values?.sort((a, b) => a.id! - b.id!);
      this.values?.push(result);
      this.values = this.values?.slice(1);
      this.setView();
      console.log('Received new value: ');
      console.log(result);
      console.log('values: ');
      console.log(this.values);
    });
  }

  getValues() {
    this.api.getAllValues().then((values) => {
      this.values = values;
      // console.log(this.values);
      this.setView();
    });
  }

  setView() {
    // console.log("setting view");
    this.multi = [
      {
        name: 'Temperatur',
        series: this.values?.map((value) => {
          return {
            name: this.calculateLocale(value.registered!),
            value: value.temperature,
          };
        }),
      },
      {
        name: 'Fuktighet',
        series: this.values?.map((value) => {
          return {
            name: this.calculateLocale(value.registered!),
            value: value.humidity,
          };
        }),
      }];
  }

  calculateLocale(date: Date) {
    date = new Date(date);
    var offset = date.getTimezoneOffset() * -1;
    date.setTime(date.getTime() + offset * 60000);
    return date;
  }
}
