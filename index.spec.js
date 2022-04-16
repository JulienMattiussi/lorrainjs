import { translate } from "./index";

describe("translate with options", () => {
  it.each([
    [
      "Salut Jacky, tu veux une noix de cajou ?",
      "Salut Jacky, tu veux une mirabelle de cajou ?",
    ],
  ])('should return "%s" for "%s" mirabelle translation', (source, result) => {
    expect(translate(source, { mirabelle: true })).toBe(result);
  });

  it.each([
    [
      "Salut Jacky, tu veux une noix de cajou ?",
      "Salut Jacky, tu veux une noix de cajou gros ?",
    ],
  ])('should return "%s" for "%s" gros translation', (source, result) => {
    expect(translate(source, { gros: true })).toBe(result);
  });

  it.each([
    [
      "Salut Jacky, tu veux une noix de cajou ?",
      "Salut le Jacky, tu veux une noix de cajou ?",
    ],
  ])('should return "%s" for "%s" le/la translation', (source, result) => {
    expect(translate(source, { le: true })).toBe(result);
  });

  it.each([
    [
      "Salut Jacky, tu veux une noix de cajou ?",
      "Sôlut Jôcky, tu veux une noix de côjou ?",
    ],
  ])('should return "%s" for "%s" ô translation', (source, result) => {
    expect(translate(source, { o: true })).toBe(result);
  });
});

describe("translate full", () => {
  it.each([
    [
      "Salut Jacky, tu veux une noix de cajou ?",
      "Salut Jacky, tu veux une noix de cajou ?",
    ],
  ])('should return "%s" for "%s" no translation', (source, result) => {
    expect(translate(source, {})).toBe(result);
  });

  it.each([
    [
      "Salut Jacky, tu veux une noix de cajou ?",
      "Sôlut le Jôcky, tu veux une mirabelle de côjou gros ?",
    ],
  ])('should return "%s" for "%s" default translation', (source, result) => {
    expect(translate(source)).toBe(result);
  });

  it.each([
    [
      "Salut Jacky, tu veux une noix de cajou ?",
      "Sôlut le Jôcky, tu veux une mirabelle de côjou gros ?",
    ],
  ])('should return "%s" for "%s" full translation', (source, result) => {
    expect(
      translate(source, { gros: true, mirabelle: true, le: true, o: true })
    ).toBe(result);
  });
});
