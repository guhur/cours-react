# Paramétrer un composant

Dans le TP précédent, nous avons créé un composant. Celui-ci contenant une liste, c'est-à-dire une balise `ul` et des balises `li` en tant qu'enfant. Le XML (et donc le HTML) est en effet conçu sur la notion d'arborescence : comment la structure d'un arbre, une première balise (`<html>`) sert de "racine", puis est ramifiée par ses balises enfants jusqu'aux balises les plus profondes, semblables à des "feuilles". 

React reprend naturellement cette notion de composants parents et enfants.
Une classe `Component` va engendrer ses `children` lors du passage à la méthode `render()`: 

```jsx
class ListeNoel(React.Component) {

  render () {
	return (
 <form>
  <input type="checkbox" name="cadeau1" value="PS5">
  <label for="cadeau1">Une PS5</label><br />
  <input type="checkbox" name="cadeau2" value="React" />
  <label for="cadeau2">Un livre sur React</label><br />
  <input type="checkbox" name="cadeau3" value="GPU" checked />
  <label for="cadeau3">Un GPU de dernière génération</label><br /><br/>
  <input type="submit" value="Submit" />
</form>
);
  }

}
```

La fonction React créée ici un unique enfant `<form>` au composant `ListNoel`. Mais `<form>` est également un composant React, lequel reçoit plusieurs enfants `<input>` et `<label>`.

## Comment transmettre des données du parent vers l'enfant ?

Le composant parent rassemble les données de l'application puis les distribue à ses enfants à l'aide des `Props`. Littéralement, le mot `Props` signifie `accessoires`. La notion de `Props` généralise le principe des attributs HTML (comme `type="checkbox"`). 

Deux règles sont importantes :

- Une prop est toujours passée par un composant parent à ses composants enfants 

- Un composant enfant ne peut pas modifier la valeur d'une prop qu'il reçoit.

Pour accéder aux props transmis par son parent, l'enfant utilise la variable `this.props`:

Plusieurs points à noter concernant la démo sur [Codesandbox](https://codesandbox.io/s/cool-jepsen-pnupc) :

- intégration entre Codesandbox vers GitHub et Netlify ;
- création d'un composant sous la forme d'une classe et d'une fonction ;
- `Array.slice` ;
- condition ternaire ;
- déconstruire les Props directement dans les paramètres d'une focntion

## La props "key"

Nous avons vu dans la partie précédente que lorsqu’on manipule des tableaux dans une grappe React, il est impératif d’équiper chaque élément du tableau d’une prop spéciale  key . Cela permettra à React de gérer au mieux l’évolution du tableau d’un  render()  à l’autre.

[Demo Codesandbox](https://codesandbox.io/s/affectionate-wildflower-8pl4o?file=/src/index.js)


L’absence de cette prop entraîne un avertissement en mode développement. Par ailleurs, elle n'est pas consultable par le composant enfant qui la reçoit : elle ne figure pas dans sa liste de props.

## La props "children"

Cette prop  n’est pas fournie à l'aide d'un attribut, mais en imbriquant des composants à l'intérieur du composant concerné.
Le composant enfant reçoit un tableau avec les composants children. 

```jsx
return (

  <MesCadeaux>

    <PS5 />
    <GPU />

  </MesCadeaux>
)
```

La prop  `this.children` du composant  `<MesCadeaux />`  est un tableau contenant  `<PS5 />`  et  `<StatusBar />`.


## Définir les valeurs par défaut d'un composant avec `defaultProps`

A ne pas faire :

```js
function MesCadeaux({ l10n = true, required = false, value }) {

  // …

}
``` 

A la place, on aura uniquement recours à la propriété statique `defaultProps` :

```jsx
function MesCadeaux({ l10n, required, value }) {

  // …

}


MesCadeaux.defaultProps = {
  l10n: true,
  required: false,
}
```

Si on définit le composant sous la forme d'une classe :

```jsx
class MesCadeaux extends Component {

  // …

}


MesCadeaux.defaultProps = {
  l10n: true,
  required: false,
}
```


## PropTypes pour valider le type des props

Une application grandissante devient vite un mille-feuille où il est difficile de s'y repérer. Préciser le type de props attendu par un composant permet à votre IDE de vous prévenir d'un bug grâce à la validation de types, comme c'est le cas avec TypeScript. 

Le package PropTypes exporte un ensemble de validateurs qui peuvent être utilisés pour s’assurer que la donnée que vous recevez est valide. L'exemple suivant provoque une erreur si vous appelez le composant avec une valeur qui n'est pas une chaîne de caractères.

```jsx
import PropTypes from 'prop-types';

class Accueil extends React.Component {
  render() {
    return (
      <h1>Bonjour, {this.props.name}</h1>
    );
  }
}

Accueil.propTypes = {  name: PropTypes.string};
```

La librairie propose un grand nombre de [validateurs](https://github.com/facebook/prop-types). Voici les plus couramment utilisés : 


```jsx 
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // elles sont toutes optionnelles.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Tout ce qui peut apparaître dans le rendu : des nombres, des chaînes de
  //  caractères, des éléments ou des tableaux (ou fragments) contenant ces types.
  optionalNode: PropTypes.node,

  // Un type d’élément React (ex. MyComponent).
  optionalElementType: PropTypes.elementType,

  // Vous pouvez aussi déclarer qu'une prop est une instance d'une classe.
  // On utilise pour ça l'opérateur JS instanceof.
  optionalMessage: PropTypes.instanceOf(Message),

  // Vous pouvez vous assurer que votre prop est limitée à certaines
  // valeurs spécifiques en la traitant comme une enumération.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // Cette prop peut être de n'importe lequel de ces trois types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // Un tableau avec des valeurs d'un certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Cette prop peut être de n'importe quel type
  requiredAny: PropTypes.any.isRequired,
}
```

Par défault, les props sont optionnels. Ils deviennent obligatoires en ajoutant `isRequired` à la fin de n'importe lequel des validateurs.


Si aucun des validateurs ne vous convient, créez en un nouveau ! Un validateur est une fonction renvoyant un objet Error si la validation échoue. N'utilisez pas de `console.warn` ou `throw`, car ça ne fonctionnera pas dans `oneOfType`.

```
MyComponent.propTypes = {
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  }
}
```


Avec `PropTypes.element`, vous pouvez spécifier qu’un seul enfant peut être passé à un composant.

```jsx
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // Ça doit être un élément unique ou un avertissement sera affiché.
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
``` 
