import React, { Component } from 'react'
import AvailableTrainsTables from '../AvailableTrainsTabel'

export default class CheckAvailability extends Component {

  render() {
    const {schedules,onSelectSchedule} = this.props
    console.log(schedules)
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
