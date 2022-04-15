const DEFAULT_CONFIG = {
  gros: true,
  le: true,
  mirabelle: true,
};

function setGros(arg) {
  const gros = " gros";
  if (typeof arg === "object") {
    const newObject = Object.assign({}, arg);
    Object.keys(newObject).forEach((key) => {
      newObject[key] = newObject[key] + gros;
    });
    return newObject;
  }
  return arg + gros;
}

const regexCapital = /\b[A-Z][a-zA-Z]*\b/;

function setLe(arg) {
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
}

const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

const translate = (text, config = DEFAULT_CONFIG) => {
  let translatedText = text;
  if (config.gros) {
    translatedText = setGros(text);
  }
  if (config.le) {
    translatedText = setLe(text);
  }

  return translatedText;
};

const buildInit = (functionToOverride, config) => {
  var msgs = [];
  while (arguments.length) {
    const argument = [].shift.call(arguments);
    msgs.push(translate(argument, config));
  }

  functionToOverride.apply(console, msgs);
};

const initLog = (config = DEFAULT_CONFIG) => {
  console.log = function () {
    buildInit(originalLog, config);
  };
};

const initWarn = (config = DEFAULT_CONFIG) => {
  console.log = function () {
    buildInit(originalWarn, config);
  };
};

const initError = (config = DEFAULT_CONFIG) => {
  console.log = function () {
    buildInit(originalError, config);
  };
};

export default {
  originalLog,
  originalWarn,
  originalError,
  initLog,
  initWarn,
  initError,
  translate,
};
