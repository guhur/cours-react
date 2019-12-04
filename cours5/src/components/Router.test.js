import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "../App"
import { MemoryRouter, BrowserRouter } from 'react-router-dom';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it("redirects to home",  () => {


  act(() => {
    render(<BrowserRouter><App /></BrowserRouter>, container);
  });

  expect(container.querySelector("[data-testid=title]").innerHTML).toBe("Accueil");

});
 
it("does not display the title",  () => {

  act(() => {
    render(<MemoryRouter initialEntries={["/about"]} ><App /></MemoryRouter>, container);
  });

  expect(container.querySelector("[data-testid=title]").innerHTML).toBe("About");

});
 
