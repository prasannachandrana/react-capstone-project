import React from 'react'
import frontImg from "../../assests/frontImg.jpeg"
import './Left.css'

function Left() {
  return (
    <div className='LeftConatiner'>
        <img id='frontImg' src= {frontImg} alt='FrontImg'/>
        <h1 id="desc">Discover new things on <br/> Superapp</h1>
    </div>
  )
}

export default Left;