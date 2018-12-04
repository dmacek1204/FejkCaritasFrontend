import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Volunteer } from './volunteer.model';
import { Citizenship } from '../models/citizenship.model';
import { Sex } from '../models/sex.model';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
    selector: 'table-http-example',
    styleUrls: ['volunteer-table.css'],
    templateUrl: 'volunteer-table.html',
})
export class TableHttpExample implements OnInit {
    displayedColumns: string[] = ['firstName', 'lastName', 'OIB', 'username', 'email',
        'birthday', 'sex', 'potentialVolunteer', 'outsideVolunteer', 'citizenship'];
    exampleDatabase: ExampleHttpDao | null;
    data: Volunteer[] = [
        new Volunteer(1, "Domba", "Plomba", "11111111111", "DombaPlomba", "burek@gmail.com", new Date(1971, 11, 5),
            new Sex(1, "Muško"), true, false, new Citizenship(1, "Hrvatsko")),
        new Volunteer(1, "Gogsan", "Plogsan", "11111111112", "GogoPologo", "sirnica@gmail.com", new Date(1980, 3, 7),
            new Sex(1, "Muško"), false, true, new Citizenship(1, "Hrvatsko")),
        new Volunteer(1, "Zlorotea", "Foo", "11111111123", "Blabla", "yahoo@gmail.com", new Date(1979, 5, 17),
            new Sex(2, "Žensko"), true, true, new Citizenship(2, "Njemačko"))
    ];

    resultsLength = this.data.length;
    isLoadingResults = false;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private http: HttpClient) { }

    ngOnInit() {
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
}

export interface GithubApi {
    items: GithubIssue[];
    total_count: number;
}

export interface GithubIssue {
    created_at: string;
    number: string;
    state: string;
    title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
    constructor(private http: HttpClient) { }

    getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
        const href = 'https://api.github.com/search/issues';
        const requestUrl =
            `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

        return this.http.get<GithubApi>(requestUrl);
    }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */