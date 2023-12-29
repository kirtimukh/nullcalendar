import React, { useEffect, useState } from 'react'

import Week from "./Week";
import Month from "./Month";
import LMonth from './LMonth';
import LWeek from './LWeek';
import DraggableX from '../DraggableX';

const Calendar = () => {

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
    }, [])

    const [zStack, setZStack] = useState(['Month', 'Week'])

    const allProps = {
        zStack, setZStack, parentSP
    }

    return (
        <>
            {/* DndSpace: required for Draggable to work - position (relative or absolute), width, and height */}
            <div className='w-full h-full absolute' id='DnDSpace'>
                {/* {true && <Month {...allProps} />}
                {true && <Week {...allProps} />}
                {true && <LMonth {...allProps} componentName='Month' posRefElementId='events-of-the-day' />}
                {true && <LWeek {...allProps} componentName='Week' posRefElementId='week-container' />} */}
                {true && <DraggableX {...allProps} componentName='XMonth' posRefElementId='events-of-the-day' />}
                {true && <DraggableX {...allProps} componentName='XWeek' posRefElementId='week-container' />}
            </div>
        </>
    )
}

export default Calendar