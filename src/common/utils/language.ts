import { language as languageConstants } from '../constants';

const getFlagByLanguage = (language: string): string => {
  if (!language) {
    return 'gb';
  }

  return languageConstants.LANGUAGE_TO_FLAG_MAP[language];
};

export default { getFlagByLanguage };
