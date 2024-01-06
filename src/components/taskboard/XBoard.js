import React, { useState } from 'react'
import TaskGroupMini from './TaskGroupMini';
import TaskGroupDetail from './TaskGroupDetail';
import { Tooltip } from 'react-tooltip'
import { fakeTaskGroups } from '../../faked_data/taskGroups';


const XBoard = ({
    isDragging,
    parentSP,
    displayEventModal,
    contextProps
}) => {
    const [taskGroups, setTaskGroups] = useState([]);
    const [lastGroupId, setLastGroupId] = useState(100);

    const addTaskGroup = (e) => {
        setTaskGroups(prevTaskGroups => [...prevTaskGroups, { fieldno: lastGroupId }]);
        setLastGroupId(lastGroupId + 1);
        e.stopPropagation();
    }

    const removeTaskGroup = (fieldno) => {
        setTaskGroups(prevTaskGroups => prevTaskGroups.filter(taskGroup => taskGroup.fieldno !== fieldno));
    }

    const [showGroupDetail, setShowGroupDetail] = useState(false);
    const [groupDetails, setGroupDetails] = useState({});
    const showGroupDetailFn = (groupId) => {
        const groupTasks = fakeTaskGroups[groupId].tasks;
        setGroupDetails({
            groupTasks,
            groupId
        });
        setShowGroupDetail(true);
    }

    return (
        <>
            <div className='flex gap-5'>
                <div className='basis-1/4'>
                    <div className="flex justify-between w-full top-0">
                        <div className='flex justify-between w-full'>
                            <h1 className="font-semibold">
                                Workspace
                            </h1>
                            <button
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="Hello world!"
                                className="rounded-full text-xl h-6 w-6
                                    hover:bg-black hover:text-white
                                    leading-none"
                                onClick={(e) => addTaskGroup(e)}
                            >&#43;
                            </button>
                            <Tooltip id="my-tooltip" />
                        </div>
                    </div>
                    <div className='w-full flex-grow'>
                        {taskGroups.map(taskGroup => <TaskGroupMini key={taskGroup.fieldno} fieldno={taskGroup.fieldno} name={""} />)}

                        {Object.values(fakeTaskGroups).map(taskGroup => <TaskGroupMini key={taskGroup.id}
                            fieldno={taskGroup.id}
                            groupId={taskGroup.id}
                            name={taskGroup.name}
                            showGroupDetailFn={showGroupDetailFn}
                        />)}
                    </div>
                </div>
                <div className='basis-3/4'>
                    {showGroupDetail && <TaskGroupDetail
                        key={groupDetails.groupId}
                        remove={removeTaskGroup}
                        groupId={groupDetails.groupId}
                        groupTasks={groupDetails.groupTasks}
                    />}
                </div>
            </div>
        </>
    )
}

export default XBoard