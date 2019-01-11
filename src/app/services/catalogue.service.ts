import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sex } from '../models/sex.model';
import { Observable } from 'rxjs';
import { Citizenship } from '../models/citizenship.model';
import { ExpenseType } from '../models/expense-type.model';
import { DocumentType } from '../models/document-type.model';

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

  public getExpenseTypes(): Observable<ExpenseType[]> {
    let url = this.apiUrl + '/ExpenseType';

    return this.http.get<Array<ExpenseType>>(url);
  }

  public getDocumentTypes(): Observable<DocumentType[]> {
    let url = this.apiUrl + '/DocumentType';

    return this.http.get<Array<DocumentType>>(url);
  }
}
