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
  public success: boolean = false;
  public error: boolean = false;

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
        this.showAlertAndRedirect("researcher");
      },
      erro => {
        this.showAlertAndRedirect("login");
      }
    );
  }

  showAlertAndRedirect(route: string) {
    if (route === "login") {
      this.error = true;
    }
    else {
      this.success = true;
    }

    setTimeout(() => {
      this.router.navigate([route]);
    }, 6000);
  }

  getIdType(tipo: string): number | undefined {
    if (tipo === null) {
      return 18;
    }

    const types = [
      { id: 0, nome: 'Normal' },
      { id: 1, nome: 'Fire' },
      { id: 2, nome: 'Water' },
      { id: 3, nome: 'Electric' },
      { id: 4, nome: 'Grass' },
      { id: 5, nome: 'Ice' },
      { id: 6, nome: 'Fighting' },
      { id: 7, nome: 'Poison' },
      { id: 8, nome: 'Ground' },
      { id: 9, nome: 'Flying' },
      { id: 10, nome: 'Psychic' },
      { id: 11, nome: 'Bug' },
      { id: 12, nome: 'Rock' },
      { id: 13, nome: 'Ghost' },
      { id: 14, nome: 'Dragon' },
      { id: 15, nome: 'Dark' },
      { id: 16, nome: 'Steel' },
      { id: 17, nome: 'Fairy' },
      { id: 18, nome: 'unknown' },
      { id: 19, nome: 'Shadow' }
    ];

    const type = types.find(t => t.nome.toLowerCase() === tipo.toLowerCase());
    return type ? type.id : undefined;
  }
}
