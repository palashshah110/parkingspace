const initialState = {
  ParkingLot: [],
};

const ParkingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_ParkingLot":
      return {
        ...state,
        ParkingLot: [...state.ParkingLot, action.payload],
      };
    case "GET_PARKING_LOT":
      return {
        ...state,
        ParkingLot: action.payload,
      };
    case "DEALLOCATE_PARKING":
      const updatedParking = state.ParkingLot.filter(
        (car: any) => car.carid !== action.payload
      );
      return {
        ...state,
        ParkingLot: updatedParking,
      };
    default:
      return state;
  }
};

export default ParkingReducer;
