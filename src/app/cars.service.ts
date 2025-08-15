import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Car } from './car';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private carsCollection = collection(this.firestore, 'cars');

  constructor(private firestore: Firestore) {}

  // CREATE
  createCar(car: Omit<Car, 'id'>) {
    return addDoc(this.carsCollection, { ...car, auto_date: new Date() });
  }
 
getCars( ): Observable<Car[]> {
  let q = query(this.carsCollection, orderBy('auto_date', 'desc') );

  return collectionData(q, { idField: 'id' }) as Observable<Car[]>;
}

  // READ ALL (for search, if needed)
  getAllCars(): Observable<Car[]> {
    return collectionData(this.carsCollection, { idField: 'id' }) as Observable<Car[]>;
  }

  // UPDATE
  updateCar(car: Car) {
    const carDoc = doc(this.firestore, `cars/${car.id}`);
    return updateDoc(carDoc, { ...car });
  }

  // DELETE
  deleteCar(id: string) {
    const carDoc = doc(this.firestore, `cars/${id}`);
    return deleteDoc(carDoc);
  }

  addCarsFromList(): Promise<any> {
    const cars: Omit<any, 'id'>[] =  [];
    const promises = cars.map((car) => {
      // For each car in the list, create a new document
      return addDoc(this.carsCollection, { ...car, auto_date: new Date() });
    });
    // Use Promise.all to wait for all additions to complete
    return Promise.all(promises);
  }
}
