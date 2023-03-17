import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  myForm: FormGroup = this._formBuilder.group({
    genre: [
      'M',
      Validators.required
    ],
    notifications: [
      true,
      Validators.required
    ],
    conditions: [
      false,
      Validators.requiredTrue
    ]
  });

  person = {
    genre: 'F',
    notifications: true
  }

  constructor(
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.myForm.reset({
      ...this.person,
      conditions: true
    });

    this.myForm.valueChanges.subscribe( ({conditions, ...form}) => {
      this.person = form;
    });
  }

  save() {

    const formValue = {...this.myForm.value};
    delete formValue.conditions;

    this.person = formValue;
  }
}
