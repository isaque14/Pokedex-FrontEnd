import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexApiService {

  private url: string = 'https://localhost:7130/api/pokemon'

  constructor(private http: HttpClient) { }

  get apiListAllPokemons():Observable<any>{
    return this.http.get<any>(this.url).pipe()
  }
}
