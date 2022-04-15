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

## COMMENT INSTALLER GROS

#### Dans ton projet avec `yarn` :
```sh
npm i lorrainjs
```
#### Dans ton projet avec `npm` :
```sh
yarn add lorrainjs
```
## COMMENT L'UTILISER GROS

### Importe à lô source de ton projet :

#### Soit au détail :

```javascript
const { initLog, initWarn } = require('lorrainjs');
```

```javascript
import { initLog, initWarn } from 'lorrainjs';
```
#### Soit en gros :

```javascript
const lorrainjs = require('lorrainjs');
```

```javascript
import lorrainjs from 'lorrainjs';
```

### Puis, initiôlise le loggueur lorrain :

```javascript
initAll();
```

Tu peux spécifier quelles options activer uniquement :

```javascript
initAll({gros: true});
```
Les logs lorrains sont maintenant actifs
La traduction s'applique aussi bien aux `string` qu'aux `array` ou `object`.

```javascript
console.log('Michel est parti');     // le Michel est parti gros
console.warn('Jacky est revenu');         // le Jacky est revenu gros
console.error('Francis mange une pomme');        // le Francis mange une mirabelle gros
console.log({ 
    michel: 'Michel est parti',
    jacky: 'Jacky est revenu'
});        // { michel: "le Michel est parti gros", jacky: "le Jacky est revenu gros" }
console.log([
    'Michel est parti',
    'Jacky est revenu'
]);        // ["le Michel est parti gros", "le Jacky est revenu gros"]
```

## LES OPTIONS DE CONFIGURATION
1. ```javascript 
    gros: true
    // met 'true' ou 'false' to activer ou désactiver la ponctuation de phrase "gros".
    ```
2.  ```javascript
    le: true
    // met 'true' ou 'false' to activer ou désactiver l'article d'itentification lorrain ("le" ou "la").
    ```
3.  ```javascript
    mirabelle: true
    // met 'true' ou 'false' pour convertir les fruits étrangers.
    ```

Exemple : 

```javascript
const config = { 
    gros: true,
    le: false,
    mirabelle: true,
}
```

## LES FONCTIONS DISPONIBLES GROS:
- `initAll(config);`

    Initialise tout le loggueur. Les fonctions nôtives `console.log`, `console.warn` et `console.error` seront trôduites automatiquement.

- `initLog(config);`

    Initialise uniquement lô fonction `console.log`.

- `initWarn(config);`

    Initialise uniquement ô fonction `console.warn`.

- `initError(config);`

    Initialise uniquement lô fonction `console.error`.

- `translate(config);`

    Permet que tu traduise un texte manuellement sans impliquer la console.

- `originalLog();`

    Donne un accès à lô fonction `console.log` d'origine (avant traduction) pour permettre de réaliser des logs non trôduits même après que tu aie exécuté `initLog()` ou `initAll()`.

- `originalWarn();`

    Donne un accès à lô fonction `console.warn` d'origine (avant traduction) pour permettre de réaliser des logs non trôduits même après que tu aie exécuté `initWarn()` ou `initAll()`.

- `originalError();`

    Donne un accès à lô fonction `console.error` d'origine (avant traduction) pour permettre de réaliser des logs non trôduits même après que tu aie exécuté `initError()` ou `initAll()`.


## QUELQUES EXAMPLES TU VOIS GROS:

```javascript
import lorrainjs from 'lorrainjs';
lorrainjs.initAll();
console.log('Michel est parti');     // le Michel est parti gros
console.warn('Jacky est revenu');         // le Jacky est revenu gros
console.error('Francis mange une pomme');        // le Francis mange une mirabelle gros
```


```javascript
import { initLog, originalLog } from 'lorrainjs';
const config = { 
    gros: true,
    mirabelle: true,
}   
initLog(config);
console.log('Francis mange une pomme');        // Francis mange une mirabelle gros
console.warn('Francis mange une pomme');        // Francis mange une pommme
originalLog('Francis mange une pomme');        // Francis mange une pommme
```


```javascript
import { initLog, initWarn } from 'lorrainjs';
const configLog = { 
    gros: true,
    le: false,
    mirabelle: true,
}   
const configWarn = { 
    gros: false,
    le: false,
    mirabelle: true,
}   
initLog(configLog);
initWarn(configWarn);
console.log('Francis mange une pomme');     // Francis mange une mirabelle gros
console.warn('Francis mange une pomme');         // Francis mange une mirabelle
console.warn([
    'Francis mange une pomme',
    'Jacky est revenu'
]);        // ["Francis mange une mirabelle", "Jacky est revenu"]
console.error('Francis mange une pomme');        // Francis mange une pomme
```
