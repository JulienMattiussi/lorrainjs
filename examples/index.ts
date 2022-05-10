import lorrainjs from "../src/index";

const toParseLog = [
  `Toto 2`,
  '{Toto 3 : "Salut"}  ',
  '  {Toto35 : "Salut"}',
  "  {Toto4 : 'Salut'}",
  "  {'Toto5' : 'Salut'}",
  '  {"Toto 6" : "Salut"} ',
  '  {"Toto 7" : "Salut" ',
  '  {"Toto 8" : "Salut} ',
  `  {'Toto9' : "Salut"}  `,
  `  ['Toto95', "Salut"]  `,
  '  {{g: 9} : "Salut} ',
  '  { test: "Bonjour", ignore: 456}',
  `  { test: 'Bonjour', "ignore": "456"}`,
  ` { test: 'Bonjour', "complex": {a: 2, b: "banane", c: 'hey'}}   `,
  `{
    a: "Salut Jacky, tu veux une noix de cajou ?",
    c: 2.09,
    d: "Le cheval de Sylvie.",
  }`,
  "124  ",
  "125",
];
toParseLog.map((item) => {
  console.log(item);
  const result = lorrainjs.parseTranslate(item);
  console.log(result);
  console.log(typeof result);
  console.log("------------------------------");
});
console.log(`Toto`);
lorrainjs.initLog();
lorrainjs.initError();
console.log("Toto");
console.log("Salut. Salut ! Salut. Salut");
console.log("C'est l'heure de changer la couche de Micheline");
console.log("Toto !");
console.log("Toto.");
console.log("Tito gros.");
console.log("Tuto dégros");
console.log(`poire`);
console.log(45);
console.log(`poire`, "baton", true, 1, [2, "chausson"]);
console.log(new Date(2021, 7, 3));
console.log([new Date(2021, 7, 3), "salut"]);
console.log(["Toto", "poire"]);
console.log({ fruit: "poire", nom: "Toto" });
console.log(`Patrick aimerais beaucoup manger des pâtes et des oranges`);
console.error(new Error("donnée non trouvée"));
