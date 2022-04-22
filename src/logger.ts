import { setLe, setGros, setMirabelle, setO } from "./translate";
import { translationOptions, TranslationOptions } from "./config/config";

const DEFAULT_CONFIG: TranslationOptions = {
  ...translationOptions,
};

export type Source = string | {};
export type Result = Source;

export const originalLog: Function = console.log;
export const originalWarn: Function = console.warn;
export const originalError: Function = console.error;

export const translate = (
  source: Source,
  config: TranslationOptions = DEFAULT_CONFIG
): Result => {
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
