import React, { useState } from 'react'
import TaskItem from './TaskItem';


const TaskSet = ({ fieldno, remove }) => {
    const handleRemove = () => {
        remove(fieldno);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const inputValue = event.target.value;
            if (inputValue.length > 0) {
                console.log('Enter key pressed with input value: ' + inputValue);
                addItem(event);
            }
        }
    }

    const [taskItems, setTaskItems] = useState([]);
    const [lastItemId, setLastItemId] = useState(0);

    const addItem = (e) => {
        setTaskItems(preTaskItems => [...preTaskItems, { fieldno: lastItemId }]);
        setLastItemId(lastItemId + 1);
        e.stopPropagation();
    }

    const removeTaskItem = (fieldno) => {
        setTaskItems(prevTaskItems => prevTaskItems.filter(taskItem => taskItem.fieldno !== fieldno));
    }

    return (
        <>
            <div className='relative flex flex-stretch w-full border-2 border-gray-300 rounded-lg'>
                <button
                    className='text-3xl hover:bg-black hover:text-white w-8'>
                    &#8250;
                </button>
                <input
                    type="text"
                    className="w-full h-10 px-4"
                    placeholder="Add a task"
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={handleRemove}
                    className='text-3xl hover:bg-black hover:text-white w-8'>
                    -
                </button>
            </div >
            {taskItems.map(taskItem => <TaskItem key={taskItem.fieldno} fieldno={taskItem.fieldno} remove={removeTaskItem} />)}
        </>
    )
}

export default TaskSet