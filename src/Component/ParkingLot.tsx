import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { ChangeEvent, Component, FormEvent } from "react";
import { ArrowBack, Add, Close } from "@mui/icons-material";
import withRouter from "./WithRouter.tsx";
import {
  deallocateParking,
  setParkingLot,
} from "../Redux/Action/SpaceAction.tsx";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface PropsTypes {
  navigate: (path: string) => void;
  dispatch: any;
  Space: number;
  ParkingLot: [
    {
      carid: number;
      RegistrationNo: string;
      CarParkTime: number;
    }
  ];
}
interface StateTypes {
  DialogOpen: boolean;
  RegistrationNo: string;
  deallocateOpen: boolean;
  deallocateid: number;
}
class ParkingLot extends Component<PropsTypes, StateTypes> {
  constructor(props: any) {
    super(props);
    this.state = {
      DialogOpen: false,
      RegistrationNo: "",
      deallocateOpen: false,
      deallocateid: -1,
    };
  }
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    let carid: number;
    do {
      carid = Math.floor(1 + Math.random() * this.props.Space);
    } while (this.checkOccupiedId(carid));

    const CarStartTime = new Date().getTime();
    const data: any = {
      carid: carid,
      RegistrationNo: this.state.RegistrationNo,
      CarParkTime: CarStartTime,
    };
    this.props.dispatch(setParkingLot(data));
    this.setState({
      RegistrationNo: "",
      DialogOpen: false,
    });
  };
  DeallocateSpace = () => {
    this.props.dispatch(deallocateParking(this.state.deallocateid));
    this.setState({
      deallocateOpen: false,
      deallocateid: -1,
    });
  };

  checkOccupiedId = (id: number) => {
    const check = this.props.ParkingLot.some((item: any) => item.carid === id);
    return check;
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
    return parkingRate;
  };

  calculateParkingTime = (startTime: number): number => {
    const endTime = new Date().getTime();
    const miliSeconds: number = endTime - startTime;
    const Min: number = miliSeconds / (1000 * 60);
    return Math.floor(Min);
  };

  render() {
    const { Space } = this.props;
    return (
      <Box
        sx={{
          zIndex: 1,
          height: "auto",
          overflow: "auto",
          background: "#e9e9e9",
          minHeight: "100vh",
        }}
      >
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "97%",
            mb: 5,
            mt: 4,
            ml: 2,
          }}
        >
          <Button
            sx={{ borderRadius: 3 }}
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => this.props.navigate("/")}
          >
            Go Back
          </Button>
          <Typography component={"h1"} sx={{ ml: 5, fontSize: "3rem" }}>
            Parking Lot
          </Typography>
          <Button
            sx={{ borderRadius: 2 }}
            color="success"
            variant="contained"
            startIcon={<Add />}
            onClick={() => this.setState({ DialogOpen: true })}
            disabled={this.props.ParkingLot.length === this.props.Space}
          >
            New Car Registration
          </Button>
        </Box>
        <Box sx={{ overflowX: "hidden" }}>
          <Grid
            container
            spacing={3}
            justifyContent="start"
            alignItems="center"
            sx={{ ml: 2 }}
            columnSpacing={1}
            rowSpacing={5}
          >
            {Array.from({ length: Space }, (v, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                    background: this.checkOccupiedId(index + 1)
                      ? "#f1bfbf"
                      : "lightblue",
                  }}
                >
                  <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
                    Parking Space {index + 1}
                  </Typography>
                  {this.checkOccupiedId(index + 1) && (
                    <Button
                      variant="contained"
                      disableElevation
                      color="warning"
                      onClick={() =>
                        this.setState({
                          deallocateOpen: true,
                          deallocateid: index + 1,
                        })
                      }
                    >
                      {"Occupied"}
                    </Button>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
          <BootstrapDialog
            onClose={() => this.setState({ DialogOpen: false })}
            aria-labelledby="customized-dialog-title"
            open={this.state.DialogOpen}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Parking Space Form
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={() => this.setState({ DialogOpen: false })}
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
              <form
                style={{ padding: "20px" }}
                onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
              >
                <Box component={"div"} sx={{ p: 2 }}>
                  <InputLabel>Enter Car Registration No.</InputLabel>
                  <TextField
                    type="text"
                    name="RegistrationNo"
                    value={this.state.RegistrationNo}
                    onChange={this.handleChange}
                  ></TextField>
                </Box>
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={this.handleSubmit}
                type="button"
                disabled={this.state.RegistrationNo === ""}
              >
                Save changes
              </Button>
            </DialogActions>
          </BootstrapDialog>

          <BootstrapDialog
            onClose={() => this.setState({ deallocateOpen: false })}
            aria-labelledby="customized-dialog-title"
            open={this.state.deallocateOpen}
          >
            <DialogTitle
              sx={{ m: 0, p: 2, mr: 4 }}
              id="customized-dialog-title"
            >
              Parking Deallocate Form
            </DialogTitle>
            <IconButton
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
        </Box>
      </Box>
    );
  }
}

export default withRouter(ParkingLot);
