import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Content } from '@app/models/content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private dataUrl = 'assets/data/contents.json';
  private localStorageKey = 'contents';

  constructor(private http: HttpClient) { }

  getData(): Observable<Content[]> {
    const localStorageData = localStorage.getItem(this.localStorageKey);

    if (localStorageData) {
      try {
        const parsedData = JSON.parse(localStorageData) as Content[];
        if (parsedData?.length) {
          return of(parsedData);
        } else {
          console.error('Invalid data format in localStorage:', parsedData);
          return this.fetchDataFromHttp();
        }
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
        return this.fetchDataFromHttp();
      }
    } else {
      return this.fetchDataFromHttp();
    }
  }

  private fetchDataFromHttp(): Observable<Content[]> {
    return this.http.get<Content[]>(this.dataUrl).pipe(
      map(data => {
        localStorage.setItem(this.localStorageKey, JSON.stringify(data));
        return data;
      }),
      catchError(error => {
        console.error('Error fetching data from HTTP:', error);
        return of([]);
      })
    );
  }
}
