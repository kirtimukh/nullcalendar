import React, { Component } from 'react';
import dayjs from "dayjs";
import Draggable from 'react-draggable';

export default class Week extends Component {

  render() {
    const startOfWeek = dayjs().startOf('week');

    let weekDates = [];
    for (let i = 0; i < 7; i++) {
      weekDates.push(startOfWeek.add(i, 'day').format('YYYY-MM-DD'));
    }

    return (
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
                    <td className='border-t border-l border-gray-100 rounded-l-none' key={`${date}-${hour}-00-59`}></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </Draggable>
      </div>
    );
  }
}

