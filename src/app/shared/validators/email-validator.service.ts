import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { map, Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(
    private _http: HttpClient
  ) { }

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    const email = control.value;
    return this._http.get<any>(`http://localhost:3000/usuarios?q=${email}`)
          .pipe(
            delay(1000),
            map( resp => {
              return ( resp.length === 0 ) ? null : { emailTaken: true };
            })
          );
  }
  
}
