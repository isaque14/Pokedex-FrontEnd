import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexApiService {

  private urlBase: string = 'https://localhost:7130/api/'

  constructor(private http: HttpClient) { }

  get apiListAllPokemons(): Observable<any> {
    this.getApiPokemonByPokedexNumber(150);
    return this.http.get<any>(this.urlBase + "pokemon").pipe()
  }

  getApiPokemonByPokedexNumber(number: number): Observable<any> {
    return this.http.get<any>(`${this.urlBase}pokemon/pokedexNumber/${number}`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getApiPokemonByname(name: string): Observable<any>{
    return this.http.get<any>(`${this.urlBase}pokemon/name/${name}`).pipe(
      map((data) => {
        return data;
      })
    )
  }
}
