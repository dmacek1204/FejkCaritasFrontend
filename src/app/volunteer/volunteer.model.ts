import { Sex } from "../models/sex.model";
import { Citizenship } from '../models/citizenship.model';

export class Volunteer{

    public id: number;
    public firstName: string;
    public lastName: string;
    public oib: string;
    public username: string;
    public email: string;
    public birthday: Date;
    public sex: Sex;
    public potentialVolunteer: boolean;
    public outsideVolunteer: boolean;
    public citizenship: Citizenship;

    constructor(id: number, firstName: string, lastName: string, oib: string, username: string, email: string, birthday: Date, sex: Sex, potentialVolunteer: boolean, outsideVolunteer: boolean, citizenship: Citizenship) {
		this.id = id;
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