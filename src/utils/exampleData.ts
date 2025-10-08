import type { BillData } from '../types';
import type { SupportedLanguage } from '../locales/config';

const exampleDataEn: BillData = {
  title: 'Monthly Service Charge - January 2025',
  numberOfFlats: 30,
  garage: {
    motorcycleSpaces: 0,
    motorcycleSpaceAmount: 100,
    motorcycleSpaceNotes: 'Flats: 101, 102, 103, 201, 202, 203, 301, 302, 303, 401, 402, 403, 501, 502, 503',
    carSpaces: 0,
    carSpaceAmount: 250,
    carSpaceNotes: 'Flats: 101, 102, 201, 202, 301, 302, 401, 402, 501, 502',
  },
  paymentInfo: `Bank: ABC Bank Limited
Account Name: Building Management Committee
Account Number: 1234567890
Bkash: +880 1712345678
Nagad: +880 1812345678`,
  notes: `Please pay by the 22th of each month.
Late payment fee: 50 BDT per day after the 22th.
For queries, contact: +880 1912345678`,
  categories: [
    {
      id: '1',
      name: 'Electricity (Common Area)',
      duration: 'December 15, 2024 - January 15, 2025',
      info: 'Bill No: 123456, Previous: 5000 units, Current: 5500 units',
      billType: 'all-building',
      amount: 50000,
    },
    {
      id: '2',
      name: 'Water Bill',
      duration: 'January 2025',
      info: 'WASA Bill for the entire building',
      billType: 'all-building',
      amount: 20000,
    },
    {
      id: '3',
      name: 'Caretaker Salary',
      duration: 'January 2025',
      info: '15,000 BDT',
      billType: 'all-building',
      amount: 15000,
    },
    {
      id: '4',
      name: 'Small Bills',
      duration: 'January 2025',
      info: 'Photocopy',
      billType: 'all-building',
      amount: 50,
    },
    {
      id: '5',
      name: 'Deposit',
      duration: 'January 2025',
      info: 'Monthly subscription for future use',
      billType: 'single-flat',
      amount: 100,
    },
  ],
};

const exampleDataBn: BillData = {
  title: 'মাসিক সার্ভিস চার্জ - জানুয়ারি ২০২৫',
  numberOfFlats: 30,
  garage: {
    motorcycleSpaces: 0,
    motorcycleSpaceAmount: 100,
    motorcycleSpaceNotes: 'ফ্ল্যাট: ১০১, ১০২, ১০৩, ২০১, ২০২, ২০৩, ৩০১, ৩০২, ৩০৩, ৪০১, ৪০২, ৪০৩, ৫০১, ৫০২, ৫০৩',
    carSpaces: 0,
    carSpaceAmount: 250,
    carSpaceNotes: 'ফ্ল্যাট: ১০১, ১০২, ২০১, ২০২, ৩০১, ৩০২, ৪০১, ৪০২, ৫০১, ৫০২',
  },
  paymentInfo: `ব্যাংক: এবিসি ব্যাংক লিমিটেড
অ্যাকাউন্টের নাম: বিল্ডিং ম্যানেজমেন্ট কমিটি
অ্যাকাউন্ট নম্বর: ১২৩৪৫৬৭৮৯০
বিকাশ: +৮৮০ ১৭১২৩৪৫৬৭৮
নগদ: +৮৮০ ১৮১২৩৪৫৬৭৮`,
  notes: `অনুগ্রহ করে প্রতি মাসের ২২ তারিখের মধ্যে পেমেন্ট করুন।
বিলম্ব ফি: ২২ তারিখের পর প্রতিদিন ৫০ টাকা।
যেকোনো প্রশ্নের জন্য যোগাযোগ: +৮৮০ ১৯১২৩৪৫৬৭৮`,
  categories: [
    {
      id: '1',
      name: 'বিদ্যুৎ (কমন এরিয়া)',
      duration: '১৫ ডিসেম্বর, ২০২৪ - ১৫ জানুয়ারি, ২০২৫',
      info: 'বিল নং: ১২৩৪৫৬, পূর্ববর্তী: ৫০০০ ইউনিট, বর্তমান: ৫৫০০ ইউনিট',
      billType: 'all-building',
      amount: 50000,
    },
    {
      id: '2',
      name: 'পানির বিল',
      duration: 'জানুয়ারি ২০২৫',
      info: 'সম্পূর্ণ ভবনের জন্য ওয়াসা বিল',
      billType: 'all-building',
      amount: 20000,
    },
    {
      id: '3',
      name: 'কেয়ারটেকারের বেতন',
      duration: 'জানুয়ারি ২০২৫',
      info: '১৫,০০০ টাকা',
      billType: 'all-building',
      amount: 15000,
    },
    {
      id: '4',
      name: 'ছোট বিল',
      duration: 'জানুয়ারি ২০২৫',
      info: 'ফটোকপি',
      billType: 'all-building',
      amount: 50,
    },
    {
      id: '5',
      name: 'ডিপোজিট',
      duration: 'জানুয়ারি ২০২৫',
      info: 'ভবিষ্যতের ব্যাবহারের জন্য মাসিক চাঁদা',
      billType: 'single-flat',
      amount: 100,
    },
  ],
};

// Example data map - add new language example data here
export const exampleDataMap: Record<SupportedLanguage, BillData> = {
  en: exampleDataEn,
  bn: exampleDataBn,
  // Add new languages here:
  // hi: exampleDataHi,
};

/**
 * Get example data for a specific language
 */
export const getExampleData = (language: SupportedLanguage): BillData => {
  return exampleDataMap[language] || exampleDataMap.bn;
};
