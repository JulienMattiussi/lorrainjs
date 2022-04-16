import fruits from "./assets/fruits.js";
import { default_config } from "./config/config.js";

const applyTranslateByType = (source, translate) => {
  if (typeof source === "object") {
    if (source instanceof Date) {
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
  const le = default_config.le;
  const regexCapital = /\b[A-Z][a-zA-Z]*\b/;

  const replaceFunction = (text) => {
    return text.replace(regexCapital, `${le}$&`);
  };

  return applyTranslateByType(source, replaceFunction);
};

export const setGros = (source) => {
  const gros = default_config.suffix;

  const replaceFunction = (text) => {
    return text + gros;
  };

  return applyTranslateByType(source, replaceFunction);
};

export const setO = (source) => {
  const toReplaceA = default_config.a;
  const regexpToFindA = new RegExp(/[aAâ]/, "g");

  const replaceFunction = (text) => {
    return text.replace(regexpToFindA, toReplaceA);
  };

  return applyTranslateByType(source, replaceFunction);
};
