import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchCommentsService {
  jsonFilePath = './assets/json/data.json';

  getData(): Observable<any> {
    return this.http.get(this.jsonFilePath);
  }

  constructor(private http: HttpClient) {}
}
