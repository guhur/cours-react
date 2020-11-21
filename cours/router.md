# Le router en React

Par défaut, les applications React ne contiennent qu'une seule page HTML : le `public/index.html`. Comment faire si vous programmez un blog avec React contenant une multitude de posts différents ? Vous devez le chargement de chaque post depuis React.

C'est précisément le rôle de la librairie `[react-router](https://reactrouter.com/)`.
Concrètement, cette librairie permet à l'utilisateur de naviguer entre les différentes parties d'une application en entrant une URL ou en cliquant sur un élément.

Pour l'installer, vous devrez exécuter la commande suivante dans votre terminal : `yarn add react-router-dom`


## Un premier exemple de routage

Démarrons par le [squelette d'une application](https://codesandbox.io/s/react-router-6end9?file=/src/App.js). Cette application contient trois pages : Home, About et Contact. Ces trois pages sont toutes visibles au chargement de notre application. 

```jsx
import React from "react";
import "./styles.css";

export default function App() {
  return (
    <main>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      <Home />
      <About />
      <Contact />
    </main>
  );
}
// Home Page
const Home = () => (
  <>
    <h1>Home</h1>
    <FakeText />
  </>
);
// About Page
const About = () => (
  <>
    <h1>About</h1>
    <FakeText />
  </>
);
// Contact Page
const Contact = () => (
  <>
    <h1>Contact</h1>
    <FakeText />
  </>
);

const FakeText = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
);
```


## Gérer les URL de la page avec  `BrowserRouter` 

Le composant `BrowserRouter` reçoit toutes les pages de notre application. Il est généralement situé au point le plus haut de notre application. Ce composant se charge de lire l'adresse URL de la page, mais aussi de communiquer ces informations à d'autres composants.

```jsx
import { BrowserRouter } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <main>
        // ...
      </main>
    </BrowserRouter>
  );
  // ...
}
```

## Création d'une `Route`

Les trois pages restent visibles, car React ne sait pas encore quelle page est associée avec quelle adresse URL. C'est le rôle du composant `Route`.

```jsx
import { BrowserRouter } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <main>
        <nav>
        // ...
        </nav>
        <Route path="/" component={Home} />
        <Route path="/contact" componet={Contact} />
        <Route path="/about" component={About} />
      </main>
    </BrowserRouter>
  );
  // ...
}
```
        
La ligne `<Route path="/" component={Home} />` signifie que si l'URL contient `/`, alors nous affichons le composant `Home`. 

Super ! Seulement le composant `Home` s'affiche désormais !

Cependant, en cliquant sur le lien de `Contact`, nous voyons deux composants s'afficher : `Home` et `Contact`. En effet, l'adresse URL de `Contact` est `/contact`, contenant `/`.
Le Props `exact` résout cette ambiguité en vérifiant que le `to` correspond exactement à l'adresse URL : `<Route exact={true} path="/" component={Home} />`.


## Ajouter des liens

Lorsque vous cliquez sur un lien, vous ressentez un temps de latence. Puisqu'on a utilisé la balise `a`, un lien vous force à recharger toute l'application.
C'est particulièrement embêtant si vous avez stocké des informations dans un state -- par exemple un panier de courses : les states sont réinitialisés à leur valeur par défaut.

C'est pourquoi, le composant `Link` simule un lien hypertexte `a` en prévenant `BrowserRouter` que la page actuelle a changé, ce qui, au passage, met à jour l'adresse URL.


```jsx
export default function App() {
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li>
	      <Link to="/">Home</Link>
	    </li>
	    <li>
	      <Link to="/about">About</Link>
	    </li>
	    <li>
	      <Link to="/contact">Contact</Link>
	    </li>
	  </ul>
	</nav>
	// ...
      </main>
    </Router>
  )
}
```

## Passage des paramètres entre les routes

Souvent, les adresses URL contiennent des paramètres, tels que l'identifiant d'un post de blog. Comment transmettre ces paramètres aux composants ? En précisant le format de ce paramètre dans le composant `Route`.

Par exemple, en utilisant `<Route path="/pages/:name" component={Post} />`, l'adresse URL `/pages/mon-premier-post` transmet un props `name="mon-premier-post"` au composant `Post`.
Pour construire des chemins plus complexes, je vous renvoie à la documentation de [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp).

```jsx
export default function App() {
  return (
    <BrowserRouter>
      <main>
        <nav>
          <ul>
            <li>
              <Link to="/pages/mon-premier-article">Mon premier article</Link>
            </li>
            <li>
              <Link to="/pages/mon-second-article">Mon second article</Link>
            </li>
          </ul>
        </nav>
      </main>
      // ...
      <Route path="/post/:name" component={Post} />
    </BrowserRouter>
  );
}
// Post Page
const Post = (props) => {
  console.log(props);
  const {
    match: {
      params: { name }
    }
  } = props;
  console.log(name);
  return (
    <>
      <h1>{name.replaceAll("-", " ")}</h1>
      <FakeText />
    </>
  );
};
```
[codesandbox](https://codesandbox.io/s/react-router-params-with-props-edrz0?file=/src/App.js)

A l'inverse, un lien vers un chemin paramétré peut être complexe à construire. La fonction `generatePath` construit pour vous les chemins :

```jsx
// (posts|comments) signifie que deux entités sont possibles : posts ou comments.
generatePath("/user/:id/:entity(posts|comments)", {
  id: 1,
  entity: "posts"
});
// users/1/posts
``` 



## Comment peut-on faire une redirection ? 

A l'issue de la page de connexion `/login`, nous souhaitons que l'utilisateur soit redirigé sur son espace personnel situé à `/my-account`.
Or, nous ne savons changer de page qu'à travers le composant `Link`. On ne va tout-de-même pas demander à l'utilisateur de cliquer sur un bouton pour le rediriger !

La console de l'exemple précédent a affiché le contenu du props injecté par `Route` dans `Post`. Le props contient trois objets :

 - `match`, que nous avons utilisé pour récupérer le paramètre `name` extrait de l'adresse URL ;
 - `location`, qui contient l'adresse de la page actuelle -- laissons le de côté pour le moment ;
 - `history`, une structure qui contient l'historique des pages visitées.

Faire une redirection consiste juste à mettre à jour `history` avec la page de redirection :

```jsx
const Temp = ({ history }) => {
  setInterval(() => history.push("/"), 3000);
  return (
    <>
      <h1>Redirection</h1>
      Dans 3 secondes, redirection sur la page d'accueil
    </>
  );
};
```


## Comment faire une page par défaut ?

La sélection d'une page s'opère par la correspondance entre l'URL et une banque d'URL pré-définie. Comment gérer alors une adresse URL encore inconnue ? C'est nécessaire, si nous souhaitons personnaliser notre [page d'erreur 404](https://fab404.com/).

C'est là qu'intervient le composant `Switch` ; lequel reçoit une liste de composants `Route` en entrée. Il cherche la correspondance entre la localisation actuelle et chacune des routes fournies ; il s'arrête à la première correspondance trouvée ou, en l'absence de correspondance, il prend la dernière route donnée.

```jsx
// ...
<Switch>
  <Route exact={true} path="/">
    <Home />
  </Route>
  <Route path="/contact/">
    <Contact />
  </Route>
  <Route path="/about">
    <About />
  </Route>
  <Route path="/pages/:name" component={Post} />
  <Route path="/tmp" component={Temp} />
  <Route component={Lost} />
</Switch>
// ...
```


## Pour compléter le cours

La librairie `React Router` contient d'autres composants et props. Je vous conseille fortement de lire [l'ensemble de la documentation](https://reactrouter.com/web/api/), ce n'est pas bien long.

