import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  FormControl,
  Select,
  MenuItem,
  Button,
  TextField,
  Paper,
  Box,
  Snackbar,
} from "@material-ui/core";
import "./styles.css";
import axios from "axios";
import URL from "./../utility/data";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: "20px",
    marginBottom: "20px",
    minWidth: 120,
    display: "flex",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function BookEvents() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duration, setDuration] = useState("");
  const [timezone, setTimeZone] = useState("Asia/Kolkata");
  const [availableEvent, setAvailableEvent] = useState([]);
  const [error, setError] = React.useState({
    isSuccessed: false,
    message: "Success!",
    show: false,
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAvailableEvent([]);
  };

  const handleDurationChange = (event) => {
    if (+event.target.value < 0) {
      return;
    }
    setDuration(event.target.value);
  };

  const handleSelectChange = (event) => {
    setTimeZone(event.target.value);
    setAvailableEvent([]);
  };

  const getDateVal = (selectedDate) => {
    const dateVal = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    const date = year + "-" + month + "-" + dateVal;
    return date;
  };

  const handleSubmit = async () => {
    const date = getDateVal(selectedDate);
    const response = await axios({
      method: "post",
      url: URL + "freeSlots",
      data: {
        date: date,
        timezone: timezone,
      },
    });
    setAvailableEvent(response.data.FreeSlot);
  };

  const createEvent = async (event) => {
    if (duration === "") {
      handleError("Please provide the duration", false);
      return;
    }
    const date = getDateVal(selectedDate);
    let hour = +event.slice(0, 2);
    const min = event.slice(3, 5);
    if (event.slice(5).trim() === "PM") {
      hour += 12;
    } else {
      console.log(event.slice(0, 1));
      if (event.slice(0, 1) !== "1") hour = "0" + hour;
    }
    const datetime = date + "T" + hour + ":" + min;
    let response;
    try {
      response = await axios({
        method: "post",
        url: URL + "createEvent",
        data: {
          datetime: datetime,
          duration: duration,
          timezone: timezone,
        },
      });
    } catch (error) {
      response = "Error";
    }

    if (response !== "Error") {
      handleError("Event Created", true);
    } else {
      handleError("Event Not Created", false);
    }
    console.log(response);
    setAvailableEvent([]);
    setDuration("");
  };

  const handleError = (message, isSuccessed) => {
    setError({ isSuccessed: isSuccessed, message: message, show: true });
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError({
      isSuccessed: error.isSuccessed,
      message: error.message,
      show: false,
    });
  };

  return (
    <div className="root">
      <Paper className="left-section" elevation={0} variant="outlined">
        <FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date"
              className="form-input"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="standard-basic"
            label="Duration"
            value={duration}
            className="form-input"
            onChange={handleDurationChange}
          />
          <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={timezone}
              onChange={handleSelectChange}
              className="form-input"
            >
              <MenuItem value={"Asia/Kolkata"} className="form-input">
                Asia/Kolkata
              </MenuItem>
              <MenuItem value={"America/Los_Angeles"} className="form-input">
                America/Los_Angeles
              </MenuItem>
              <MenuItem value={"Asia/Dubai"} className="form-input">
                Asia/Dubai
              </MenuItem>
              <MenuItem value={"Europe/London"} className="form-input">
                Europe/London
              </MenuItem>
              <MenuItem value={"Asia/Istanbul"} className="form-input">
                Asia/Istanbul
              </MenuItem>
              <MenuItem value={"US/Eastern"} className="form-input">
                US/Eastern
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className="form-input"
            onClick={handleSubmit}
          >
            Get Free Slots
          </Button>
        </FormControl>
      </Paper>
      <div className="right-section">
        <h3>Available Time Slots</h3>
        <div className="right-section-events">
          {availableEvent.map((event) => (
            <Box key={event} m={1}>
              <Button variant="outlined" onClick={() => createEvent(event)}>
                {event}
              </Button>
            </Box>
          ))}
        </div>
      </div>
      <Snackbar
        open={error.show}
        autoHideDuration={error.isSuccessed ? 1000 : 2500}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity={error.isSuccessed ? "success" : "error"}
        >
          {error.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default BookEvents;
