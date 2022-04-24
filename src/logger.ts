import { setLe, setGros, setMirabelle, setO } from "./translate";
import { translationOptions, TranslationOptions } from "./config/config";

const DEFAULT_CONFIG: TranslationOptions = {
  ...translationOptions,
};

export type TranlationObject = string | object;

export const originalLog = console.log;
export const originalWarn = console.warn;
export const originalError = console.error;

export const translate = (
  source: TranlationObject,
  config: TranslationOptions = DEFAULT_CONFIG
): TranlationObject => {
  let translation = source;
  if (config.gros) {
    translation = setGros(translation);
  }
  if (config.le) {
    translation = setLe(translation);
  }
  if (config.mirabelle) {
    translation = setMirabelle(translation);
  }
  if (config.o) {
    translation = setO(translation);
  }

  return translation;
};

export const initLog = (config: TranslationOptions = DEFAULT_CONFIG) => {
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

export const initError = (config: TranslationOptions = DEFAULT_CONFIG) => {
  console.error = function () {
    var msgs = [];
    while (arguments.length) {
      const argument = [].shift.call(arguments);
      msgs.push(translate(argument, config));
    }

    originalError.apply(console, msgs);
  };
};

export const initAll = (config: TranslationOptions = DEFAULT_CONFIG) => {
  initLog(config);
  initWarn(config);
  initError(config);
};
