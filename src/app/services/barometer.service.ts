import { Injectable, inject } from '@angular/core';
import { BarometerApiService } from './barometer-api.service';
import { BarometerValue } from '../models/barometer-value.model';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BarometerService {
  private api = inject(BarometerApiService);


  async getLatestValue() {
    return await firstValueFrom(this.api.getLatestValue());

  }


  async getAllValues(): Promise<BarometerValue[]> {
    return await lastValueFrom(this.api.getAllValues());
  }
}
