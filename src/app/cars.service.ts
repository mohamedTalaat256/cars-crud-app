import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc, query, orderBy, limit, startAfter } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private carsCollection = collection(this.firestore, 'cars');

  constructor(private firestore: Firestore) {}

  // CREATE
  createCar(car: Omit<Car, 'id'>) {
    return addDoc(this.carsCollection, { ...car, add_date: new Date() });
  }

  // READ (with pagination and sorting)
  getCars(pageSize: number = 10, lastVisible: any = null): Observable<Car[]> {
    let q = query(this.carsCollection, orderBy('add_date', 'desc'), limit(pageSize));
    if (lastVisible) {
      q = query(this.carsCollection, orderBy('add_date', 'desc'), startAfter(lastVisible), limit(pageSize));
    }
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
}