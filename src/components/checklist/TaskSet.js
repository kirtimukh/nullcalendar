import React from 'react'

const TaskSet = ({ fieldno, remove }) => {
    const handleRemove = () => {
        remove(fieldno);
    }

    return (
        <div className='relative flex flex-stretch w-full border-2 border-gray-300 rounded-lg'>
            <input type="text" className="w-full h-10 px-4" placeholder="Add a task" />
            <button
                onClick={handleRemove}
                className='text-3xl hover:bg-black hover:text-white w-8'>
                -
            </button>
        </div >
    )
}

export default TaskSet