import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../volunteer/document/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = 'http://localhost:52311/api';
  private documentUrl = this.apiUrl + '/Document'
  constructor(private http: HttpClient) { }

  public getForVolunteer(id: number, pageIndex: number, pageSize: number): Observable<Array<Document>> {
    let url = this.documentUrl + '/Volunteer/' + id.toString();

    let params = new HttpParams();
    params = params.append('pageIndex', pageIndex.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<Array<Document>>(url, { params: params });
  }

  public getCountForVolunteer(id: number): Observable<number> {
    let url = this.documentUrl + '/Volunteer/' + id.toString() + '/Count';

    return this.http.get<number>(url);
  }

  public get(id: number): Observable<Document> {
    let url = this.documentUrl + '/' + id.toString();

    return this.http.get<Document>(url);
  }

  public add(document: Document): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<boolean>(this.documentUrl, JSON.stringify(document), {headers: headers});
  }

  public update(document: Document): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put<boolean>(this.documentUrl, JSON.stringify(document), {headers: headers});
  }

  public delete(id: number): Observable<boolean> {
    let url = this.documentUrl + '/' + id.toString();

    return this.http.delete<boolean>(url);
  }
}
