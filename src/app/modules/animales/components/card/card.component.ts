import { Component } from '@angular/core';
import { Animales } from 'src/app/models/animales';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // COLECCION PARA PRODUCTOS BASADA EN LA INTERFAZ PRODUCTO
  coleccionAnimales: Animales[] = [];

  AnimalesSeleccionado!: Animales;

  modalVisible: boolean = false;

  constructor(
    public servicioCrud: CrudService
  ){}

  ngOnInit(): void{
    this.servicioCrud.obtenerProducto().subscribe(animales => {
      this.coleccionAnimales = animales;
    })
  }

  mostrarVer(info: Animales){ // botón de la card -> ver más información
    this.modalVisible = true;

    // mostramos la información del producto
    this.AnimalesSeleccionado = info;
  }
}
