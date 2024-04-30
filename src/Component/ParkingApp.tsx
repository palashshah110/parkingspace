import { Box, Button, Paper, TextField } from "@mui/material";
import React, { ChangeEvent, Component, FormEvent } from "react";
import withRouter from './WithRouter.tsx';
import { setSpace } from "../Redux/Action/SpaceAction.tsx";

interface stateType {
  space: number;
}

interface propsType {
  navigate:(path:String)=>void;
  dispatch:any;
}
class ParkingApp extends Component<propsType, stateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      space: 0,
    };
  }
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.currentTarget.value >= 0) {
      this.setState({ space: +e.currentTarget.value });
    }
  };
  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.dispatch(setSpace(this.state.space))
    this.props.navigate('/parkinglot');
  };

  render() {
    return (
      <Box
        sx={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url('https://www.getmyparking.com/src/home-hero-banner.png')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            opacity: 0.4,
          }}
        />
          <Paper
            sx={{
              height: "230px",
              width: "300px",
              background: "#fff",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h2>Enter Parking Space</h2>
            <form
            title="form"
              onSubmit={this.handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#fff",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Enter Space"
                color="info"
                type="number"
                autoComplete="off"
                onChange={this.handleChange}
                value={this.state.space === 0 ? "" : this.state.space}
                sx={{ background: "#fff", borderRadius: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2, borderRadius: 2 }}
              >
                Set Space
              </Button>
            </form>
          </Paper>
      </Box>
    );
  }
}
export default withRouter(ParkingApp);