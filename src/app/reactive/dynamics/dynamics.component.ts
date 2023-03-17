import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
  styles: [
  ]
})
export class DynamicsComponent {

  myForm: FormGroup = this._formBuilder.group({
    name: [
      ,
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],
    favorites: this._formBuilder.array(
      [
        [
          'Resident Evil',
          Validators.required
        ],
        [
          'Silent Hill',
          Validators.required
        ]
      ],
      [
        Validators.required
      ]
    )
  });

  newFavorite: FormControl = this._formBuilder.control(
    '',
    Validators.required
  );

  getFavoritesArr() {
    return this.myForm.get('favorites') as FormArray;
  }

  constructor(
    private _formBuilder: FormBuilder
  ) {}

  fieldNotValid( field: string ) {
    return this.myForm.controls[field].errors && 
          this.myForm.controls[field].touched
  }

  addFavorite() {
    if(this.newFavorite.invalid) {
      return;
    }

    // this.getFavoritesArr().push( new FormControl( this.newFavorite.value, Validators.required ) );
    this.getFavoritesArr().push( this._formBuilder.control( this.newFavorite.value, Validators.required ) );

    this.newFavorite.reset();
  }

  deleteFavorite(index: number) {
    this.getFavoritesArr().removeAt(index);
  }

  save() {

    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
  }
}
