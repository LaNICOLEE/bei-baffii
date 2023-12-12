import { Injectable } from '@angular/core';
import { Animales } from 'src/app/models/animales';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators'; // mapea valores -> similar a la función de un arreglo

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private mascotasCollection: AngularFirestoreCollection<Animales>

  constructor(private database: AngularFirestore) {
    this.mascotasCollection = database.collection('mascotas')
  }

  // CRUD -> PRODUCTOS
  crearAnimales(Animales: Animales){
    return new Promise(async(resolve, reject) =>{
      try{
        const idAnimales = this.database.createId();
        Animales.idAnimales = idAnimales;

        const resultado = await this.mascotasCollection.doc(idAnimales).set(Animales)

        resolve(resultado);
      } catch (error){
        reject(error);
      }
    })
  }

  obtenerAnimales(){
    // snapshotChanges -> toma captura del estado de los datos
    // pipe -> funciona como tubería, retorna el nuevo arreglo
    // map -> "mapea" o recorre esa nueva información
    // a -> resguarda la nueva información y la envía
    return this.mascotasCollection.snapshotChanges().
    pipe(map(action => action.map(a => a.payload.doc.data())))
  }

  // envíamos el ID del producto y la nueva información
  modificarAnimal(idAnimales: string, nuevaData: Animales){
    return this.database.collection('mascotas').doc(idAnimales).update(nuevaData);
  }

  // envíamos el ID del producto
  eliminarAnimal(idAnimales: string){
    return new Promise((resolve, reject) =>{
      try{
        const resp = this.mascotasCollection.doc(idAnimales).delete()
        resolve (resp)
      }
      catch(error){
        reject (error)
      }
    })
  }
}
