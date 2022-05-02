import {
  setMirabelle,
  setLe,
  setGros,
  setO,
  applyTranslateByType,
} from "./translate";

describe("Detailed translation", () => {
  describe("setMirabelle", () => {
    it.each([
      ["pomme", "mirabelle"],
      ["ballon", "ballon"],
    ])(
      'should return "%s" for "%s" mirabelle translation',
      (source, result) => {
        expect(setMirabelle(source)).toBe(result);
      }
    );
  });

  describe("setLe", () => {
    it.each([
      ["Jacky", "Le Jacky"],
      ["ballon", "ballon"],
      ["Jackie et Michel", "La Jackie et le Michel"],
      ["C'est le vélo de François", "C'est le vélo du François"],
      ["C'est l'ordinateur de Cindy", "C'est l'ordinateur de la Cindy"],
      ["Il faut le dire à Matthieu", "Il faut le dire au Matthieu"],
      ["Il faut le dire à Caroline", "Il faut le dire à la Caroline"],
      ["Le vélo de Micheline", "Le vélo de la Micheline"],
      ["Salut Maxime", "Salut le Maxime"],
      ["Maxime", "Le Maxime"],
      ["Thierry", "Le Thierry"],
      ["Thiery", "Le Thiery"],
      ["Marine", "La Marine"],
      [
        "C'est l'heure de changer la couche de Micheline",
        "C'est l'heure de changer la couche de la Micheline",
      ],
    ])('should return "%s" for "%s" le/la translation', (source, result) => {
      expect(setLe(source)).toBe(result);
    });
  });

  describe("setGros", () => {
    it.each([
      ["salut", "salut gros"],
      ["salut.", "salut gros."],
      ["salut !", "salut gros !"],
      ["salut gros !", "salut gros !"],
      ["c'est un gros ballon.", "c'est un gros ballon gros."],
    ])('should return "%s" for "%s" gros translation', (source, result) => {
      expect(setGros(source)).toBe(result);
    });
  });

  describe("setGros multi-sentences", () => {
    it.each([
      [
        "Salut. Tu va bien ?",
        ["Salut gros. Tu va bien gros ?", "Salut. Tu va bien gros ?"],
      ],
      [
        "Bye. On se voie demain ? Chez Jacky, comme d'hab !",
        [
          "Bye gros. On se voie demain gros ? Chez Jacky, comme d'hab gros !",
          "Bye. On se voie demain gros ? Chez Jacky, comme d'hab gros !",
          "Bye. On se voie demain ? Chez Jacky, comme d'hab gros !",
          "Bye gros. On se voie demain ? Chez Jacky, comme d'hab gros !",
        ],
      ],
    ])(
      'should return one of "%s" for "%s" gros translation',
      (source, results) => {
        expect(results).toContain(setGros(source));
      }
    );
  });

  describe("setO", () => {
    it.each([
      ["patate", "pôtôte"],
      ["ballon", "bôllon"],
      ["crevette", "crevette"],
      ["Données inaccessibles", "Données inôccessibles"],
    ])('should return "%s" for "%s" ô translation', (source, result) => {
      expect(setO(source)).toBe(result);
    });
  });
});

describe("Apply translate by type", () => {
  const testDate = new Date(2022, 10, 11);
  const testError = new Error("");
  describe("basics", () => {
    it.each([
      ["abricot amer", "Abricot Amer"],
      [testDate, testDate],
      [487, 487],
      [51.987, 51.987],
      [true, true],
      [false, false],
      [new Error("Avalanche"), new Error("AvAlAnche")],
      [
        [true, "abricot", testDate, undefined],
        [true, "Abricot", testDate, undefined],
      ],
      [
        { a: true, b: "abricot", c: testDate },
        { a: true, b: "Abricot", c: testDate },
      ],
    ])('should return "%s" for "%s" replace', (source, result) => {
      const replace = (item) => item.replaceAll("a", "A");
      expect(applyTranslateByType(source, replace)).toStrictEqual(result);
    });
  });

  describe("complex", () => {
    it.each([
      [
        [
          true,
          { a: true, b: "abricot", c: [testDate, false, "Savon"] },
          testDate,
        ],
        [
          true,
          { a: true, b: "Abricot", c: [testDate, false, "SAvon"] },
          testDate,
        ],
      ],
      [
        {
          p: true,
          q: {
            a: true,
            b: "abricot",
            c: {
              t: testDate,
              e: new Error("Avalanche"),
              s: ["Savon"],
              z: [],
              x: [testDate, testError, "ballon blanc"],
            },
          },
          r: testDate,
        },
        {
          p: true,
          q: {
            a: true,
            b: "Abricot",
            c: {
              t: testDate,
              e: new Error("AvAlAnche"),
              s: ["SAvon"],
              z: [],
              x: [testDate, testError, "bAllon blAnc"],
            },
          },
          r: testDate,
        },
      ],
    ])('should return "%s" for "%s" replace', (source, result) => {
      const replace = (item) => item.replaceAll("a", "A");
      expect(applyTranslateByType(source, replace)).toStrictEqual(result);
    });
  });
});
