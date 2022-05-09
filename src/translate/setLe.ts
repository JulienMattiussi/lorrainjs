import names from "../assets/names";
import { ReplaceFunction, applyTranslateByType } from "./index";
import { TranlationObject } from "../logger";

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
