import React, { useState } from 'react';
import Draggable from 'react-draggable';


export default function EventModal() {

  return (
    <>
      <div className='w-full h-full mango-content'>
        <Draggable bounds="parent">
          <div className='modal-content'>

            <h2>Create Event</h2>
            <button className='close-modal'>Close</button>

          </div>
        </Draggable>
      </div>
    </>
  );
}
