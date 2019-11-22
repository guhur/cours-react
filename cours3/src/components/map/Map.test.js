import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Map from "./Map";


jest.mock("./Map", () => {
  const mockedMap = (props) =>
        <div data-testid="map">{ props.center.lat }:{ props.center.lng }</div>;
  return mockedMap;
});

let container = null;

beforeEach( () => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach( () => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it("should render a mocked map at 0:0", () => {
  const center = { lat: 0, lng: 0 };
  act( () => {
    render(<Map center={center} />, container);
  });
  expect(container.querySelector('[data-testid="map"]').textContent).toEqual(
    "0:0"
  );
});

