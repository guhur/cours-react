import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import App from './App';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders with fake API', async () => {
  const fakeTodos = [
    {
      userId: 1,
      id: 1,
      title: 'My Todo',
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false,
    },
  ];

  const fakePosts = [
    {
      userId: 1,
      id: 1,
      title:
        'My Post',
      body:
        'quia et suscipit\nsuscipit',
    },
    {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body:
        'est rerum tempore vitae\n'
    },
  ];

  function fakeFetch(url) {
    let fakeData;
    if (url.includes("posts")) {
      fakeData = fakePosts;
    }
    else {
      fakeData = fakeTodos;
    }
    return Promise.resolve({
      json: () => Promise.resolve(fakeData),
    });
  }

  jest.spyOn(global, 'fetch').mockImplementation(fakeFetch);

  await act(async () => {
    render(<App />, container);
  });

  expect(container.querySelector('.Posts').innerHTML).toMatch('My Post');
  expect(container.querySelector('.Todos').innerHTML).toMatch('My Todo');

  global.fetch.mockRestore();
});
