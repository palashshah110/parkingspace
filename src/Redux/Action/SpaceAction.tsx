export const setSpace = (value:number) => ({
  type: 'SET_SPACE',
  payload: value,
});
export const setParkingLot = (data:any[]) => ({
  type: 'SET_ParkingLot',
  payload: data,
});

export const getParkingLot = () => ({
    type: 'GET_PARKING_LOT',
});

export const deallocateParking = (carId:number) => ({
  type: 'DEALLOCATE_PARKING',
  payload: carId,
});