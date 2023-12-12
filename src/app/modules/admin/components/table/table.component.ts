import { Component } from '@angular/core';
import { Animales } from 'src/app/models/animales';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  coleccionAnimales: Animales[] = []; // creamos colección basada en interfaz Producto

  animalSeleccionado!: Animales; // ! -> recibir valores vacíos

  modalVisibleAnimales: boolean = false;

  // modalVisible: boolean = false;
  // eliminarVisible: boolean = false;

  // formulario vínculado al archivo html
  animales = new FormGroup({
    nombre: new FormControl('',Validators.required),
    imagen: new FormControl('',Validators.required),
    alt: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required)
  })

  constructor(
    public servicioCrud: CrudService // patentamos servicio de forma local
  ){}

  ngOnInit(): void{
    this.servicioCrud.obtenerAnimales().subscribe(animales => {
      this.coleccionAnimales = animales;
    })
  }

  async agregarAnimal(){ // método para validar esos valores del producto agregado
    if(this.animales.valid){
      let nuevoAnimal: Animales = {
        idAnimales: '',
        nombre: this.animales.value.nombre!,
        imagen: this.animales.value.imagen!,
        alt: this.animales.value.alt!,
        descripcion: this.animales.value.descripcion!,

      };

      // llamamos al servicioCrud; función crearProducto; seteamos nuevoProducto
      await this.servicioCrud.crearAnimales(nuevoAnimal)
      .then(animal => {
        alert("Ha agregado un nuevo producto con éxito :)");
      })
      .catch(error => {
        alert("Hubo un error al cargar nuevo producto :( \n"+error);
      })
    }
  }

  // EDITAR PRODUCTO -> VINCULA AL MODAL DE EDITAR
  mostrarEditar(animalSeleccionado: Animales){
    this.animalSeleccionado = animalSeleccionado;

    /* retomamos y enviamos los valores de ese producto
    seleccionado, el ID no se vuelve a enviar porque
    no se modifica */
    this.animales.setValue({
      nombre: animalSeleccionado.nombre,
      imagen: animalSeleccionado.imagen,
      alt: animalSeleccionado.alt,
      descripcion: animalSeleccionado.descripcion,
    })
  }

  // VINCULA A BOTÓN "GUARDAR CAMBIOS"
  // recibir los valores nuevos que ingresemos en el formulario
  editarAnimal(){
    let datos: Animales = {
      idAnimales: this.animalSeleccionado.idAnimales,
      // signo de exclamación "!" -> puede recibir valores vacíos al inicializar
      nombre: this.animales.value.nombre!,
      imagen: this.animales.value.imagen!,
      alt: this.animales.value.alt!,
      descripcion: this.animales.value.descripcion!
    }

    this.servicioCrud.modificarAnimal(this.animalSeleccionado.idAnimales, datos)
    .then(animal => {
      alert("El producto fue modificado con éxito :).");
    })
    .catch(error => {
      alert("No se pudo modificar el producto :( \n"+error);
    })
  }

  // ELIMINAR EL PRODUCTO
  mostrarBorrar(animalSeleccionado: Animales){ // botón para el modal
    this.modalVisibleAnimales = true; // modal
    this.animalSeleccionado = animalSeleccionado; // asigna producto elegido
  }

  borrarAnimal(){ // botón para eliminar definitivamente
    this.servicioCrud.eliminarAnimal(this.animalSeleccionado.idAnimales)
    .then(respuesta => {
      alert("El producto se ha eliminado correctamente :)");
    })
    .catch(error => {
      alert("No se ha podido eliminar el producto :( \n"+error);
    })
  }
}
