import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VolunteeringHours } from '../volunteer/volunteering-hours/volunteering-hours.model';

@Injectable({
  providedIn: 'root'
})
export class VolunteeringHoursService {

  private apiUrl = 'http://localhost:52311/api';
  private volunteeringHoursUrl = this.apiUrl + '/VolunteeringHours'
  constructor(private http: HttpClient) { }

  public getForVolunteer(id: number, pageIndex: number, pageSize: number): Observable<Array<VolunteeringHours>> {
    let url = this.volunteeringHoursUrl + '/Volunteer/' + id.toString();

    let params = new HttpParams();
    params = params.append('pageIndex', pageIndex.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<Array<VolunteeringHours>>(url, { params: params });
  }

  public getCountForVolunteer(id: number): Observable<number> {
    let url = this.volunteeringHoursUrl + '/Volunteer/' + id.toString() + '/Count';

    return this.http.get<number>(url);
  }

  public get(id: number): Observable<VolunteeringHours> {
    let url = this.volunteeringHoursUrl + '/' + id.toString();

    return this.http.get<VolunteeringHours>(url);
  }

  public add(volunteeringHours: VolunteeringHours): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<boolean>(this.volunteeringHoursUrl, JSON.stringify(volunteeringHours), {headers: headers});
  }

  public update(volunteeringHours: VolunteeringHours): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put<boolean>(this.volunteeringHoursUrl, JSON.stringify(volunteeringHours), {headers: headers});
  }

  public delete(id: number): Observable<boolean> {
    let url = this.volunteeringHoursUrl + '/' + id.toString();

    return this.http.delete<boolean>(url);
  }
}
