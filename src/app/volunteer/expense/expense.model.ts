import { ExpenseType } from "src/app/models/expense-type.model";

export class Expense
{
    id: number;
    year: number;
    amount: number;
    volunteerID: number;
    description: string;
    expenseType: ExpenseType;

    constructor(id?: number, year?: number, amount?: number, volunteerID?: number, description?: string, expenseType?: ExpenseType) {
        this.id = id;
        this.year = year;
        this.amount = amount;
        this.volunteerID = volunteerID;
        this.description = description;
        this.expenseType = expenseType;
    }
}