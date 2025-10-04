import type { ServiceCategory, BillSummary } from '../types';

export function calculateBillSummary(
  categories: ServiceCategory[],
  numberOfFlats: number
): BillSummary {
  let perFlatTotal = 0;
  const categoryTotals = new Map<string, number>();

  categories.forEach((category) => {
    let categoryPerFlat = 0;

    if (category.billType === 'single-flat') {
      // Amount is per flat
      categoryPerFlat = category.amount;
    } else {
      // Amount is divided among all flats, rounded up to nearest integer
      categoryPerFlat = numberOfFlats > 0 ? Math.ceil(category.amount / numberOfFlats) : 0;
    }

    perFlatTotal += categoryPerFlat;
    categoryTotals.set(category.id, categoryPerFlat);
  });

  // Round up per flat total to nearest integer
  perFlatTotal = Math.ceil(perFlatTotal);

  // Grand total is also rounded up
  const grandTotal = Math.ceil(perFlatTotal * numberOfFlats);

  return {
    perFlatTotal,
    grandTotal,
    categoryTotals,
  };
}

export function formatCurrency(amount: number, locale: string = 'en-BD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(amount: number, locale: string = 'en-BD'): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
