import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public pokemon: any;
  public evolutionLine: any[] = [];

  constructor(
    private activateRoute: ActivatedRoute, 
    private pokedexApiService: PokedexApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPokemonById();
    this.getPokemonsInEvolutionLine;
  }

  getPokemonById() {
    const id = this.activateRoute.snapshot.params['id'];
  
    this.pokedexApiService.getApiPokemonByPokedexNumber(id).subscribe((pokemonData) => {
      this.pokemon = pokemonData;
      this.getPokemonsInEvolutionLine(pokemonData.object.evolutionLine);
    });

    this.getPokemonsInEvolutionLine(this.pokemon.object.evolutionLine);
  }

  getPokemonsInEvolutionLine(namePokemons: string[]){
    namePokemons.forEach((name: string) => {
      this.pokedexApiService.getApiPokemonByname(name).subscribe((pokemonData) => {
        this.evolutionLine.push(pokemonData);
        console.log("teste a Linha de evolução ", pokemonData);
      })
    });
  }
  
}
