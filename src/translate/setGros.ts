import { systemConfig } from "../config/config";
import { ReplaceFunction, applyTranslateByType } from "./index";
import { TranlationObject } from "../logger";

/**
 * Translate a source to add "gros" at the end.
 *
 * @example <caption>Example usage with a string.</caption>
 * // returns "Salut gros."
 * setGros("Salut.");
 *
 * @example <caption>Example usage with an array.</caption>
 * // returns ["Salut gros.", "Tu fais quoi gros ?", true]
 * setGros(["Salut.", "Tu fais quoi ?", true]);
 *
 * @param {TranlationObject} source - The item to be translated.
 *
 * @returns {TranlationObject} Returns a translated object of the same type than the source.
 */
export const setGros = (source: TranlationObject): TranlationObject => {
  const gros = systemConfig.suffix;
  const regexpToCheckGros = new RegExp(/ gros.?.?$/, "g");
  const regexpToCheckPunctuationWithSpaceNotEnd = new RegExp(
    /(?= [!?;.][^$])/,
    "g"
  );
  const regexpToCheckPunctuationWithSpaceAndEnd = new RegExp(/ [!?:;.,]$/, "g");
  const regexpToCheckPunctuationNotEnd = new RegExp(
    /(?<=[a-zA-Z])(?=[!?;.][^$])/,
    "g"
  );
  const regexpToCheckPunctuationAndEnd = new RegExp(/[!?:;.,]$/, "g");

  const replaceFunction: ReplaceFunction = (text) => {
    if (regexpToCheckGros.test(text)) {
      return text;
    }
    let replacedText = `${text}`;
    if (regexpToCheckPunctuationWithSpaceNotEnd.test(replacedText)) {
      replacedText = replacedText.replace(
        regexpToCheckPunctuationWithSpaceNotEnd,
        () => (Math.random() > 0.5 ? gros : "")
      );
    }
    if (regexpToCheckPunctuationNotEnd.test(replacedText)) {
      replacedText = replacedText.replace(regexpToCheckPunctuationNotEnd, () =>
        Math.random() > 0.5 ? gros : ""
      );
    }
    if (regexpToCheckPunctuationWithSpaceAndEnd.test(text)) {
      return replacedText.replace(
        regexpToCheckPunctuationWithSpaceAndEnd,
        `${gros}$&`
      );
    }
    if (regexpToCheckPunctuationAndEnd.test(text)) {
      return replacedText.replace(regexpToCheckPunctuationAndEnd, `${gros}$&`);
    }
    return replacedText + gros;
  };

  return applyTranslateByType(source, replaceFunction);
};
