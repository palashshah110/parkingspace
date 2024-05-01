import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "../Redux/Store/Store.tsx";
import ParkingLots from "../Component/ParkingLots.tsx";
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);
const ParkingLot = [
  { carid: 2, RegistrationNo: "MP1", CarParkTime: new Date().getTime() },
];

const store = mockStore({
  parking: {
    ParkingLot
  },
  space:{
    Space:1
  }
});

describe("ParkingLot Comp", () => {
  test("Testing Go back button", () => {
    render(
      <Provider store={Store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/parkinglot" }]}
        >
          <ParkingLots />
        </MemoryRouter>
      </Provider>
    );
    const gobackbtn = screen.getByText("Go Back");
    fireEvent.click(gobackbtn);
    expect(window.location.pathname).toBe("/");
  });

  test("Testing New Car Registration button", async () => {
    render(
      <Provider store={Store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/parkinglot" }]}
        >
          <ParkingLots />
        </MemoryRouter>
      </Provider>
    );
    const CarRegistration = screen.getByText("New Car Registration");
    fireEvent.click(CarRegistration);

    await waitFor(() => {
      expect(screen.getByText("Parking Space Form")).toBeInTheDocument();
    });

    const CarRegistrationInput = screen.getByTestId("registration-input");
    fireEvent.change(CarRegistrationInput, { target: { value: "MP1" } });
    expect(CarRegistrationInput.value).toBe("MP1");
    

    const SavechangesBtn = screen.getByText("Save changes");
    fireEvent.click(SavechangesBtn);
    const mockPreventDefault = jest.fn();
    const formElement = screen.getByTestId('form');
    formElement.onsubmit = mockPreventDefault;
    fireEvent.submit(formElement);
    expect(mockPreventDefault).toHaveBeenCalled();
  })  
  test("Testing Dialog Box", async () => {
    render(
      <Provider store={Store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/parkinglot" }]}
        >
          <ParkingLots />
        </MemoryRouter>
      </Provider>
    );

    const CarRegistration = screen.getByText("New Car Registration");
    fireEvent.click(CarRegistration);
    const ParkingSpaceForm = screen.getByText("Parking Space Form");
    await waitFor(() => {
      expect(ParkingSpaceForm).toBeInTheDocument();
    });    
    const dialog = screen.getByTitle("DialogBox");
    expect(dialog).toBeInTheDocument();

    const closeBtn = screen.getByTitle("closeBtn");
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(ParkingSpaceForm).not.toBeInTheDocument();
    });
  })  

  test("Testing Spaces", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[{ pathname: "/parkinglot" }]}
        >
          <ParkingLots />
        </MemoryRouter>
      </Provider>
    );

    ParkingLot.forEach((_,index) => {
      const parkingSpace = screen.getByText(`Parking Space ${index+1}`);
      expect(parkingSpace).toBeInTheDocument();
    });
  })
});
