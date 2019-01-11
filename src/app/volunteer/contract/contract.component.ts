import { Component, OnInit, ViewChild } from '@angular/core';
import { Contract } from './contract.model';
import { HttpClient } from 'selenium-webdriver/http';
import { ContractService } from '../../services/contract.service';
import { MatSnackBar, MatDialog, PageEvent, MatPaginator } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ContractAddEditComponent } from './contract-add-edit/contract-add-edit.component';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {

  displayedColumns: string[] = ['id', 'startDate', 'endDate', 'numberOfHours', 'creationDate', 'actions'];
  data: Contract[];
  resultsLength;

  
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  isLoadingResults = false;
  private volunteerId: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;



  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private contractService: ContractService, public snackBar: MatSnackBar, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.isLoadingResults = true;
    

    this.route.parent.params.subscribe(params => {
      this.volunteerId = params["id"];
      this.contractService.getCountForVolunteer(params["id"]).subscribe(count => {
        this.resultsLength = count;
      })
      this.contractService.getForVolunteer(params["id"], this.pageIndex, this.pageSize).subscribe(data => {
        this.data = data;
        this.isLoadingResults = false;
      })
    })
  }

  getServerData(event: PageEvent) {
    this.isLoadingResults = true;
    

    this.contractService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
      this.data = data;
      this.isLoadingResults = false;
    })

  }

  addEditContract(row: Contract) {
    if (row === null) {
      const dialogRef = this.dialog.open(ContractAddEditComponent, {
        data: new Contract()
      })
      let contract: Contract;
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          contract = data;
          contract.volunteerID = this.volunteerId;
          contract.creationDate = new Date();
          this.contractService.add(contract).subscribe(response => {
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
            this.contractService.getCountForVolunteer(this.volunteerId).subscribe(count => {
              this.resultsLength = count;
            })
            this.contractService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
              this.data = data;
              this.isLoadingResults = false;
            })
          })
        }

      })

    } else {
      const dialogRef = this.dialog.open(ContractAddEditComponent, {
        data: new Contract(row.id, row.startDate, row.endDate, row.numberOfHours)
      })
      let contract: Contract;
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          contract = data;
          contract.volunteerID = this.volunteerId;
          contract.creationDate = new Date();
          contract.id = row.id;
          this.contractService.update(contract).subscribe(response => {
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
            this.contractService.getCountForVolunteer(this.volunteerId).subscribe(count => {
              this.resultsLength = count;
            })
            this.contractService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
              this.data = data;
              this.isLoadingResults = false;
            })
          })
        }
      })
    }
  }

  deleteData(id: number) {
    this.contractService.delete(id).subscribe(response => {
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
      this.contractService.getCountForVolunteer(this.volunteerId).subscribe(count => {
        this.resultsLength = count;
      })
      this.contractService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
        this.data = data;
        this.isLoadingResults = false;
      })
    })
  }
}
