import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from '../volunteer/contract/contract.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private apiUrl = 'http://localhost:52311/api';
  private contractUrl = this.apiUrl + '/Contract'
  constructor(private http: HttpClient) { }

  public getForVolunteer(id: number): Observable<Array<Contract>> {
    let url = this.contractUrl + '/Volunteer/' + id.toString();

    return this.http.get<Array<Contract>>(url);
  }

  public get(id: number): Observable<Contract> {
    let url = this.contractUrl + '/' + id.toString();

    return this.http.get<Contract>(url);
  }

  public add(contract: Contract): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<boolean>(this.contractUrl, JSON.stringify(contract), {headers: headers});
  }

  public update(contract: Contract): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put<boolean>(this.contractUrl, JSON.stringify(contract), {headers: headers});
  }

  public delete(id: number): Observable<boolean> {
    let url = this.contractUrl + '/' + id.toString();

    return this.http.delete<boolean>(url);
  }
}
