import { setO } from "./setO";

describe("Detailed translation", () => {
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
