import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchCommentsService {
  getData(): Observable<any> {
    // Provide the path to your JSON file in assets
    const jsonFilePath = './assets/json/data.json';

    // Fetch data from the JSON file
    return this.http.get(jsonFilePath);
  }

  constructor(private http: HttpClient) {}
}
