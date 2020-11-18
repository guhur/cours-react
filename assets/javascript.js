const anagrammes = (stringA, stringB) => {
  /**
   * stringA est égale à stringB si et seulement s'ils partagent les mêmes
   * caractères alphabétiques dans la même quantité.
   * La case n'est pas pris en compte
   *
   * Exemples :
   *
   * anagrams('rail safety', 'fairy tales') === true
   * anagrams('RAIL! SAFETY!', 'fairy tales') === true
   * anagrams('Hi there', 'Bye there') === false
   */

};


class Stack {
/**
 * Créer une structure d'empilement. La structure doit être
 * une classe contenant les méthodes :
 *  - `push`: pour ajouter un élément au bout de l'empilement,
 *  - `pop` pour retirer le dernier élément et le retourner;
 *  - et `peek` pour récupérer le premeier élément.
 *
 * Exemples :
 *
 * const s = new Stack();
 * s.push(1);
 * s.push(2);
 * s.push(3);
 * s.pop(); // returns 3
 * s.pop(); // returns 2
 * s.peek(); // returns 1
 */
};


const fizzBuzz = (n) => {
/**
 * Affiche les nombres de 1 à n, en remplaçant les multiples de 3 par fizz et 
 * les multiples de 5 par buzz
 *
 * Exemple :
 *
 * fizzBuzz(5);
 * console.log(1)
 * console.log(2)
 * console.log('fizz')
 * console.log(4)
 * console.log('buzz')
 */

};

const spirale = (n) => {
/**
 * Retourne une matrice spirale de taille n x n.
 *
 * Exemples :
 *
 * matrix(2) = [[1, 2],
 *              [4, 3]]
 *
 * matrix(3) = [[1, 2, 3],
 *              [8, 9, 4],
 *              [7, 6, 5]]
 *
 * matrix(4) = [[1,   2,  3, 4],
 *              [12, 13, 14, 5],
 *              [11, 16, 15, 6],
 *              [10,  9,  8, 7]]
 */

};


const puissance4 = (grid) => {
/**
 * Vérifie si un joueur a gagné au puissance 4,
 * c'est-à-dire s'il a 4 jetons contigus en diagonales, lignes ou colonnes.
 *
 * Exemples :
 *
 * puissance4(
 *  [[ 1, 0, 0, 0 ],
 *   [ 2, 1, 0, 0 ],
 *   [ 2, 1, 1, 2 ],
 *   [ 2, 1, 1, 2 ]]
 *   ) = 1
 * )
 *
 * puissance4(
 *  [[ 1, 1, 0, 0, 0 ],
 *   [ 2, 2, 2, 0, 0 ],
 *   [ 2, 2, 1, 1, 2 ],
 *   [ 2, 2, 1, 1, 2 ]]
 *   ) = 0
 *
 * puissance4(
 *  [[ 1, 2, 0, 0, 0 ],
 *   [ 1, 2, 2, 0, 0 ],
 *   [ 2, 2, 1, 1, 2 ],
 *   [ 2, 2, 1, 1, 2 ]]
 *   ) = 0
 */
}

module.exports = {
  fizzBuzz,
  puissance4,
  spirale,
  anagrammes,
  Stack
}

