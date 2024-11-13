import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsValue } from '../models/news-value.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.newsUrl;

  getAllEvents(): Observable<NewsValue[]> {
    console.log(this.baseUrl);
    const url = this.baseUrl + '/SogetiNews/5';
    return this.http.get<NewsValue[]>(url);
  }
}
