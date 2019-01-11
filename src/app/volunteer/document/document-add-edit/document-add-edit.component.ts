import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Document } from '../document.model';
import { DateValidators } from 'src/app/form-validators/date-validators';
import { CatalogueService } from '../../../services/catalogue.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DocumentType } from 'src/app/models/document-type.model';

@Component({
  selector: 'app-document-add-edit',
  templateUrl: './document-add-edit.component.html',
  styleUrls: ['./document-add-edit.component.css']
})
export class DocumentAddEditComponent implements OnInit {

  documentForm: FormGroup;
  documentTypeCollection: DocumentType[];
  filteredDocumentTypes: Observable<DocumentType[]>;

  constructor(public dialogRef: MatDialogRef<DocumentAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Document, private fb: FormBuilder, private catalogueService: CatalogueService) {

    this.documentForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      numberOfHours: ['', Validators.required],
      documentType: ['', Validators.required],
      dates: null
    }, {validator: DateValidators.dateLessThan('startDate', 'endDate', {'dates': true})})

    if (data.id) {
      this.documentForm.controls['startDate'].setValue(data.startDate);
      this.documentForm.controls['endDate'].setValue(data.endDate);
      this.documentForm.controls['numberOfHours'].setValue(data.numberOfHours);
      this.documentForm.controls['documentType'].setValue(data.documentType.name);
    }
  }

  ngOnInit() {
    this.catalogueService.getDocumentTypes().subscribe(
      data => {
        this.documentTypeCollection = data;

        this.filteredDocumentTypes = this.documentForm.controls['documentType'].valueChanges.pipe(
          startWith(''),
          map(value => this.filterDocumentTypes(value))
        )
      }
    );
   }

  onSubmit() {
    if (this.documentForm.valid) {
      let selectedDocumentType = this.documentTypeCollection.find(d => d.name === this.documentForm.controls['documentType'].value)
      let documentType = new DocumentType(selectedDocumentType.id, selectedDocumentType.name)
      let document = new Document(null, this.documentForm.controls['startDate'].value, this.documentForm.controls['endDate'].value, this.documentForm.controls['numberOfHours'].value, null, documentType)
      this.dialogRef.close(document);
    } else {
      (<any>Object).values(this.documentForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

  private filterDocumentTypes(value: any): DocumentType[] {
    const filterValue = value.toLowerCase();

    return this.documentTypeCollection.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
