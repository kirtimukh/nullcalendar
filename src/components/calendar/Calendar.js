import React from 'react'

import Week from "./Week";
import Month from "./Month";

const Calendar = ({ props }) => {
    return (
        <>
            {/* DndSpace: required for Draggable to work - position (relative or absolute), width, and height */}
            <div className='w-full h-full relative z-10' id='DnDSpace'>
                <div className='relative w-full h-full z-10' id='calendar-week'>
                    {props.selectedView === "Week" ? <Week /> : <Month />}
                </div>
            </div>
        </>
    )
}

export default Calendar