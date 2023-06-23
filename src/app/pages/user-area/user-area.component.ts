import { Component, OnInit } from '@angular/core';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss']
})
export class UserAreaComponent implements OnInit{

  constructor(private pokedexApiService: PokedexApiService) { }

  private setAllPokemons: any;
  public getAllPokemons: any;

  ngOnInit(): void {
    this.pokedexApiService.apiListAllPokemons.subscribe(
      res => {
        this.getAllPokemons = res.object;
        this.convertTypeNumbersToNames();
        this.setAllPokemons = this.getAllPokemons;
      }
    );
  }

  public getSearch(value: string){
    const filter = this.setAllPokemons.filter((res: any) => {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase();
      return !res.name.indexOf(capitalizedValue) || res.pokedexNumber === Number(value);
    });    

    this.getAllPokemons = filter;
  }

  btnDeletePokemon(id: number) {

    this.pokedexApiService.apiDeletePokemon(id).subscribe(
      data => {
        console.log(data);
      },
      erro => {

      }
    );

  }

  private convertTypeNumbersToNames(): void {
    const typeMappings = [
      'Normal',
      'Fire',
      'Water',
      'Electric',
      'Grass',
      'Ice',
      'Fighting',
      'Poison',
      'Ground',
      'Flying',
      'Psychic',
      'Bug',
      'Rock',
      'Ghost',
      'Dragon',
      'Dark',
      'Steel',
      'Fairy',
      'Unknown',
      'Shadow'
    ];

    this.getAllPokemons.forEach((pokemon: any) => {
      const convertedTypes = pokemon.type.map((typeNumber: number) => {
        return typeMappings[typeNumber];
      });
      pokemon.type = convertedTypes;
    });
  }
}
