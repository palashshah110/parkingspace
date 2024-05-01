import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ParkingSpace from "../Component/ParkingSpace.tsx";
import fetchMock from "jest-fetch-mock";
import configureStore from "redux-mock-store";
fetchMock.enableMocks();
const mockStore = configureStore([]);

const ParkingLot = [
  { carid: 2, RegistrationNo: "MP1", CarParkTime: new Date().getTime() },
  { carid: 3, RegistrationNo: "MP5", CarParkTime: new Date().getTime() - (3 * 60 * 60 * 1000) }
];

const store = mockStore({
  parking: {
    ParkingLot,
  },
  space: {
    Space: 1,
  },
});

describe("ParkingSpace Comp", () => {
  test("Testing Render Comp", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: "/parkinglot" }]}>
          <ParkingSpace
            index={1}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Parking Space 2")).toBeInTheDocument();
    const Occupied = screen.getByText("Occupied");
    expect(Occupied).toBeInTheDocument();
    fireEvent.click(Occupied);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const DeallocateForm = screen.getByText("Parking Deallocate Form");
    expect(DeallocateForm).toBeInTheDocument();

    const RegistrationNo = screen.getByText("Registration No: MP1");
    expect(RegistrationNo).toBeInTheDocument();

    const TimeTaken = screen.getByText("Your Parking Time: 0 min");
    expect(TimeTaken).toBeInTheDocument();

    const Charge = screen.getByText("Your Parking Fee: $10");
    expect(Charge).toBeInTheDocument();

    const PaymentTaken = screen.getByText("Payment Taken");
    expect(PaymentTaken).toBeInTheDocument();

    fireEvent.click(PaymentTaken);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(DeallocateForm).not.toBeInTheDocument();
    });
  });

  test("Testing min and change", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: "/parkinglot" }]}>
          <ParkingSpace
            index={2}
          />
        </MemoryRouter>
      </Provider>
    );

    const Occupied = screen.getByText("Occupied");
    fireEvent.click(Occupied);

    const TimeTaken = screen.getByText("Your Parking Time: 180 min");
    expect(TimeTaken).toBeInTheDocument();

    const Charge = screen.getByText("Your Parking Fee: $20");
    expect(Charge).toBeInTheDocument();
  });

  test("Testing Dialog btn and icon Comp", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: "/parkinglot" }]}>
          <ParkingSpace
            index={1}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Parking Space 2")).toBeInTheDocument();
    const Occupied = screen.getByText("Occupied");
    expect(Occupied).toBeInTheDocument();
    fireEvent.click(Occupied);

    const DeallocateForm = screen.getByText("Parking Deallocate Form");
    expect(DeallocateForm).toBeInTheDocument();

    const dialog = screen.getByTitle("DialogBox");
    expect(dialog).toBeInTheDocument();

    const closeBtn = screen.getByTitle("closeBtn");
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(DeallocateForm).not.toBeInTheDocument();
    });
  });
});
