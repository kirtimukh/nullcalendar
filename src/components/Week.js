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

  const hideEventModal = (e) => {
    setShowEventModal(false)
  }

  let isDragging = false;

  return (
    <>
      <div className='week-background'>
        <div className='calendar-week-view'>
          <Draggable
            bounds="parent"
            onDrag={() => isDragging = true}
            onStop={() => {
              setTimeout(() => {
                isDragging = false
              }, 100)
            }}
          >
            <div className='table-container'>
              <table>
                <thead>
                  <tr>
                    <th role="columnheader">
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
                          onClick={(e) => { isDragging ? e.preventDefault() : displayEventModal() }}></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Draggable>
        </div>
        {showEventModal && <EventModal hideModal={hideEventModal} />}
      </div>
    </>
  );
}
