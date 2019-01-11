import { Component, OnInit, ViewChild } from '@angular/core';
import { Expense } from './expense.model';
import { PageEvent, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { ExpenseService } from 'src/app/services/expense.service';
import { ActivatedRoute } from '@angular/router';
import { ExpenseAddEditComponent } from './expense-add-edit/expense-add-edit.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  displayedColumns: string[] = ['id', 'amount', 'year', 'description', 'expenseType', 'actions'];
  data: Expense[];
  resultsLength;

  
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  isLoadingResults = false;
  private volunteerId: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private expenseService: ExpenseService, public snackBar: MatSnackBar, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.isLoadingResults = true;
    

    this.route.parent.params.subscribe(params => {
      this.volunteerId = params["id"];
      this.expenseService.getCountForVolunteer(params["id"]).subscribe(count => {
        this.resultsLength = count;
      })
      this.expenseService.getForVolunteer(params["id"], this.pageIndex, this.pageSize).subscribe(data => {
        this.data = data;
        this.isLoadingResults = false;
      })
    })
  }

  getServerData(event: PageEvent) {
    this.isLoadingResults = true;
    

    this.expenseService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
      this.data = data;
      this.isLoadingResults = false;
    })

  }

  addEditExpense(row: Expense) {
    if (row === null) {
      const dialogRef = this.dialog.open(ExpenseAddEditComponent, {
        data: new Expense()
      })
      let expense: Expense;
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          expense = data;
          expense.volunteerID = this.volunteerId;
          this.expenseService.add(expense).subscribe(response => {
            if (response) {
              this.snackBar.open("Trošak uspješno dodan", "Zatvori", {
                duration: 10000,
                panelClass: ['snackbar-success']
              });
            } else {
              this.snackBar.open("Greška", "RIP", {
                duration: 10000,
                panelClass: ['snackbar-error']
              });
            }
            this.expenseService.getCountForVolunteer(this.volunteerId).subscribe(count => {
              this.resultsLength = count;
            })
            this.expenseService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
              this.data = data;
              this.isLoadingResults = false;
            })
          })
        }

      })

    } else {
      const dialogRef = this.dialog.open(ExpenseAddEditComponent, {
        data: new Expense(row.id, row.year, row.amount, row.volunteerID, row.description, row.expenseType)
      })
      let expense: Expense;
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          expense = data;
          expense.volunteerID = this.volunteerId;
          expense.id = row.id;
          this.expenseService.update(expense).subscribe(response => {
            if (response) {
              this.snackBar.open("Trošak uspješno promjenjen", "Zatvori", {
                duration: 10000,
                panelClass: ['snackbar-success']
              });
            } else {
              this.snackBar.open("Greška", "RIP", {
                duration: 10000,
                panelClass: ['snackbar-error']
              });
            }
            this.expenseService.getCountForVolunteer(this.volunteerId).subscribe(count => {
              this.resultsLength = count;
            })
            this.expenseService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
              this.data = data;
              this.isLoadingResults = false;
            })
          })
        }
      })
    }
  }

  deleteData(id: number) {
    this.expenseService.delete(id).subscribe(response => {
      if (response) {
        this.snackBar.open("Trošak uspješno obrisan", "Zatvori", {
          duration: 10000,
          panelClass: ['snackbar-success']
        });
      } else {
        this.snackBar.open("Greška", "RIP", {
          duration: 10000,
          panelClass: ['snackbar-error']
        });
      }
      this.expenseService.getCountForVolunteer(this.volunteerId).subscribe(count => {
        this.resultsLength = count;
      })
      this.expenseService.getForVolunteer(this.volunteerId, this.paginator.pageIndex, this.paginator.pageSize).subscribe(data => {
        this.data = data;
        this.isLoadingResults = false;
      })
    })
  }
}
