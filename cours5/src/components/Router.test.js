import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "../App"

const reactRouter = require('react-router-dom');
const { MemoryRouter, BrowserRouter } = reactRouter;

let container = null;

const MockBrowserRouter = ({ children }) => (
<MemoryRouter initialEntries={['/about']}>
{ children }
</MemoryRouter>
);

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);

  jest.spyOn(reactRouter, "BrowserRouter").mockImplementation(
    MockBrowserRouter
  );
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
 
  // remove the mock to ensure tests are completely isolated
  reactRouter.BrowserRouter.mockRestore();
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
 
