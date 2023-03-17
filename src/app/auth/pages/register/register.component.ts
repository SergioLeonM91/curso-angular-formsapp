import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup = this._formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(this._validatorService.firstLastNamePattern)
      ]
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this._validatorService.emailPattern)
      ],
      [
        this._emailValidator
      ]
    ],
    username: [
      '',
      [
        Validators.required,
        this._validatorService.cantBeSergei
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],
    password2: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  }, {
    validators: [
      this._validatorService.matchFields('password', 'password2')
    ]
  });

  get emailErrorMsg(): string {
    const errors = this.myForm.get('email')?.errors;

    if( errors?.['required'] ) {
      return 'Emails is required';
    } else if( errors?.['pattern'] ) {
      return 'Emails is not valid';
    } else if( errors?.['emailTaken'] ) {
      return 'Emails is not available';
    }

    return '';
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _validatorService: ValidatorsService,
    private _emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.myForm.reset({
      name: 'Sergio Leon',
      email: 'test1@test.com',
      username: 'Helios',
      password: '123456',
      password2: '123456'
    })
  }

  noValidField( field: string ): boolean {
    return (this.myForm.get(field)?.invalid
          && this.myForm.get(field)?.touched) ? true : false;
  }

  submitForm() {
    console.log(this.myForm.value);

    this.myForm.markAllAsTouched();
  }
}
