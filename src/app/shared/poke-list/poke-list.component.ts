import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
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

  public filterByLegendary(){
    this.pokedexApiService.getApiPokemonByLegendary().subscribe(
      data => {

        console.log(data);
        this.getAllPokemons = data.object;
        this.convertTypeNumbersToNames();
        this.setAllPokemons = this.getAllPokemons;
      }
    );
  }

  public filterByMythical(){
    this.pokedexApiService.getApiPokemonByMythical().subscribe(
      data => {

        console.log(data);
        this.getAllPokemons = data.object;
        this.convertTypeNumbersToNames();
        this.setAllPokemons = this.getAllPokemons;
      }
    );
  }

  public filterByStarter(){
    this.pokedexApiService.getApiPokemonByStarter().subscribe(
      data => {

        console.log(data);
        this.getAllPokemons = data.object;
        this.convertTypeNumbersToNames();
        this.setAllPokemons = this.getAllPokemons;
      }
    );
  }

  public cleanFilter(){
    this.pokedexApiService.apiListAllPokemons.subscribe(
      res => {
        this.getAllPokemons = res.object;
        this.convertTypeNumbersToNames();
        this.setAllPokemons = this.getAllPokemons;
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
