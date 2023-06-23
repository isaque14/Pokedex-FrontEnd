import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { RotomGPTComponent } from './rotom-gpt/rotom-gpt.component';
import { LoginComponent } from './login/login.component'
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserAreaComponent } from './user-area/user-area.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: '', redirectTo: '/index', pathMatch: 'full'
  },
  {
    path: 'pokedex',
    component: PokedexComponent
  },
  {
    path: 'rotomGpt',
    component: RotomGPTComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: CreateAccountComponent
  },
  {
    path: 'researcher',
    component: UserAreaComponent
  },
  {
    path: 'addpoke',
    component: AddPokemonComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
