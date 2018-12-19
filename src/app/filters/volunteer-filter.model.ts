import { Sex } from "../models/sex.model";
import { Citizenship } from "../models/citizenship.model";

export class VolunteerFilter {
    public firstName: string;
    public lastName: string;
    public oib: string;
    public birthday: Date;
    public username: string;
    public email: string;
    public potentialVolunteer: boolean;
    public outsideVolunteer: boolean;
    public sexID: number;
    public citizenshipID: number;

	constructor(firstName?: string, lastName?: string, oib?: string, birthday?: Date, username?: string, email?: string, potentialVolunteer?: boolean, outsideVolunteer?: boolean, sexID?: number, citizenshipID?: number) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.oib = oib;
		this.birthday = birthday;
		this.username = username;
		this.email = email;
		this.potentialVolunteer = potentialVolunteer;
		this.outsideVolunteer = outsideVolunteer;
		this.sexID = sexID;
		this.citizenshipID = citizenshipID;
	}

}