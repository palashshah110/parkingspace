import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import React, { Component } from "react";
import withRouter from "./WithRouter.tsx";
import { deallocateParking } from "../Redux/Action/SpaceAction.tsx";
import { Close } from "@mui/icons-material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface PropsTypes {
  index: number;
  ParkingLot: any[];
  dispatch: any;
}
interface StateTypes {
  deallocateOpen: boolean;
  deallocateid: number;
}

class ParkingSpace extends Component<PropsTypes, StateTypes> {
  constructor(props: any) {
    super(props);
    this.state = {
      deallocateOpen: false,
      deallocateid: -1,
    };
  }
  checkOccupiedId = (id: number) => {
    const check = this.props.ParkingLot.some((item: any) => item.carid === id);
    return check;
  };
  DeallocateSpace = async () => {
    const registrationID = this.props.ParkingLot.find(
      (item) => item.carid === this.state.deallocateid
    );
    const charge = this.calculateParkingFee(registrationID.CarParkTime);
    const res = await fetch("https://httpstat.us/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "car-registration": registrationID.RegistrationNo,
        charge: charge,
      }),
    });
    console.log(res);
    const updatedParking:any = this.props.ParkingLot.filter(
      (car: any) => car.carid !== this.state.deallocateid
    );

    this.props.dispatch(deallocateParking(updatedParking));
    this.setState({
      deallocateOpen: false,
      deallocateid: -1,
    });
  };
  calculateParkingFee = (startTime: number): number => {
    const endTime = new Date().getTime();
    const miliSeconds: number = endTime - startTime;
    const Hours: number = miliSeconds / (1000 * 60 * 60);
    let parkingRate: number;
    if (Hours <= 2) {
      parkingRate = 10;
    } else {
      parkingRate = 10 + (Hours - 2) * 10;
    }
    return Math.floor(parkingRate);
  };

  calculateParkingTime = (startTime: number): number => {
    const endTime = new Date().getTime();
    const miliSeconds: number = endTime - startTime;
    const Min: number = miliSeconds / (1000 * 60);
    return Math.floor(Min);
  };
  render() {
    return (
      <>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper
            elevation={5}
            sx={{
              width: "50%",
              height: "150px",
              border: "5px solid #777",
              borderTop: "none",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
              background: this.checkOccupiedId(this.props.index + 1)
                ? "#f1bfbf"
                : "lightblue",
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
              Parking Space {this.props.index + 1}
            </Typography>
            {this.checkOccupiedId(this.props.index + 1) && (
              <Button
                variant="contained"
                disableElevation
                color="warning"
                onClick={() =>
                  this.setState({
                    deallocateOpen: true,
                    deallocateid: this.props.index + 1,
                  })
                }
              >
                {"Occupied"}
              </Button>
            )}
          </Paper>
        </Grid>
        <BootstrapDialog
          title="DialogBox"
          onClose={() => this.setState({ deallocateOpen: false })}
          aria-labelledby="customized-dialog-title"
          open={this.state.deallocateOpen}
        >
          <DialogTitle sx={{ m: 0, p: 2, mr: 4 }} id="customized-dialog-title">
            Parking Deallocate Form
          </DialogTitle>
          <IconButton
            title="closeBtn"
            aria-label="close"
            onClick={() => this.setState({ deallocateOpen: false })}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
          <DialogContent dividers>
            {this.props.ParkingLot.map((car: any) => {
              return (
                <React.Fragment key={car.carid}>
                  {car.carid === this.state.deallocateid && (
                    <>
                      <Typography variant={"h5"} sx={{ p: 2 }}>
                        Registration No: {car.RegistrationNo}
                      </Typography>
                      <Typography variant={"h5"} sx={{ p: 2 }}>
                        Your Parking Time:{" "}
                        {this.calculateParkingTime(car.CarParkTime)} min
                      </Typography>
                      <Typography variant={"h5"} sx={{ p: 2 }}>
                        Your Parking Fee: $
                        {this.calculateParkingFee(car.CarParkTime)}
                      </Typography>
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={this.DeallocateSpace}
              type="button"
              variant="contained"
            >
              Payment Taken
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </>
    );
  }
}

export default withRouter(ParkingSpace);
