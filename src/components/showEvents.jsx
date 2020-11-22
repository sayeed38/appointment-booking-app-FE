import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button, Box, Paper, Typography, Divider } from "@material-ui/core";
import axios from "axios";
import URL from "./../utility/data";

function ShowEvents() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const getDateVal = (selectedDate) => {
    const dateVal = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    const date = year + "-" + month + "-" + dateVal;
    return date;
  };

  const getEvents = async () => {
    const startDateFTD = getDateVal(startDate);
    const endDateFTD = getDateVal(endDate);
    console.log(startDateFTD, endDateFTD);
    const response = await axios({
      method: "post",
      url: URL + "getEvents",
      data: {
        startdate: startDateFTD,
        enddate: endDateFTD,
      },
    });
    console.log(response.data.events);
    setEvents(response.data.events);
  };
  console.log(events);
  return (
    <div className="show-event-root">
      <div className="show-event-form">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Box className="form-input">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              id="date-picker-inline"
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Box>
          <Box className="form-input">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              id="date-picker-inline"
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Box>
        </MuiPickersUtilsProvider>
        <Box>
          <Button variant="contained" color="primary" onClick={getEvents}>
            Show Events
          </Button>
        </Box>
      </div>
      <div>
        {events.map((event) => (
          <div key={event.date} className="events-parent">
            <h3>{event.date}</h3>
            {console.log(event)}
            <div className="event-card">
              {event.events.length > 0 ? (
                event.events.map((time) => (
                  <Paper
                    elevation={1}
                    key={time.datetime}
                    className="event-datetime"
                  >
                    <Typography variant="body">{time.datetime}</Typography>
                  </Paper>
                ))
              ) : (
                <>
                  <Typography variant="body" className="no-events">
                    No Events
                  </Typography>
                </>
              )}
            </div>
            <Divider className="divider" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowEvents;
