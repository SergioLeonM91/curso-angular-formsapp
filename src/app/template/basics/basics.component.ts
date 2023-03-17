import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styles: [
  ]
})
export class BasicsComponent {

  @ViewChild('myForm') myForm!: NgForm;

  initForm = {
    product: 'RTX 4040',
    price: 10,
    inventory: 40
  }

  validName(): boolean {
    return this.myForm?.controls['product']?.invalid 
            && this.myForm?.controls['product']?.touched;
  }

  validPrice(): boolean {
    return this.myForm?.controls['price']?.invalid 
            && this.myForm?.controls['price']?.touched;
  }

  save() {
    this.myForm.resetForm({
      product: '',
      price: 0,
      inventory: 0
    });
  }

}
