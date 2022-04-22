import { setLe, setGros, setMirabelle, setO } from "./translate.js";
import { default_config } from "./config/config.js";

const DEFAULT_CONFIG = {
  ...default_config.logger,
};

export const originalLog = console.log;
export const originalWarn = console.warn;
export const originalError = console.error;

export const translate = (text, config = DEFAULT_CONFIG) => {
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
  if (config.o) {
    translatedText = setO(translatedText);
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

export const initWarn = (config = DEFAULT_CONFIG) => {
  console.warn = function () {
    var msgs = [];
    while (arguments.length) {
      const argument = [].shift.call(arguments);
      msgs.push(translate(argument, config));
    }

    originalWarn.apply(console, msgs);
  };
};

export const initError = (config = DEFAULT_CONFIG) => {
  console.error = function () {
    var msgs = [];
    while (arguments.length) {
      const argument = [].shift.call(arguments);
      msgs.push(translate(argument, config));
    }

    originalError.apply(console, msgs);
  };
};

export const initAll = (config = DEFAULT_CONFIG) => {
  initLog(config);
  initWarn(config);
  initError(config);
};
