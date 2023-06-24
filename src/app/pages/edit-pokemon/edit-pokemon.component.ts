import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.scss']
})
export class EditPokemonComponent implements OnInit {

  public form!: FormGroup;
  public pokemon: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private pokedexApiService: PokedexApiService,
    private fb: FormBuilder,
    private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      number: [''],
      type1: [''],
      type2: [''],
      urlImage: [''],
    });

    this.getPokemonData();
  }


  getPokemonData() {
    const id = this.activateRoute.snapshot.params['id'];

    this.pokedexApiService.getApiPokemonByPokedexNumber(id).subscribe((pokemonData) => {

      pokemonData.object.type[0] = this.convertTypeNumberToName(pokemonData.object.type[0]);
      pokemonData.object.type[1] = this.convertTypeNumberToName(pokemonData.object.type[1]);

      this.pokemon = pokemonData.object;

      this.form = this.fb.group({
        name: [this.pokemon.name],
        description: [this.pokemon.description],
        number: [this.pokemon.pokedexNumber],
        type1: [this.pokemon.type[0]],
        type2: [this.pokemon.type[1]],
        urlImage: [this.pokemon.urlImage]
      });
    });
  }

  onSubmit() {

  }

  convertTypeNumberToName(typeNumber: number): string {
    switch (typeNumber) {
      case 0:
        return 'Normal';
      case 1:
        return 'Fire';
      case 2:
        return 'Water';
      case 3:
        return 'Electric';
      case 4:
        return 'Grass';
      case 5:
        return 'Ice';
      case 6:
        return 'Fighting';
      case 7:
        return 'Poison';
      case 8:
        return 'Ground';
      case 9:
        return 'Flying';
      case 10:
        return 'Psychic';
      case 11:
        return 'Bug';
      case 12:
        return 'Rock';
      case 13:
        return 'Ghost';
      case 14:
        return 'Dragon';
      case 15:
        return 'Dark';
      case 16:
        return 'Steel';
      case 17:
        return 'Fairy';
      case 18:
        return 'Unknown';
      case 19:
        return 'Shadow';
      default:
        return 'Unknown';
    }
  }
  
}
