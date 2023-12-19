import React, { useState, useEffect, useRef } from 'react';
import dayjs from "dayjs";
import Draggable from 'react-draggable';

import EventModal from '../modals/createEventModal';

export default function Week() {
  useEffect(() => {
    const viewportWidth = document.documentElement.clientWidth
    const viewportHeight = document.documentElement.clientHeight
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.offsetHeight;

    const tableContainer = document.getElementById('table-container');
    const tableWidth = tableContainer.offsetWidth;
    const tableHeight = tableContainer.offsetHeight;
    const tableLeft = (viewportWidth / 2) - ((tableWidth - 100) / 2) - 100;
    const tableTop = (viewportHeight / 2) - ((tableHeight - 50) / 2) - 50 - navbarHeight;
    const tableStyleLeft = `${tableLeft}px`;
    const tableStyleTop = `${tableTop}px`;

    tableContainer.style.left = tableStyleLeft;
    tableContainer.style.top = tableStyleTop;

    console.log(tableContainer.style.left, tableContainer.style.top)
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

    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar.offsetHeight;

    setEventModalProps({
      hideModal: hideEventModal,
      boxWidth: element.offsetWidth - 100,
      boxLeft: rectPoints.left + 100,
      boxHeight: element.offsetHeight - 50,
      boxTop: rectPoints.top + 50 - navbarHeight,
    })

    console.log(eventModalProps)
    setShowEventModal(true);
  }

  const nodeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

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
        <div ref={nodeRef} className='absolute' id='table-container'>
          <div>
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
        </div>
      </Draggable>

      {showEventModal && <EventModal props={eventModalProps} />}
    </>
  );
}
