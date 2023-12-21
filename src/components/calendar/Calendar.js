import React, { useEffect, useState } from 'react'

import Week from "./Week";
import Month from "./Month";

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

    const [zStack, setZStack] = useState(['Month', 'Week'])

    const allProps = {
        zStack, setZStack, parentSP
    }

    return (
        <>
            {/* DndSpace: required for Draggable to work - position (relative or absolute), width, and height */}
            <div className='w-full h-full absolute' id='DnDSpace'>
                <Month {...allProps} />
                {showWeek && <Week {...allProps} />}
            </div>
        </>
    )
}

export default Calendar