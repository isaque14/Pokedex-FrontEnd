import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingModule } from './routing.module';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { IndexComponent } from './index/index.component';
import { PokedexComponent } from './pokedex/pokedex.component';


@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
    IndexComponent,
    PokedexComponent
  ],

  imports: [
    CommonModule,
    RoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
