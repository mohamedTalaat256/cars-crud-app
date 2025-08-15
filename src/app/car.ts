import { Timestamp } from "firebase/firestore";

export interface Car {
  id?: string;
  car_details: string;
  car_number: string;
  engin_number: string;
  buyer: string;
  seller: string;
  national_id: string;
  status: string;
  add_date: Timestamp;
}