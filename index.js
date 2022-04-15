import { setLe, setGros, setMirabelle } from "./translate.js";

const DEFAULT_CONFIG = {
  gros: true,
  le: true,
  mirabelle: true,
};

const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

const translate = (text, config = DEFAULT_CONFIG) => {
  let translatedText = text;
  if (config.gros) {
    translatedText = setGros(translatedText);
  }
  if (config.le) {
    translatedText = setLe(translatedText);
  }
  if (config.mirabelle) {
    translatedText = setMirabelle(translatedText);
  }

  return translatedText;
};

export const initLog = (config = DEFAULT_CONFIG) => {
  console.log = function () {
    var msgs = [];
    while (arguments.length) {
      const argument = [].shift.call(arguments);
      msgs.push(translate(argument, config));
    }

    originalLog.apply(console, msgs);
  };
};

const initWarn = (config = DEFAULT_CONFIG) => {
  console.warn = function () {
    var msgs = [];
    while (arguments.length) {
      const argument = [].shift.call(arguments);
      msgs.push(translate(argument, config));
    }

    originalWarn.apply(console, msgs);
  };
};

const initError = (config = DEFAULT_CONFIG) => {
  console.error = function () {
    var msgs = [];
    while (arguments.length) {
      const argument = [].shift.call(arguments);
      msgs.push(translate(argument, config));
    }

    originalError.apply(console, msgs);
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
