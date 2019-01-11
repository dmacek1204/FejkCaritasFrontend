import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { DocumentService } from 'src/app/services/document.service';
import { ActivatedRoute } from '@angular/router';
import { DocumentAddEditComponent } from './document-add-edit/document-add-edit.component';
import { Document } from './document.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  displayedColumns: string[] = ['id', 'startDate', 'endDate', 'numberOfHours', 'documentType', 'actions'];
  data: Document[];
  resultsLength;

  
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  isLoadingResults = false;
  private volunteerId: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;



  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private documentService: DocumentService, public snackBar: MatSnackBar, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.isLoadingResults = true;
    

    this.route.parent.params.subscribe(params => {
      this.volunteerId = params["id"];
      this.documentService.getCountForVolunteer(params["id"]).subscribe(count => {
        this.resultsLength = count;
      })
      this.documentService.getForVolunteer(params["id"], this.pageIndex, this.pageSize).subscribe(data => {
        this.data = data;
        this.isLoadingResults = false;
      })
    })
  }

  getServerData(event: PageEvent) {
    this.isLoadingResults = true;
    

    this.documentService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
      this.data = data;
      this.isLoadingResults = false;
    })

  }

  addEditDocument(row: Document) {
    if (row === null) {
      const dialogRef = this.dialog.open(DocumentAddEditComponent, {
        data: new Document()
      })
      let document: Document;
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          document = data;
          document.volunteerID = this.volunteerId;
          this.documentService.add(document).subscribe(response => {
            if (response) {
              this.snackBar.open("Dokument uspješno dodan", "Zatvori", {
                duration: 10000,
                panelClass: ['snackbar-success']
              });
            } else {
              this.snackBar.open("Greška", "RIP", {
                duration: 10000,
                panelClass: ['snackbar-error']
              });
            }
            this.documentService.getCountForVolunteer(this.volunteerId).subscribe(count => {
              this.resultsLength = count;
            })
            this.documentService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
              this.data = data;
              this.isLoadingResults = false;
            })
          })
        }

      })

    } else {
      const dialogRef = this.dialog.open(DocumentAddEditComponent, {
        data: new Document(row.id, row.startDate, row.endDate, row.numberOfHours, null, row.documentType)
      })
      let document: Document;
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          document = data;
          document.volunteerID = this.volunteerId;
          document.id = row.id;
          this.documentService.update(document).subscribe(response => {
            if (response) {
              this.snackBar.open("Dokument uspješno promjenjen", "Zatvori", {
                duration: 10000,
                panelClass: ['snackbar-success']
              });
            } else {
              this.snackBar.open("Greška", "RIP", {
                duration: 10000,
                panelClass: ['snackbar-error']
              });
            }
            this.documentService.getCountForVolunteer(this.volunteerId).subscribe(count => {
              this.resultsLength = count;
            })
            this.documentService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
              this.data = data;
              this.isLoadingResults = false;
            })
          })
        }
      })
    }
  }

  deleteData(id: number) {
    this.documentService.delete(id).subscribe(response => {
      if (response) {
        this.snackBar.open("Dokument uspješno obrisan", "Zatvori", {
          duration: 10000,
          panelClass: ['snackbar-success']
        });
      } else {
        this.snackBar.open("Greška", "RIP", {
          duration: 10000,
          panelClass: ['snackbar-error']
        });
      }
      this.documentService.getCountForVolunteer(this.volunteerId).subscribe(count => {
        this.resultsLength = count;
      })
      this.documentService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
        this.data = data;
        this.isLoadingResults = false;
      })
    })
  }

}
