import React, { useState, useEffect } from 'react';
import dayjs from "dayjs";
import Draggable from 'react-draggable';

import EventModal from '../modals/createEventModal';

export default function Week() {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const viewportWidth = document.documentElement.clientWidth
    const viewportHeight = document.documentElement.clientHeight
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.offsetHeight;

    const tableContainer = document.getElementById('table-container');
    const tableWidth = tableContainer.offsetWidth;
    const tableHeight = tableContainer.offsetHeight;
    const tableLeft = (viewportWidth / 2) - (tableWidth / 2) - 100;
    const tableTop = (viewportHeight / 2) - (tableHeight / 2) - 50 - navbarHeight;
    const tableStyleLeft = `${tableLeft}px`;
    const tableStyleTop = `${tableTop}px`;

    tableContainer.style.left = tableStyleLeft;
    tableContainer.style.top = tableStyleTop;
  }, [])

  const startOfWeek = dayjs().startOf('week');

  let weekDates = [];
  for (let i = 0; i < 7; i++) {
    weekDates.push(startOfWeek.add(i, 'day').format('YYYY-MM-DD'));
  }
  const [showEventModal, setShowEventModal] = useState(false);
  const hideEventModal = () => {
    setShowEventModal(false)
  }

  const [eventModalProps, setEventModalProps] = useState({
    hideModal: hideEventModal,
    boxWidth: 0,
    boxHeight: 0,
    boxTop: 0,
    boxLeft: 0,
  })

  const displayEventModal = () => {
    const element = document.getElementById('table-container');
    const rectPoints = element.getBoundingClientRect();

    setEventModalProps({
      hideModal: hideEventModal,
      boxWidth: element.offsetWidth - 100,
      boxHeight: element.offsetHeight - 50,
      boxTop: rectPoints.top + 50,
      boxLeft: rectPoints.left + 100,
    })
    setShowEventModal(true);
  }

  return (
    <>
      <div className='week-background calendarAndModalDnDSpace'>
        <div className='calendar-week-view'>
          <Draggable
            bounds="parent"
            onDrag={() => setIsDragging(true)}
            onStop={() => {
              setTimeout(() => {
                setIsDragging(false)
              }, 30)
            }}
          >
            <div id='table-container'
              className='absolute'
            >
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
                  {Array.from({ length: 24 }).map((_, hour) => {
                    hour = hour.toString().padStart(2, '0');
                    return (
                      <tr key={hour}>
                        <td className="align-top font-mono">{hour}:00</td>
                        {weekDates.map(date => (
                          <td className='border-t border-l border-gray-100 rounded-l-none' key={`${date}-${hour}-00-59`}
                            onClick={(e) => { isDragging ? e.preventDefault() : displayEventModal() }}></td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Draggable>
        </div>
        {showEventModal && <EventModal props={eventModalProps} />}
      </div>
    </>
  );
}
