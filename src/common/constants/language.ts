import { LanguageToFlagMap, SupportedLanguages } from '../interfaces';

const SUPPORTED_LANGUAGES: SupportedLanguages = {
  en: { displayName: 'EN', nativeName: 'English' },
  no: { displayName: 'NO', nativeName: 'Norsk' },
};

const LANGUAGE_TO_FLAG_MAP: LanguageToFlagMap = {
  en: 'gb',
  no: 'no',
};

export default { LANGUAGE_TO_FLAG_MAP, SUPPORTED_LANGUAGES };
