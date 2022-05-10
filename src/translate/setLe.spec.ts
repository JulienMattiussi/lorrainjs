import { setLe } from "./setLe";

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
    //["Jean-Luc", "Le Jean-Luc"],
    [
      "C'est l'heure de changer la couche de Micheline",
      "C'est l'heure de changer la couche de la Micheline",
    ],
  ])('should return "%s" for "%s" le/la translation', (source, result) => {
    expect(setLe(source)).toBe(result);
  });
});
