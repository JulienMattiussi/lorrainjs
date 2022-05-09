import { TranlationObject } from "../logger";

export type ReplaceFunction = (text: string) => string;

/**
 * Apply a replace fonction to a source to translate it.
 * This should be called for every aspect of the translation using each time the needed replace function.
 * The process depend on the type of the source.
 *
 * @example <caption>Example usage with a string.</caption>
 * // returns "Le Michel"
 * applyTranslateByType("Michel", replaceNameWithLe);
 *
 * @example <caption>Example usage with an array.</caption>
 * // returns ["Salut gros", "Bye gros.", true]
 * applyTranslateByType(["Salut", "Bye.", true], replaceWithGros);
 *
 * @param {TranlationObject} source - The item to be translated.
 * @param {ReplaceFunction} translate - The fonction to be applied on the source.
 *
 * @returns {TranlationObject} Returns a translated object of the same type than the source.
 */
export const applyTranslateByType = (
  source: TranlationObject,
  translate: ReplaceFunction
): TranlationObject => {
  if (typeof source === "object") {
    if (source instanceof Date) {
      return source;
    }
    if (source instanceof Array) {
      return source.map((item) => {
        return applyTranslateByType(item, translate);
      });
    }
    if (source instanceof Error) {
      source.message = translate(source.message);
      return source;
    }
    const newObject = Object.assign({}, source);
    Object.keys(newObject).forEach((key) => {
      newObject[key] = applyTranslateByType(newObject[key], translate);
    });
    return newObject;
  }
  if (typeof source === "string") {
    if (source === "") {
      return source;
    }
    return translate(source);
  }
  return source;
};

export { setMirabelle } from "./setMirabelle";
export { setLe } from "./setLe";
export { setGros } from "./setGros";
export { setO } from "./setO";
