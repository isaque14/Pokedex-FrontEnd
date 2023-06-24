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
  public success: boolean = false;
  public error: boolean = false;

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

    const data = {
      "id": this.pokemon.id,
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

    this.pokedexApiService.putApiUpdatePokemon(body, this.pokemon.id).subscribe(
      data => {
        this.showAlertAndRedirect("researcher");
      },
      erro => {
        this.showAlertAndRedirect("login")
      }
    );
  }

  showAlertAndRedirect(route: string) {
    if(route === "login"){
      this.error = true;
    }
    else{
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
