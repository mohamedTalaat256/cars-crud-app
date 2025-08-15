// src/app/car-form-dialog/car-form-dialog.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from '../car';

@Component({
  selector: 'app-car-form-dialog',
  templateUrl: './car-form-dialog.component.html',
  styleUrls: ['./car-form-dialog.component.scss'],
  standalone: false
})
export class CarFormDialogComponent implements OnInit {
  carForm: FormGroup;
  dialogTitle!: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CarFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { car: Car | null }
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

  ngOnInit(): void {
    if (this.data && this.data.car) {
      this.dialogTitle = 'تعديل بيانات السيارة';
      this.carForm.patchValue(this.data.car);
    } else {
      this.dialogTitle = 'اضافة سيارة جديدة';
    }
  }

  onSave(): void {
    if (this.carForm.valid) {
      // Pass the form data back to the parent component
      this.dialogRef.close(this.carForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}