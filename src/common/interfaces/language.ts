export interface LanguageToFlagMap {
  [key: string]: string;
}

export interface SupportedLanguages {
  [key: string]: { displayName: string; nativeName: string };
}
