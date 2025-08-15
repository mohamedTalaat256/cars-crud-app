import { Timestamp } from "firebase/firestore";

export interface Car {
  id?: string;
  car_details: string;
  car_number: string;
  engin_number: string;
  body_number: string;
  buyer: string;
  seller: string;
  status: string;
  date_add: string;
  auto_date: Timestamp
}