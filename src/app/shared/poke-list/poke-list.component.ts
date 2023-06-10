import { Component, OnInit } from '@angular/core';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
  constructor(private pokedexApiService: PokedexApiService) { }

  public getAllPokemons: any;

  ngOnInit(): void {
    this.pokedexApiService.apiListAllPokemons.subscribe(
      res => {
        this.getAllPokemons = res.object;
        this.convertTypeNumbersToNames();
        console.log(this.getAllPokemons);
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
