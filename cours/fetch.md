# Interagir avec un backend dans une application React


## Les promesses en JavaScript
TODO setInterval 

Plus généralement, lorsqu'une instruction ne réalise pas à la même vitesse que l'exécution d'un programme (cas d'un compteur, ou d'une requête à un serveur), elle réalise une opération dite **asynchrone**.
Une promesse est un objet (`Promise`) qui contrôle une telle opération, en représentant la complétion ou l'échec de l'opération asynchrone mise en jeu.

Comme la promesse ne se réalise pas au moment où elle est exécutée, on y attache deux fonctions de rappel (*callback function*) :

- une fonction qui sera exécutée en cas de succès, 
- et une autre qui sera exécutée en cas d'échec.

```js
const examen = new Promise((successCallback, failureCallback) => {
  const note = Math.random() * 20;
  if (note > 10.) {
    successCallback(note);
  }
  else {
    failureCallback(note);
  }
})

const successCallback = (result) {
  console.log(`Bravo ! Vous avez été reçu·e avec ${result}`);
}


function failureCallback(note) {
  console.error(`Ce n'est pas avec ${note} que vous irez quelque part...`);
}
```

TODO Faire un appel à une promesse :
function faireQqc() {
  return new Promise((successCallback, failureCallback) => {
    console.log("C'est fait");
    // réussir une fois sur deux
    if (Math.random() > .5) {
      successCallback("Réussite");
    } else {
      failureCallback("Échec");
    }
  })
}

const promise = faireQqc();
promise.then(successCallback, failureCallback);


### Avantage d'une promesse

Cette dernière forme est ce qu'on appelle un appel de fonction asynchrone. Cette convention possède différents avantages dont le premier est le chaînage.
Garanties

À la différence des imbrications de callbacks, une promesse apporte certaines garanties :

- Les callbacks ne seront jamais appelés avant la fin du parcours de la boucle d'évènements JavaScript courante
- Les callbacks ajoutés grâce à then seront appelés, y compris après le succès ou l'échec de l'opération asynchrone
- Plusieurs callbacks peuvent être ajoutés en appelant then plusieurs fois, ils seront alors exécutés l'un après l'autre selon l'ordre dans lequel ils ont été insérés.

### Chaînage des promesses

TODO  exemple avec timeout
Un besoin fréquent est d'exécuter deux ou plus d'opérations asynchrones les unes à la suite des autres, avec chaque opération qui démarre lorsque la précédente a réussi et en utilisant le résultat de l'étape précédente. Ceci peut être réalisé en créant une chaîne de promesses.

La méthode then() renvoie une nouvelle promesse, différente de la première :

const promise = faireQqc();
const promise2 = promise.then(successCallback, failureCallback);

ou encore :

const promise2 = faireQqc().then(successCallback, failureCallback);

La deuxième promesse (promise2) indique l'état de complétion, pas uniquement pour faireQqc() mais aussi pour le callback qui lui a été passé (successCallback ou failureCallback) qui peut aussi être une fonction asynchrone qui renvoie une promesse. Lorsque c'est le cas, tous les callbacks ajoutés à promise2 forment une file derrière la promesse renvoyée par successCallback ou failureCallback.

Autrement dit, chaque promesse représente l'état de complétion d'une étape asynchrone au sein de cette succession d'étapes.

Auparavant, l'enchaînement de plusieurs opérations asynchrones déclenchait une pyramide dantesque de callbacks :

faireQqc(function(result) {
  faireAutreChose(result, function(newResult) {
    faireUnTroisiemeTruc(newResult, function(finalResult) {
      console.log('Résultat final :' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);

Grâce à des fonctions plus modernes et aux promesses, on attache les callbacks aux promesses qui sont renvoyées. On peut ainsi construire une chaîne de promesses :

faireQqc().then(function(result) {
  return faireAutreChose(result);
})
.then(function(newResult) {
  return faireUnTroisiemeTruc(newResult);
})
.then(function(finalResult) {
  console.log('Résultat final : ' + finalResult);
})
.catch(failureCallback);

Les arguments passés à then sont optionnels. La forme catch(failureCallback) est un alias plus court pour then(null, failureCallback). Ces chaînes de promesses sont parfois construites avec des fonctions fléchées :

faireQqc()
.then(result => faireAutreChose(result))
.then(newResult => faireUnTroisiemeTruc(newResult))
.then(finalResult => {
  console.log('Résultat final : ' + finalResult);
})
.catch(failureCallback);

Important : cela implique que les fonctions asynchrones renvoient toutes des promesses, sinon les callbacks ne pourront être chaînés et les erreurs ne seront pas interceptées (les fonctions fléchées ont une valeur de retour implicite si les accolades ne sont pas utilisées : () => x est synonyme de () => { return x; }).
Chaînage après un catch

Il est possible de chaîner de nouvelles actions après un rejet, c'est-à-dire un catch. C'est utile pour accomplir de nouvelles actions après qu'une action ait échoué dans la chaine. Par exemple :

new Promise((resolve, reject) => {
    console.log('Initial');

    resolve();
})
.then(() => {
    throw new Error('Something failed');
        
    console.log('Do this');
})
.catch(() => {
    console.error('Do that');
})
.then(() => {
    console.log('Do this whatever happened before');
});

Cela va produire la sortie suivante :

Initial
Do that
Do this whatever happened before

Notez que le texte "Do this" n'est pas affiché car l'erreur "Something failed" a produit un rejet.
Propagation des erreurs

Dans les exemples précédents, failureCallback était présent trois fois dans la pyramide de callbacks et une seule fois, à la fin, dans la chaîne des promesses :

faireQqc()
.then(result => faireAutreChose(result))
.then(newResult => faireUnTroisiemeTruc(newResult))
.then(finalResult => console.log('Résultat final : ' + finalResult))
.catch(failureCallback);

En fait, dès qu'une exception est levée, la chaîne de promesses utilisera le premier catch() ou onRejected disponible. Ce fonctionnement est assez proche de ce qu'on peut trouver pour du code synchrone :

try {
  const result = syncFaireQqc();
  const newResult = syncFaireQqcAutre(result);
  const finalResult = syncFaireUnTroisiemeTruc(newResult);
  console.log('Résultat final : ' + finalResult);
} catch(error) {
  failureCallback(error);
}

## Gérer des opérations asynchrones avec `async/await`

Cette symétrie entre le code asynchrone et le code synchrone atteint son paroxysme avec le couple d'opérateurs async/await d'ECMAScript 2017:

```js
async function toto() {
  try {
    const result = await faireQqc();
    const newResult = await faireQqcAutre(result);
    const finalResult = await faireUnTroisiemeTruc(newResult);
    console.log('Résultat final : ' + finalResult);
  } catch(error) {
    failureCallback(error);
  }
}
```

Ce fonctionnement est construit sur les promesses et faireQqc() est la même fonction que celle utilisée dans les exemples précédents.

Les promesses permettent de résoudre les problèmes de cascades infernales de callbacks notamment en interceptant les différentes erreurs (exceptions et erreurs de programmation). Ceci est essentiel pour obtenir une composition fonctionnelle des opérations asynchrones.
Évènements liés à la rupture d'une promesse

Lorsqu'une promesse est rompue/rejetée, un des deux évènements suivants est envoyé au niveau de la portée globale (window ou Worker si le script est utilisé dans un worker) :

rejectionhandled
    Cet évènement est envoyé lorsqu'une promesse est rompue et après que le rejet ai été traité par la fonction reject associée à la promesse.
unhandledrejection
    Cet évènement est envoyé lorsque la promesse est rompue et qu'aucune fonction n'a été définie pour gérer le rejet de la promesse.

Dans les deux cas, l'évènement (dont le type est PromiseRejectionEvent) aura deux propriétés :

promise
    La promesse qui a été rompue.
reason
    La raison pour laquelle la promesse a été rompue.

Gérer ces évènements permet d'avoir une ultime méthode pour gérer le rejet des promesses. Cela peut notamment s'avérer utile pour le débogage. Ces évènements sont déclenchés au niveau global et permettent ainsi d'intercepter les erreurs pour chaque contexte (fenêtre ou worker)

window.addEventListener("unhandledrejection", event => {
  // Examiner la ou les promesse(s) qui posent problème en debug
  // Nettoyer ce qui doit l'être quand ça se produit en réel

}, false);

## Envoyer des requêtes à un serveur

TODO appeler à random.me

## Placer ses requêtes dans un composant React au bon endroit grâce aux cycles de vie
```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}
```

## Utiliser le `hook` `useEffect` pour les appels aux backends

```jsx
function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    );
  }
}
``` 
