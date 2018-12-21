import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, PageEvent, MatSnackBar } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Volunteer } from './volunteer.model';
import { Citizenship } from '../models/citizenship.model';
import { Sex } from '../models/sex.model';
import { VolunteerService } from '../services/volunteer.service';
import { VolunteerFilter } from '../filters/volunteer-filter.model';
import { CatalogueService } from '../services/catalogue.service';
import { FormControl } from '@angular/forms';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
    selector: 'volunteer-table',
    styleUrls: ['volunteer-table.css'],
    templateUrl: 'volunteer-table.html',
})
export class VolunteerTable implements OnInit {
    displayedColumns: string[] = ['firstName', 'lastName', 'oib', 'username', 'email',
        'birthday', 'sex', 'potentialVolunteer', 'outsideVolunteer', 'citizenship', 'actions'];
    // exampleDatabase: ExampleHttpDao | null;
    data: Volunteer[];
    resultsLength;
    pageEvent: PageEvent;
    pageIndex: number;
    pageSize: number;
    sortDirection: string;
    sortActive: string;
    isLoadingResults = false;
    isRateLimitReached = false;
    showFilter = false;
    filteredSearch = false;

    filter = new VolunteerFilter();

    sex = new FormControl('');
    citizenship = new FormControl('');

    citizenshipCollection: Citizenship[];
    sexCollection: Sex[];

    filteredCitizenships: Observable<Citizenship[]>;
    filteredSexes: Observable<Sex[]>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private http: HttpClient, private volunteerService: VolunteerService,
        private catalogueService: CatalogueService, public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.pageSize = 10;
        this.pageIndex = 0;

        this.sortActive = "oib";
        this.sortDirection = "asc";

        this.isLoadingResults = true;
        this.volunteerService.getCount().subscribe(
            (count) => this.resultsLength = count
        );
        this.volunteerService.getAll(this.pageIndex, this.pageSize, this.sortActive, this.sortDirection).subscribe(
            (data) => {
                this.data = data;
                this.isLoadingResults = false;
            }
        );

        this.isLoadingResults = true;
        this.catalogueService.getCitizenships().subscribe(
            data => {
                this.citizenshipCollection = data;
                this.isLoadingResults = false;

                this.filteredCitizenships = this.citizenship.valueChanges.pipe(
                    startWith(''),
                    map((value: string) => this.filterCitizenships(value))
                )
            }
        );

        this.isLoadingResults = true;
        this.catalogueService.getSexes().subscribe(
            data => {
                this.sexCollection = data;
                this.isLoadingResults = false;

                this.filteredSexes = this.sex.valueChanges.pipe(
                    startWith(''),
                    map((value: string) => this.filterSexes(value))
                )
            }
        );
    }

    getServerData(event: PageEvent) {
        if (!this.filteredSearch) {
            this.isLoadingResults = true;

            this.volunteerService.getAll(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction).subscribe(
                (data) => {
                    this.data = data;
                    this.isLoadingResults = false;

                }
            );
        } else {
            this.filterData();
        }

    }

    sortData(event: any) {
        if (!this.filteredSearch) {
            this.paginator.pageIndex = 0;

            this.isLoadingResults = true;
            this.volunteerService.getAll(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction).subscribe(
                (data) => {
                    this.data = data;
                    this.isLoadingResults = false;
                }
            );
        } else {
            this.filterData();
        }


    }

    deleteData(id: number) {
        this.volunteerService.delete(id).subscribe(
            response => {
                if (response) {
                    this.snackBar.open("Volonter uspješno obrisan", "Zatvori", {
                        duration: 3000,
                        panelClass: ['snackbar-success']
                    });
                    this.isLoadingResults = true;
                    this.volunteerService.getAll(this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction).subscribe(
                        (data) => {
                            this.data = data;
                            this.isLoadingResults = false;
                        }
                    );
                } else {
                    this.snackBar.open("Greška!", "RIP", {
                        duration: 3000,
                        panelClass: ['snackbar-error']
                    });
                }
            }
        )
    }

    filterData() {
        this.filteredSearch = true;

        if (this.sex.value !== null && this.sex.value !== '') {
            this.filter.sexID = this.sexCollection.find(option => option.name === this.sex.value).id;
        }
        if (this.citizenship.value !== null && this.citizenship.value !== '') {
            this.filter.citizenshipID = this.citizenshipCollection.find(option => option.name === this.citizenship.value).id;
        }
        this.isLoadingResults = true;
        this.paginator.pageIndex = 0;
        console.log(this.filter.outsideVolunteer);
        this.volunteerService.search(this.filter, this.paginator.pageIndex, this.paginator.pageSize, this.sort.active, this.sort.direction)
            .subscribe(
                (response) => {
                    this.data = response.data;
                    this.resultsLength = response.totalCount;
                    this.isLoadingResults = false;
                }
            )
    }

    disableFilter() {
        this.filteredSearch = false;

        this.sex.reset();
        this.citizenship.reset();
        this.filter.firstName = undefined;
        this.filter.lastName = undefined;
        this.filter.oib = undefined;
        this.filter.birthday = undefined;
        this.filter.outsideVolunteer = undefined;
        this.filter.potentialVolunteer = undefined;
        this.filter.username = undefined;
        this.filter.email = undefined;

        this.isLoadingResults = true;
        this.volunteerService.getCount().subscribe(
            (count) => this.resultsLength = count
        );
        this.volunteerService.getAll(this.pageIndex, this.pageSize, this.sortActive, this.sortDirection).subscribe(
            (data) => {
                this.data = data;
                this.isLoadingResults = false;
            }
        );
    }

    private filterCitizenships(value: string): Citizenship[] {
        if (value !== null) {
            const filterValue = value.toLowerCase();

            return this.citizenshipCollection.filter(option => option.name.toLowerCase().includes(filterValue));
        }
    }

    private filterSexes(value: string): Sex[] {
        if (value !== null) {
            const filterValue = value.toLowerCase();

            return this.sexCollection.filter(option => option.name.toLowerCase().includes(filterValue));
        }

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