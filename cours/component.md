# Les composants dans React

A la fin des années 90, Internet était principalement construit autour de HTML, CSS et JavaScript. 
L'explosion des usages d'Internet mais aussi des supports d'accès (tablettes, téléphones, navigateurs) a requis le développement de nouvelles technologies.

Le CSS s'est renforcé avec Less, Sass, PostCSS, mais aussi des frameworks comme Bootstrap, normalize, ou Tailwind.
Le JavaScript a subit, pendant un temps, la concurrence d'autres langages comme Flash ou Java, avant sa mise-à-jour vers ES6 et le développement de jQuery.

Que s'est-il passé concernant le HTML ? A vrai pas grand chose. Si les standards ont ajouté des balises telles que `canevas`, ou `video` pour faciliter la prise en charge de tous les supports, écrire du HTML est resté répétitif.

C'est dans l'optique de factoriser le code que les **composants** ont émergés. Le JSX est particulièrement disruptif, puisqu'il propose d'écrire du HTML, du CSS et du JavaScript dans un même fichier. Si cela peut paraître étrange au début, les gains de visibilité dans le code sont particulièrement appréciables une fois que l'on acquiert un peu d'expérience.

Le JSX est un langage qui est transpilé en JavaScript. Son paradigme fondamental réside dans la création de nouvelles balises HTML.
Les fichiers JSX ont généralement l'extension de fichiers `.jsx`, mais l'extension `.js` fonctionne dans la plupart des configurations.

# Transpiler facilement avec create-react-app

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

# Porte d'entrée de votre application

Le fichier `src/index.js` représente la porte d'entrée de votre application. C'est par lui que le transpilateur commence son travail.
Nous devons donc le créer et expliquer que nous souhaitons installer notre application dans notre page HTML. Pour cela, le code est assez standard :

```jsx
// Importer React est nécessaire dès que le code contient du HTML
import React from 'react'
// react-dom est une librairie pour interagir avec le DOM de public/index.html
import ReactDOM from 'react-dom'

// L'explication est donnée dans la partie suivante
const App = () => {
  return (
    <h1>Hello, world!</h1>
  )
}

// Récupèrer la balise dont l'ID est root dans public/index.html
const root = document.getElementById('root')

// Construire notre application dans cette balise
ReactDOM.render(<App></App>, root)
```


# Ecrire son premier composant sous la forme d'une fonction

Dans le code précédent, nous avons créé notre premier composant. 
Dans un premier temps, nous avons défini l'abstraction de notre composant :

```jsx
const App = () => {
  return (
    <h1>Hello, world!</h1>
  )
}
```

Comme expliqué dans [le cours de rappel](./cours/rappel.md), cela est strictement équivalent à :

```jsx
const App = () => <h1>Hello, world!</h1>
```

A ce moment là, nous n'avons fait que stocker en mémoire ce composant, sans que rien ne se produise encore. 

Dans un deuxième temps, nous avons utilisé notre composant -- nous pourrions même dire "instancier" notre composant. 
Un composant est une extension d'une balise HTML ; aussi pour utiliser notre composant, nous ajoutons des chevrons : `<App></App>`, ou de manière équivalente `<App />`.

Remarquez que nous retrouvons les balises couramment utilisées en HTML comme `h1` ou `div`.

Nous pouvons également placer les attributs que nous souhaitons dans notre code.  Attention, la définition d'une classe CSS avec l'attribut `class` est un mot déjà utilisé en JavaScript. Il a donc été remplacé par le mot `className`. Par exemple, pour attribuer la class "my-class", nous utilisons `<h1 className="my-class">Hello, world!</h1>`.

# Un composant sous la forme d'une classe

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

