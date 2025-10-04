# Adding a New Language - Step-by-Step Guide

This guide will walk you through adding a new language to the Service Charge Bill Calculator.

## 📋 Prerequisites

- Basic knowledge of TypeScript
- Text editor (VS Code recommended)
- The translation content in your target language

## 🚀 Quick Start (5 Steps)

### Step 1: Create Translation File

Create a new file in `src/locales/` for your language. For example, for Hindi (`hi.ts`):

```typescript
// src/locales/hi.ts
import type { Translation } from './index';

export const hi: Translation = {
  header: {
    title: 'सेवा शुल्क बिल कैलकुलेटर',
    subtitle: 'अपनी इमारत के लिए सेवा शुल्क बिल आसानी से बनाएं और प्रबंधित करें',
  },
  form: {
    billTitle: 'बिल शीर्षक',
    billTitleHelp: 'इस बिल के लिए एक विवरणात्मक शीर्षक दर्ज करें',
    billTitlePlaceholder: 'उदाहरण: मासिक सेवा शुल्क - जनवरी 2024',
    numberOfFlats: 'फ्लैटों की संख्या',
    numberOfFlatsHelp: 'इमारत में कुल फ्लैट',
    numberOfFlatsPlaceholder: '10',
    paymentInfo: 'भुगतान जानकारी',
    paymentInfoHelp: 'भुगतान विवरण दर्ज करें',
    paymentInfoPlaceholder: 'बैंक: ABC बैंक\nखाता: 1234567890',
    notes: 'अतिरिक्त नोट्स',
    notesHelp: 'कोई अतिरिक्त जानकारी या निर्देश',
    notesPlaceholder: 'कृपया महीने की 10 तारीख तक भुगतान करें',
  },
  category: {
    title: 'सेवा शुल्क श्रेणियां',
    addCategory: 'श्रेणी जोड़ें',
    name: 'श्रेणी का नाम',
    namePlaceholder: 'उदाहरण: बिजली',
    duration: 'अवधि',
    durationPlaceholder: 'उदाहरण: जनवरी 2024',
    info: 'जानकारी',
    infoPlaceholder: 'उदाहरण: मीटर रीडिंग: 1500 यूनिट',
    billType: 'बिल प्रकार',
    singleFlat: 'प्रति फ्लैट',
    allBuilding: 'सभी फ्लैटों में विभाजित',
    amount: 'राशि',
    amountPlaceholder: '1000',
    remove: 'हटाएं',
  },
  summary: {
    perFlat: 'प्रति फ्लैट',
    totalAmount: 'कुल राशि',
    grandTotal: 'महा योग',
  },
  actions: {
    loadExample: 'उदाहरण लोड करें',
    clearAll: 'सब हटाएं',
    preview: 'पूर्वावलोकन',
    download: 'डाउनलोड PDF',
  },
  preview: {
    title: 'बिल पूर्वावलोकन',
    close: 'बंद करें',
    printedOn: 'मुद्रित',
    category: 'श्रेणी',
    duration: 'अवधि',
    info: 'जानकारी',
    type: 'प्रकार',
    amount: 'राशि',
  },
  footer: {
    createdBy: 'द्वारा बनाया गया',
    with: 'साथ',
    love: '❤️',
  },
  help: {
    title: 'त्वरित गाइड',
    welcome: 'स्वागत है! यह टूल अपार्टमेंट भवनों के लिए सेवा शुल्क बिल बनाने में मदद करता है।',
    step1: '1. अपनी इमारत में फ्लैटों की संख्या दर्ज करें',
    step2: '2. श्रेणियां जोड़ें (बिजली, पानी, सुरक्षा आदि)',
    step3: '3. प्रत्येक श्रेणी के लिए, लागत प्रति फ्लैट या सभी फ्लैटों में विभाजित चुनें',
    step4: '4. पूर्वावलोकन देखें और PDF के रूप में डाउनलोड करें',
    tryExample: 'यह कैसे काम करता है देखने के लिए उदाहरण डेटा लोड करें!',
  },
};
```

**💡 Tip:** Copy `src/locales/en.ts` or `src/locales/bn.ts` as a starting template!

### Step 2: Register Language in Config

Edit `src/locales/config.ts` and add your language to the `AVAILABLE_LANGUAGES` array:

```typescript
export const AVAILABLE_LANGUAGES: LanguageConfig[] = [
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    direction: 'ltr',
    flag: '🇧🇩',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇬🇧',
  },
  // ✅ ADD YOUR LANGUAGE HERE
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    direction: 'ltr',
    flag: '🇮🇳',
  },
];
```

**Update the type union:**

```typescript
export type SupportedLanguage = 'bn' | 'en' | 'hi'; // Add your language code
```

### Step 3: Import Translation

Edit `src/locales/index.ts` and import your translation:

```typescript
import { en } from './en';
import { bn } from './bn';
import { hi } from './hi'; // ✅ ADD THIS

export type Language = 'en' | 'bn' | 'hi'; // ✅ ADD YOUR CODE

export const translations = {
  en,
  bn,
  hi, // ✅ ADD THIS
};
```

### Step 4: Create Example Data (Optional)

If you want example data in your language, create a file in `src/utils/`:

```typescript
// src/utils/exampleData.hi.ts
import type { BillData } from '../types';

export const exampleDataHi: BillData = {
  title: 'मासिक सेवा शुल्क - जनवरी 2024',
  numberOfFlats: 10,
  paymentInfo: 'बैंक: ABC बैंक\nखाता: 1234567890\nUPI: example@upi',
  notes: 'कृपया महीने की 10 तारीख तक भुगतान करें',
  categories: [
    {
      id: '1',
      name: 'बिजली बिल',
      duration: 'दिसंबर 2023',
      info: 'मीटर रीडिंग: 1500 यूनिट',
      billType: 'all-building',
      amount: 15000,
    },
    // Add more example categories...
  ],
};
```

Then update `src/utils/exampleData.ts`:

```typescript
export { exampleDataHi } from './exampleData.hi';
```

And update the loadExample function in `BillCalculator.tsx`:

```typescript
const loadExample = () => {
  const exampleData = language === 'en' ? exampleDataEn
    : language === 'bn' ? exampleDataBn
    : exampleDataHi; // Add your language
  setBillData(exampleData);
  setShowHelp(false);
};
```

### Step 5: Test Your Language

1. **Build the project:**
   ```bash
   pnpm build
   ```

2. **Start dev server:**
   ```bash
   pnpm dev
   ```

3. **Test the language selector:**
   - Click on the language dropdown in the header
   - Select your new language
   - Verify all text is translated correctly

## 📝 Translation Guidelines

### Best Practices

1. **Keep translations concise** - UI space is limited
2. **Match the tone** - Professional but friendly
3. **Cultural adaptation** - Adapt examples to local context
4. **Number formats** - Use appropriate number systems (if applicable)
5. **Currency** - Update currency symbols if needed

### Example Placeholders

Make sure placeholders are culturally appropriate:

- ❌ "Example: ABC Bank" (if ABC Bank doesn't exist in your country)
- ✅ Use local bank names or generic terms

### Right-to-Left (RTL) Languages

If adding an RTL language (Arabic, Hebrew, etc.):

1. Set `direction: 'rtl'` in the language config
2. Test thoroughly - RTL support may need additional CSS

## 🧪 Testing Checklist

After adding your language, verify:

- [ ] Language appears in dropdown selector
- [ ] All UI text is translated
- [ ] Forms work correctly with your language
- [ ] Example data loads (if you created it)
- [ ] Preview/PDF shows correct text
- [ ] Print layout looks good
- [ ] Language preference persists (check localStorage)
- [ ] Mobile view works correctly

## 🎨 Number Formatting

If your language uses different number systems (e.g., Bengali numerals, Arabic-Indic numerals), you may need to update the `formatNumber` function in `src/utils/calculations.ts`.

Current implementation uses locale-aware formatting:

```typescript
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US'); // Update this based on language
};
```

For language-specific formatting, you can modify it to:

```typescript
export const formatNumber = (num: number, locale: string = 'en-US'): string => {
  return num.toLocaleString(locale);
};
```

Then pass the locale code when calling formatNumber.

## 🌍 Common Languages to Add

Here are some popular languages with their codes and flags:

| Language | Code | Flag | Native Name |
|----------|------|------|-------------|
| Hindi | `hi` | 🇮🇳 | हिन्दी |
| Spanish | `es` | 🇪🇸 | Español |
| French | `fr` | 🇫🇷 | Français |
| Arabic | `ar` | 🇸🇦 | العربية |
| Chinese | `zh` | 🇨🇳 | 中文 |
| Japanese | `ja` | 🇯🇵 | 日本語 |
| German | `de` | 🇩🇪 | Deutsch |
| Portuguese | `pt` | 🇵🇹 | Português |
| Russian | `ru` | 🇷🇺 | Русский |
| Urdu | `ur` | 🇵🇰 | اردو |

## 🐛 Troubleshooting

### Language not appearing in dropdown?

1. Check you added it to `AVAILABLE_LANGUAGES` in `config.ts`
2. Verify the import in `index.ts`
3. Rebuild the project: `pnpm build`

### Some text still in English?

1. Check your translation file has all required keys
2. Compare with `en.ts` to find missing translations
3. Use TypeScript - it will show errors for missing keys!

### Build errors?

1. Make sure the type union includes your language code
2. Check all imports are correct
3. Ensure translation file exports match the Translation type

## 🤝 Contributing Languages

If you add a language and want to contribute it back:

1. Fork the repository
2. Add your language following this guide
3. Test thoroughly
4. Create a pull request with:
   - Translation file (`src/locales/XX.ts`)
   - Updated config (`src/locales/config.ts`)
   - Updated index (`src/locales/index.ts`)
   - Example data (optional)

## 📚 File Structure

```
src/
├── locales/
│   ├── config.ts          # Language configuration
│   ├── index.ts           # Central export point
│   ├── en.ts              # English translations
│   ├── bn.ts              # Bengali translations
│   └── hi.ts              # Your new language ✨
├── utils/
│   ├── exampleData.ts     # Example data exports
│   ├── exampleData.en.ts  # English example
│   ├── exampleData.bn.ts  # Bengali example
│   └── exampleData.hi.ts  # Your example ✨
└── components/
    ├── LanguageSelector.tsx
    └── BillCalculator.tsx
```

## ✅ Complete Example

See the existing `bn.ts` (Bengali) file as a complete example of a non-English translation.

## 🎉 That's It!

You've successfully added a new language! The language selector will automatically show your language, and users can switch to it with a single click.

---

**Questions?** Check the [main README](README.md) or open an issue on GitHub.
