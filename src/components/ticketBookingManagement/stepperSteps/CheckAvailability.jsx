/*
------------------------------------------------------------------------------
File: CheckAvailability.js
Purpose: This file contains the CheckAvailability React component, which
displays available train schedules and allows users to select a schedule.
Author: IT20122096
Date: 2023-10-13
------------------------------------------------------------------------------
*/
import React, { Component } from "react";
import AvailableTrainsTables from "../relatedComponents/AvailableTrainsTabel";

export default class CheckAvailability extends Component {
  render() {
    const { schedules, onSelectSchedule } = this.props;
    console.log(schedules);
    return (
      <div>
        {schedules.length > 0 ? (
          <AvailableTrainsTables
            schedules={schedules}
            onSelectSchedule={onSelectSchedule}
          />
        ) : (
          <div>Sorry no available trains for entered details.</div>
        )}
      </div>
    );
  }
}
