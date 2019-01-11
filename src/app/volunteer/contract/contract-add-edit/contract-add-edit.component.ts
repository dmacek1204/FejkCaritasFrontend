import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Contract } from '../contract.model';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { DateValidators } from 'src/app/form-validators/date-validators';

@Component({
  selector: 'app-contract-add-edit',
  templateUrl: './contract-add-edit.component.html',
  styleUrls: ['./contract-add-edit.component.css']
})
export class ContractAddEditComponent implements OnInit {

  contractForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ContractAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contract, private fb: FormBuilder) {

    this.contractForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: [''],
      numberOfHours: ['', Validators.required],
      dates: null
    }, {validator: DateValidators.dateLessThan('startDate', 'endDate', {'dates': true})})

    if (data.id) {
      this.contractForm.controls['startDate'].setValue(data.startDate);
      this.contractForm.controls['endDate'].setValue(data.endDate);
      this.contractForm.controls['numberOfHours'].setValue(data.numberOfHours);
    }
  }

  ngOnInit() { }

  onSubmit() {
    if (this.contractForm.valid) {
      let contract = new Contract(null, this.contractForm.controls['startDate'].value, this.contractForm.controls['endDate'].value, this.contractForm.controls['numberOfHours'].value, null, null)
      this.dialogRef.close(contract);
    } else {
      (<any>Object).values(this.contractForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onCancel(){
    this.dialogRef.close();
  }
}
