import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexApiService {

  private urlBase: string = 'https://localhost:7130/api/';
  public responseGPT: string = "";

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

  getApiPokemonByname(name: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}pokemon/name/${name}`).pipe(
      map((data) => {
        return data;
      })
    )
  }

  getApiResponseRotomGPT(text: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}RequestChatGPT?text=${encodeURIComponent(text)}`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  postApiLoginUser(email: string, password: string) {
    const data = {
      email: email,
      password: password
    };

    const body = JSON.stringify(data);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.urlBase}Token/LoginUser`, body, { headers: headers });
  }

  postApiCreateUser(email: string, password: string) {
    const data = {
      "email": email,
      "password": password
    };

    const body = JSON.stringify(data);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(`${this.urlBase}Token/CreateUser`, body, { headers: headers });
  }

  postApiCreatePokemon(pokemon: any) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    return this.http.post<any>(`${this.urlBase}Pokemon`, pokemon, { headers: headers });
  }

  putApiUpdatePokemon(pokemon: any, id: number) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    return this.http.put<any>(`${this.urlBase}Pokemon/?id=${id}`, pokemon, { headers: headers });
  }

  apiDeletePokemon(id: number) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });

    return this.http.delete<any>(`${this.urlBase}Pokemon/${id}`, { headers: headers });
  }
}
