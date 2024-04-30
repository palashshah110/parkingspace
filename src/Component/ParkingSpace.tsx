import { Button, Grid, Paper, Typography } from '@mui/material'
import React, { Component } from 'react'

interface PropsTypes{
    checkOccupiedId:any;
    handleOccupied:any;
    index:number;
}
export default class ParkingSpace extends Component <PropsTypes>{
  render() {
    return (
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
            background: this.props.checkOccupiedId(this.props.index + 1)
              ? "#f1bfbf"
              : "lightblue",
          }}
        >
          <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
            Parking Space {this.props.index + 1}
          </Typography>
          {this.props.checkOccupiedId(this.props.index + 1) && (
            <Button
              variant="contained"
              disableElevation
              color="warning"
              onClick={this.props.handleOccupied(this.props.index)}
            >
              {"Occupied"}
            </Button>
          )}
        </Paper>
      </Grid>

    )
  }
}
