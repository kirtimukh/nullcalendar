import React, { useRef, useState } from 'react'
import Draggable from 'react-draggable';
import HOC from './calendar/HOC';
import XMonth from './calendar/XMonth';
import XWeek from './calendar/XWeek';


const DraggableX = ({
    componentName,
    parentSP,
    handleMouseDown,
    zNumber,
    displayEventModal,
    contextProps
}) => {
    const nodeRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    let XComponent, componentId;
    if (componentName === 'XMonth') {
        XComponent = XMonth
        componentId = 'month-container'
    } else if (componentName === 'XWeek') {
        XComponent = XWeek
        componentId = 'week-container'
    }

    const props = {
        isDragging,
        parentSP,
        displayEventModal,
        contextProps
    }

    return (
        <>
            <Draggable
                bounds="parent"
                nodeRef={nodeRef}
                onDrag={() => setIsDragging(true)}
                onStop={() => {
                    setTimeout(() => {
                        setIsDragging(false)
                    }, 30)
                }}
            >
                <div
                    id={componentId}
                    ref={nodeRef}
                    style={{ zIndex: zNumber }}
                    className={`flex gap-10 absolute items-stretch`}
                    onMouseDownCapture={(e) => handleMouseDown(e)}
                >
                    <XComponent {...props} />
                </div>
            </Draggable>
        </>
    )
}

export default HOC(DraggableX)