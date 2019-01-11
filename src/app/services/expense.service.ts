import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../volunteer/expense/expense.model';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = 'http://localhost:52311/api';
  private expenseUrl = this.apiUrl + '/Expenses'
  constructor(private http: HttpClient) { }

  public getForVolunteer(id: number, pageIndex: number, pageSize: number): Observable<Array<Expense>> {
    let url = this.expenseUrl + '/Volunteer/' + id.toString();

    let params = new HttpParams();
    params = params.append('pageIndex', pageIndex.toString());
    params = params.append('pageSize', pageSize.toString());

    return this.http.get<Array<Expense>>(url, { params: params });
  }

  public getCountForVolunteer(id: number): Observable<number> {
    let url = this.expenseUrl + '/Volunteer/' + id.toString() + '/Count';

    return this.http.get<number>(url);
  }

  public get(id: number): Observable<Expense> {
    let url = this.expenseUrl + '/' + id.toString();

    return this.http.get<Expense>(url);
  }

  public add(expense: Expense): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<boolean>(this.expenseUrl, JSON.stringify(expense), {headers: headers});
  }

  public update(expense: Expense): Observable<boolean> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put<boolean>(this.expenseUrl, JSON.stringify(expense), {headers: headers});
  }

  public delete(id: number): Observable<boolean> {
    let url = this.expenseUrl + '/' + id.toString();

    return this.http.delete<boolean>(url);
  }
}
