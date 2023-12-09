import React, { useState } from 'react';
import Draggable from 'react-draggable';


export default function EventModal() {

  return (
    <>
      <div onClick={(event) => { event.stopPropagation() }} className='w-1/4 h-1/4 bg-amber-200 relative'>
        <div className='w-full h-full'>
          <div className='mangoform'>
            <h2>Create Event</h2>
            <button className='close-modal'>Close</button>
          </div>
        </div>
      </div>
    </>
  );
}
