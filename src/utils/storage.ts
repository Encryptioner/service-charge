import type { BillData } from '../types';

const STORAGE_KEY = 'service-charge-bill-data';

export function saveBillData(data: BillData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save bill data:', error);
  }
}

export function loadBillData(): BillData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const parsed = JSON.parse(data);

    // Backward compatibility: add garage fields if they don't exist
    if (!parsed.garage) {
      parsed.garage = {
        motorcycleSpaces: 0,
        motorcycleSpaceAmount: 0,
        motorcycleSpaceNotes: '',
        carSpaces: 0,
        carSpaceAmount: 0,
        carSpaceNotes: '',
      };
    }

    return parsed;
  } catch (error) {
    console.error('Failed to load bill data:', error);
    return null;
  }
}

export function clearBillData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear bill data:', error);
  }
}
