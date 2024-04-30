import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "../Redux/Store/Store.tsx";
import ParkingLot from "../Component/ParkingLot.tsx";

const mockState = {
    state:{
        Space:1,
        ParkingLot: [
            {
              carid: 1,
              RegistrationNo: 'MP12',
              CarParkTime: 89955
            },
          ]
    }
}

describe("ParkingLot Comp", () => {
  test("Testing Go back button", () => {
    render(
      <Provider store={Store}>
      <MemoryRouter
        initialEntries={[
          { pathname: "/parkinglot", state: mockState.state },
        ]}>
          <ParkingLot />
          </MemoryRouter>
      </Provider>
    );
    const gobackbtn = screen.getByText("Go Back");
    fireEvent.click(gobackbtn);
    expect(window.location.pathname).toBe("/");
  });

  test("Testing New Car Registration button", async() => {
    render(
      <Provider store={Store}>
      <MemoryRouter
        initialEntries={[
          { pathname: "/parkinglot", state: mockState.state },
        ]}>
          <ParkingLot />
        </MemoryRouter>
      </Provider>
    );
    const CarRegistration = screen.getByText("New Car Registration");
    fireEvent.click(CarRegistration);
  });
});
