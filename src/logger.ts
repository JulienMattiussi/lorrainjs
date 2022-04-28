import { setLe, setGros, setMirabelle, setO } from "./translate";
import { translationOptions, TranslationOptions } from "./config/config";

const DEFAULT_OPTIONS: TranslationOptions = {
  ...translationOptions,
};

export type TranlationObject = string | object | number | Date | boolean;

export const originalLog = console.log;
export const originalWarn = console.warn;
export const originalError = console.error;

export const translate = (
  source: TranlationObject,
  options: TranslationOptions = DEFAULT_OPTIONS
): TranlationObject => {
  let translation = source;
  if (options.gros) {
    translation = setGros(translation);
  }
  if (options.le) {
    translation = setLe(translation);
  }
  if (options.mirabelle) {
    translation = setMirabelle(translation);
  }
  if (options.o) {
    translation = setO(translation);
  }

  return translation;
};

export const initLog = (options: TranslationOptions = DEFAULT_OPTIONS) => {
  console.log = function () {
    var msgs = [];
    while (arguments.length) {
      const argument = [].shift.call(arguments);
      msgs.push(translate(argument, options));
    }

    originalLog.apply(console, msgs);
  };
};

export const initWarn = (options = DEFAULT_OPTIONS) => {
  console.warn = function () {
    var msgs = [];
    while (arguments.length) {
      const argument = [].shift.call(arguments);
      msgs.push(translate(argument, options));
    }

    originalWarn.apply(console, msgs);
  };
};

export const initError = (options: TranslationOptions = DEFAULT_OPTIONS) => {
  console.error = function () {
    var msgs = [];
    while (arguments.length) {
      const argument = [].shift.call(arguments);
      msgs.push(translate(argument, options));
    }

    originalError.apply(console, msgs);
  };
};

export const initAll = (options: TranslationOptions = DEFAULT_OPTIONS) => {
  initLog(options);
  initWarn(options);
  initError(options);
};
