import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VolunteeringHours } from '../volunteering-hours.model';
import { DateValidators } from 'src/app/form-validators/date-validators';

@Component({
  selector: 'app-volunteering-hours-add-edit',
  templateUrl: './volunteering-hours-add-edit.component.html',
  styleUrls: ['./volunteering-hours-add-edit.component.css']
})
export class VolunteeringHoursAddEditComponent implements OnInit {

  volunteeringHoursForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<VolunteeringHoursAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VolunteeringHours, private fb: FormBuilder) {

    this.volunteeringHoursForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: [''],
      numberOfHours: ['', Validators.required],
      dates: null
    }, {validator: DateValidators.dateLessThan('startDate', 'endDate', {'dates': true})})

    if (data.id) {
      this.volunteeringHoursForm.controls['startDate'].setValue(data.startDate);
      this.volunteeringHoursForm.controls['endDate'].setValue(data.endDate);
      this.volunteeringHoursForm.controls['numberOfHours'].setValue(data.numberOfHours);
    }
  }

  ngOnInit() { }

  onSubmit() {
    if (this.volunteeringHoursForm.valid) {
      let volunteeringHours = new VolunteeringHours(null, this.volunteeringHoursForm.controls['startDate'].value, this.volunteeringHoursForm.controls['endDate'].value, this.volunteeringHoursForm.controls['numberOfHours'].value, null, null)
      this.dialogRef.close(volunteeringHours);
    } else {
      (<any>Object).values(this.volunteeringHoursForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

}
