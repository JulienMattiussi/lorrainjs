import { applyTranslateByType } from "./index";

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
