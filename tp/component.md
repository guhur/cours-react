# Prise en main des composants

Ce TP propose de rédiger plusieurs composants.


## Questions

**1. Comment installer le projet ?**

**2. Comment lancer l'application ?**

**3. Que se passe-t'il lors du lancement de l'application ?**

En regardant dans le code de `src/index.jsx`, vous remarquez que le composant `App` n'est pas utilisé. 

**4. Instanciez le composant. Pourquoi l'application ne fonctionne toujours pas ?**

Dans le fichier `src/button.jsx`, nous trouvons un composant `Button` pourtant. Le problème est subtil, mais expliqué dans le [cours de rappel](./cours/rappel.md).

**5. Corrigez le problème du `Button`**

Nous allons maintenant personnaliser notre bouton en ajoutant un peu de CSS.
Pour cela, ajoutez la ligne `import './index.css'` dans le fichier `src/button.jsx`.

**6. Modifiez les fichiers `src/index.css` et `src/button.js` pour que le bouton ait un fond rouge et un texte en blanc**

Nous souhaitons maintenant avoir plusieurs fois le même bouton.

**7. Modifiez le fichier `src/index.jsx` pour dupliquer le bouton en plusieurs exemplaires**

Vous risquez d'obtenir une nouvelle erreur, car un composant ne peut avoir qu'une seule enfant. Cela se résout en encapsulant les différents enfants dans une balise vide : `<></>`.

