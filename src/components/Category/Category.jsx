import React from 'react';
import './Category.css';
import Action from '../../assests/action.png';
import Drama from '../../assests/drama.png';
import Fantasy from '../../assests/fantasy.png';
import Fiction from '../../assests/fiction.png';
import Horror from '../../assests/horror.png';
import Music from '../../assests/music.png';
import Romance from '../../assests/romance.png';
import Thriller from '../../assests/thriller.png';
import Western from '../../assests/western.png';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel';

function Category() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const redirectTo = useNavigate();

  useEffect(() => {
    if (selectedGenres.length >= 3) {
      setErrorMessage('');
    }
  }, [selectedGenres]);

  const deleteItems = (genreName) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.filter((genre) => genre !== genreName)
    );
  };
  
  const handleNextPageClick = () => {
    if (selectedGenres.length < 3) {
      setErrorMessage('Please select at least 3 genres.');
    } else {
      setErrorMessage('');
      localStorage.setItem('selectedGenres', JSON.stringify(selectedGenres));
      redirectTo("/browse")
    }
  };

  const cardData = [
    {

      id:1,
      name: "Action",
      color: "#FF5209",
      image: Action
    },
    {
      id:2,
      name: "Drama",
      color: "#D7A4FF",
      image: Drama
    },
     {
      id:3,
      name: "Romance",
      color: "#11B800",
      image: Romance
    },
    {
      id:4,
      name: "Thriller",
      color: "#84C2FF",
      image: Thriller
    },
    {
      id:5,
      name: "Western",
      color: "#912500",
      image: Western
    },
    {
      id:6,
      name: "Horror",
      color: "#7358FF",
      image: Horror
    },
    {
      id:7,
      name: "Fantasy",
      color: " #FF4ADE",
      image: Fantasy
    },
    {
      id:8,
      name: "Music",
      color: "#E61E32",
      image: Music
    },
    {
      id:9,
      name: "Science Fiction",
      color: "#6CD061",
      image: Fiction
    }
  ]
  return (
    <div className='container'>
      <div className='LeftContainer'>
        <h1 id='header'>Super App</h1>
        <h1 className='desc'>Choose your entertainment<br />category</h1>
        <div className = 'Selection'>{selectedGenres.map((genre) => (
          <p className='selected'  style={{ backgroundColor: cardData.find((card) => card.name === genre)?.color }} ><b>{genre} <span className='Icon' onClick={() => deleteItems(genre)}><CancelIcon/></span></b></p>
        ))}</div>
        {errorMessage && <p className='error1'>{errorMessage}</p>}
      </div>
      <div className='RightContainer'>
        <div className='card'>
        {cardData.map(card => (
          <Cards key={card.id} data={card}
          setSelectedGenres={setSelectedGenres}
          selectedGenres={selectedGenres} />
        ))}
        </div>
        <button id="nextBtn" onClick={handleNextPageClick}><b>Next Page</b></button>
      </div>
    </div>
  )
}

const Cards = ({ data, selectedGenres, setSelectedGenres }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    if (clicked) {
      setSelectedGenres((prevSelectedGenres) => [...prevSelectedGenres, data.name]);
    } else {
      setSelectedGenres((prevSelectedGenres) =>
        prevSelectedGenres.filter((genre) => genre !== data.name)
      );
    }
  }, [clicked]);

  useEffect(() => {
    if (selectedGenres.includes(data.name)) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }, [selectedGenres]);

  return (
    <div
      className={`cardContainer ${clicked ? 'clicked' : ''}`}
      style={{ backgroundColor: data.color }}
      onClick={handleClick}
    >
      <h2 className='cardTitle'>{data.name}</h2>
      <img className='cardImage' src={data.image} alt={data.name} />
    </div>
  );
}

export default Category;