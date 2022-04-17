import fruits from "./assets/fruits.js";
import names from "./assets/names.js";
import { default_config } from "./config/config.js";

const applyTranslateByType = (source, translate) => {
  if (typeof source === "object") {
    if (source instanceof Date) {
      return source;
    }
    if (source instanceof Array) {
      return source.map((item) => {
        if (typeof item === "string") {
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
    return translate(source);
  }
  return source;
};

export const setMirabelle = (source) => {
  const toReplaceFruit = default_config.fruit;

  const replaceFunction = (text) => {
    let newText = `${text}`;
    fruits.map((fruit) => {
      const fruitRegExp = new RegExp(fruit, "ig");
      newText = newText.replace(fruitRegExp, toReplaceFruit);
    });
    return newText;
  };

  return applyTranslateByType(source, replaceFunction);
};

export const setLe = (source) => {
  const replaceFunction = (text) => {
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

export const setGros = (source) => {
  const gros = default_config.suffix;
  const regexpToCheckGros = new RegExp(/ gros.?.?$/, "g");
  const regexpToCheckPunctuationWithSpace = new RegExp(/ [!?:;.,]$/, "g");
  const regexpToCheckPunctuation = new RegExp(/[!?:;.,]$/, "g");

  const replaceFunction = (text) => {
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

export const setO = (source) => {
  const toReplaceA = default_config.a;
  const regexpToFindA = new RegExp(
    /(?<=[^euioy ])(([aAâ])(?=[^bneyuio]))/,
    "g"
  );

  const replaceFunction = (text) => {
    return text.replace(regexpToFindA, toReplaceA);
  };

  return applyTranslateByType(source, replaceFunction);
};
