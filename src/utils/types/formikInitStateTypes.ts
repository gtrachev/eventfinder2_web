import { ImageType } from "./modelTypes";

export interface registerFormikInitialValuesType {
  username: string;
  password: string;
  email: string;
  age: string;
  country: string;
  city: string;
  interests: string[];
}

export interface eventFormikInitialValuesType {
  name: string;
  price: number;
  description: string;
  country: string;
  city: string;
  address: string;
  date: string;
  time: string;
  interestCategories: string[];
  ageGroup: string;
  deletedImages?: string[] | [];
}

export interface filterInitialValuesType {
  interests: string[];
  price: number | string;
  ageGroup: string;
  country: string;
  city: string;
}
