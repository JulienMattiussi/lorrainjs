# lorrainjs

#####################################

Le Loggueur Des Développeurs Lorrains

#####################################

- Auteurs:
  - [YavaDeus](https://github.com/JulienMattiussi)
  - [Aherbeth](https://github.com/Aherbeth)
- Dépendence: `JavaScript (ES06)`
- Description: `Fournit des outils pour rendre les messages console compréhensibles pour les développeurs web lorrains`
- License: `MIT`
- Publié sur [npmjs package](https://www.npmjs.com/package/lorrainjs)

## SCHPEUNE COMMENT QU'ON INSTALLE GROS

#### Dans ton projet avec `yarn` :

```sh
npm i lorrainjs
```

#### Dans ton projet avec `npm` :

```sh
yarn add lorrainjs
```

## COMMENT L'UTILISER GROS

### Importe à lô source de ton projet avant de mamailler n'importe comment :

#### Soit au détail dans l'cornet :

```javascript
const { initLog, initWarn } = require("lorrainjs");
```

```javascript
import { initLog, initWarn } from "lorrainjs";
```

#### Soit en gros (gros) :

```javascript
const lorrainjs = require("lorrainjs");
```

```javascript
import lorrainjs from "lorrainjs";
```

### Puis, initiôlise le loggueur lorrain :

```javascript
initAll();
```

Tu peux spécifier quelles options activer uniquement :

```javascript
initAll({ gros: true });
```

Les logs lorrains sont maintenant actifs.

La traduction s'applique aussi bien aux `string` qu'aux `array` ou `object`.

```javascript
console.log("Michel est parti"); // le Michel est parti gros
console.warn("Jacky est revenu"); // le Jacky est revenu gros
console.error("Francis mange une pomme"); // le Francis mange une mirabelle gros
console.log({
  michel: "Michel est parti",
  jacky: "Jacky est revenu",
}); // { michel: "le Michel est parti gros", jacky: "le Jacky est revenu gros" }
console.log(["Michel est parti", "Jacky est revenu"]); // ["le Michel est parti gros", "le Jacky est revenu gros"]
```

## LES OPTIONS DE CONFIGURATION

1. ```javascript
   gros: true;
   // met 'true' ou 'false' pour activer ou désactiver la ponctuation de phrase "gros".
   ```
2. ```javascript
   le: true;
   // met 'true' ou 'false' pour activer ou désactiver l'article d'itentification lorrain ("le" ou "la").
   ```
3. ```javascript
   mirabelle: true;
   // met 'true' ou 'false' pour convertir les fruits étrangers.
   ```
4. ```javascript
   o: true;
   // met 'true' ou 'false' pour convertir la voyelle "a" en "ô" lorrain.
   ```

Exemple :

```javascript
const options = {
  gros: true,
  le: false,
  o: true,
  mirabelle: true,
};
```

## LES FONCTIONS DISPONIBLES GROS:

- `initAll(options);`

  Initialise tout le loggueur. Les fonctions nôtives `console.log`, `console.warn` et `console.error` seront trôduites automatiquement.

- `initLog(options);`

  Initialise uniquement lô fonction `console.log`.

- `initWarn(options);`

  Initialise uniquement ô fonction `console.warn`.

- `initError(options);`

  Initialise uniquement lô fonction `console.error`.

- `translate(options);`

  Permet que tu traduise un texte manuellement sans impliquer la console.

- `originalLog();`

  Donne un accès à lô fonction `console.log` d'origine (avant traduction) pour permettre de réaliser des logs non trôduits même après que tu aie exécuté `initLog()` ou `initAll()`.

- `originalWarn();`

  Donne un accès à lô fonction `console.warn` d'origine (avant traduction) pour permettre de réaliser des logs non trôduits même après que tu aie exécuté `initWarn()` ou `initAll()`.

- `originalError();`

  Donne un accès à lô fonction `console.error` d'origine (avant traduction) pour permettre de réaliser des logs non trôduits même après que tu aie exécuté `initError()` ou `initAll()`.

## TESTE LORRAINJS EN LIGNE


La librairie peut être testée en ligne via cette ôdresse :

[https://julienmattiussi.github.io/traducteur-lorrain/](https://julienmattiussi.github.io/traducteur-lorrain/)

## QUELQUES EXEMPLES TU VOIS GROS, ENFIN SI T'ES PAS BEÛLOU :

```javascript
import lorrainjs from "lorrainjs";
lorrainjs.initAll();
console.log("Michel est parti"); // le Michel est parti gros
console.warn("Jacky est revenu"); // le Jacky est revenu gros
console.error("Francis mange une pomme"); // le Francis mange une mirabelle gros
```

```javascript
import { initLog, originalLog } from "lorrainjs";
const options = {
  gros: true,
  mirabelle: true,
};
initLog(options);
console.log("Francis mange une pomme"); // Francis mange une mirabelle gros
console.warn("Francis mange une pomme"); // Francis mange une pommme
originalLog("Francis mange une pomme"); // Francis mange une pommme
```

```javascript
import { initLog, initWarn } from "lorrainjs";
const optionsLog = {
  gros: true,
  le: false,
  mirabelle: true,
};
const optionsWarn = {
  gros: false,
  le: false,
  mirabelle: true,
};
initLog(optionsLog);
initWarn(optionsWarn);
console.log("Francis mange une pomme"); // Francis mange une mirabelle gros
console.warn("Francis mange une pomme"); // Francis mange une mirabelle
console.warn(["Francis mange une pomme", "Jacky est revenu"]); // ["Francis mange une mirabelle", "Jacky est revenu"]
console.error("Francis mange une pomme"); // Francis mange une pomme
```

## ISSUES

Et pis si tu trouves des trucs chounts, bha t'ouvres une issue, t'inquiète paupiette, t'auras pas la chouffe.
