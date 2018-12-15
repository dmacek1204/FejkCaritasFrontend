import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sex } from '../models/sex.model';
import { Observable } from 'rxjs';
import { Citizenship } from '../models/citizenship.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  private apiUrl = 'http://localhost:52311/api/Catalogue'

  constructor(private http: HttpClient) { }

  public getSexes(): Observable<Sex[]> {
    let url = this.apiUrl + '/Sex';

    return this.http.get<Array<Sex>>(url);
  }

  public getCitizenships(): Observable<Citizenship[]> {
    let url = this.apiUrl + '/Citizenship';

    return this.http.get<Array<Citizenship>>(url);
  }
}
