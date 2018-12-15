import { Injectable } from '@angular/core';
import { Volunteer } from '../volunteer/volunteer.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private apiUrl = 'http://localhost:52311/api'
  private volunteerApiUrl = this.apiUrl + '/Volunteer'
  constructor(private http: HttpClient) { }

  public getAll(pageIndex: number, pageSize: number, sortActive: string, sortDirection: string): Observable<Volunteer[]> {

    let params: HttpParams = new HttpParams();
    params = params.append("pageIndex", pageIndex.toString());
    params = params.append("pageSize", pageSize.toString());
    params = params.append("sortColumn", sortActive);
    params = params.append("sortOrder", sortDirection);
    // let url = this.volunteerApiUrl + "?pageSize=" + pageSize.toString() + "&pageIndex=" + pageIndex.toString()
    //   + "&sortColumn=" + sortActive + "&sortOrder=" + sortDirection;

    // return this.http.get<Array<Volunteer>>(url);
    return this.http.get<Array<Volunteer>>(this.volunteerApiUrl, {params: params});
  }

  public getCount(): Observable<number> {
    let url = this.volunteerApiUrl + "/Count";
    return this.http.get<number>(url);
  }

  public add(volunteer: Volunteer): void {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    this.http.post(this.volunteerApiUrl, JSON.stringify(volunteer), {headers: headers}).subscribe();
  }
}
