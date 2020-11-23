const { anagrammes, Stack, spirale, puissance4, fizzBuzz } = require('./javascript.js');


describe('La fonction anagramme', () => {
  test('doit exister', () => {
    expect(anagrammes).toBeDefined();
    expect(typeof anagrammes).toEqual('function');
  });

  test('doit valider deux phrases anagrammes.', () => {
    expect(anagrammes('hello', 'llohe')).toBeTruthy();
    expect(anagrammes('Whoa! Hi!', 'Hi! Whoa!')).toBeTruthy();
    expect(anagrammes('RAIL! SAFETY!', 'fairy tales')).toBeTruthy();
  });

  test('doit refuser deux phrass qui ne sont pas des anagrammes.', () => {
    expect(anagrammes('One One', 'Two two two')).toBeFalsy();
    expect(anagrammes('One one', 'One one c')).toBeFalsy();
    expect(anagrammes('A tree, a life, a bench', 'A tree, a fence, a yard')).toBeFalsy();
  });
});


describe('La classe Stack', () => {
  test('doit être une classe', () => {
    expect(typeof Stack.prototype.constructor).toEqual('function');
  });

  test('doit pouvoir ajouter ou retirer des éléments.', () => {
    const s = new Stack();
    s.push(1);
    expect(s.pop()).toEqual(1);
    s.push(2);
    expect(s.pop()).toEqual(2);
  });

  test('doit suivre le principe du premier arrivé, premier parti.', () => {
    const s = new Stack();
    s.push(1);
    s.push(2);
    s.push(3);
    expect(s.pop()).toEqual(3);
    expect(s.pop()).toEqual(2);
    expect(s.pop()).toEqual(1);
  });

  test('doit pouvoir retourner le premier élément sans le supprimer.', () => {
    const s = new Stack();
    s.push(1);
    s.push(2);
    s.push(3);
    expect(s.peek()).toEqual(1);
    expect(s.pop()).toEqual(3);
    expect(s.peek()).toEqual(1);
    expect(s.pop()).toEqual(2);
    expect(s.peek()).toEqual(1);
    expect(s.pop()).toEqual(1);
  });
});


describe('La fonction matrice', () => {
  test('doit exister', () => {
    expect(spirale).toBeDefined();
    expect(typeof spirale).toEqual('function');
  });

  test('doit fournir la matrice de taille 2x2', () => {
    const m = spirale(2);
    expect(m.length).toEqual(2);
    expect(m[0]).toEqual([1, 2]);
    expect(m[1]).toEqual([4, 3]);
  });

  test('et celle de taille 3x3', () => {
    const m = spirale(3);
    expect(m.length).toEqual(3);
    expect(m[0]).toEqual([1, 2, 3]);
    expect(m[1]).toEqual([8, 9, 4]);
    expect(m[2]).toEqual([7, 6, 5]);
  });

  test('et celle de taille 4x4', () => {
    const m = spirale(4);
    expect(m.length).toEqual(4);
    expect(m[0]).toEqual([1, 2, 3, 4]);
    expect(m[1]).toEqual([12, 13, 14, 5]);
    expect(m[2]).toEqual([11, 16, 15, 6]);
    expect(m[3]).toEqual([10, 9, 8, 7]);
  });
});


describe('La fonction FizzBuzz', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log');
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  test('doit exister', () => {
    expect(fizzBuzz).toBeDefined();
    expect(typeof fizzBuzz).toEqual('function');
  });

  test('doit afficher 5 expressions quand appelé avec 5', () => {
    fizzBuzz(5);

    expect(console.log.mock.calls.length).toEqual(5);
  });

  test('doit afficher les bonnes valeurs', () => {
    fizzBuzz(15);

    expect(console.log.mock.calls[0][0]).toEqual(1);
    expect(console.log.mock.calls[1][0]).toEqual(2);
    expect(console.log.mock.calls[2][0]).toEqual('fizz');
    expect(console.log.mock.calls[3][0]).toEqual(4);
    expect(console.log.mock.calls[4][0]).toEqual('buzz');
    expect(console.log.mock.calls[5][0]).toEqual('fizz');
    expect(console.log.mock.calls[6][0]).toEqual(7);
    expect(console.log.mock.calls[7][0]).toEqual(8);
    expect(console.log.mock.calls[8][0]).toEqual('fizz');
    expect(console.log.mock.calls[9][0]).toEqual('buzz');
    expect(console.log.mock.calls[10][0]).toEqual(11);
    expect(console.log.mock.calls[11][0]).toEqual('fizz');
    expect(console.log.mock.calls[12][0]).toEqual(13);
    expect(console.log.mock.calls[13][0]).toEqual(14);
    expect(console.log.mock.calls[14][0]).toEqual('fizzbuzz');
  });
});


describe('La fonction puissance4', () => {
  test('doit exister', () => {
    expect(puissance4).toBeDefined();
    expect(typeof puissance4).toEqual('function');
  });

  test('doit vérifier quand le joueur 1 gagne', () => {
    expect(puissance4(
     [[ 1, 0, 0, 0 ],
      [ 2, 1, 0, 0 ],
      [ 2, 1, 1, 2 ],
      [ 2, 1, 1, 2 ]]
      )).toEqual(1);

    expect(puissance4(
     [[ 0, 0, 0, 1 ],
      [ 2, 1, 1, 2 ],
      [ 2, 1, 1, 2 ],
      [ 1, 2, 2, 2 ]]
      )).toEqual(1);
  });

  test('doit vérifier quand le joueur 2 gagne', () => {
    expect(puissance4(
     [[ 1, 2, 0, 0, 0 ],
      [ 1, 2, 2, 0, 0 ],
      [ 2, 2, 1, 1, 2 ],
      [ 2, 2, 1, 1, 2 ]]
      )).toEqual(2);

    expect(puissance4(
     [[ 1, 2, 0, 0, 0 ],
      [ 1, 1, 2, 0, 0 ],
      [ 2, 2, 1, 1, 2 ],
      [ 2, 2, 2, 2, 1 ]]
      )).toEqual(2);
  });

  test('doit vérifier quand aucun joueur ne gagne', () => {
    expect(puissance4(
     [[ 1, 1, 0, 0, 0 ],
      [ 2, 2, 2, 0, 0 ],
      [ 2, 2, 1, 1, 2 ],
      [ 2, 2, 1, 1, 2 ]]
      )).toEqual(0);
  });
});

