import { setMirabelle } from "./setMirabelle";

describe("setMirabelle", () => {
  it.each([
    ["pomme", "mirabelle"],
    ["ballon", "ballon"],
    ["Une bonne cerise rouge", "Une bonne mirabelle rouge"],
  ])('should return "%s" for "%s" mirabelle translation', (source, result) => {
    expect(setMirabelle(source)).toBe(result);
  });
});
