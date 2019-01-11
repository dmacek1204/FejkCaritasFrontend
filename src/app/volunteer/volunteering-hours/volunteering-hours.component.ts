import { Component, OnInit, ViewChild } from '@angular/core';
import { VolunteeringHours } from './volunteering-hours.model';
import { PageEvent, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { VolunteeringHoursService } from 'src/app/services/volunteering-hours.service';
import { VolunteeringHoursAddEditComponent } from './volunteering-hours-add-edit/volunteering-hours-add-edit.component';

@Component({
  selector: 'app-volunteering-hours',
  templateUrl: './volunteering-hours.component.html',
  styleUrls: ['./volunteering-hours.component.css']
})
export class VolunteeringHoursComponent implements OnInit {

  displayedColumns: string[] = ['id', 'startDate', 'endDate', 'numberOfHours', 'creationDate', 'actions'];
  data: VolunteeringHours[];
  resultsLength;

  @ViewChild(MatPaginator) paginator: MatPaginator;  
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;

  isLoadingResults = false;

  private volunteerId: number;


  constructor(private volunteeringHoursService: VolunteeringHoursService, public snackBar: MatSnackBar, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.isLoadingResults = true;
    

    this.route.parent.params.subscribe(params => {
      this.volunteerId = params["id"];
      this.volunteeringHoursService.getCountForVolunteer(params["id"]).subscribe(count => {
        this.resultsLength = count;
      })
      this.volunteeringHoursService.getForVolunteer(params["id"], this.pageIndex, this.pageSize).subscribe(data => {
        this.data = data;
        this.isLoadingResults = false;
      })
    })
  }

  getServerData(event: PageEvent) {
    this.isLoadingResults = true;
    

    this.volunteeringHoursService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
      this.data = data;
      this.isLoadingResults = false;
    })

  }

  addEditVolunteeringHours(row: VolunteeringHours) {
    if (row === null) {
      const dialogRef = this.dialog.open(VolunteeringHoursAddEditComponent, {
        data: new VolunteeringHours()
      })
      let volunteeringHours: VolunteeringHours;
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          volunteeringHours = data;
          volunteeringHours.volunteerID = this.volunteerId;
          volunteeringHours.creationDate = new Date();
          this.volunteeringHoursService.add(volunteeringHours).subscribe(response => {
            if (response) {
              this.snackBar.open("Ugovor uspješno dodan", "Zatvori", {
                duration: 10000,
                panelClass: ['snackbar-success']
              });
            } else {
              this.snackBar.open("Greška", "RIP", {
                duration: 10000,
                panelClass: ['snackbar-error']
              });
            }
            this.volunteeringHoursService.getCountForVolunteer(this.volunteerId).subscribe(count => {
              this.resultsLength = count;
            })
            this.volunteeringHoursService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
              this.data = data;
              this.isLoadingResults = false;
            })
          })
        }

      })

    } else {
      const dialogRef = this.dialog.open(VolunteeringHoursAddEditComponent, {
        data: new VolunteeringHours(row.id, row.startDate, row.endDate, row.numberOfHours)
      })
      let volunteeringHours: VolunteeringHours;
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          volunteeringHours = data;
          volunteeringHours.volunteerID = this.volunteerId;
          volunteeringHours.creationDate = new Date();
          volunteeringHours.id = row.id;
          this.volunteeringHoursService.update(volunteeringHours).subscribe(response => {
            if (response) {
              this.snackBar.open("Ugovor uspješno promjenjen", "Zatvori", {
                duration: 10000,
                panelClass: ['snackbar-success']
              });
            } else {
              this.snackBar.open("Greška", "RIP", {
                duration: 10000,
                panelClass: ['snackbar-error']
              });
            }
            this.volunteeringHoursService.getCountForVolunteer(this.volunteerId).subscribe(count => {
              this.resultsLength = count;
            })
            this.volunteeringHoursService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
              this.data = data;
              this.isLoadingResults = false;
            })
          })
        }
      })
    }
  }

  deleteData(id: number) {
    this.volunteeringHoursService.delete(id).subscribe(response => {
      if (response) {
        this.snackBar.open("Ugovor uspješno obrisan", "Zatvori", {
          duration: 10000,
          panelClass: ['snackbar-success']
        });
      } else {
        this.snackBar.open("Greška", "RIP", {
          duration: 10000,
          panelClass: ['snackbar-error']
        });
      }
      this.volunteeringHoursService.getCountForVolunteer(this.volunteerId).subscribe(count => {
        this.resultsLength = count;
      })
      this.volunteeringHoursService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
        this.data = data;
        this.isLoadingResults = false;
      })
    })
  }

}
