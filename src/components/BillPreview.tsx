import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { BillData, BillSummary } from '../types';
import type { SupportedLanguage } from '../locales/config';
import { getTranslations, getLocaleCode, getUIMessages } from '../utils/i18n';
import { formatNumber } from '../utils/calculations';

interface BillPreviewProps {
  billData: BillData;
  language: SupportedLanguage;
  summary: BillSummary;
  onClose: () => void;
}

export default function BillPreview({
  billData,
  language,
  summary,
  onClose,
}: BillPreviewProps) {
  const t = getTranslations(language);
  const uiMsgs = getUIMessages(language);
  const printRef = useRef<HTMLDivElement>(null);
  const currentDate = new Date().toLocaleString(getLocaleCode(language), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const generateCanvas = async () => {
    if (!printRef.current) return null;

    // Inject CSS to override OKLCH color variables with hex equivalents
    const styleOverride = document.createElement('style');
    styleOverride.id = 'pdf-color-override';
    styleOverride.textContent = `
      :root, :host {
        --color-red-600: #dc2626 !important;
        --color-red-700: #b91c1c !important;
        --color-yellow-50: #fefce8 !important;
        --color-yellow-200: #fef08a !important;
        --color-yellow-300: #fde047 !important;
        --color-green-600: #16a34a !important;
        --color-green-700: #15803d !important;
        --color-blue-50: #eff6ff !important;
        --color-blue-100: #dbeafe !important;
        --color-blue-300: #93c5fd !important;
        --color-blue-400: #60a5fa !important;
        --color-blue-500: #3b82f6 !important;
        --color-blue-600: #2563eb !important;
        --color-blue-700: #1d4ed8 !important;
        --color-purple-50: #faf5ff !important;
        --color-purple-600: #9333ea !important;
        --color-gray-50: #f9fafb !important;
        --color-gray-100: #f3f4f6 !important;
        --color-gray-200: #e5e7eb !important;
        --color-gray-300: #d1d5db !important;
        --color-gray-400: #9ca3af !important;
        --color-gray-500: #6b7280 !important;
        --color-gray-600: #4b5563 !important;
        --color-gray-700: #374151 !important;
        --color-gray-900: #111827 !important;
        --color-black: #000000 !important;
        --color-white: #ffffff !important;
      }
    `;
    document.head.appendChild(styleOverride);

    // Wait a tick for styles to apply
    await new Promise(resolve => setTimeout(resolve, 100));

    const canvas = await html2canvas(printRef.current, {
      scale: 1.5,
      logging: false,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      removeContainer: false,
      imageTimeout: 0,
    });

    // Remove the style override
    document.head.removeChild(styleOverride);

    return canvas;
  };

  const getSanitizedFileName = (extension: string) => {
    let fileName = `service_charge_bill.${extension}`;
    if (billData.title && billData.title.trim()) {
      // Remove special characters and replace spaces with underscores
      const sanitized = billData.title
        .trim()
        .replace(/[^\w\s\u0980-\u09FF-]/g, '') // Keep alphanumeric, spaces, and Bangla characters
        .replace(/\s+/g, '_') // Replace spaces with underscore
        .substring(0, 50); // Limit length
      fileName = sanitized ? `${sanitized}.${extension}` : `service_charge_bill.${extension}`;
    }
    return fileName;
  };

  const handleDownloadImage = async () => {
    try {
      const canvas = await generateCanvas();
      if (!canvas) return;

      // Convert canvas to blob and download as JPEG
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = getSanitizedFileName('jpg');
        link.click();
        URL.revokeObjectURL(url);
      }, 'image/jpeg', 0.9); // 90% quality for image download
    } catch (error) {
      console.error('Error generating image:', error);
      alert(uiMsgs.imageGenerationError);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const canvas = await generateCanvas();
      if (!canvas) return;

      // Use JPEG format with compression instead of PNG
      const imgData = canvas.toDataURL('image/jpeg', 0.85); // 85% quality for good balance
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true, // Enable PDF compression
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        'JPEG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save(getSanitizedFileName('pdf'));
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(uiMsgs.pdfGenerationError);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col my-4 md:my-0">
        {/* Header */}
        <div className="flex justify-between items-center p-3 md:p-4 border-b bg-gray-50 flex-wrap gap-2">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">{t.preview.title}</h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-2 text-sm md:px-4 md:text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="hidden sm:inline">{t.actions.download}</span>
              <span className="sm:hidden">PDF</span>
            </button>
            <button
              onClick={handleDownloadImage}
              className="px-3 py-2 text-sm md:px-4 md:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="hidden sm:inline">{t.actions.downloadImage}</span>
              <span className="sm:hidden">IMG</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 text-sm md:px-4 md:text-base bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              {t.preview.close}
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto p-2 md:p-8 bg-gray-100">
          <div
            ref={printRef}
            className="bg-white p-4 md:p-8 shadow-lg mx-auto overflow-x-auto"
            style={{ maxWidth: '210mm' }}
          >
            {/* Bill Header */}
            <div className="text-center mb-6 md:mb-8 pb-4 md:pb-6 border-b-2 border-gray-300">
              <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
                {billData.title || t.header.title}
              </h1>
              <p className="text-xs md:text-sm text-gray-600 mb-1">
                {t.preview.printedOn}: {currentDate}
              </p>
              <p className="text-xs md:text-sm font-semibold text-blue-600">
                {uiMsgs.numberOfFlats}: {billData.numberOfFlats}
              </p>
            </div>

            {/* Categories Table */}
            <div className="mb-6 md:mb-8 overflow-x-auto">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                {t.category.title}
              </h2>
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      {t.preview.category}
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      {t.preview.duration}
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      {t.preview.info}
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      {t.preview.type}
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-right">
                      {t.preview.amount}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {billData.categories.map((category) => {
                    const perFlat = summary.categoryTotals.get(category.id) || 0;
                    return (
                      <tr key={category.id}>
                        <td className="border border-gray-300 px-4 py-2 font-medium">
                          {category.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">
                          {category.duration}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">
                          {category.info}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">
                          {category.billType === 'single-flat'
                            ? t.category.singleFlat
                            : `${formatNumber(category.amount)} ÷ ${billData.numberOfFlats}`}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-medium">
                          {formatNumber(perFlat)} {t.currency}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-blue-50 font-bold">
                    <td
                      colSpan={4}
                      className="border border-gray-300 px-4 py-3 text-right"
                    >
                      {t.summary.perFlat}:
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-lg">
                      {formatNumber(summary.perFlatTotal)} {t.currency}
                    </td>
                  </tr>
                  <tr className="bg-blue-100 font-bold">
                    <td
                      colSpan={4}
                      className="border border-gray-300 px-4 py-3 text-right"
                    >
                      {t.summary.totalAmount} ({billData.numberOfFlats}{' '}
                      {uiMsgs.flats}):
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-xl">
                      {formatNumber(summary.grandTotal)} {t.currency}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Payment Info */}
            {billData.paymentInfo && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">
                  {t.form.paymentInfo}
                </h3>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {billData.paymentInfo}
                </pre>
              </div>
            )}

            {/* Notes */}
            {billData.notes && (
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-bold text-gray-900 mb-2">{t.form.notes}</h3>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {billData.notes}
                </pre>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-300 text-center text-xs text-gray-500">
              <p>
                {uiMsgs.generatedFrom}:{' '}
                <a href={window.location.href} className="text-blue-600 underline">
                  {window.location.hostname + window.location.pathname}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
