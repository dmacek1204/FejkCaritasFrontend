export class Contract
{
    id: number;
    startDate: Date;
    endDate: Date;
    numberOfHours: number;
    creationDate: Date;
    volunteerID: number;

    constructor(id?: number, startDate?: Date, endDate?: Date, numberOfHours?: number, creationDate?: Date, volunteerID?: number) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.numberOfHours = numberOfHours;
        this.creationDate = creationDate;
        this.volunteerID = volunteerID;
    }
}