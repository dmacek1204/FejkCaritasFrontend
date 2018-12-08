import { Sex } from "../models/sex.model";
import { Citizenship } from '../models/citizenship.model';

export class Volunteer{

    private ID: number;
    private firstName: string;
    private lastName: string;
    private oib: string;
    private username: string;
    private email: string;
    private birthday: Date;
    private sex: Sex;
    private potentialVolunteer: boolean;
    private outsideVolunteer: boolean;
    private citizenship: Citizenship;

    constructor(ID: number, firstName: string, lastName: string, oib: string, username: string, email: string, birthday: Date, sex: Sex, potentialVolunteer: boolean, outsideVolunteer: boolean, citizenship: Citizenship) {
		this.ID = ID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.oib = oib;
		this.username = username;
		this.email = email;
		this.birthday = birthday;
		this.sex = sex;
		this.potentialVolunteer = potentialVolunteer;
		this.outsideVolunteer = outsideVolunteer;
		this.citizenship = citizenship;
	}
}