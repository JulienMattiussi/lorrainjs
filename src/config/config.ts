export type TranslationOptions = {
  gros?: boolean;
  le?: boolean;
  mirabelle?: boolean;
  o?: boolean;
};

export const translationOptions: TranslationOptions = {
  gros: true,
  le: true,
  mirabelle: true,
  o: true,
};

export const systemConfig = {
  fruit: "mirabelle",
  suffix: " gros",
  a: "ô",
};

export type SystemConfig = typeof systemConfig;
