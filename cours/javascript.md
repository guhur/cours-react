Le JavaScript a bien changé depuis quelques années. Ce cours récapitule les éléments fondamentaux de syntaxes en JavaScript depuis sa version ES6.

# Testez par vous-même !

Depuis votre navigateur, cliquez droit puis inspectez l'élément. Vous accédez alors à une console REPL en JavaScript.

# Initialiser une variable

## let
`let` déclare une variable à l'intérieur d'un scope.

```js
let x = 10;
console.log(x); // 10

{
  let x = 2;
  console.log(x); // 2
}
console.log(x); // 10
```

## const
`const` fonctionne pareillement mais pour les constantes. 

```js
const x = 10;
console.log(x); // 10

{
  const x = 2;
  console.log(x); // 2
}
console.log(x); // 10

const x = 2; // erreur
```

## Hissage inattendue des variables 

Une variable déclarée avec `let` et `const` est défini dans le reste du bloc dans lequel cette variable est déclarée.

Considérons par exemple le code :

```js
function testDePortee() {
    return x;
}
// console.log(testDePortee()); // ReferenceError
let x = "foo";
console.log(testDePortee()); // "foo"
```

Avant ES6, on utilisait le mot clé `var` pour la déclaration d'une variable. 
Ce mot clé a une comportement paradoxal : il "hisse" une variable déclarée en haut d'une fonction.

Par exemple :
```js
function testDePortee(position) {
    if(false) {
    	var x = "ce bloc ne devrait rien changer, non ?"
    }
    return x;
}
var x = "foo";
console.log(testDePortee()); // undefined
```

En fait, ce dernier bout de code est équivalent à :

```js
function testDePortee(position) {
    var x;
    if(false) {
    	x = "ce bloc ne devrait rien changer, non ?"
    }
    return x;
}
var x = "foo";
console.log(testDePortee()); // undefined
```


## Portée des variables

L'utilisation de `let` plutôt que de `var` est également à privilégier pour éviter de polluer l'environnement global par des variables ayant une portée trop large.

En effet, une variable définie à l'aide de `var` persiste au delà d'un bloc, contrairement à `let` :

```js
{
  var privee = 1;
}

console.log(privee); // 1

{
  let privee = 1;
}

console.log(privee); // ReferenceError
```


# Modèles de libellé (*template literals*)

L'introduction du *backtick* (ou accent grave) simplifie la gestion des chaînes de caractères :

```js
const a = 1, b = 5, c = 6;

// Avant ES6
console.log(a + " + " + b + " = " + c);

// Après ES6
console.log(`${a} + ${b} = ${c}`);
// Encore mieux : 
console.log(`${a} + ${b} = ${a + b}`);
```

Ces modèles de libellé autorisent les chaînes multi-lignes : 

```js
const menu = `<ul>
	<li>Accueil</li>
	<li>A propos</li>
</ul>`
console.log(modele);
```

# Fonctions et classes

## Paramètres par défaut

```js
function myFunction(x, y = 10) {
  // y is 10 if not passed or undefined
  return x + y;
}
myFunction(5); // will return 15
```


## Fonctions fléchées (*arrow functions*)
C'est une manière plus synthétique d'écrire des fonctions, sans le mot clé `function`.

Si la fonction se contente de retourner une valeur, on peut même omettre le
mot clé `keyword` et les accolades.

```js
// ES5
function mult_ES5(x, y) {
   return x * y;
}
var bar = mult2_ES5(x, y) {
   return x * y;
}

// ES6
const mult_ES6 = (x, y) => { return x * y };

// lorsque la fonction se contente de retourner une valeur, on omet les accolades et le mot clé return
const mult2_ES6 = (x, y) => x * y;


// lorsque la fonction ne prend qu'un seul paramètre, l'omission des parenthèses autour des paramètres est permise
const print = x => console.log(x);
```


## Classes

Une classe est un type de fonction, qui est initialisée avec `class` et dont les propriétés sont assignées par la méthode `
constructor()`.

```js
class Car {
  constructor(brand) {
    this.carname = brand;
  }
 }
mycar = new Car("Ford");

```



# La décomposition des variables

## Destructuring assignment

Le langage ES6 concise la manipulation des tableaux, que ce soit pour obtenir les éléments d'un tableau :

```js
const outils = ["dégau rabot", "scie circulaire", "scie à onglet", "meuleuse"]

// Avant ES6
const premier = outils[0], troisieme = outils[2];
console.log(premier, troisieme); // 1 3

// Après ES6
const [, second, , quatrieme] = outils;
console.log(second, quatrieme); // 2 4
```

ou pour échanger des valeurs :

```js
let connecte = true, deconnecte = false;

// Avant ES6
var tmp = connecte;
connecte = deconnecte;
deconnecte = tmp;

// Après ES6
[connecte, deconnecte] = [deconnecte, connecte]
```


C'est encore plus pratique avec les tableaux associatifs :


```js
// Avant ES6
function marges() {
  var gauche=1, droite=2, haut=3, bas=4;
  return { gauche: gauche, droite: droite, haut: haut, bas: bas };
}
var data = marges(),
    gauche = data.gauche,
    bas = data.bas;
console.log(gauche, bas); // 1 4


// Après ES6
function marges() {
  const gauche=1, droite=2, haut=3, bas=4;
  return { gauche, droite, haut, bas };
}
const { gauche, bas } = marges();
console.log(gauche, bas); // 1 4
```

On peut utiliser cette nouvelle syntaxe même dans les paramètres d'une fonction :

```js
const utilisateur = { prenom: "John", nom: "Doe"};

function nameToString({ prenom, nom }) {
  return `${nom}, ${prenom}`;
}

console.log(nameToString(utilisateur)); // John Doe
```

ou l'utiliser de manière récursive pour une structure de données à plusieurs étages :

```js
const themes = {
         couleur: { principale: "blue", secondaire: "gray" },
         traduction: { accueil: {en: "Home", fr: "Accueil"  },
};

// on initialise ici "texte"
const { traduction: { accueil: {fr: texte }}} = themes

// c'est équivalent à :
// const texte = themes.traduction.accueil.fr 
// mais c'est nettement plus concis pour extraire plusieurs variables

console.log(texte); // Accueil
```

## Spread operator

Cette syntaxe est très nouvelle (ES9 en vigueur depuis 2018), mais elle s'avère très utile.

Une fonction peut prendre un nombre inconnu de paramètres : `Math.max(2, 4, 5, 6)`. Mais comment faire lorsque ces paramètres sont stockés dans un tableau ?

```js
Math.max([2, 4, 5, 6]) // NaN
```

Auparavant, la solution consistait à utiliser la fonction `apply` pour convertir les éléments de la liste en une série de paramètres :

```js
Math.max.apply(Math, [2, 4, 5, 6]) // 6
```

Le nouvel opérateur de décomposition allège significativement la syntaxe :

```js
Math.max(...[2, 4, 5, 6]) // 6
```

On peut également l'utiliser dans une fonction pour lui permettre d'accepter un nombre inconnu de paramètres :

```js
max = (...arguments) => {
  let result = -Infinity;
  for(const value of arguments) {
    if(value > result) {
      result = value;
    }
  }
  return result;
}
```


# Les array
Les arrays ne sont pas nouveau à ES6.
## Array.find()

Retourne le premier élément d'une liste qui passe une fonction de test.

```js
const numbers = [4, 9, 16, 25, 29];

const threshold = (value, index, array) => {
  return value > 18;
}
const first = numbers.find(threshold);
console.log(first); // 25

// plus synthétiquement avec une fonction anonyme et sans les paramètres inutilisées :

console.log(
  numbers.find(
	  value => value > 18 
  )
);

```

## Array.findIndex()

Retourne l'index.

## Array.map()

map retourne une liste de la même taille.


```js
const performSomething = (item) => {
  //...
  return item
}

const items = ['a', 'b', 'c']
const newArray = items.map((item) => performSomething(item))
```
## Array.filter()

filter retourne une liste avec moins d'éléments : uniquement ceux qui passent la fonction de filtrage.

```js
// Avec une boucle

const items = [
  { name: 'a', content: { /* ... */ }},
  { name: 'b', content: { /* ... */ }},
  { name: 'c', content: { /* ... */ }}
]
for (const item of items) {
  if (item.name === 'b') {
    return item
  }
}

// Sans boucle
const b = items.find((item) => item.name === 'b')

const b = items.filter((item) => item.name === 'b').shift()

```

## Array.forEach()

Applique un traitement à chaque élément d'une liste.

```js
const items = ['a', 'b', 'c']
items.forEach((item) => {
  performSomething(item)
})
```

Ces fonctions font partis du paradigme déclaratif, contrairement à une approche impérative.


ES6 introduit une nouvelle syntaxe pour alléger les `forEach` :

```js
const titres = ["col1", "col2", "col3", "col4"];

const lineWidth = 40;
console.log("-".repeat(lineWidth));

const colWidth = Math.round(lineWidth / titres.length );
let line = "|"
for (const name of titres) {
    line += ` ${name}${" ".repeat(colWidth - 3 - name.length)} |`;
}
console.log(line);
```

# Pour compléter ce cours

Pour pouvoir suivre ce cours sur React, il est nécessaire de maîtriser convenablement les fondamentaux de JavaScript.

Si vous vous sentez encore mal à l'aise, voici quelques ressources à lire ou à écouter :

- [En français](https://web.developpez.com/tutoriels/fonctionnalite-javascript-es6/)
- [En anglais avec des vidéos](https://es6.io/)
- [En anglais et très complet](https://www.javascripttutorial.net/es6/)
- [A propos de l'opérateur this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
