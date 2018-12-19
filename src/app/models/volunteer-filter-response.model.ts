import { Volunteer } from "../volunteer/volunteer.model";

export class VolunteerFilterResponse {
    public data: Volunteer[];
    public totalCount: number;

    constructor(data?: Volunteer[], totalCount?: number) {
        this.data = data;
        this.totalCount = totalCount;
    }
}