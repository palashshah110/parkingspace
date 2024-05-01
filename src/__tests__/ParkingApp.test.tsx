import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ParkingApp from "../Component/ParkingApp";
import { Provider } from "react-redux";
import Store from '../Redux/Store/Store.tsx'

describe("ParkingApp", () => {

  test("Change Space Input", () => {
    render(
    <Provider store={Store}>
      <BrowserRouter>
        <ParkingApp />
      </BrowserRouter>
    </Provider>
    );
    const SpaceInput = screen.getByPlaceholderText("Enter Space");
    fireEvent.change(SpaceInput, { target: { value: 5 } });
    expect(SpaceInput.value).toBe("5")

    const form = screen.getByTitle('form');
    fireEvent.submit(form);
    expect(window.location.pathname).toBe('/parkinglot');
  });


  test("Change Space Input Wrongly", () => {
    render(
        <Provider store={Store}>
      <BrowserRouter>
        <ParkingApp />
      </BrowserRouter>
      </Provider>
    );
    const SpaceInput = screen.getByPlaceholderText("Enter Space");
    fireEvent.change(SpaceInput, { target: { value: 'P5' } });
    expect(SpaceInput.value).toBe('');
    fireEvent.change(SpaceInput, { target: { value: -1 } });
    expect(SpaceInput.value).toBe("")
  });

});
