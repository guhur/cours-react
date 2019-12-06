# Cours 6

## Arrow functions

- présentation des différentes formes de fonctions en ES6.

```javascript
(param1, param2, …, paramN) => { instructions; } 
(param1, param2, …, paramN) => expression
// équivalent à : => { return expression; }

// Les parenthèses sont facultatives pour un unique argument
(singleParam) => { statements }
singleParam => { statements }

// Cas avec zéro argument;
() => { statements }

// Erreur classique : l'expression n'est pas retournée ici
() => { expression }
// Solution
() => expression
// ou
() => { return expression; }

// Erreur classique : retourner un tableau associatif
() => { 'foo': 1, "bar": 2  }
// Solution : encapsulation dans des parenthèses
() => ({ 'foo': 1, "bar": 2  })
```

## Binding

Les arrows functions permettent de créer un contexte contenant `this`. Mais ils perturbent les performances.

## Testing fetch with multiple URLs
