import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Festival } from '../models/festival';

@Injectable({
  providedIn: 'root',
})
export class FestivaljsonService {
  constructor(private readonly httpClient: HttpClient) {}

  jsonToFestival(json: any) {
    return new Festival(
      json.name,
      json.id,
      json.tablemax_1,
      json.tableprice_1,
      json.tablebooked_1,
      json.sqmprice_1,
      json.sqmprice_1,
      json.tablemax_2,
      json.tableprice_2,
      json.tablebooked_2,
      json.sqmprice_2,
      json.sqmprice_2,
      json.tablemax_3,
      json.tableprice_3,
      json.tablebooked_3,
      json.sqmprice_3,
      json.sqmprice_3
    );
  }

  getFestivals(): Observable<Festival[]> {
    return this.httpClient
      .get<Festival[]>('http://localhost:3000/festivals')
      .pipe(map((data) => data.map((json) => this.jsonToFestival(json))));
  }
}
