import { Injectable, inject } from '@angular/core';
import { BarometerApiService } from './barometer-api.service';
import { BarometerValue } from '../models/barometer-value.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BarometerService {
  private api = inject(BarometerApiService);


  async getAllValues(): Promise<BarometerValue[]> {
    return await lastValueFrom(this.api.getAllValues());
  }
}
