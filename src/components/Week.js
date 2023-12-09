import React, { useEffect, useState } from 'react';
import dayjs from "dayjs";
import Draggable from 'react-draggable';

import EventModal from './modals/createEventModal';

export default function Week() {

  const startOfWeek = dayjs().startOf('week');

  let weekDates = [];
  for (let i = 0; i < 7; i++) {
    weekDates.push(startOfWeek.add(i, 'day').format('YYYY-MM-DD'));
  }
  const [showEventModal, setShowEventModal] = useState(false);

  const displayEventModal = (e) => {
    setShowEventModal(true)
  }

  const handleClickOnMangoByte = (e) => {
    setShowEventModal(false)
  }

  return (
    <>
      <div className='week-background'>
        <div className='calendar-week-view'>
          <Draggable bounds="parent">
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th role="columnheader">
                      {/* <h4></h4>
                  <p className='text-xl'></p> */}
                    </th>
                    {weekDates.map(date => (
                      <th role="columnheader" key={date}>
                        <h4>{dayjs(date).format('ddd')}</h4>
                        <p className='text-xl'>{dayjs(date).format('D')}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 24 }).map((_, hour) => (
                    <tr key={hour}>
                      <td className="align-top">{hour}:00</td>
                      {weekDates.map(date => (
                        <td className='border-t border-l border-gray-100 rounded-l-none' key={`${date}-${hour}-00-59`}
                          onClick={displayEventModal}></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Draggable>
        </div>
        {showEventModal &&
          <div
            className='mangobyte overlay bg-gray-500 bg-opacity-50'
            onClick={(e) => { handleClickOnMangoByte(e) }}
          >
            <Draggable bounds="parent">
              <div onClick={(e) => { e.stopPropagation() }} className='w-1/4 h-1/4 bg-amber-200 relative'>
                <EventModal />
              </div>
            </Draggable>

          </div>
        }
      </div>
    </>
  );
}
