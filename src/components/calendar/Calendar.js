import React from 'react'

import Week from "./Week";
import Month from "./Month";

const Calendar = ({ props }) => {
    return (
        <>
            {props.selectedView === "Week" ? <Week /> : <Month />}
        </>
    )
}

export default Calendar