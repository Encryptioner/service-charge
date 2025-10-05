import { useState, useEffect } from 'react';
import type { BillData, ServiceCategory } from '../types';
import { translations, type Language } from '../locales';
import { calculateBillSummary, formatNumber } from '../utils/calculations';
import { saveBillData, loadBillData } from '../utils/storage';
import { exampleDataEn, exampleDataBn } from '../utils/exampleData';
import CategoryForm from './CategoryForm';
import BillPreview from './BillPreview';
import HelpSection from './HelpSection';
import LanguageSelector from './LanguageSelector';
import ConfirmModal from './ConfirmModal';

export default function BillCalculator() {
  // Load language from localStorage or default to 'bn' (Bangla)
  const [language, setLanguage] = useState<Language>('bn');
  const [isClient, setIsClient] = useState(false);

  // Initialize language on client side only
  useEffect(() => {
    setIsClient(true);
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang === 'en' || savedLang === 'bn') {
      setLanguage(savedLang);
    }
  }, []);

  const [billData, setBillData] = useState<BillData>({
    title: '',
    numberOfFlats: 0,
    paymentInfo: '',
    notes: '',
    categories: [],
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    title?: string;
    numberOfFlats?: string;
    categories?: { [key: string]: { name?: string; amount?: string } };
  }>({});

  const t = translations[language];

  // Load saved data on mount
  useEffect(() => {
    const savedData = loadBillData();
    if (savedData) {
      setBillData(savedData);
      setShowHelp(false);
    }
  }, []);

  // Auto-save on changes
  useEffect(() => {
    if (billData.title || billData.categories.length > 0) {
      saveBillData(billData);
    }
  }, [billData]);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const validateForm = () => {
    const errors: typeof validationErrors = {};

    // Validate bill title
    if (!billData.title.trim()) {
      errors.title = language === 'en' ? 'Bill title is required' : 'বিলের শিরোনাম প্রয়োজন';
    }

    // Validate number of flats
    if (!billData.numberOfFlats || billData.numberOfFlats < 1) {
      errors.numberOfFlats = language === 'en'
        ? 'Number of flats must be at least 1'
        : 'ফ্ল্যাটের সংখ্যা কমপক্ষে ১ হতে হবে';
    }

    // Validate categories
    const categoryErrors: { [key: string]: { name?: string; amount?: string } } = {};
    billData.categories.forEach((category) => {
      const catErrors: { name?: string; amount?: string } = {};

      if (!category.name.trim()) {
        catErrors.name = language === 'en' ? 'Category name is required' : 'বিভাগের নাম প্রয়োজন';
      }

      if (!category.amount || category.amount < 1) {
        catErrors.amount = language === 'en'
          ? 'Amount must be at least 1'
          : 'পরিমাণ কমপক্ষে ১ হতে হবে';
      }

      if (Object.keys(catErrors).length > 0) {
        categoryErrors[category.id] = catErrors;
      }
    });

    if (Object.keys(categoryErrors).length > 0) {
      errors.categories = categoryErrors;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof BillData, value: string | number) => {
    setBillData((prev) => ({ ...prev, [field]: value }));

    // Clear validation error for this field
    if (field === 'title' || field === 'numberOfFlats') {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const addCategory = () => {
    const newCategory: ServiceCategory = {
      id: Date.now().toString(),
      name: '',
      duration: '',
      info: '',
      billType: 'all-building',
      amount: 0,
    };
    setBillData((prev) => ({
      ...prev,
      categories: [...prev.categories, newCategory],
    }));
  };

  const updateCategory = (id: string, updates: Partial<ServiceCategory>) => {
    setBillData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) =>
        cat.id === id ? { ...cat, ...updates } : cat
      ),
    }));

    // Clear validation errors for this category field
    if (validationErrors.categories?.[id]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        if (newErrors.categories) {
          const catErrors = { ...newErrors.categories[id] };
          if (updates.name !== undefined) delete catErrors.name;
          if (updates.amount !== undefined) delete catErrors.amount;

          if (Object.keys(catErrors).length === 0) {
            delete newErrors.categories[id];
            if (Object.keys(newErrors.categories).length === 0) {
              delete newErrors.categories;
            }
          } else {
            newErrors.categories = { ...newErrors.categories, [id]: catErrors };
          }
        }
        return newErrors;
      });
    }
  };

  const removeCategory = (id: string) => {
    setBillData((prev) => ({
      ...prev,
      categories: prev.categories.filter((cat) => cat.id !== id),
    }));
  };

  const loadExample = () => {
    const exampleData = language === 'en' ? exampleDataEn : exampleDataBn;
    setBillData(exampleData);
    setShowHelp(false);
  };

  const clearAll = () => {
    setBillData({
      title: '',
      numberOfFlats: 0,
      paymentInfo: '',
      notes: '',
      categories: [],
    });
    setValidationErrors({});
    setShowHelp(true);
    setShowClearConfirm(false);
  };

  const summary = calculateBillSummary(billData.categories, billData.numberOfFlats);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {t.header.title}
              </h1>
              <p className="text-sm text-gray-600 mt-1">{t.header.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <button
                onClick={loadExample}
                className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm sm:text-base flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t.actions.loadExample}
              </button>
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title={language === 'en' ? 'Toggle Help' : 'সাহায্য টগল করুন'}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showHelp && <HelpSection language={language} onClose={() => setShowHelp(false)} />}

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bill Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.form.billTitle} <span className="text-red-600">*</span>
                <span className="text-gray-500 text-xs ml-2">{t.form.billTitleHelp}</span>
              </label>
              <input
                type="text"
                value={billData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder={t.form.billTitlePlaceholder}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  validationErrors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.title && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
              )}
            </div>

            {/* Number of Flats */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.form.numberOfFlats} <span className="text-red-600">*</span>
                <span className="text-gray-500 text-xs ml-2">{t.form.numberOfFlatsHelp}</span>
              </label>
              <input
                type="number"
                value={billData.numberOfFlats || ''}
                onChange={(e) => handleInputChange('numberOfFlats', parseInt(e.target.value) || 0)}
                placeholder={t.form.numberOfFlatsPlaceholder}
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  validationErrors.numberOfFlats ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.numberOfFlats && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.numberOfFlats}</p>
              )}
            </div>

            {/* Payment Info */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.form.paymentInfo}
                <span className="text-gray-500 text-xs ml-2">{t.form.paymentInfoHelp}</span>
              </label>
              <textarea
                value={billData.paymentInfo}
                onChange={(e) => handleInputChange('paymentInfo', e.target.value)}
                placeholder={t.form.paymentInfoPlaceholder}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.form.notes}
                <span className="text-gray-500 text-xs ml-2">{t.form.notesHelp}</span>
              </label>
              <textarea
                value={billData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder={t.form.notesPlaceholder}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">{t.category.title}</h2>
            <button
              onClick={addCategory}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {t.category.addCategory}
            </button>
          </div>

          <div className="space-y-4">
            {billData.categories.map((category) => (
              <CategoryForm
                key={category.id}
                category={category}
                language={language}
                onUpdate={(updates) => updateCategory(category.id, updates)}
                onRemove={() => removeCategory(category.id)}
                validationErrors={validationErrors.categories?.[category.id]}
              />
            ))}
          </div>

          {billData.categories.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              {language === 'en'
                ? 'No categories added yet. Click "Add Category" to get started.'
                : 'এখনও কোনো বিভাগ যোগ করা হয়নি। শুরু করতে "বিভাগ যোগ করুন" ক্লিক করুন।'}
            </p>
          )}
        </div>

        {/* Summary */}
        {billData.categories.length > 0 && billData.numberOfFlats > 0 && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 mb-6 text-white">
            <h2 className="text-xl font-bold mb-4">{t.summary.grandTotal}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90">{t.summary.perFlat}</p>
                <p className="text-3xl font-bold mt-1">
                  {formatNumber(summary.perFlatTotal)} {t.currency}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90">{t.summary.totalAmount}</p>
                <p className="text-3xl font-bold mt-1">
                  {formatNumber(summary.grandTotal)} {t.currency}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setShowClearConfirm(true)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {t.actions.clearAll}
          </button>
          <button
            onClick={() => {
              if (validateForm()) {
                setShowPreview(true);
              }
            }}
            disabled={billData.categories.length === 0}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {t.actions.preview}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-medium mb-2">
              {t.footer.createdBy}{' '}
              <a
                href="https://encryptioner.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                Ankur Mursalin
              </a>
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://www.linkedin.com/in/mir-mursalin-ankur"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/Encryptioner"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="mailto:mir.ankur.ruet13@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Clear Confirmation Modal */}
      <ConfirmModal
        isOpen={showClearConfirm}
        onConfirm={clearAll}
        onCancel={() => setShowClearConfirm(false)}
        title={language === 'en' ? 'Clear All Data?' : 'সব ডেটা মুছবেন?'}
        message={
          language === 'en'
            ? 'Are you sure you want to clear all data? This action cannot be undone.'
            : 'আপনি কি নিশ্চিত যে সব ডেটা মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।'
        }
        confirmText={language === 'en' ? 'Yes, Clear All' : 'হ্যাঁ, সব মুছুন'}
        cancelText={language === 'en' ? 'Cancel' : 'বাতিল'}
        language={language}
      />

      {/* Preview Modal */}
      {showPreview && (
        <BillPreview
          billData={billData}
          language={language}
          summary={summary}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
