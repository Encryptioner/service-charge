export type BillType = 'single-flat' | 'all-building';

export interface ServiceCategory {
  id: string;
  name: string;
  duration: string;
  info: string;
  billType: BillType;
  amount: number;
}

export interface BillData {
  title: string;
  numberOfFlats: number;
  paymentInfo: string;
  notes: string;
  categories: ServiceCategory[];
}

export interface BillSummary {
  perFlatTotal: number;
  grandTotal: number;
  categoryTotals: Map<string, number>;
}
