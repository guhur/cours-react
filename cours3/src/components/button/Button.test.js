import React from 'react';
import ReactDOM from 'react-dom';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import Button from './Button';

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
  act( () => {
    render(<Button>Hello, world!</Button>, container);
  });
  expect(document.querySelector("[data-testid='button']").textContent).toMatch(
    "Hello, world!"
  );

  act( () => {
    render(<Button></Button>, container);
  });
  expect(document.querySelector("[data-testid='button']").textContent).toMatch(
    "Add text"
  );
});

it("changes CSS class when we click on it", () => {
  act( () => {
    render(<Button></Button>, container);
  });
  const button = document.querySelector("[data-testid='button']");
  expect(button.className).toBe(".untoggled");
  
  act( () => {
    button.dispatchEvent(
      new MouseEvent("click", { bubbles: true })
    );
  });
  expect(button.className).toBe(".toggled");
});

it("corresponds to what we saw before", () => {
  act( () => {
    render(<Button></Button>, container);
  });
  const button = document.querySelector("[data-testid='button']");
  expect(
    pretty(container.innerHTML)
  ).toMatchSnapshot();
});
