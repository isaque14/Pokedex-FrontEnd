import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingModule } from './routing.module';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { IndexComponent } from './index/index.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { RotomGPTComponent } from './rotom-gpt/rotom-gpt.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

 

@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
    IndexComponent,
    PokedexComponent,
    RotomGPTComponent,
    LoginComponent
  ],

  imports: [
    CommonModule,
    RoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
