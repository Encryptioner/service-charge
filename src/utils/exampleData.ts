import type { BillData } from '../types';

export const exampleDataEn: BillData = {
  title: 'Monthly Service Charge - January 2024',
  numberOfFlats: 10,
  paymentInfo: `Bank: ABC Bank Limited
Account Name: Building Management Committee
Account Number: 1234567890
Bkash: +880 1712345678
Nagad: +880 1812345678`,
  notes: `Please pay by the 10th of each month.
Late payment fee: 50 BDT per day after the 15th.
For queries, contact: +880 1912345678`,
  categories: [
    {
      id: '1',
      name: 'Electricity (Common Area)',
      duration: 'December 15, 2023 - January 15, 2024',
      info: 'Bill No: 123456, Previous: 5000 units, Current: 5500 units',
      billType: 'all-building',
      amount: 5000,
    },
    {
      id: '2',
      name: 'Water Bill',
      duration: 'January 2024',
      info: 'WASA Bill for the entire building',
      billType: 'all-building',
      amount: 3000,
    },
    {
      id: '3',
      name: 'Security Guard Salary',
      duration: 'January 2024',
      info: '2 guards @ 15,000 BDT each',
      billType: 'all-building',
      amount: 30000,
    },
    {
      id: '4',
      name: 'Cleaning Service',
      duration: 'January 2024',
      info: 'Daily cleaning of common areas',
      billType: 'all-building',
      amount: 8000,
    },
    {
      id: '5',
      name: 'Generator Maintenance',
      duration: 'January 2024',
      info: 'Monthly maintenance and fuel',
      billType: 'single-flat',
      amount: 500,
    },
    {
      id: '6',
      name: 'Building Insurance',
      duration: 'January 2024',
      info: 'Annual premium (1/12th)',
      billType: 'all-building',
      amount: 2000,
    },
  ],
};

export const exampleDataBn: BillData = {
  title: 'মাসিক সার্ভিস চার্জ - জানুয়ারি ২০২৪',
  numberOfFlats: 10,
  paymentInfo: `ব্যাংক: এবিসি ব্যাংক লিমিটেড
অ্যাকাউন্টের নাম: বিল্ডিং ম্যানেজমেন্ট কমিটি
অ্যাকাউন্ট নম্বর: ১২৩৪৫৬৭৮৯০
বিকাশ: +৮৮০ ১৭১২৩৪৫৬৭৮
নগদ: +৮৮০ ১৮১২৩৪৫৬৭৮`,
  notes: `অনুগ্রহ করে প্রতি মাসের ১০ তারিখের মধ্যে পেমেন্ট করুন।
বিলম্ব ফি: ১৫ তারিখের পর প্রতিদিন ৫০ টাকা।
যেকোনো প্রশ্নের জন্য যোগাযোগ: +৮৮০ ১৯১২৩৪৫৬৭৮`,
  categories: [
    {
      id: '1',
      name: 'বিদ্যুৎ (কমন এরিয়া)',
      duration: '১৫ ডিসেম্বর, ২০২৩ - ১৫ জানুয়ারি, ২০২৪',
      info: 'বিল নং: ১২৩৪৫৬, পূর্ববর্তী: ৫০০০ ইউনিট, বর্তমান: ৫৫০০ ইউনিট',
      billType: 'all-building',
      amount: 5000,
    },
    {
      id: '2',
      name: 'পানির বিল',
      duration: 'জানুয়ারি ২০২৪',
      info: 'সম্পূর্ণ ভবনের জন্য ওয়াসা বিল',
      billType: 'all-building',
      amount: 3000,
    },
    {
      id: '3',
      name: 'নিরাপত্তা প্রহরীর বেতন',
      duration: 'জানুয়ারি ২০২৪',
      info: '২ জন প্রহরী @ ১৫,০০০ টাকা করে',
      billType: 'all-building',
      amount: 30000,
    },
    {
      id: '4',
      name: 'পরিষ্কার সেবা',
      duration: 'জানুয়ারি ২০২৪',
      info: 'কমন এরিয়ার দৈনিক পরিষ্কার',
      billType: 'all-building',
      amount: 8000,
    },
    {
      id: '5',
      name: 'জেনারেটর রক্ষণাবেক্ষণ',
      duration: 'জানুয়ারি ২০২৪',
      info: 'মাসিক রক্ষণাবেক্ষণ এবং জ্বালানি',
      billType: 'single-flat',
      amount: 500,
    },
    {
      id: '6',
      name: 'ভবন বীমা',
      duration: 'জানুয়ারি ২০২৪',
      info: 'বার্ষিক প্রিমিয়াম (১/১২ অংশ)',
      billType: 'all-building',
      amount: 2000,
    },
  ],
};
