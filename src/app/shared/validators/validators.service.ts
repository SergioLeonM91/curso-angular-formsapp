import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  firstLastNamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }

  cantBeSergei ( control: FormControl ): ValidationErrors | null {
    const value = control.value?.trim().toLowerCase();

    if( value === 'sergei' ) {
        return {
            noSergei: true
        }
    }

    return null;
  }

  matchFields( field1: string, field2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const value1 = formGroup.get(field1)?.value;
      const value2 = formGroup.get(field2)?.value;

      if(value1 !== value2) {
        formGroup.get(field2)?.setErrors({ noMatch: true });
        return { noMatch: true };
      }

      formGroup.get(field2)?.setErrors(null);

      return null;
    }

  }
}
