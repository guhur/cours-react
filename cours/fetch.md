# Interagir avec un backend dans une application React

## Les promesses en JavaScript
Lors du TP 4, vous avez utilisé la fonction `setInterval` pour exécuter une fonction toutes les secondes. Lorsque le moteur JavaScript  interprète le code associé, il note dans son "event loop" qu'il exécutera ce code plus tard.

Le code peut ainsi tourner à plusieurs vitesses : d'un côté l'exécution normale, de l'autre des opérations dites **asynchrones**.
C'est en particulier le cas lors d'une communication avec un autre serveur : puisque l'autre serveur risque de prendre du temps à répondre, on lance la requête en tant qu'opération asynchrone, l'exécution continue, l'application ne semble pas s'arrêter ; lorsque le serveur répond, la réponse est traitée et l'affichage de l'application est mise à jour.

Une promesse est un objet (`Promise`) qui contrôle une telle opération, en représentant la complétion ou l'échec de l'opération asynchrone mise en jeu.
Parce que la promesse ne se réalise pas au moment où elle est exécutée, deux fonctions de rappel (*callback function*) sont attachées à cette promesse :

- une fonction qui sera exécutée en cas de succès, 
- et une autre qui sera exécutée en cas d'échec.

```js
const examen = new Promise((success, failure) => {
  const note = Math.random() * 20;
  if (note > 10.) {
    successCallback(note);
  }
  else {
    failureCallback(note);
  }
})

const examenReussi = (result) {
  console.log(`Bravo ! Vous avez été reçu·e avec ${result}`);
}


function examenRecale(note) {
  console.error(`Ce n'est pas avec ${note} que vous passerez l'examen !`);
}
```

Le mot clé `new` initialise la promesse, tandis que `then` traite la réponse obtenue par la promesse : 

```jsx
examen.then(examenReussi, examenRecale);
```

## Envoyer des requêtes à un serveur

Voyons tout de suite comment appliquer des promesses à des requêtes HTTP. 
Lors du TP 3, un fichier d'utilisateur a été téléchargé depuis le site `randomuser.me`. Pourquoi pas charger des utilisateurs selon les filtres sélectionnés par l'utilisateur ?

L'envoi d'une requête HTTP s'opère avec la fonction  `fetch`. Cette fonction prend en paramètre l'adresse URL et éventuellement un object contenant des options sur la requête, telles que la méthode POST ou l'authentification. Elle retourne une promesse.

```js
const nationalite = "fr";

fetch(`https://randomuser.me/api/?nat=${nationalite}`)
.then(
  reponse => console.log("La requête a fonctionné"), 
  error => console.log("La requête a échoué")
)
```

On peut simplifier cette syntaxe en introduisant la méthode `catch` qui n'est exécutée que lorsque la promesse a échoué.

```js
const nationalite = "fr";

fetch(`https://randomuser.me/api/?nat=${nationalite}`)
.then(reponse => console.log("La requête a fonctionné"))
.catch(error => console.log("La requête a échoué"))
```



Si la requête est réussie, la promesse se réalise dès que le moteur JavaScript commence à recevoir une donnée HTTP. Il faut encore attendre d'obtenir toute la requête avant de décoder le contenu en JSON. On utilise pour cela la méthode `reponse.json`. 
Obtenir l'ensemble de la requête risque d'être long. Naturellement, `reponse.json` retourne une seconde promesse. On doit alors **chaîner des promesses**.


## Chaînage des promesses

La méthode `then()` renvoie une nouvelle promesse, différente de la première :

``` 
const promise1 = fetch(`https://randomuser.me/api/?nat=${nationalite}`)
.then(
  reponse => reponse.json(),
  error => console.log("La requête a échoué")
)
const promise 2 = promise1.then(
   data => console.log(data),
   error => console.log("Les données n'ont pas pu être décodées")
)
```

La deuxième promesse `promise2` ne peut pas réaliser sans que la première promesse soit résolue.  Si elle réussie, cela indique que `promise1` a forcément réussie.
A l'inverse, si une erreur se produit lors de la promesse 1, la promesse 2 sera forcément un échec. Si on ne soucie pas de différencier les messages d'erreurs (c'est généralement le cas), on peut alors simplifier le code précédent avec `catch` :

``` 
const promise1 = fetch(`https://randomuser.me/api/?nat=${nationalite}`)
.then(reponse => reponse.json())
)
.then(data => console.log(data))
.catch(error => console.log("La requête a échoué"))
```


## Gérer des opérations asynchrones avec `async/await`

La version ES2017 a introduit le couple d'opérateurs `async`/`await`, couramment utilisé dans d'autres langages (tels que Python).
Une fonction qui attend une autre fonction grâce à `await` est nécessairement asynchrone. La fonction est alors préfixée avec `async` et l'appel à une telle fonction nécessite d'utiliser `await`.

La syntaxe suivante est équivalente au bloc précédent. Elle paraît plus familière, mais sa familiarité risque justement de vous jouer des tours en oubliant de différencier les parties synchrones des parties asynchrones dans votre code.


```js
async function toto() {
  try {
	const reponse = await fetch(`https://randomuser.me/api/?nat=${nationalite}`)
	const data = await reponse.json()
  } catch(error) {
	console.log("La requête a échoué"))
  }
}
```


## Placer ses requêtes dans un composant React au bon endroit grâce aux cycles de vie
 
A quel endroit faut-il lancer des requêtes dans un composant React ? 
Si la requête est dans `render`, elle sera exécutée à chaque nouvelle affichage. Puisqu'il y a une nouvelle affichage à chaque changement d'un état local dans le composant (ou l'un de ses parents), cela risque de consommer beaucoup de bande passante.

Le constructeur du composant semble, de prime abord, être plus adapté. Cependant, la résolution des promesses va très souvent faire appel à `setState` et appeler `setState` avant que `render` n'ait été appelée risque de poser des problèmes à React.

Heureusement, il existe d'autres méthodes dans un composant React : celles méthodes forment le cycle de vie d'un composant.

Lorsqu'un composant est créé, les méthodes suivantes sont appelés (dans l'ordre) : 

- `constructor()` ;
- `static getDerivedStateFromProps()` est une fonction [rarement utilisé](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state) pour retourner un nouveau `state` à partir des `props` ;
- `render()` ;
- `componentDidMount()` : précisément LA méthode à utiliser pour lancer des requêtes HTTP.

Continuous l'analyse du cycle de vie d'un composant React. Lorsqu'un `props` ou un `state` est modifié, l'affichage du composant se met à jour, c'est-à-dire que `render` est ré-exécuté. En réalité, toute une série de méthodes sont appelées (dans l'ordre) :

 - `static getDerivedStateFromProps()` ;
 - `shouldComponentUpdate()` : permet de bloquer l'appel à `render` (coûteux en temps de calcul) si on se rend compte que la modification du `state` ou `props` n'affecte pas réellement l'affichage ;
 - `render()`
 - `getSnapshotBeforeUpdate()` : bien que située après `render`, cette méthode est appelée après la modification réelle du DOM et permet de stocker des informations avant de le modifier (telles que la position du curseur ou de la barre de défilement) ;
 - `componentDidUpdate()` : typiquement pour corriger la position du curseur.


Enfin, vous pourrez rencontrer trois autres méthodes :

- `componentWillUnmount()` est appelé juste avant la destruction d'un composant, afin de fermer des ressources maintenues ouverte ;
- `static getDerivedStateFromError()` modifie l'état local lorsqu'une erreur se produit ; cela sert, par exemple, à stocker un message d'erreur ;
- `componentDidCatch()` est appelé quand une erreur se produit.

Comme indiqué, la méthode `componentDidMount` est à privilégier pour faire des appels à un serveur :

```

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      users: []
    };
  }

  componentDidMount() {
    const { nat, numUsers } = this.props;
    fetch(`https://randomuser.me/api/?nat=${nat}&results=${numUsers}`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          users: result.results
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  render() {
    const { error, isLoaded, users } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <h1>React network</h1>
          <h2>Le réseau social des pro de React!</h2>
          <main className="main-area">
            <div className="cards">
              {users.map((user, index) => {
                return <User {...user} key={index} />;
              })}
            </div>
          </main>
        </div>
      );
    }
  }
}
```

[![Le code en action](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-fetch-example-7dfuq)

## Utiliser le `hook` `useEffect` pour les appels aux backends

Quel est l'équivalent de `componentDidMount` pour les composants définis sous la forme ? `useEffect` !
A vrai dire, le hook `useEffect` est plutôt l'équivalent de `componentDidMount`, `componentWillUnmount` et `componentDidUpdate`. 
 `useEffect` reçoit en paramètre une fonction de rappel, laquelle est appelée après chaque modification du DOM par React.

```jsx
import React, { useState, useEffect } from 'react';

function BoutonCompteur() {
  const [count, setCount] = useState(0);

  useEffect(() => {    document.title = `Vous avez cliqué ${count} fois`;  });
  return (
    <div>
      <p>Vous avez cliqué {count} fois.</p>
      <button onClick={() => setCount(count + 1)}>
        Cliquez ici
      </button>
    </div>
  );
}
```

Placer la requête HTTP dans cette fonction de rappel reviendrait à faire beaucoup d'appels alors même qu'un seul suffit. Heureusement, `useEffect` accepte un second paramètre, indiquant une liste de variables à laquelle il s'abonne. La fonction de rappel de `useEffect` ne sera pas appelée tant que l'une de ces variables ne change pas.
En donnant une liste vide à `useEffect`, la fonction de rappel ne sera exécutée qu'une seule fois : c'est exactement ce que nous souhaitions !

```jsx
function App({nat, numUsers}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://randomuser.me/api/?nat=${nat}&results=${numUsers}`)
      .then(res => res.json())
      .then(result => {
          setIsLoaded(true);
          setUsers(result.results);
      })
      .catch((error) => {
          setIsLoaded(true);
          setError(error);
      });
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
        <div className="App">
          <h1>React network</h1>
          <h2>Le réseau social des pro de React!</h2>
          <main className="main-area">
            <div className="cards">
              {users.map((user, index) => {
                return <User {...user} key={index} />;
              })}
            </div>
          </main>
        </div>
    );
  }
}
``` 

## Ressources complémentaires 

- Les [promesses](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) peuvent aussi s'utiliser en groupe (composition) et ont une API poussée pour gérer les erreurs ;
- [`useEffect`](https://reactjs.org/docs/hooks-effect.html) contient d'autres fonctionnalités importantes.

