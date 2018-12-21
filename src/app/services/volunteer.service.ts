import { Injectable } from '@angular/core';
import { Volunteer } from '../volunteer/volunteer.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { VolunteerFilter } from '../filters/volunteer-filter.model';
import { VolunteerFilterResponse } from '../models/volunteer-filter-response.model';

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

  public add(volunteer: Volunteer): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<boolean>(this.volunteerApiUrl, JSON.stringify(volunteer), {headers: headers});
  }

  public search(filter: VolunteerFilter, pageIndex: number, pageSize: number, sortActive: string, sortDirection: string): Observable<VolunteerFilterResponse> {
    let url = this.volunteerApiUrl + '/Search';
    
    let params: HttpParams = new HttpParams();
    params = params.append("pageIndex", pageIndex.toString());
    params = params.append("pageSize", pageSize.toString());
    params = params.append("sortColumn", sortActive);
    params = params.append("sortOrder", sortDirection);
    params = params.append("firstName",  filter.firstName ? filter.firstName : '');
    params = params.append("lastName", filter.lastName ? filter.lastName : '');
    params = params.append("oib", filter.oib ? filter.oib : '');
    params = params.append("username", filter.username ? filter.username : '');
    params = params.append("email", filter.email ? filter.email : '');
    params = params.append("potentialVolunteer", filter.potentialVolunteer !== undefined ? filter.potentialVolunteer.toString() : null);
    params = params.append("outsideVolunteer", filter.outsideVolunteer !== undefined ? filter.outsideVolunteer.toString() : null);
    params = params.append("birthday", filter.birthday ?  filter.birthday.toString() : null);
    params = params.append("sexID", filter.sexID ?  filter.sexID.toString() : null);
    params = params.append("citizenshipID", filter.citizenshipID ?  filter.citizenshipID.toString() : null);

    return this.http.get<VolunteerFilterResponse>(url, {params: params});
  }

  public delete(id: number): Observable<boolean> {
    let params = new HttpParams();
    params = params.append("id", id.toString());

    return this.http.delete<boolean>(this.volunteerApiUrl, {params: params});
  }
}
