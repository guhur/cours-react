# TP sur le contexte en React


## Analyse de code : implémentation de `MemoryRouter`

Lisez attentivement le [code associé à ce TP](https://codesandbox.io/s/react-tp-context-zbb97) puis répondez aux questions suivantes.

**1. Décrivez les composants (rôle, props, state)**

**2. Comment fait `Route` pour s'abonner à ce contexte ? Décrivez le contexte transmis. Quelles données sont accessibles à `Route` ?**

**3. Ce contexte transporte moins de données que le `MemoryRouter` implémenté dans [`react-router-dom`](https://reactrouter.com/web/api/MemoryRouter). Quelles données ne sont pas accessibles à un composant qui s'abonne à ce contexte ? Citez un cas d'utilisation qui est possible avec la version d'origine `MemoryRouter` mais qui n'est pas possible avec cette implémentation simplifiée.** 

**4. Quel mécanisme rafraîchit les composants lorsqu'un utilisateur clique sur un lien ?**

**5. Par quel autre moyen `Route` aurait pu s'abonner au contexte ? Testez le.**

**6. La fonction `withRouter` est un HOC implémenté par  [`react-router-dom`](https://reactrouter.com/web/api/withRouter). Décrivez son rôle et donnez un exemple d'utilisation.
 Implémentez `withRouter` et abonnez le composant `Link` au contexte grâce à cet HOC.**

## Un exemple d'utilisation du contexte avec Material UI

`Material UI` est une bibliothèque de composants React qui donne un air de Google à sa page. 
Cette librairie utilise le contexte pour transporter la charte graphique à travers les composants de son application.
Si le design de Google ne vous plait pas, vous pouvez donc n'utiliser que les contextes de Material UI pour désigner votre application.

La fonction `createMuiTheme` créé un objet `theme`, dans lequel on définira les options globales de sa page (telles que la couleur principale ou la couleur secondaire).
Le thème produit par cette fonction est alors partagé au `ThemeProvider`, lequel doit encapsuler votre application :

```jsx
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

const App = () => (
 <ThemeProvider theme={theme}>
   <CustomCheckbox />
 </ThemeProvider>
);
```

Le contexte du thème est désormais disponible au composant `CustomCheckbox`.
Pour que ce dernier s'abonne au contexte, on peut utiliser, par exemple, l'HOC `withTheme`, semblable à celui vu en cours. 
Concrètement, cet HOC injecte le `props` `theme` à l'intérieur d'un composant.
Le `hook` `useTheme` permet également de faire cela pour les composants définis sous la forme de fonction.

Cependant, un composant qui utilise un tel thème est plus difficilement ré-utilisable, car il nécessite que `ThemeProvider` soit défini sur un de ses ancêtres.
La fonction `withStyles` résout ce problème en injectant directement le style dans un composant sous la forme de classes CSS.

```jsx
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    backgroundColor: 'red',
  },
};

function MyComponent(props) {
  return <div className={props.classes.root} />;
}

export default withStyles(styles)(MyComponent);
```

L'objet `styles` définit ici contient une classe CSS qui est fournit au `div`. Material UI se charge de produire le fichier CSS correspondant.


**7. Désignez la [page](https://codesandbox.io/s/react-app-naked-g9fo7) à l'aide de votre thème Material UI.**
