# Le Context distribue une donnée à l'arborescence d'un composant sans passer manuellement les props à chaque niveau.

Dans une application, les données sont transmises d'un composant parent à l'enfant via les `props`.
En pratique, certains props sont définies à la racine de l'application (ex. les préférences régionales, le thème de l'interface utilisateur), tandis qu'ils sont utilisés à travers toute l'application, et en particulier dans composants enfants situés très loins de leur parent. La chaîne de transmission de parents à enfants devient alors longue et fastidieuse.
Le `Context` est une alternative aux `props` pour partager des données entre des composants sans avoir à explicitement passer une prop à chaque niveau de l'arborescence.


## Quand utiliser le Context ?

Certaines données pourraient être qualifiées comme "globales" lorsqu'elles sont utilisées pour toute une arborescence de composants React, tandis que d'autres données seraient dites "locales" si elles ne concernent un composant et son premier voire second niveau d'enfants.

Des exemples de données globales sont l'authentification d'un utilisateur, le thème, ou la préférence de langue. 
Utiliser des props pour transmettre des données devient vite pénible. Par exemple, dans le code ci-dessous nous faisons passer manuellement la prop theme afin de styler le composant Button :

```jsx
const App = () => (<Layout theme="dark" />);

const Layout = ({theme}) => (<div><Menu theme={props.theme} /></div>);

const Menu = ({theme}) => (<div><ThemedButton theme={props.theme} /></div>);

const ThemedButton = ({theme}) => {
  const style =  (
  	theme === "light"
	? {color: "black"; backgoundColor: "white"}
	: {color: "white"; backgoundColor: "black"}
  )
  return (<button style={style} />);
}
```

En utilisant le Contexte, nous pouvons éviter de passer les props à travers des éléments intermédiaires. Dans l'exemple précédent, nous n'aurions donc pas besoin de faire passer le props à travers le componsant `Menu`.

En revanche, Le Contexte doit être utilisé avec parcimonie car il va à l'encontre du principe de réutilisation des composants.


## Création du Context

Le Context est créé grâce à la fonction `createContext`. Cette fonction prend en paramètre la valeur par défaut du contexte.

```jsx
const ThemeContext = React.createContext('light');
```

Un `Provider` est alors utilisé pour distribuer les informations stockées dans le contexte :

```jsx
class App extends React.Component {
  render() {
    // Utilise un Provider pour passer le thème plus bas dans l'arbre. 
    // theme n'est plus partagé en tant que props au thème.
   return (
      <ThemeContext.Provider value="dark">
      	<Layout />
      </ThemeContext.Provider>
    );
  }
}

// Layout et Menu n'ont plus besoin de transmettre le theme :
const Layout = () => (<div><Menu /></div>);

const Menu = () => (<div><ThemedButton /></div>);
```

Le `Provider` accepte un paramètre `value` qui contient la valeur du thème. 

## Accéder au contexte pour des composants au format classe

Si un `contextType` est donné en tant qu'attribut static au composant, React cherche trouver le `Provider` correspondant le plus proche et injecte sa valeur dans `this.context`.
`this.context` est comme l'équivalent de `this.props` pour les contextes.


Dans cet exemple, `ThemedButton` reçoit la valeur `dark`.

```jsx
class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;  }
}

// ou de manière équivalente : 
class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.context} />;  }
}
ThemedButton.contextType = ThemeContext;
```

`ThemedButton` est abonné à `ThemeContext`. Cela signifie que si la valeur du contexte change, alors `ThemedButton` sera rechargé. Cela signifie également que `ThemedButton` ne peut s'abonner à plusieurs contextes à la fois. 


## Injecter manuellement le contexte en tant que props grâce au `Context.Consumer`

Si vous avez absolument besoin de plusieurs contextes, le `contextType` n'est pas adapté à votre cas d'usage.
A la place, vous utiliseriez le `Context.Consumer` en indiquant une fonction de rappel ("callback function"), prenant en paramètre la valeur du contexte (définie dans le `Context.Provider`) et retournant un composant, comme indiqué par la syntaxe :

```jsx
<MyContext.Consumer>
  {value => /* affiche quelque chose basé sur la valeur du contexte */}
</MyContext.Consumer>
```

Généralement, on utilise un `Consumer` en injectant la valeur dans les `props` du composant enfant : 

```
const ButtonWithThemeContext = () => (
  <ThemeContext.Consumer>
    {value => <ThemeButton theme={value} />}
  </ThemeContext.Consumer>
)

// ou si value est un tableau associatif :
const ButtonWithThemeContext = () => (
  <ThemeContext.Consumer>
    {value => <ThemeButton {...value} />}
  </ThemeContext.Consumer>
)

// ThemeButton reçoit désormais un `props`
const ThemedButton = ({theme}) => (<Button theme={this.props.theme} />);
``` 

## Injecter manuellement le contexte à travers un composant d'ordre supérieur

Le code `ButtonWithThemeContext` ci-dessus est rébarbatif. Imaginez faire la même chose avec tous les composants qui dépendent du thème !
En pratique, on utilise une fonction qui injecte le contexte sous la forme de props à notre place. 
Cette fonction doit accepter un composant (`ThemeButton` dans l'exemple précédent) et retourner un composant (`ButtonWithThemeContext`). Ce type de fonction est appelé un "composant d'ordre supérieur", ou "higher-order-component" (ou HOC pour les intimes).

Les HOC ne correspondent à aucune fonctionnalité en tant que telle de React ; il s'agit d'un patron de conception ("design pattern"), c'est-à-dire d'une convention faite par les développeurs sur une bonne pratique de programmation.

Par convention, l'HOC correspondante au contexte `theme` s'appelle `withTheme` :

```jsx
// La fonction accepte un composant...
function withTheme (OldComponent) {
  // ... et retourne un autre composant anonyme, abonné au contexte theme
  return class extends React.Component {
	render() {
		return (
			<ThemeContext.Consumer>
  				{ value => <OldComponent {...this.props} theme={value} /> }
			</ThemeContext.Consumer>
		);
	}

  }
}
```

La syntaxe du HOC est certes complexe, mais elle allège la syntaxe des composants qui ont besoin d'accéder au thème :

```jsx
const Button = ({theme}) => {
  const style =  (
  	theme === "light"
	? {color: "black"; backgoundColor: "white}
	: {color: white; backgoundColor: black}
  )
  return (<button style={style} />);
}
const ThemedButton = withTheme(Button);
```

## Mettre à jour le Contexte

Imaginez que le thème peut être modifié par un bouton. Comment diffuser le changement à toute l'application ? Les explications précédentes ont montré comment faire remonter une donnée d'un composant parent vers le plus bas des composants enfants, mais pas comment faire remonter l'information vers le haut.

Une astuce consiste à ajouter une fonction à travers le contexte qui permet aux consommateurs (les composants abonnés à ce contexte) de le mettre à jour :

```
export const ThemeContext = React.createContext({
  theme: "dark",  toggleTheme: () => {},});

function withTheme (OldComponent) {
  // ... 
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({theme: state.theme === "dark" ? "light" : "dark" }));
    };

    // L'état local est utilisé pour stocker le thème actuel afin de mettre à jour l'arborescence
    // lorsque le thème change
    this.state = {
      theme: "dark"
    };
  }

  render() {
    return (
      <ThemeContext.Provider value={theme: this.state, toggleTheme: this.toggleTheme}>
      	<Layout />
      </ThemeContext.Provider>
    );
  }
}
const Layout = () => (<div><Menu /></div>);
const Menu = () => (<div><ThemedButton /></div>);
const Button = ({theme, toggleTheme}) => {
  const style =  (
  	theme === "light"
	? {color: "black"; backgoundColor: "white}
	: {color: white; backgoundColor: black}
  )
  return (<button style={style}  onClick={toggleTheme}>Changer le thème</button>);
}
const ThemedButton = withTheme(Button);

ReactDOM.render(<App />, document.root);
```



## Plus de ressources

- les [composants d'ordre supérieur](https://reactjs.org/docs/higher-order-components.html)
