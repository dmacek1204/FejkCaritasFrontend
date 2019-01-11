import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Expense } from '../expense.model';
import { ExpenseType } from '../../../models/expense-type.model';
import { CatalogueService } from '../../../services/catalogue.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-expense-add-edit',
  templateUrl: './expense-add-edit.component.html',
  styleUrls: ['./expense-add-edit.component.css']
})
export class ExpenseAddEditComponent implements OnInit {

  expenseForm: FormGroup;

  expenseTypeCollection: ExpenseType[];
  filteredExpenseTypes: Observable<ExpenseType[]>;
  years: number[];



  constructor(public dialogRef: MatDialogRef<ExpenseAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Expense, private fb: FormBuilder, private catalogueService: CatalogueService) {

    this.expenseForm = this.fb.group({
      year: ['', Validators.required],
      amount: ['', Validators.required],
      description: [''],
      expenseType: ['', Validators.required]
    });

    if (data.id) {
      this.expenseForm.controls['year'].setValue(data.year);
      this.expenseForm.controls['amount'].setValue(data.amount);
      this.expenseForm.controls['description'].setValue(data.description);
      this.expenseForm.controls['expenseType'].setValue(data.expenseType.name);
    }
  }

  ngOnInit() { 
    let now = new Date();
    let currentYear = now.getFullYear();

    this.years = new Array<number>();
    this.years.push(currentYear - 1);
    this.years.push(currentYear);
    this.years.push(currentYear + 1);

    this.catalogueService.getExpenseTypes().subscribe(
      data => {
        this.expenseTypeCollection = data;

        this.filteredExpenseTypes = this.expenseForm.controls['expenseType'].valueChanges.pipe(
          startWith(''),
          map(value => this.filterExpenseTypes(value))
        )
      }
    );
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      let expenseType = this.expenseTypeCollection.find(option => option.name === this.expenseForm.controls['expenseType'].value)

      let expense = new Expense(null, this.expenseForm.controls['year'].value, this.expenseForm.controls['amount'].value,
        null, this.expenseForm.controls['description'].value, new ExpenseType(expenseType.id, expenseType.name))
      this.dialogRef.close(expense);
    } else {
      (<any>Object).values(this.expenseForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  private filterExpenseTypes(value: any): ExpenseType[] {
    const filterValue = value.toLowerCase();

    return this.expenseTypeCollection.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
