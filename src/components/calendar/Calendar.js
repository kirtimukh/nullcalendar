import React, { useEffect, useState } from 'react'

import Week from "./Week";
import Month from "./Month";
import LMonth from './LMonth';
import LWeek from './LWeek';

const Calendar = () => {
    const [showWeek, setShowWeek] = useState(false)
    const [parentSP, setParentSP] = useState({
        boxWidth: 0,
        boxHeight: 0,
    })
    useEffect(() => {
        const selfContainer = document.getElementById('DnDSpace');
        setParentSP({
            boxWidth: selfContainer.offsetWidth,
            boxHeight: selfContainer.offsetHeight,
            boxLeft: selfContainer.offsetLeft,
            boxTop: selfContainer.offsetTop,
        })
        setShowWeek(true)
    }, [])

    const [zStack, setZStack] = useState([])

    const allProps = {
        zStack, setZStack, parentSP
    }

    return (
        <>
            {/* DndSpace: required for Draggable to work - position (relative or absolute), width, and height */}
            <div className='w-full h-full absolute' id='DnDSpace'>
                {false && <Month {...allProps} />}
                {false && <Week {...allProps} />}
                <LMonth {...allProps} componentName='Month' posRefElementId='events-of-the-day' />
                {showWeek && <LWeek {...allProps} componentName='Week' posRefElementId='week-container' />}
            </div>
        </>
    )
}

export default Calendar