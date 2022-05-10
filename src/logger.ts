import { setLe, setGros, setMirabelle, setO } from "./translate/";
import { translationOptions, TranslationOptions } from "./config/config";

const DEFAULT_OPTIONS: TranslationOptions = {
  ...translationOptions,
};

export type TranlationObject = string | object | number | Date | boolean;

/**
 * Reference to the initial console.log function.
 * This can be used after having executed "initLog()" to display normal console logs.
 *
 * @example
 * originalLog("Something happened");
 *
 * @param {any} - The Element to be logged in the console.
 */
export const originalLog = console.log;

/**
 * Reference to the initial consol.warn function.
 * This can be used after having executed "initWarn()" to display normal console warnings.
 *
 * @example
 * originalWarn("Something unusual happened");
 *
 * @param {any} - The Element to be warned in the console.
 */
export const originalWarn = console.warn;

/**
 * Reference to the initial consol.error function.
 * This can be used after having executed "initError()" to display normal console errors.
 *
 * @example
 * originalError("Something wrong happened");
 *
 * @param {any} - The Element to be errored in the console.
 */
export const originalError = console.error;

/**
 * Translate a source in lorrain appliying the given options.
 *
 * @example <caption>Example usage with a string.</caption>
 * // returns "Ca va le Michel gros ?"
 * translate("Ca va Michel ?");
 *
 * @example <caption>Example usage with specific options.</caption>
 * // returns "Ca va le Michel ?"
 * translate("Ca va Michel ?", { gros: true });
 *
 * @param {TranlationObject} source - The item to be translated.
 * @param {TranslationOptions} options - The options activated for this translation. By default, all are activated.
 *
 * @returns {TranlationObject} Returns a translated object of the same type than the source.
 */
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

/**
 * Modify a string with quotes trying to set it compatible to JSON parsing.
 *
 * @example <caption>Example usage.</caption>
 * // returns { "test": "Bonjour", "ignore": "456"}
 * stringToJSON("{ test : "Bonjour", ignore : 456}");
 *
 * @param {string} source - The string to be modified.
 *
 * @returns {string} Returns a modified string with JSON quotes.
 */
const stringToJSON = (source: string): string => {
  let convertedString = `${source}`;
  const simpleWordRegexp = new RegExp(/(\w+):|(\w+) :/, "g");
  if (simpleWordRegexp.test(source)) {
    convertedString = convertedString.replace(simpleWordRegexp, '"$1$2":');
  }

  const quotedVariableRegexp = new RegExp(/'(\w+)':|'(\w+)' :/, "g");
  if (quotedVariableRegexp.test(source)) {
    convertedString = convertedString.replace(quotedVariableRegexp, '"$1$2":');
  }

  const quotedValueRegexp = new RegExp(/'(\w+)'(,|}|\r\n|\r|\n)/, "g");
  if (quotedValueRegexp.test(source)) {
    convertedString = convertedString.replace(quotedValueRegexp, '"$1"$2');
  }

  const trailingCommaRegexp = new RegExp(/(,)( |\r\n|\r|\n)*(]|})/, "g");
  if (trailingCommaRegexp.test(source)) {
    convertedString = convertedString.replace(trailingCommaRegexp, "$2$3");
  }

  return convertedString;
};

/**
 * Translate a string in lorrain by parsing it's content before appliying the given options.
 *
 * @example <caption>Example usage with an object in string.</caption>
 * // returns { test : "Bonjour gros", ignore : 456}
 * translate("{ test : "Bonjour", ignore : 456}");
 *
 * @example <caption>Example usage with a JSON in string.</caption>
 * // returns { test : "Bonjour gros", ignore : 456}
 * translate('{ "test" : "Bonjour", "ignore" : 456}');
 *
 * @example <caption>Example usage with a number in string.</caption>
 * // returns 456.12
 * translate("456.12");
 *
 * @param {string} source - The string to be parsed and translated.
 * @param {TranslationOptions} options - The options activated for this translation. By default, all are activated.
 *
 * @returns {TranlationObject} Returns a translated object of the correct type.
 */
export const parseTranslate = (
  source: string,
  options: TranslationOptions = DEFAULT_OPTIONS
): TranlationObject => {
  try {
    const jsonString = stringToJSON(source);
    const parsedSource = JSON.parse(jsonString);

    return translate(parsedSource, options);
  } catch (error) {
    return translate(source, options);
  }
};

/**
 * Override the default console.log function with the lorrainjs log function using given options.
 *
 * @example <caption>Example usage with default options.</caption>
 * initLog();
 *
 * @example <caption>Example usage with specific options.</caption>
 * initLog({ gros: true });
 *
 * @param {TranslationOptions} options - The options activated for the logs. By default, all are activated.
 */
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

/**
 * Override the default console.warn function with the lorrainjs warn function using given options.
 *
 * @example <caption>Example usage with default options.</caption>
 * initWarn();
 *
 * @example <caption>Example usage with specific options.</caption>
 * initWarn({ gros: true });
 *
 * @param {TranslationOptions} options - The options activated for the logs. By default, all are activated.
 */
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

/**
 * Override the default console.error function with the lorrainjs error function using given options.
 *
 * @example <caption>Example usage with default options.</caption>
 * initError();
 *
 * @example <caption>Example usage with specific options.</caption>
 * initError({ gros: true });
 *
 * @param {TranslationOptions} options - The options activated for the logs. By default, all are activated.
 */
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

/**
 * Override the default console.log, console.warn and console.error functions with the lorrainjs functions using given options.
 *
 * @example <caption>Example usage with default options.</caption>
 * initAll();
 *
 * @example <caption>Example usage with an options.</caption>
 * initAll({ gros: true });
 *
 * @param {TranslationOptions} options - The options activated for the logs. By default, all are activated.
 */
export const initAll = (options: TranslationOptions = DEFAULT_OPTIONS) => {
  initLog(options);
  initWarn(options);
  initError(options);
};
