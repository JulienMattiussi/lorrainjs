import { systemConfig } from "../config/config";
import { ReplaceFunction, applyTranslateByType } from "./index";
import { TranlationObject } from "../logger";

/**
 * Translate a source to replace the "a" letter by the "ô" letter in correct situations.
 *
 * @example <caption>Example usage with a string.</caption>
 * // returns "Salut gros."
 * setO("Salut.");
 *
 * @example <caption>Example usage with an array.</caption>
 * // returns ["Salut gros.", "Tu fais quoi gros ?", true]
 * setO(["Salut.", "Tu fais quoi ?", true]);
 *
 * @param {TranlationObject} source - The item to be translated.
 *
 * @returns {TranlationObject} Returns a translated object of the same type than the source.
 */
export const setO = (source: TranlationObject): TranlationObject => {
  const toReplaceA = systemConfig.a;
  const regexpToFindA = new RegExp(
    /(?<=[^euioy ])(([aAâ])(?=[^bneyuio]))/,
    "g"
  );

  const replaceFunction: ReplaceFunction = (text) => {
    return text.replace(regexpToFindA, toReplaceA);
  };

  return applyTranslateByType(source, replaceFunction);
};
