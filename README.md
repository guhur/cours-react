# Introduction à React

Ce cours est constitué de 10 projets différents pour prendre en main React à partir d'un minimum de connaissances en JavaScript.
Chaque projet est hébergé sous un répertoire git différent. Ce répertoire centralise les notes de cours.

# Format des TP
Pour être noté·e, l'étudiant·e doit :

- copier le dossier du TP avec son compte GitHub ;
- modifier le projet pour valider chaque consigne du TP ;
- au sein d'un projet, le `README.md` peut contenir des questions, auxquels vous devez répondre directement en complétant ce fichier.
- éventuellement, si le projet contient des tests automatisés, il faut s'assurer que [ces tests passent](https://create-react-app.dev/docs/running-tests/) ;
- mettre son code en production avec [Netlify](https://www.netlify.com/blog/2016/07/22/deploy-react-apps-in-less-than-30-seconds/) et ajouter le [badge de statut](https://docs.netlify.com/monitor-sites/status-badges) dans le README du projet,
- remplir le Google Sheet avec le lien vers son répertoire git.

Vous pouvez me contacter par [courriel](mailto:pierrelouisguhur+reactlp@gmail.com) si vous avez des problèmes avec vos rendus.

# Notation 

Quelques conseils pour avoir une mauvaise note :
- ne pas soigner l'apparence de ses réponses dans le `README.md` ([quelques notions de Markdown](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf)) ;
- laisser des blocs de code en commentaires dans son rendu ;
- faire des fonction de plus de 20 lignes ;
- ne pas utiliser de *formatter* dans son IDE ([Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [Vim](https://github.com/neoclide/coc-tsserver)) ;
- ne pas utiliser les formules de politesses dans les courriels ;


# Partie 1 : les bases de React

## Cours 1 : rappel en JavaScript

Ce cours reprend les bases de la programmation en JavaScript (variables, conditions, boucles, fonctions et classes) et en particulier avec la syntaxe ES6.

[Cours](./cours/javascript.md) - [TP](./tp/javascript.md)

## Cours 2 : écrire son premier composant

Après créer un projet React, vous allez créer un composant en `JSX` et ajouter un test automatisé.

[Cours](./cours/component.md) - [TP](./tp/button.md)

## Cours 3 : réutiliser des composants avec les `props`

Les `Props` paramètrent la création d'un composant.

[Cours](./cours/props.md) - [TP](./tp/list_user.md)

## Cours 4 : rendre un composant réactif avec les `states`

Les `states` correspondent à l'état interne d'un composant. Modifier le `state` recharge l'apparence de ce composant. 

[Cours](./cours/states.md) - [TP partie 1](./tp/form.md) - [TP partie 2](./tp/reveil.md)

# Partie 2 : React et son éco-système 

## Cours 5 : ajoutons un peu de design avec `styled-components`

[Cours](./cours/styled-components.md) - [TP](./tp/styled-components.md)

## Cours 6 : ajoutons un peu de design avec Semantic UI

[`Semantic UI`](https://semantic-ui.com/) -- ou son fork [`Fomantic UI`](https://fomantic-ui.com/) -- propose une collection de composants en [React](https://react.semantic-ui.com/). 

[Cours](./cours/semantic.md) - [TP](./tp/semantic-ui.md)


## Cours 7 : interagir avec un backend

[Cours](./cours/fetch.md) - [TP partie 1](./tp/fetch.md) - [TP partie 2](./tp/pendu.md)

## Cours 9 : ajouter plusieurs pages à son application

[Cours](./cours/router.md) - [TP](./tp/router.md)

## Cours 10 : les composants d'ordre supérieur

[Cours](./cours/hoc.md) - [TP](./cours/auth.md)

## Cours 11 : partager des informations entre plusieurs composants avec les contextes

[Cours](./cours/context.md) - [TP](./tp/context.md)

# Partie 3 : React et son éco-système

## Cours 12 : créer des utilisateurs avec Firebase
[Cours](./cours/firebase.md) - [TP](./tp/cookies-auth.md)

## Cours 13 : sauvegarder des informations avec Firestore
[Cours](./cours/firestore.md) - [TP](./tp/advanced-users.md)

## Cours 14 : la génération statique de pages avec Next JS
[Cours](./cours/nextjs.md) - [TP](./tp/nextjs.md)


<!-- ## Cours 14 : gérer les permissions dans Firebase
 [Cours sur les permissions dans Firestore](./cours/firestore-permissions.md) - [TP jeu multi-joueur](./tp/multi-player.md)
 
 ## Cours 15 : maîtriser les compteurs avec Firebase
 [Cours sur les compteurs dans Firestore](./cours/firestore-counters.md) - [TP jeu multi-joueur avec des points](./tp/multi-player2.md)
 -->
