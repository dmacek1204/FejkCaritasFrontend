import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, switchMap, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Citizenship } from 'src/app/models/citizenship.model';
import { Sex } from 'src/app/models/sex.model';
import { CatalogueService } from 'src/app/services/catalogue.service';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { Volunteer } from '../volunteer.model';

@Component({
  selector: 'app-volunteer-add',
  templateUrl: './volunteer-add.component.html',
  styleUrls: ['./volunteer-add.component.css']
})
export class VolunteerAddComponent implements OnInit {

  firstName = new FormControl('');
  lastName = new FormControl('');
  oib = new FormControl('');
  email = new FormControl('', [
    Validators.email
  ]);
  username = new FormControl('')
  birthday = new FormControl('');
  sex = new FormControl('');
  potentialVolunteer: boolean = false;
  outsideVolunteer: boolean = false;
  citizenship = new FormControl('');

  citizenshipCollection: Citizenship[];
  sexCollection: Sex[];

  filteredCitizenships: Observable<Citizenship[]>;
  filteredSexes: Observable<Sex[]>;

  isLoadingResults: boolean;

  constructor(private catalogueService: CatalogueService, private volunteerService: VolunteerService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {

    this.isLoadingResults = true;
    this.catalogueService.getCitizenships().subscribe(
      data => {
        this.citizenshipCollection = data;
        this.isLoadingResults = false;

        this.filteredCitizenships = this.citizenship.valueChanges.pipe(
          startWith(''),
          map(value => this.filterCitizenships(value))
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
          map(value => this.filterSexes(value))
        )
      }
    );   
  }

  private filterCitizenships(value: any): Citizenship[] {
    const filterValue = value.toLowerCase();

    return this.citizenshipCollection.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private filterSexes(value: any): Sex[] {
    const filterValue = value.toLowerCase();

    return this.sexCollection.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if (this.firstName.valid && this.lastName.valid &&
      this.email.valid && this.citizenship.valid && this.birthday.valid &&
      this.username.valid && this.sex.valid && this.oib.valid) {
      let volunteer = new Volunteer(null, this.firstName.value, this.lastName.value, this.oib.value,
        this.username.value, this.email.value, this.birthday.value, this.sexCollection.find(option => option.name === this.sex.value), this.potentialVolunteer, this.outsideVolunteer,
        this.citizenshipCollection.find(option => option.name === this.citizenship.value));
      this.volunteerService.add(volunteer).subscribe(
        response => {
          if (response) {
            this.snackBar.open("Volonter uspješno dodan", "Zatvori", {
              duration: 10000,
              panelClass: ['snackbar-success']
            });
          } else {
            this.snackBar.open("Greška", "RIP", {
              duration: 10000,
              panelClass: ['snackbar-error']
            });
          }
        }
      );
    }
    else {
      this.firstName.markAsTouched();
      this.lastName.markAsTouched();
      this.email.markAsTouched();
      this.citizenship.markAsTouched();
      this.birthday.markAsTouched();
      this.username.markAsTouched();
      this.sex.markAsTouched();
      this.oib.markAsTouched();
    }
  }

  onClean(){
    this.birthday.reset();
    this.citizenship.setValue('');
    this.sex.setValue('');
    this.firstName.reset();
    this.lastName.reset();
    this.oib.reset();
    this.username.reset();
    this.email.reset();
    this.outsideVolunteer = false;
    this.potentialVolunteer = false;
  }
}
