export type BillType = 'single-flat' | 'all-building';

export interface ServiceCategory {
  id: string;
  name: string;
  duration: string;
  info: string;
  billType: BillType;
  amount: number;
}

export interface GarageSpace {
  motorcycleSpaces: number;
  motorcycleSpaceAmount: number;
  motorcycleSpaceNotes: string;
  carSpaces: number;
  carSpaceAmount: number;
  carSpaceNotes: string;
}

export interface BillData {
  title: string;
  numberOfFlats: number;
  garage: GarageSpace;
  paymentInfo: string;
  notes: string;
  categories: ServiceCategory[];
}

export interface BillSummary {
  perFlatTotal: number;
  grandTotal: number;
  totalWithMotorcycle: number;
  totalWithCar: number;
  totalWithBoth: number;
  categoryTotals: Map<string, number>;
}
