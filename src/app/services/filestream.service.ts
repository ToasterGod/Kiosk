import { inject, Injectable } from '@angular/core';
import { FilestreamApiService } from './filestream-api.service';
import { FilestreamValue } from '../models/filestream-value.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilestreamService {
  private api = inject(FilestreamApiService);

  async getAllEvents(): Promise<FilestreamValue[]> {
    return await lastValueFrom(this.api.getAllFiles());
  }
}
