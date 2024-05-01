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
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { ChangeEvent, Component, FormEvent } from "react";
import { ArrowBack, Add, Close } from "@mui/icons-material";
import withRouter from "./WithRouter.tsx";
import { setParkingLot } from "../Redux/Action/SpaceAction.tsx";
import ParkingSpace from "./ParkingSpace.tsx";

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
}
class ParkingLots extends Component<PropsTypes, StateTypes> {
  constructor(props: any) {
    super(props);
    this.state = {
      DialogOpen: false,
      RegistrationNo: "",
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
  checkOccupiedId = (id: number) => {
    const check = this.props.ParkingLot.some((item: any) => item.carid === id);
    return check;
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
            // disabled={this.props.ParkingLot.length === this.props.Space}
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
              <React.Fragment key={index}>
                <ParkingSpace index={index}/>
              </React.Fragment>
            ))}
          </Grid>

          <BootstrapDialog
            onClose={() => this.setState({ DialogOpen: false })}
            aria-labelledby="customized-dialog-title"
            open={this.state.DialogOpen}
            title='DialogBox'
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Parking Space Form
            </DialogTitle>
            <IconButton
            title="closeBtn"
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
                data-testid="form"
              >
                <Box component={"div"} sx={{ p: 2 }}>
                  <InputLabel>Enter Car Registration No.</InputLabel>
                  <TextField
                    type="text"
                    name="RegistrationNo"
                    value={this.state.RegistrationNo}
                    onChange={this.handleChange}
                    inputProps={{ "data-testid": "registration-input" }} 
                  />
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
        </Box>
      </Box>
    );
  }
}

export default withRouter(ParkingLots);
