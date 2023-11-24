import React from 'react';
import Info from './Info';
import Weather from './Weather';
import Notes from './Notes';
import News from './News';
import './Browse.css'
import Timer from './Timer';
function Browse() {
  return (
    <>
      <div className='container3'>
        <div className='vertical'>
          <Info />
          <Weather />
          <Timer/>
        </div>
        <div><Notes /></div>
        <div><News /></div>
      </div>
    </>
  )
}

export default Browse;