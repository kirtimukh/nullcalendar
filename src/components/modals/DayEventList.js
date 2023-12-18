import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi';


const DayEventList = ({ selectDate }) => {
    const [returnDate, setReturnDate] = useState();
    const [isScheduled, setIsScheduled] = useState(null);

    const postSelectDate = (date) => {
        fetch("http://localhost:8000/meetings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date: date.toDate().toDateString(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setReturnDate(data.date);
                setIsScheduled(data.scheduled)
            });
    }

    return (
        <div className="h-96 w-96 sm:px-5 display">
            <div className="h-10 flex">
                <div>
                    <h1 className="font-semibold">
                        Schedule for {selectDate.toDate().toDateString()}
                    </h1>
                    <p className="text-gray-400">No meetings for today.</p>
                </div>
                <div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
                        onClick={() => {
                            postSelectDate(selectDate)
                        }}
                    >
                        <FiPlus className="w-full h-full"
                        />
                    </button>
                </div>
                <div>
                    {returnDate && isScheduled && <h1>Your meeting is booked for {returnDate}</h1>}
                    {isScheduled === false && <h1>Your meeting is not booked</h1>}
                </div>
            </div>
        </div>
    )
}

export default DayEventList
