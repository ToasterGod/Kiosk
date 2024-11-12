import { inject, Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { SmhiApiService } from './smhi-api.service';
import { ForecastValue } from '../models/forecast-value.model';

@Injectable({
  providedIn: 'root'
})
export class SmhiService {
  private api = inject(SmhiApiService);

  async getAllForecasts(): Promise<ForecastValue[]> {
    return await lastValueFrom(this.api.getAllForecasts());
  }

  async getCurrentForecast():Promise<ForecastValue>{
    return await firstValueFrom(this.api.getCurrentForecast());
  }
}
