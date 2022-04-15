import fruits from "./assets/fruits.js";

export const setMirabelle = (arg) => {
  if (typeof arg === "object") {
    const newObject = Object.assign({}, arg);
    Object.keys(newObject).forEach((key) => {
      if (typeof newObject[key] === "string") {
        fruits.map((fruit) => {
          const fruitRegExp = new RegExp(fruit, "ig");
          newObject[key] = newObject[key].replace(fruitRegExp, "mirabelle");
        });
      }
    });
    return newObject;
  }
  if (typeof arg === "string") {
    fruits.map((fruit) => {
      const fruitRegExp = new RegExp(fruit, "ig");
      arg = arg.replace(fruitRegExp, "mirabelle");
    });
  }
  return arg;
};

const regexCapital = /\b[A-Z][a-zA-Z]*\b/;

export const setLe = (arg) => {
  const le = "le ";
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
  const gros = " gros";
  if (typeof arg === "object") {
    const newObject = Object.assign({}, arg);
    Object.keys(newObject).forEach((key) => {
      newObject[key] = newObject[key] + gros;
    });
    return newObject;
  }
  return arg + gros;
};
