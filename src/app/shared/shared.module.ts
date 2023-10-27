import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule
  ],
  exports: [
  ]
})
export class SharedModule { }
