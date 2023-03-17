import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Person {
  name: string;
  favorites: Favorite[];
}

interface Favorite {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dynamics',
  templateUrl: './dynamics.component.html',
  styles: [
  ]
})
export class DynamicsComponent {

  @ViewChild('myForm') myForm!: NgForm;

  newGame: string = '';

  person: Person = {
    name: 'Sergio',
    favorites: [
      {
        id: 1,
        name: 'Resident Evil'
      },
      {
        id: 2,
        name: 'Silent Hill'
      },
    ]
  }

  validName(): boolean {
    return this.myForm?.controls['name']?.invalid 
            && this.myForm?.controls['name']?.touched;
  }

  addGame() {

    if(this.newGame.trim() === '') {
      return;
    }

    const newFavorite: Favorite = {
      id: this.person.favorites.length + 1,
      name: this.newGame
    }

    this.person.favorites.push({...newFavorite});

    this.newGame = '';
  }

  delete( index: number ) {
    this.person.favorites.splice( index, 1 );
  }

  save() {
    
  }
}
