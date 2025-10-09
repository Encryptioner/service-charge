import type { SupportedLanguage } from '../locales/config';
import type { FormMode } from '../utils/storage';
import { getTranslations, getUIMessages } from '../utils/i18n';

interface HelpSectionProps {
  language: SupportedLanguage;
  mode: FormMode;
  onClose: () => void;
}

export default function HelpSection({ language, mode, onClose }: HelpSectionProps) {
  const t = getTranslations(language);
  const uiMsgs = getUIMessages(language);

  const isCalculatedMode = mode === 'calculated';

  return (
    <div className={`rounded-xl shadow-lg p-6 mb-6 text-white ${
      isCalculatedMode
        ? 'bg-gradient-to-r from-blue-500 to-purple-600'
        : 'bg-gradient-to-r from-purple-500 to-pink-600'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-bold">
            {uiMsgs.quickGuide}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-3 mb-4">
        <p className="text-white/90 font-medium">
          {isCalculatedMode ? t.help.calculatedWelcome : t.help.blankWelcome}
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-start gap-2">
            <span className="text-yellow-300 font-bold">→</span>
            <span>{isCalculatedMode ? t.help.calculatedStep1 : t.help.blankStep1}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-300 font-bold">→</span>
            <span>{isCalculatedMode ? t.help.calculatedStep2 : t.help.blankStep2}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-300 font-bold">→</span>
            <span>{isCalculatedMode ? t.help.calculatedStep3 : t.help.blankStep3}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-yellow-300 font-bold">→</span>
            <span>{isCalculatedMode ? t.help.calculatedStep4 : t.help.blankStep4}</span>
          </li>
        </ul>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <p className="text-sm font-medium">{t.help.tryExample}</p>
      </div>
    </div>
  );
}
