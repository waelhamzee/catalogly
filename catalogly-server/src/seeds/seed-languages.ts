import { LanguageService } from "../modules/languages/language.service.js";

const languageService = new LanguageService();

const LANGUAGES = [
  "Arabic",
  "Chinese (Simplified)",
  "Chinese (Traditional)",
  "Dutch",
  "English",
  "French",
  "German",
  "Greek",
  "Hindi",
  "Italian",
  "Japanese",
  "Korean",
  "Latin",
  "Portuguese",
  "Russian",
  "Spanish",
  "Turkish",
];

export const seedLanguages = async () => {
  for (const name of LANGUAGES) {
    try {
      await languageService.createLanguage(name);
      console.log(`Language "${name}" created.`);
    } catch {
      console.log(`Language "${name}" already exists, skipping.`);
    }
  }
};
