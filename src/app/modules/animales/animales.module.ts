import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalesRoutingModule } from './animales-routing.module';
import { CardComponent } from './components/card/card.component';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    CardComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    AnimalesRoutingModule
  ],
  exports: [
    CardComponent,
    PagesComponent
  ]
})
export class AnimalesModule { }
