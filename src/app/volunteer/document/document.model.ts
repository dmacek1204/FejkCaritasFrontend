import { DocumentType } from '../../models/document-type.model';
export class Document
{
    id: number;
    startDate: Date;
    endDate: Date;
    numberOfHours: number;
    volunteerID: number;
    documentType: DocumentType;

    constructor(id?: number, startDate?: Date, endDate?: Date, numberOfHours?: number, volunteerID?: number, documentType?: DocumentType) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.numberOfHours = numberOfHours;
        this.volunteerID = volunteerID;
        this.documentType = documentType;
    }
}