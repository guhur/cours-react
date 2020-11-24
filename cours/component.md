# Les composants dans React

A la fin des années 90, Internet était principalement construit autour de HTML, CSS et JavaScript. 
L'explosion des usages d'Internet mais aussi des supports d'accès (tablettes, téléphones, navigateurs) a requis le développement de nouvelles technologies.

Le CSS s'est renforcé avec Less, Sass, PostCSS, mais aussi des frameworks comme Bootstrap, normalize, ou Tailwind.
Le JavaScript a subi, pendant un temps, la concurrence d'autres langages comme Flash ou Java, avant le développement de jQuery puis sa mise-à-jour vers ES6.

Que s'est-il passé concernant le HTML ? A vrai dire, pas grand chose. Si les standards du HTML5 ont ajouté de nouvelles fonctionnalités avec des balises telles que `canevas`, ou `video`, l'évolution du HTML s'est orienté vers la prise en charge de nouveaux types d'écran, tandis que le développement d'une page HTML est resté fastidieux.

C'est dans cette optique que les [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) ont émergé, afin de rédiger des bouts de codes réutilisables. Le code HTML devenu factorisable, cette technologie devait faciliter le travail des développeurs. Cependant, les usages du web sont devenus si complexes, que la séparation entre le HTML, le JavaScript et le CSS, qui avait encore lieu au sein des web components, s'est avéré obsolète. 

La force du React est d'introduire un nouveau language, le JSX, qui répond à ce problème, puisqu'il propose d'écrire du HTML, du CSS et du JavaScript dans un même fichier. Si cela peut paraître étrange au début, les gains de visibilité dans le code deviennent vite appréciables après une phase d'adaptation.

Le JSX est un langage qui est transpilé en JavaScript. Il reprend l'idée de créer des composants réutilisables, mais propose de manipuler un DOM virtuel plutôt que de modifier directement dans le code source de la page web.

A noté, les fichiers JSX ont généralement l'extension de fichiers `.jsx`, mais l'extension `.js` fonctionne dans la plupart des configurations.

## Gérer facilement les dépendances avec create-react-app

La transpilation doit être faite à chaque modification du code. Pour faciliter l'installation du transpileur, je vous recommande d'installer l'utilitaire `create-react-app`. Vous devez avoir au préalable `npm`, le manager de packets avec une version supérieure à 5.2.

```bash
$ npx create-react-app mon-premier-composant
$ cd mon-premier-composant
$ rm -r src/*
```

Si le dossier nouvellement créé, `mon-premier-composant`, contient plusieurs fichiers et dossiers, seulement plusieurs d'entre eux nous intéressent :

- `public/index.html` contient la base du fichier HTML pour votre application,
- `src/` contient tous les fichiers sources qui doivent ëtre transpilés,
- `package.json` contient les dépendances de votre application. 
- `.git` contient les fichiers paramètres pour s'intégrer à `git`.
- `node_modules/` est un dossier particulièrement lourd ; il pèse en mémoire généralement plus d'1 Go ! Vous ne devez en aucun cas mettre ce dossier dans votre repo git, car ce dossier peut être reconstruit avec la commande `npm install`.

## Porte d'entrée de votre application

Le fichier `src/index.js` représente la porte d'entrée de votre application. C'est par lui que le transpilateur commence son travail.
Nous devons donc le créer et expliquer que nous souhaitons installer notre application dans notre page HTML. Pour cela, le code est assez standard :

```jsx
// Importer React est nécessaire dès que le code contient du HTML
import React from 'react'
// react-dom est une librairie pour interagir avec le DOM de public/index.html
import ReactDOM from 'react-dom'

// L'explication est donnée dans la partie suivante
const App = () => {
  // La fonction return permet de basculer en mode HTML
  return (
    <h1>Hello, world!</h1>
  )
}

// Récupèrer la balise dont l'ID est root dans public/index.html
const root = document.getElementById('root')

// Construire notre application dans cette balise
ReactDOM.render(<App></App>, root)
```


## Ecrire son premier composant sous la forme d'une fonction

Dans le code précédent, nous avons créé notre premier composant. 
Dans un premier temps, nous avons défini l'abstraction de notre composant :

```jsx
const App = () => {
  return (
    <h1>Hello, world!</h1>
  )
}
```

Comme expliqué dans [le cours de rappel](./cours/javascript.md), ceci est équivalent à :

```jsx
const App = () => <h1>Hello, world!</h1>
```

A ce moment là, nous n'avons fait que stocker en mémoire ce composant, sans que rien ne se produise encore. 

Dans un deuxième temps, nous avons utilisé notre composant -- nous pourrions même dire "instancié" notre composant. 
Un composant s'utilise de la même manière qu'une balise XML ; aussi pour utiliser notre composant, nous ajoutons des chevrons : `<App></App>`, ou de manière équivalente : `<App />`.

Remarquez que nous retrouvons les balises couramment utilisées en HTML comme `h1` ou `div`.
Nous pouvons également placer les attributs que nous souhaitons dans notre code.

Attention, la définition d'une classe CSS avec l'attribut `class` est un mot déjà utilisé en JavaScript. Il a donc été remplacé par le mot `className`. Par exemple, pour attribuer la class "my-class", nous utilisons `<h1 className="my-class">Hello, world!</h1>`.

## Un composant sous la forme d'une classe

React propose une syntaxe quasiment équivalente pour les composants définis sous la forme de classes ou de fonctions : 


```jsx
// Component est la classe mère dont nous héritons de plusieurs attributs
import React, { Component } from 'react'

class App extends Component {
  render () {
    return (
      <h1>Hello, world!</h1>
    )
  }
}
```

Le code HTML est situé l'attribut `render`. Comme son nom l'indique, cet attribut est responsable de l'affichage du composant.

Bien que cette syntaxe soit plus verbeuse, elle est privilégiée dans ce cours, car elle est plus explicite et facilite la compréhension de React.


## Basculer entre HTML et JavaScript

De prime abord tarabiscoté, le basculement entre HTML et JavaScript s'avère très pratique avec un peu d'expérience. Commençons directement à s'y familiariser avec un exemple plus délicat : l'usage d'une condition ternaire dans la partie HTML.

```jsx
import React, { Component } from 'react'

class App extends Component {
  render () {
    const bonneHumeur = true;
    return (
      <div>
      <h1>Hello, world!</h1>
      <p>Aujourd'hui je me sens de { bonneHumeur ? "bonne" : "mauvaise" } humeur.</p>
      </div>
    )
  }
}
```

Nous commençons par du JavaScript puis nous basculons en HTML dans le `return`. Enfin, les accolades injectent du JavaScript dans le HTML.

Pour rappel, les conditions ternaires ont la syntaxe : `condition ? si vrai : si faux`.


## La politique de l'enfant unique

Pour être valide, le code JSX doit être encapsulé au sein d'une unique balise HTML. Le code suivant est syntactiquement invalide : 

```jsx
import React, { Component } from 'react'

class App extends Component {
  render () {
    const bonneHumeur = true;
    return (
      <h1>Hello, world!</h1>
      <p>Aujourd'hui je me sens de { bonneHumeur ? "bonne" : "mauvaise" } humeur.</p>
    )
  }
}
```

Plutôt que de rajouter une vraie balise, laquelle risque de troubler le design de la page, la balise `Fragment` encapsule les autres balises sans modifier le code HTML produit :

```jsx
import React, { Component, Fragment } from 'react'

class App extends Component {
  render () {
    const bonneHumeur = true;
    return (<Fragment>
      <h1>Hello, world!</h1>
      <p>Aujourd'hui je me sens de { bonneHumeur ? "bonne" : "mauvaise" } humeur.</p>
    </Fragment>)
  }
}
```

Cette balise s'avère si utile qu'un alias nettement plus court a été créé :


```jsx
import React, { Component } from 'react'

class App extends Component {
  render () {
    const bonneHumeur = true;
    return (<>
      <h1>Hello, world!</h1>
      <p>Aujourd'hui je me sens de { bonneHumeur ? "bonne" : "mauvaise" } humeur.</p>
    </>)
  }
}
```

## Imports et exports nommés

```jsx
// composants/Navbar.jsx

const NavBar = () => (
  <ul>
    <li>Accueil</li>
    <li>Qui sommes-nous ?</li>
    <li>Contact</li>
  </ul>
);

export default NavBar;

export const NavBarAdmin = () => (
  <ul>
    <li>Accueil</li>
    <li>Qui sommes-nous ?</li>
    <li>Contact</li>
  </ul>
);


// App.jsx
import NavBar, { NavBarAdmin } from './composants.Navbar.jsx'
```


