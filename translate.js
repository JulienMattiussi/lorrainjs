import fruits from "./assets/fruits.js";
import { default_config } from "./config/config.js";

export const setMirabelle = (arg) => {
  const toReplaceFruit = default_config.fruit;
  if (typeof arg === "object") {
    const newObject = Object.assign({}, arg);
    Object.keys(newObject).forEach((key) => {
      if (typeof newObject[key] === "string") {
        fruits.map((fruit) => {
          const fruitRegExp = new RegExp(fruit, "ig");
          newObject[key] = newObject[key].replace(fruitRegExp, toReplaceFruit);
        });
      }
    });
    return newObject;
  }
  if (typeof arg === "string") {
    fruits.map((fruit) => {
      const fruitRegExp = new RegExp(fruit, "ig");
      arg = arg.replace(fruitRegExp, toReplaceFruit);
    });
  }
  return arg;
};

const regexCapital = /\b[A-Z][a-zA-Z]*\b/;

export const setLe = (arg) => {
  const le = default_config.le;
  if (typeof arg === "object") {
    const newObject = Object.assign({}, arg);
    Object.keys(newObject).forEach((key) => {
      if (typeof newObject[key] === "string") {
        newObject[key] = newObject[key].replace(regexCapital, `${le}$&`);
      }
    });
    return newObject;
  }
  return arg.replace(regexCapital, `${le}$&`);
};

export const setGros = (arg) => {
  const gros = default_config.suffix;
  if (typeof arg === "object") {
    const newObject = Object.assign({}, arg);
    Object.keys(newObject).forEach((key) => {
      newObject[key] = newObject[key] + gros;
    });
    return newObject;
  }
  return arg + gros;
};

export const setO = (arg) => {
  const toReplaceA = default_config.a;
  const fruitToNotReplace = default_config.fruit;
  const regexpToFindA = new RegExp(/(?<=[^euioy ])(([aAâ])(?=[^beyuio]))/, "g");
  if (typeof arg === "object") {
    const newObject = Object.assign({}, arg);
    Object.keys(newObject).forEach((key) => {
      if (typeof newObject[key] === "string") {
        newObject[key] = newObject[key].replace(regexpToFindA, toReplaceA);
      }
    });
    return newObject;
  }
  if (typeof arg === "string" && arg) {
    arg = arg.replace(regexpToFindA, toReplaceA);
    return arg;
  }
  return arg;
};
