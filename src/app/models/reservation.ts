export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Reservation {
  id: number;
  customer: Customer;
  screeningId: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export interface ReservationRequest {
  customerId: number;
  screeningId: number;
  seats: string[];
}