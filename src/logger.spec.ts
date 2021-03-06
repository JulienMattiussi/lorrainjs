import { translate, parseTranslate } from "./logger";

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
    [
      "C'est l'heure de changer la couche de Micheline",
      "C'est l'heure de changer lô couche de lô Micheline gros",
    ],
  ])('should return "%s" for "%s" default translation', (source, result) => {
    expect(translate(source)).toBe(result);
  });

  it.each([
    [
      "Salut Jacky, tu veux une noix de cajou ?",
      "Sôlut le Jôcky, tu veux une mirabelle de côjou gros ?",
    ],
    [
      "C'est l'heure de changer la couche de Micheline",
      "C'est l'heure de changer lô couche de lô Micheline gros",
    ],
  ])('should return "%s" for "%s" full translation', (source, result) => {
    expect(
      translate(source, { gros: true, mirabelle: true, le: true, o: true })
    ).toBe(result);
  });
});

describe("no translate", () => {
  const testDate = new Date(2022, 10, 11);

  it.each([
    [testDate, testDate],
    [11, 11],
    [true, true],
    [false, false],
    [123.77, 123.77],
  ])(
    'should return "%s" for "%s" ignoring no translation',
    (source, result) => {
      expect(translate(source, {})).toStrictEqual(result);
    }
  );

  it.each([
    [testDate, testDate],
    [11, 11],
    [true, true],
    [false, false],
    [123.77, 123.77],
  ])(
    'should return "%s" for "%s" ignoring default translation',
    (source, result) => {
      expect(translate(source)).toStrictEqual(result);
    }
  );
});

describe("translate complex params", () => {
  const testDate = new Date(2022, 10, 11);

  it.each([
    [
      [
        "Salut Jacky, tu veux une noix de cajou ?",
        testDate,
        2.09,
        "Le cheval de Sylvie.",
      ],
      [
        "Salut Jacky, tu veux une noix de cajou ?",
        testDate,
        2.09,
        "Le cheval de Sylvie.",
      ],
    ],
    [
      {
        a: "Salut Jacky, tu veux une noix de cajou ?",
        b: testDate,
        c: 2.09,
        d: "Le cheval de Sylvie.",
      },
      {
        a: "Salut Jacky, tu veux une noix de cajou ?",
        b: testDate,
        c: 2.09,
        d: "Le cheval de Sylvie.",
      },
    ],
    [new Error("Données inaccessibles."), new Error("Données inaccessibles.")],
  ])('should return "%s" for "%s" no translation', (source, result) => {
    expect(translate(source, {})).toStrictEqual(result);
  });

  it.each([
    [
      [
        "Salut Jacky, tu veux une noix de cajou ?",
        testDate,
        2.09,
        "Le cheval de Sylvie.",
      ],
      [
        "Sôlut le Jôcky, tu veux une mirabelle de côjou gros ?",
        testDate,
        2.09,
        "Le chevôl de lô Sylvie gros.",
      ],
    ],
    [
      {
        a: "Salut Jacky, tu veux une noix de cajou ?",
        b: testDate,
        c: 2.09,
        d: "Le cheval de Sylvie.",
      },
      {
        a: "Sôlut le Jôcky, tu veux une mirabelle de côjou gros ?",
        b: testDate,
        c: 2.09,
        d: "Le chevôl de lô Sylvie gros.",
      },
    ],
    [
      new Error("Données inaccessibles."),
      new Error("Données inôccessibles gros."),
    ],
    [
      {
        p: true,
        q: {
          a: true,
          b: "abricot.",
          c: {
            t: testDate,
            e: new Error("Avalanche !"),
            s: ["Savon"],
            z: [],
            x: [testDate, 0.45, "ballon blanc"],
          },
        },
        r: testDate,
      },
      {
        p: true,
        q: {
          a: true,
          b: "mirabelle gros.",
          c: {
            t: testDate,
            e: new Error("Avôlanche gros !"),
            s: ["Sôvon gros"],
            z: [],
            x: [testDate, 0.45, "bôllon blanc gros"],
          },
        },
        r: testDate,
      },
    ],
  ])('should return "%s" for "%s" default translation', (source, result) => {
    expect(translate(source)).toStrictEqual(result);
  });
});

describe("parseTranslate full", () => {
  it.each([
    [
      "Salut Jacky, tu veux une noix de cajou ?",
      "Sôlut le Jôcky, tu veux une mirabelle de côjou gros ?",
    ],
    [
      "C'est l'heure de changer la couche de Micheline",
      "C'est l'heure de changer lô couche de lô Micheline gros",
    ],
  ])('should return "%s" for "%s" default translation', (source, result) => {
    expect(parseTranslate(source)).toBe(result);
  });
});

describe("parseTranslate with parse but no translate", () => {
  const testDate = new Date(2022, 10, 11);

  it.each([
    ["11", 11],
    ["true", true],
    ["false", false],
    ["123.77", 123.77],
  ])('should return "%s" for "%s" ignoring translation', (source, result) => {
    expect(parseTranslate(source)).toStrictEqual(result);
  });
});

describe("parseTranslate complex params", () => {
  it.each([
    [
      `[
        "Salut Jacky, tu veux une noix de cajou ?",
        2.09,
        "Le cheval de Sylvie.",
      ]`,
      [
        "Sôlut le Jôcky, tu veux une mirabelle de côjou gros ?",
        2.09,
        "Le chevôl de lô Sylvie gros.",
      ],
    ],
    [
      `{
        a: "Salut Jacky, tu veux une noix de cajou ?",
        c: 2.09,
        d: "Le cheval de Sylvie.",
      }`,
      {
        a: "Sôlut le Jôcky, tu veux une mirabelle de côjou gros ?",
        c: 2.09,
        d: "Le chevôl de lô Sylvie gros.",
      },
    ],
    [
      `{
        p: true,
        q: {
          a: true,
          b: "abricot.",
          c: {
            s: ["Savon"],
            z: [],
            x: [ 0.45, "ballon blanc"],
          },
        },
      }`,
      {
        p: true,
        q: {
          a: true,
          b: "mirabelle gros.",
          c: {
            s: ["Sôvon gros"],
            z: [],
            x: [0.45, "bôllon blanc gros"],
          },
        },
      },
    ],
  ])('should return "%s" for "%s" default translation', (source, result) => {
    expect(parseTranslate(source)).toStrictEqual(result);
  });
});
