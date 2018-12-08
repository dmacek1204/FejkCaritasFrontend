import { Injectable } from '@angular/core';
import { Volunteer } from '../volunteer/volunteer.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private apiUrl = 'http://localhost:52311/api'
  private volunteerApiUrl = this.apiUrl + '/Volunteer'
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Volunteer[]> {
    return this.http.get<Array<Volunteer>>(this.volunteerApiUrl);
  }
}
