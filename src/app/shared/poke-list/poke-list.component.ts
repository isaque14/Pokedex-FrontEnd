import { Component, OnInit } from '@angular/core';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit{
  constructor(private pokedexApiService: PokedexApiService){}

  ngOnInit(): void {
    this.pokedexApiService.apiListAllPokemons.subscribe(
      res => console.log(res)
    );
  }
}
