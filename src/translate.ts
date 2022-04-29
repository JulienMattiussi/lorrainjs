import fruits from "./assets/fruits";
import names from "./assets/names";
import { systemConfig } from "./config/config";
import { TranlationObject } from "./logger";

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

/**
 * Translate a source to add le/la/du/au before every firstnames.
 *
 * @example <caption>Example usage with a string.</caption>
 * // returns "La Michelle"
 * setLe("Michelle");
 *
 * @example <caption>Example usage with an array.</caption>
 * // returns ["La Michelle", "La hache du Thierry", true]
 * setLe(["Michelle", "La hache de Thierry", true]);
 *
 * @param {TranlationObject} source - The item to be translated.
 *
 * @returns {TranlationObject} Returns a translated object of the same type than the source.
 */
export const setLe = (source: TranlationObject): TranlationObject => {
  const replaceFunction: ReplaceFunction = (text) => {
    let newText = `${text}`;
    names.map((name) => {
      const nameDeRegExp = new RegExp(
        `de( ${name.name}[^a-zA-Zéèàçù])|de( ${name.name})$`,
        "g"
      );
      if (nameDeRegExp.test(newText)) {
        newText = newText.replace(
          nameDeRegExp,
          `${name.sex === "f" ? "de la" : "du"}$1$2`
        );
        return;
      }
      const nameAuRegExp = new RegExp(
        `à( ${name.name}[^a-zA-Zéèàçù])|à( ${name.name})$`,
        "g"
      );
      if (nameAuRegExp.test(newText)) {
        newText = newText.replace(
          nameAuRegExp,
          `${name.sex === "f" ? "à la" : "au"}$1$2`
        );
        return;
      }
      const nameStartRegExp = new RegExp(
        `^(${name.name}[^a-zA-Zéèàçù])|^(${name.name})$`,
        "g"
      );
      if (nameStartRegExp.test(newText)) {
        newText = newText.replace(
          nameStartRegExp,
          `${name.sex === "f" ? "La " : "Le "}$1$2`
        );
        return;
      }
      const nameRegExp = new RegExp(
        `${name.name}[^a-zA-Zéèàçù]|${name.name}$`,
        "g"
      );
      newText = newText.replace(
        nameRegExp,
        `${name.sex === "f" ? "la " : "le "}$&`
      );
    });
    return newText;
  };

  return applyTranslateByType(source, replaceFunction);
};

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
  const regexpToCheckPunctuationWithSpace = new RegExp(/ [!?:;.,]$/, "g");
  const regexpToCheckPunctuation = new RegExp(/[!?:;.,]$/, "g");

  const replaceFunction: ReplaceFunction = (text) => {
    if (regexpToCheckGros.test(text)) {
      return text;
    }
    if (regexpToCheckPunctuationWithSpace.test(text)) {
      return text.replace(regexpToCheckPunctuationWithSpace, `${gros}$&`);
    }
    if (regexpToCheckPunctuation.test(text)) {
      return text.replace(regexpToCheckPunctuation, `${gros}$&`);
    }
    return text + gros;
  };

  return applyTranslateByType(source, replaceFunction);
};

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
