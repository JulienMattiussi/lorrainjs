import { setMirabelle, setLe, setGros, setO } from "./translate";

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
      ["Jacky", "le Jacky"],
      ["ballon", "ballon"],
      ["Jackie et Michel", "la Jackie et le Michel"],
      ["C'est le vélo de François", "C'est le vélo du François"],
      ["C'est l'ordinateur de Cindy", "C'est l'ordinateur de la Cindy"],
      ["Il faut le dire à Matthieu", "Il faut le dire au Matthieu"],
      ["Il faut le dire à Caroline", "Il faut le dire à la Caroline"],
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
