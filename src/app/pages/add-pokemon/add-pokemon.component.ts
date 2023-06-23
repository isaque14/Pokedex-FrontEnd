import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.scss']
})
export class AddPokemonComponent implements OnInit {

  form: FormGroup;

  constructor(private pokedexApiService: PokedexApiService, private formBuilder: FormBuilder, private router: Router) {
    this.form = formBuilder.group({
      name: [null],
      description: [null],
      number: [null],
      type1: [null],
      type2: [null],
      urlImage: [null],
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {

    const data = {
      "name": this.form.value.name.charAt(0).toUpperCase() + this.form.value.name.slice(1),
      "pokedexNumber": this.form.value.number,
      "type": [this.getIdType(this.form.value.type1), this.getIdType(this.form.value.type2)],
      "description": this.form.value.description,
      "evolutionStage": 1,
      "evolutionLine": [],
      "isStarter": false,
      "isLegendary": false,
      "isMythical": false,
      "isUltraBeast": false,
      "isMega": false,
      "urlImage": this.form.value.urlImage,
      "regionId": 9,
    };

    const body = JSON.stringify(data);

    this.pokedexApiService.postApiCreatePokemon(body).subscribe(
      data => {
        console.log(data);
      },
      erro => {

      }
    );
  }

  getIdType(tipo: string): number | undefined {
    if (tipo === null) {
      return 19;
    }

    const types = [
      { id: 1, nome: 'Normal' },
      { id: 2, nome: 'Fire' },
      { id: 3, nome: 'Water' },
      { id: 4, nome: 'Electric' },
      { id: 5, nome: 'Grass' },
      { id: 6, nome: 'Ice' },
      { id: 7, nome: 'Fighting' },
      { id: 8, nome: 'Poison' },
      { id: 9, nome: 'Ground' },
      { id: 10, nome: 'Flying' },
      { id: 11, nome: 'Psychic' },
      { id: 12, nome: 'Bug' },
      { id: 13, nome: 'Rock' },
      { id: 14, nome: 'Ghost' },
      { id: 15, nome: 'Dragon' },
      { id: 16, nome: 'Dark' },
      { id: 17, nome: 'Steel' },
      { id: 18, nome: 'Fairy' },
      { id: 19, nome: 'unknown' }
    ];

    const type = types.find(t => t.nome.toLowerCase() === tipo.toLowerCase());
    return type ? type.id : undefined;
  }
}
