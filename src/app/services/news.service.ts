import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { NewsApiService } from './news-api.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private api = inject(NewsApiService);

  async getAllEvents()
  {
    return await lastValueFrom(this.api.getAllEvents());
  }
}
