import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component: React.ComponentType<any>) => {
  const WithRouter = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const dispatch = useDispatch();
    const Space = useSelector((state: any) => state.space.Space);
    const ParkingLot = useSelector((state: any) => state.parking.ParkingLot);
    return (
      <Component
        {...props}
        navigate={navigate}
        location={location}
        params={params}
        dispatch={dispatch}
        Space={Space}
        ParkingLot={ParkingLot}
      />
    );
  };
  return WithRouter;
};
export default withRouter;
