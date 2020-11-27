# La génération statique de pages avec Next.js

Une application React a un défaut majeur : elle repose sur un moteur JavaScript. Sans ce dernier, le bloc `div` dans la page HTML `public/index.html` reste vide.
Or, les moteurs de recherche ne disposent pas tous d'un moteur JavaScript, et quand bien même ils en disposent, ils pénalisent les pages lourdes à charger -- typiquement les applications React.
De ce fait, React est parfois contre-indiqué en SEO (l'optimisation de son référencement sur les moteurs de recherche).
Il en est de même avec le [moteur Facebook](https://stackoverflow.com/a/7623986/4986615) lié à [Open Graph](https://ogp.me/) (les vignettes s'affichant lors du partage d'une page).

Dans un premier temps, React peut être mélangé avec une autre application (par exemple *symfony*) pour générer correctement le bandeau `head` d'une page, ou des parties du site particulièrement importantes pour le référencement (comme la page d'accueil). 
React perd alors un peu de son intérêt.

Une autre solution est de générer la page HTML depuis le serveur : c'est le *server-side rendering*. Ce dernier s'oppose au *client-side rendering*, c'est-à-dire lorsque le DOM HTML est construit depuis le navigateur du client : c'est ce que nous avons vu pour le moment. Concrètement, la génération de pages côté serveur produit un fichier HTML par page de l'application et chaque fichier HTML peut être lu sans utiliser JavaScript. Cette génération se fait de deux manières différentes.

- La génération statique construit tous les fichiers HTML d'un coup. Cette opération prenant du temps, elle est rarement faite plus d'une fois par jour. Ce format correspond typiquement à un blog, où on peut attendre un jour avant la publication de son article. 
- La génération dynamique fabrique un fichier HTML après chaque requête du client. Ce cas d'utilisation correspond, par exemple, à un réseau social, où l'utilisateur veut voir immédiatement les contenus partagés par les autres utilisateurs.

Dans la pratique, le *server-side rendering* est combiné au *client-side rendering*. Par exemple, un blog utilisera le *server-side rendering* sur les billets du blog pour le SEO, tandis que les commentaires sont téléchargés par une requête HTTP du côté client.

Plusieurs frameworks de *server-side-rendering* ont été développés en React et les plus importants sont *Gatsby* (pour l'affichage statique) et *Next.js* (pour l'affichage statique ou dynamique). Ce cours propose une introduction à ce dernier.


## Mise en place de *Next.js*

La commande `npx create-react-app` est remplacée par `npx create-next-app`, car la structure de base d'un projet *Next.js* est différente d'une application classique en React.
En effet, nous ne retrouvons plus de fichier `public/index.html`, puisque Next.js se charge de construire l'intégralité des fichiers HTML, tandis que le dossier `pages` a remplacé le dossier `src`.

La commande `yarn dev` lance un serveur de développement -- c'est l'équivalent du `yarn start` d'autrefois. Les fichiers HTML restent construits à la volée. 
En revanche, la commande `yarn build` construit des fichiers HTML. Ils sont accessibles dans le dossier caché `.next`. L'exploration du fichier `.next/server/pages/index.html` montre qu'il s'agit du fichier de la page d'accueil, visible au lancement de l'application, avec des balises HTML en dures. Des services comme *netlify* permettent d'utiliser le dossier `.next` comme base pour la génération statique d'une application.

Concernant la génération dynamique, un serveur en production doit être lancé avec la commande `yarn start`. Il ne faut pas confondre cette commande avec celle que nous utilisions pour démarrer le serveur de développement d'une application classique en React.


## Le principe des pages

## Le routage
