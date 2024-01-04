import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip'
import TaskSet from './TaskSet'


const Board = ({ selectDate }) => {
    const [taskSets, setTaskSets] = useState([]);
    const [lastTaskId, setLastTaskId] = useState(0);

    const createNewChecklist = (e) => {
        setTaskSets(prevTaskSets => [...prevTaskSets, { fieldno: lastTaskId }]);
        setLastTaskId(lastTaskId + 1);
        e.stopPropagation();
    }

    const removeTaskSet = (fieldno) => {
        setTaskSets(prevTaskSets => prevTaskSets.filter(taskSet => taskSet.fieldno !== fieldno));
    }

    return (
        <div className="flex flex-col" id="items-of-the-day">
            <div className="flex justify-between w-full top-0">
                <div>
                    <h1 className="font-semibold">
                        Schedule for {selectDate.toDate().toDateString()}
                    </h1>
                    <p className="text-gray-400">No meetings for today.</p>
                </div>
                <div className='flex items-center'>
                    <button
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                        className="
                        flex items-center justify-center
                        h-8 w-8 rounded-full text-3xl
                        border-gray-500 border-2
                        hover:bg-black hover:text-white"
                        onClick={(e) => createNewChecklist(e)}
                    >+</button>
                    <Tooltip id="my-tooltip" />
                </div>
            </div>
            <div className='w-full flex-grow'>
                {taskSets.map(taskSet => <TaskSet key={taskSet.fieldno} fieldno={taskSet.fieldno} remove={removeTaskSet} />)}
            </div>
        </div>
    )
}

export default Board
