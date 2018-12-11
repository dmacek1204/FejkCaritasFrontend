import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Volunteer } from './volunteer.model';
import { Citizenship } from '../models/citizenship.model';
import { Sex } from '../models/sex.model';
import { VolunteerService } from '../services/volunteer.service';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
    selector: 'volunteer-table',
    styleUrls: ['volunteer-table.css'],
    templateUrl: 'volunteer-table.html',
})
export class VolunteerTable implements OnInit {
    displayedColumns: string[] = ['firstName', 'lastName', 'OIB', 'username', 'email',
        'birthday', 'sex', 'potentialVolunteer', 'outsideVolunteer', 'citizenship'];
    // exampleDatabase: ExampleHttpDao | null;
    data: Volunteer[];
    resultsLength = 25;
    pageEvent: PageEvent;
    datasource: null;
    pageIndex: number;
    pageSize: number;
    sortDirection: string;
    sortActive: string;
    isLoadingResults = false;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private http: HttpClient, private volunteerService: VolunteerService) { }

    ngOnInit() {
        this.pageSize = 10;
        this.pageIndex = 0;

        this.sortActive = "oib";
        this.sortDirection = "asc";

        this.isLoadingResults = true;
        this.volunteerService.getAll(this.pageIndex, this.pageSize, this.sortActive, this.sortDirection).subscribe(
            (data) => {
                this.data = data;
                this.isLoadingResults = false;
            }
        );
        // this.exampleDatabase = new ExampleHttpDao(this.http);

        // // If the user changes the sort order, reset back to the first page.
        // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        // merge(this.sort.sortChange, this.paginator.page)
        //     .pipe(
        //         startWith({}),
        //         switchMap(() => {
        //             this.isLoadingResults = true;
        //             return this.exampleDatabase!.getRepoIssues(
        //                 this.sort.active, this.sort.direction, this.paginator.pageIndex);
        //         }),
        //         map(data => {
        //             // Flip flag to show that loading has finished.
        //             this.isLoadingResults = false;
        //             this.isRateLimitReached = false;
        //             this.resultsLength = data.total_count;

        //             return data.items;
        //         }),
        //         catchError(() => {
        //             this.isLoadingResults = false;
        //             // Catch if the GitHub API has reached its rate limit. Return empty data.
        //             this.isRateLimitReached = true;
        //             return observableOf([]);
        //         })
        //     ).subscribe(data => this.data = data);
    }

    getServerData(event: PageEvent) {
        this.isLoadingResults = true;

        this.volunteerService.getAll(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction).subscribe(
            (data) => {
                this.data = data;
                this.isLoadingResults = false;

            }
        );
    }

    sortData(event: any) {
        this.paginator.pageIndex = 0;

        this.isLoadingResults = true;
        this.volunteerService.getAll(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction).subscribe(
            (data) => {
                this.data = data;
                this.isLoadingResults = false;
            }
        );

    }
}



/** An example database that the data source uses to retrieve data for the table. */
// export class ExampleHttpDao {
//     constructor(private http: HttpClient) { }

//     getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
//         const href = 'https://api.github.com/search/issues';
//         const requestUrl =
//             `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

//         return this.http.get<GithubApi>(requestUrl);
//     }
// }


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */