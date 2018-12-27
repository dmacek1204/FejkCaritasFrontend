import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Volunteer } from '../volunteer/volunteer.model';
import { CatalogueService } from '../services/catalogue.service';
import { Citizenship } from '../models/citizenship.model';
import { Sex } from '../models/sex.model';
import { Observable } from 'rxjs';
import { startWith, switchMap, map } from 'rxjs/operators';
import { VolunteerService } from '../services/volunteer.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-volunteer-edit',
  templateUrl: './volunteer-edit.component.html',
  styleUrls: ['./volunteer-edit.component.css']
})
export class VolunteerEditComponent implements OnInit {

  firstName = new FormControl('');
  lastName = new FormControl('');
  oib = new FormControl('');
  email = new FormControl('', [
    Validators.email
  ]);
  username = new FormControl('')
  birthday = new FormControl('');
  sex = new FormControl('');
  citizenship = new FormControl('');

  citizenshipCollection: Citizenship[];
  sexCollection: Sex[];

  filteredCitizenships: Observable<Citizenship[]>;
  filteredSexes: Observable<Sex[]>;

  isLoadingResults: boolean;

  volunteer = new Volunteer();

  constructor(private catalogueService: CatalogueService, private volunteerService: VolunteerService,
    public snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) { }

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

    this.route.params.subscribe(params => {
      this.volunteer.id = params["id"];
      this.volunteerService.get(this.volunteer.id).subscribe(data => {
        this.volunteer.firstName = data.firstName;
        this.volunteer.lastName = data.lastName;
        this.volunteer.email = data.email;
        this.volunteer.citizenship = data.citizenship;
        this.volunteer.sex = data.sex;
        this.volunteer.outsideVolunteer = data.outsideVolunteer;
        this.volunteer.potentialVolunteer = data.potentialVolunteer;
        this.volunteer.oib = data.oib;
        this.volunteer.username = data.username;
        this.volunteer.birthday = data.birthday;
        this.setValues();
      })
    })


  }

  private setValues(){
    this.firstName.setValue(this.volunteer.firstName);
    this.lastName.setValue(this.volunteer.lastName);
    this.username.setValue(this.volunteer.username);
    this.oib.setValue(this.volunteer.oib);
    this.email.setValue(this.volunteer.email);
    this.birthday.setValue(this.volunteer.birthday);
    this.sex.setValue(this.volunteer.sex.name);
    this.citizenship.setValue(this.volunteer.citizenship.name);
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
      let volunteer = new Volunteer(this.volunteer.id, this.firstName.value, this.lastName.value, this.oib.value,
        this.username.value, this.email.value, this.birthday.value, this.sexCollection.find(option => option.name === this.sex.value), this.volunteer.potentialVolunteer, this.volunteer.outsideVolunteer,
        this.citizenshipCollection.find(option => option.name === this.citizenship.value));
      this.volunteerService.update(volunteer).subscribe(
        response => {
          if (response) {
            this.snackBar.open("Volonter uspješno promjenjen", "Zatvori", {
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
    this.volunteer.outsideVolunteer = false;
    this.volunteer.potentialVolunteer = false;
  }
}
