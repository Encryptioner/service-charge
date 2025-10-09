import type { ServiceCategory } from '../types';
import { translations, type Language } from '../locales';

interface CategoryFormProps {
  category: ServiceCategory;
  language: Language;
  onUpdate: (updates: Partial<ServiceCategory>) => void;
  onRemove: () => void;
  validationErrors?: { name?: string; amount?: string };
  isBlankMode?: boolean;
}

export default function CategoryForm({
  category,
  language,
  onUpdate,
  onRemove,
  validationErrors,
  isBlankMode = false,
}: CategoryFormProps) {
  const t = translations[language];

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.category.categoryName} <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={category.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder={t.category.categoryNamePlaceholder}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
              validationErrors?.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validationErrors?.name && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.category.billDuration}
          </label>
          <input
            type="text"
            value={category.duration}
            onChange={(e) => onUpdate({ duration: e.target.value })}
            placeholder={t.category.billDurationPlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>

        {/* Bill Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.category.billInfo}
          </label>
          <input
            type="text"
            value={category.info}
            onChange={(e) => onUpdate({ info: e.target.value })}
            placeholder={t.category.billInfoPlaceholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>

        {/* Bill Type */}
        {!isBlankMode && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.category.billType} <span className="text-red-600">*</span>
            </label>
            <select
              value={category.billType}
              onChange={(e) =>
                onUpdate({ billType: e.target.value as 'single-flat' | 'all-building' })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="single-flat">{t.category.singleFlat}</option>
              <option value="all-building">{t.category.allBuilding}</option>
            </select>
          </div>
        )}

        {/* Amount */}
        {!isBlankMode && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.category.amount} <span className="text-red-600">*</span>
              <span className="text-xs text-gray-500 ml-2">
                ({category.billType === 'single-flat' ? t.category.perFlat : t.category.total})
              </span>
            </label>
            <input
              type="number"
              value={category.amount || ''}
              onChange={(e) => onUpdate({ amount: parseFloat(e.target.value) || 0 })}
              placeholder={t.category.amountPlaceholder}
              min="1"
              step="0.01"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                validationErrors?.amount ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {validationErrors?.amount && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.amount}</p>
            )}
          </div>
        )}
      </div>

      {/* Remove Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={onRemove}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          {t.category.remove}
        </button>
      </div>
    </div>
  );
}
