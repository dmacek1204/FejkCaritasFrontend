import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Contract } from '../contract.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contract-add-edit',
  templateUrl: './contract-add-edit.component.html',
  styleUrls: ['./contract-add-edit.component.css']
})
export class ContractAddEditComponent implements OnInit {

  contractForm = new FormGroup({
    startDate: new FormControl('', [
      Validators.required
    ]),
    endDate: new FormControl(''),
    numberOfHours: new FormControl('', [
      Validators.required
    ]),
  })

  constructor(public dialogRef: MatDialogRef<ContractAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contract) {

      if (data.id) {
        this.contractForm.controls['startDate'].setValue(data.startDate);
        this.contractForm.controls['endDate'].setValue(data.endDate);
        this.contractForm.controls['numberOfHours'].setValue(data.numberOfHours);
      }
  }

  ngOnInit() {}

  onSubmit() {
    if (this.contractForm.valid) {
      let contract = new Contract(null, this.contractForm.controls['startDate'].value, this.contractForm.controls['endDate'].value, this.contractForm.controls['numberOfHours'].value, null, null)
      this.dialogRef.close(contract);
    }
  }
}
