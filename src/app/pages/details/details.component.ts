import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public pokemon: any;

  constructor(private activateRoute: ActivatedRoute, private pokedexApiService: PokedexApiService) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
    const id = this.activateRoute.snapshot.params['id'];
  
    this.pokedexApiService.getApiPokemonByPokedexNumber(id).subscribe((pokemonData) => {
      this.pokemon = pokemonData;
    });
  }
  
}
