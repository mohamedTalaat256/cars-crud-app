import { Component, OnInit, ViewChild } from '@angular/core';
import { CarsService } from '../cars.service';
import { Car } from '../car';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Timestamp } from 'firebase/firestore';
import { CarFormDialogComponent } from '../car-form-dialog/car-form-dialog.component';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss'],
  standalone: false,
})
export class CarsListComponent implements OnInit { 
  dataSource = new MatTableDataSource<Car>();
  carForm: FormGroup;
  isEditMode = false;
  editingCarId: string | null = null;
  lastVisible: any = null; // for pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSlice: Car[] = [];

  constructor(
    private carsService: CarsService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.carForm = this.fb.group({
       car_details: ['', Validators.required],
      car_number: ['', Validators.required],
      engin_number: ['', Validators.required],
      buyer: ['', Validators.required],
      seller: ['', Validators.required],
      status: ['', Validators.required],
      body_number: ['', Validators.required],
      date_add: ['', Validators.required],
    });
  }

  ngOnInit() {
   /*  this.carsService
      .addCarsFromList()
      .then(() => {
        console.log('All cars successfully added!');
        // Reload the list to show the new cars
        this.loadCars();
      })
      .catch((error) => {
        console.error('Error adding cars:', error);
      }); */
    this.loadCars();
  }

  originalCars: Car[] = []; // Store all cars here

  loadCars() {
    this.carsService.getCars().subscribe((cars) => {
      this.originalCars = cars;
      this.dataSource.data = cars; 
      this.pageSlice = cars.slice(0, this.paginator.pageSize || 5);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    const filteredData = this.originalCars.filter(
      (car) =>
        car.car_number?.toLowerCase().includes(filterValue) ||
        car.body_number?.toLowerCase().includes(filterValue) ||
        car.seller?.toLowerCase().includes(filterValue) ||
        car.buyer?.toLowerCase().includes(filterValue) ||
        car.status?.toLowerCase().includes(filterValue) ||
        car.car_details?.toLowerCase().includes(filterValue) ||
        car.engin_number?.toLowerCase().includes(filterValue) ||
        (car.date_add && car.date_add.toLowerCase().includes(filterValue)) // Assuming date_add is a string 
    );

    this.dataSource.data = filteredData;
    this.pageSlice = filteredData.slice(0, this.paginator.pageSize || 5);
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.dataSource.filteredData.length) {
      endIndex = this.dataSource.filteredData.length;
    }
    this.pageSlice = this.dataSource.filteredData.slice(startIndex, endIndex);
  }
  // CREATE
  onSubmit() {
    if (this.carForm.valid) {
      if (this.isEditMode) {
        this.carsService.updateCar({ ...this.carForm.value, id: this.editingCarId }).then(() => {
          this.resetForm();
          this.loadCars();
        });
      } else {
        this.carsService.createCar(this.carForm.value).then(() => {
          this.carForm.reset();
          this.loadCars();
        });
      }
    }
  }

  // UPDATE
  editCar(car: Car) {
    this.isEditMode = true;
    this.editingCarId = car.id!;
    this.carForm.patchValue(car);
  }

  // DELETE
  deleteCar(id: string) {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carsService.deleteCar(id).then(() => this.loadCars());
    }
  }

  resetForm() {
    this.carForm.reset();
    this.isEditMode = false;
    this.editingCarId = null;
  }

  // A new method to open the dialog for adding a new car
  openAddCarDialog(): void {
    const dialogRef = this.dialog.open(CarFormDialogComponent, {
      width: '400px',
      data: { car: null }, // No data for a new car
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Result contains the new car data from the dialog form
        this.carsService.createCar(result).then(() => {
          this.loadCars();
        });
      }
    });
  }

  // A new method to open the dialog for editing an existing car
  openEditCarDialog(car: Car): void {
    const dialogRef = this.dialog.open(CarFormDialogComponent, {
      width: '400px',
      data: { car: car }, // Pass the existing car data to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Result contains the updated car data
        this.carsService.updateCar({ ...result, id: car.id }).then(() => {
          this.loadCars();
        });
      }
    });
  }

  convertToArabicDate(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    return date.toLocaleString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Africa/Cairo',
    });
  }
}
