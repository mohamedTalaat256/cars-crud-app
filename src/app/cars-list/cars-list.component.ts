import { Component, OnInit, ViewChild } from '@angular/core';
import { CarsService } from '../cars.service';
import { Car } from '../car';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {
  displayedColumns: string[] = ['car_number', 'buyer', 'seller', 'status', 'add_date', 'actions'];
  dataSource = new MatTableDataSource<Car>();
  carForm: FormGroup;
  isEditMode = false;
  editingCarId: string | null = null;
  lastVisible: any = null; // for pagination

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
      national_id: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    // This is a simplified approach. For real pagination, you'd handle
    // the `lastVisible` token and subscribe to the observable.
    this.carsService.getCars().subscribe(cars => {
      this.dataSource.data = cars;
    });
  }

  // CREATE
  onSubmit() {
    if (this.carForm.valid) {
      if (this.isEditMode) {
        this.carsService.updateCar({ ...this.carForm.value, id: this.editingCarId })
          .then(() => {
            this.resetForm();
            this.loadCars();
          });
      } else {
        this.carsService.createCar(this.carForm.value)
          .then(() => {
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
      this.carsService.deleteCar(id)
        .then(() => this.loadCars());
    }
  }

  // SEARCH
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resetForm() {
    this.carForm.reset();
    this.isEditMode = false;
    this.editingCarId = null;
  }
}