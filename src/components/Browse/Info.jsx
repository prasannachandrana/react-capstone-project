import React from 'react'
import ProfileImg from '../../assests/char-img.png'
import './Info.css'
function Info() {
  var storedData = JSON.parse(localStorage.getItem('formData'));
  var storedGenre = JSON.parse(localStorage.getItem('selectedGenres'));


  return (
    <div className='info'>
      <img className='profile_img' src={ProfileImg} alt='profile' />
      <div className='user_selected'>
        <div className='user_info'>
          <p>{storedData.name}</p>
          <p>{storedData.email}</p>
          <h2>{storedData.username}</h2>
        </div>
        <div className='user_genre'>
          {storedGenre.slice(0,8).map((data) => (
            <p>{data}</p>
          )
          )}
        </div>
      </div>
    </div>
  )
}

export default Info;