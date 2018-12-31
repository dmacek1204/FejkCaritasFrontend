import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";

export class DateValidators {
    static dateLessThan(dateField1: string, dateField2: string, validatorField: ValidationErrors): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            var value1 = c.get(dateField1).value;
            var value2 = c.get(dateField2).value;
            if (value2 === '' || value2 === null || value1 === null || value1 === '') {
                return null;
            }
            const date1 = new Date(value1);
            const date2 = new Date(value2);
            if (date1 > date2) {
                return validatorField;
            }
            return null;
        };
    }
}