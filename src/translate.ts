import fruits from "./assets/fruits";
import names from "./assets/names";
import { systemConfig } from "./config/config";
import { TranlationObject } from './logger'



const applyTranslateByType = (source: TranlationObject, translate: Function): TranlationObject => {
  if (typeof source === "object") {
    if (source instanceof Date) {
      return source;
    }
    if (source instanceof Array) {
      return source.map((item) => {
        if (typeof item === "string") {
          if (item === "") {
            return item;
          }
          return translate(item);
        }
        return item;
      });
    }
    if (source instanceof Error) {
      source.message = translate(source.message);
      return source;
    }
    const newObject = Object.assign({}, source);
    Object.keys(newObject).forEach((key) => {
      if (typeof newObject[key] === "string") {
        newObject[key] = translate(newObject[key]);
      }
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

export const setMirabelle = (source: TranlationObject): TranlationObject => {
  
  const replaceFunction = (text: string): string => {
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

export const setLe = (source: TranlationObject): TranlationObject => {
  const replaceFunction = (text: string): string => {
    let newText = `${text}`;
    names.map((name) => {
      const nameDeRegExp = new RegExp("de " + name.name, "g");
      if (nameDeRegExp.test(newText)) {
        newText = newText.replace(
          nameDeRegExp,
          `${name.sex === "f" ? "de la" : "du"} ${name.name}`
        );
        return;
      }
      const nameAuRegExp = new RegExp("à " + name.name, "g");
      if (nameAuRegExp.test(newText)) {
        newText = newText.replace(
          nameAuRegExp,
          `${name.sex === "f" ? "à la" : "au"} ${name.name}`
        );
        return;
      }
      const nameRegExp = new RegExp(name.name, "g");
      newText = newText.replace(
        nameRegExp,
        `${name.sex === "f" ? "la " : "le "}$&`
      );
    });
    return newText;
  };

  return applyTranslateByType(source, replaceFunction);
};

export const setGros = (source: TranlationObject): TranlationObject => {
  const gros = systemConfig.suffix;
  const regexpToCheckGros = new RegExp(/ gros.?.?$/, "g");
  const regexpToCheckPunctuationWithSpace = new RegExp(/ [!?:;.,]$/, "g");
  const regexpToCheckPunctuation = new RegExp(/[!?:;.,]$/, "g");

  const replaceFunction = (text: string): string => {
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

export const setO = (source: TranlationObject): TranlationObject => {
  const toReplaceA = systemConfig.a;
  const regexpToFindA = new RegExp(
    /(?<=[^euioy ])(([aAâ])(?=[^bneyuio]))/,
    "g"
  );

  const replaceFunction = (text: string): string => {
    return text.replace(regexpToFindA, toReplaceA);
  };

  return applyTranslateByType(source, replaceFunction);
};
