import React from 'react';
import ReactDOM from 'react-dom';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import Timer from './Timer';

let container = null;

beforeEach( () => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach( () => {
  unmountComponentAtNode(container);
  container.remove();
});

it('renders without crashing', () => {
  jest.useFakeTimers();

  act( () => {
    render(<Timer />, container);
  });
  expect(document.querySelector("[data-testid='timer']").textContent).toMatch(
    "0"
  );

  act( () => {
    jest.advanceTimersByTime(100);    
  });
  expect(document.querySelector("[data-testid='timer']").textContent).toMatch(
    "0"
  );

  act( () => {
    jest.advanceTimersByTime(1000);    
  });
  expect(document.querySelector("[data-testid='timer']").textContent).toMatch(
    "1"
  );

});
