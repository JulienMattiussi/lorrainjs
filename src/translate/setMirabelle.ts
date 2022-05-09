import fruits from "../assets/fruits";
import { systemConfig } from "../config/config";
import { ReplaceFunction, applyTranslateByType } from "./index";
import { TranlationObject } from "../logger";

/**
 * Translate a source to replace fruits names by "mirabelle".
 *
 * @example <caption>Example usage with a string.</caption>
 * // returns "La mirabelle"
 * setMirabelle("La pomme");
 *
 * @example <caption>Example usage with an array.</caption>
 * // returns ["La mirabelle", "Coucou", true]
 * setMirabelle(["La pomme", "Coucou", true]);
 *
 * @param {TranlationObject} source - The item to be translated.
 *
 * @returns {TranlationObject} Returns a translated object of the same type than the source.
 */
export const setMirabelle = (source: TranlationObject): TranlationObject => {
  const replaceFunction: ReplaceFunction = (text) => {
    const toReplaceFruit = systemConfig.fruit;
    let newText = `${text}`;
    fruits.map((fruit) => {
      const fruitRegExp = new RegExp(fruit, "ig");
      newText = newText.replace(fruitRegExp, toReplaceFruit);
    });
    return newText;
  };

  return applyTranslateByType(source, replaceFunction);
};
