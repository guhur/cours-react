# TP Routage avec React

Pour bien comprendre ce qui se trame dans le routage, nous ré-implémentons les composants vus en cours à l'aide de fonctions primitives fournies par la libraire `react-dom`.


## Ré-implémenter le composant `Link`

Notre version de `Link`, appelée `CustomLink` accepte un props `to` sous la forme d'une chaîne de caractères. Lorsqu'un utilisateur clique sur `Link`, il est redirigé vers la page indiquée par `to`.

**1. Comment fait-on une redirection avec `react-router` ?**

Mais comment avoir accès à cet objet que vous venez d'évoquer ? Dans le cours, il était injecté par `Route`. Cette fois-ci, nous allons utiliser la fonction [`useHistory`](https://reactrouter.com/web/api/Hooks/usehistory). 

**2. Après avoir lu la documentation correspondante, décrivez le fonctionnement de cette fonction.**

**3. En utilisant cette fonction, devez-vous implémenter le `CustomLink` composant sous la forme d'une fonction ou d'une classe ?**

**4. Faites l'implémentation de `CustomLink`, ajoutez les `propTypes`, testez la dans une codesandbox et copiez votre implémentation de `CustomLink` dans ce document.**

Pour procéder à l'implémentation de `CustomLink` sous l'autre forme (classe ou fonction, selon votre réponse à la question 3.), nous utiliserons la fonction [`withRouter`](https://reactrouter.com/web/api/withRouter). Il s'agit d'un HOC ; nous les verrons en détail dans un prochain cours.

**5. Reprenez les questions 2 à 4 avec `withRouter`**


## Ré-implémenter le composant Route

Notre composant `CustomRoute` accepte deux props: 

 - `path` est une chaîne de caractères ;
 - `component` est un composant à afficher lorsque la localisation correspond au `path`. Ce composant reçoit en props `history`, `location` et `match`.

**6. Dans la documentation de la `react-router`, trouvez trois hooks permettant d'obtenir les variables `history`, `location` et `match`.**

**7. Faites l'implémentation de `CustomRoute`, ajoutez les `propTypes`, testez la dans une codesandbox et copiez votre implémentation de `CustomRoute` dans ce document.**


## Tester le routage avec React

Pour tester le routage, nous cherchons une manière simple de contrôler la localisation de la page.
Puisque `BrowserRouter` utilise l'URL du navigateur, nous préférons utiliser [`MemoryRouter`](https://reactrouter.com/web/api/MemoryRouter), qui peut être contrôlé à partir de son props `initialEntries`. 

Nous séparons alors l'appel au `Router` du reste de l'application afin de simplifier la mise en test de cette dernière:


```jsx
// index.js
export default function App() {
  return (
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
      <Route path="/post/:name">
        <Post />
      </Route>
      </main>
  );
}
// Post Page
const Post = () => {
  let { name } = useParams();
  return <h1>{name.replaceAll("-", " ")}</h1>;
};


const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  rootElement
);
```

**8. Ce code utilise `useParams`, que nous n'avons encore jamais utilisé. A quoi sert-il ?**

**9. Créez un nouveau projet à partir de code.  Créez un test qui injecte `MemoryRouter` autour de `App`. Indiquez des URL à `MemoryRouter` et vérifiez que les posts affichent bien le contenu de l'URL.**

Aide : la [documentation](https://reactrouter.com/web/guides/testing) fournit quelques renseignements sur le testing d'une application avec un routeur. Vous pouvez reprendre également la [documentation de React conernant les tests](https://reactjs.org/docs/testing.html).



