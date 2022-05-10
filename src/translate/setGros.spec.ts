import { setGros } from "./setGros";

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
