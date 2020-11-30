## Dynamiser un composant à l'aide des states

Le state se traduit par "état local de composant". 
Un composant a besoin d'un state lorsque des données qui impactent son affichage évoluent dans le temps. 
Pensez par exemple à une todo-liste : en cliquant sur une tâche à faire, on souhaiterait la voir barrée. 

Un composant ne peut pas changer ses props (seul le composant parent peut faire cela), mais il peut changer son state. Le state du composant va donc contenir des données qui sont propres à ce composant ou aux enfants de ce composant. 

De manière générale, une information ne doit être stockée que dans le state d'un seul composant. 
N'essayez pas de synchroniser les états de plusieurs composants.
 Préférez le faire remonter dans leur plus proche ancêtre commun, et faire redescendre l'info via les props aux composants concernés.

Voici quelques ressources utiles pour mieux comprendre selon quels critères choisir entre props et state :

- [Props vs State](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
- [ReactJS: Props vs. State](https://lucybain.com/blog/2016/react-state-vs-pros/)


## Initialiser le state


Comme pour les variables d'un component, on a pour habitude d'initialiser le state dans le constructeur du component. Pour un compteur, on va donc initialiser notre state avec 0:

```jsx
class Counter extends Component {
  constructor(props) {
      super(props)
      this.state = { value: 0 }
  }
 // ...
}
```

On va parfois initialiser le state en fonction du props. Il ne faut cependant pas en abuser et toujours se demander : est-ce qu'il me parait logique que ce soit le composant enfant ou le composant parent qui stocke la donnée ?

```jsx
class Model extends Component {
 constructor(props) {
   super(props)
   this.state = {isOpened: props.isOpened}
 }
 // ...
}
``` 

Si vous n'avez pas besoin d'un `constructor`, vous pouvez initialiser le state directement dans le composant :

```jsx
class App extends React.Component {
  state = {
    loggedIn: false,
    currentState: "not-panic",
    someDefaultThing: this.props.whatever
  }

  render() {
    // whatever you like
  }
}
``` 


## La fonction `setState`

Hormis lors de l'initialisation d'un state, vous ne devez jamais modifier directement la valeur d'un state. Il faut toujours passer par la fonction `setState()`. Cette fonction planifie la mise à jour de l'objet state du composant. Quand l'état local change, le composant répond en se rafraîchissant.


```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  incrementCount() {
    // Ce n'est pas la bonne manière d'appeler setState
    // Nous verrons dans un instant pourquoi
    this.setState({
      count: this.state.count + 1
    });
  }

  render() {
    return (
      <div>
        <p>Vous avez cliqué {this.state.count} fois</p>
        <button onClick={() => this.incrementCount()}>Cliquez</button>
      </div>
    );
  }
}

```
[codesandbox](https://codesandbox.io/s/demo-setstate-chvgb?file=/src/App.js)

En React, `this.props` et `this.state` représentent l'un comme l'autre les valeurs du rendu, c'est-à-dire ce qui est actuellement affiché.

Les appels à `setState` sont *asynchrones* :  après un appel à `setState`, `this.state` ne vaut pas **toujours** la nouvelle valeur. 

Voici un exemple de code qui ne se comporte pas comme attendu :

```jsx
incrementCount() {
  // Attention : ça ne va *pas* fonctionner comme prévu.
  this.setState({count: this.state.count + 1});
}

handleSomething() {
  // Disons que `this.state.count` commence à 0.
  this.incrementCount();
  this.incrementCount();
  // Lorsque React rafraîchira le composant, `this.state.count` sera à 1,
  // pourtant, on s'attendait à 2.
}
```

Lors du second appel à la fonction `incrementCount()`, la valeur `this.state.count` est lue. Or, React n'a pas mis à jour `this.state.count` tant que le composant n'est pas rafraîchi.
Aussi, cet appel a en réalité lu la même valeur que lors du premier appel : `this.setState({count: 0 + 1})`.

## Comment mettre à jour l'état avec des valeurs qui dépendent de l'état actuel ?

Passer une fonction de mise à jour vous permet d'accéder à la valeur à jour de l'état actuel au sein de cette fonction. Comme les appels setState sont groupés par lots, ça vous permet d'enchaîner les mises à jour et de vous assurer qu'elles sont effectuées les unes après les autres au lieu d'entrer en conflit :

```jsx
incrementCount() {
  this.setState((state) => {
    // Important : lisez `state` au lieu de `this.state` lors de la mise à jour.
    return {count: state.count + 1}
  });
}

handleSomething() {
  // Disons que `this.state.count` commence à 0.
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();

  // Si vous lisiez `this.state.count` maintenant, il serait toujours à 0.
  // Mais quand React rafraîchira le composant, il vaudra bien 3.
}
```

## Le binding des fonctions

Dans l'exemple du bouton, l'incrément du compteur se fait à travers une fonction fléchée : `onClick={() => this.incrementCount()}`. Deux autres syntaxes peuvent vous venir en esprit :

1. `onClick={this.incrementCount()}`
2. `onClick={this.incrementCount}`

Le premier exemple est complètement faux. La fonction `this.incrementCount` est appelée lors de la génération du code HTML. Cette fonction ne retournant rien, le code sera remplacé par `onClick={undefined}`.
Plus grave, le compteur sera incrémenté dès le chargement de la page, ce qui implique un appel à la fonction `setState` et donc le besoin d'éxecuter à nouveau la fonction `render` : cela créé une boucle infinie. 

Le deuxième exemple ne fonctionnera pas non plus mais pour une raison plus obscure. En JavaScript, les fonctions sont également des objets. Ainsi, elles définissent un opérateur `this` qui leur est propre : 

```js
incrementCount() {
 this.setState( state => { count: state.count += 1}) // fait référence au this interne
};

const _this = this; // besoin de tenir une référence

incrementCount() {
 _this.setState( state => { count: state.count += 1}) // fait référence au this externe
};

```

La méthode `bind`, définie au sein de chaque fonction, évite de gérer une nouvelle variable `_this`, pour distinguer le `this` de la classe du `this` de la fonction :

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
   this.incrementCount = this.incrementCount.bind(this); // on lie this interne et this externe
  }

  incrementCount() {
    this.setState( state => { count: state.count += 1}) // fait référence au this externe
  }

  // ...
}
```

En ES6, les fonctions fléchées ne redéfinissent pas this. L'appel à `onClick={() => this.incrementCount()}` utilise bien le `this` de la classe et c'est celui là qui est transmis à la fonction `incrementCount`. Le problème est résolu !

## Les states sous forme fonctionnelle

Bien que récemment introduit (depuis la version React 16.8), les `hooks` sont rapidement devenus populaires. Voyons comment ils s'utilisent à partir d'un exemple :


```jsx
import React, { useState } from 'react';

function Counter() {
  // Déclarer un nouvel état local
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => setCount(count + 1)}>
        Cliquez
      </button>
    </div>
  );
}
```
[Codesandbox](https://codesandbox.io/s/demo-hook-react-kb3wp)

Ce code est équivalent au code que nous venons de voir sous la forme de classe.

Que s'est-il passé ?

Tout d'abord `const [count, setCount] = useState(0)` a initialisé l'état local du compteur à la valeur `0`. Le hook `useState` retourne deux variables : `count`, notre état local, initialisé à `0`, et la fonction `setCount`, laquelle remplace la fonction `this.setState`.

Lors du premier clic sur le bouton, `count` vaut 0 et prend la valeur `count + 1`, c'est-à-dire `1`.

Nous devons toujours veiller au problème précédemment rencontré : 

```jsx
import React, { useState } from 'react';

function Counter() {
  // Déclarer un nouvel état local
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Vous avez cliqué {count} fois</p>
      <button onClick={() => {setCount(count + 1); setCount(count + 1)}}>
        Cliquez
      </button>
    </div>
  );
}
```

Ici, nous changeons le compteur à 0 + 1 puis à 0 + 1 donc en cliquant une fois sur le compteur, il ne passe pas à 2. Cela est toutefois plus clair qu'avec les classes.

## Utiliser plusieurs états locaux avec les hooks

Un avantage des hooks est de définir un état local par variable : 

```js
import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [isLogged, setLogin] = useState(false);
  const [count, setCount] = useState(0);

  function logIn() {
    setLogin(true);
  }

  if (isLogged) {
    return (
      <div>
        <p>Vous avez cliqué {count} fois</p>
        <button
          onClick={() => {
            setCount(count + 1);
            setCount(count + 1);
          }}
        >
          Cliquez ici
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Vous n'êtes pas connecté·e</h1>
        <p>Cette page n'est visible que pour les utilisateurs connectés</p>
        <button onClick={() => logIn()}>Se connecter</button>
      </div>
    );
  }
}
```


[![Edit demo-multi-states](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/demo-multi-states-ll1s0?fontsize=14&hidenavigation=1&theme=dark)
