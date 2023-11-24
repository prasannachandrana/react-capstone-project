import React, { useEffect, useState } from 'react';
import './News.css';
import { useNavigate } from 'react-router-dom';

function News() {
  const redirectTo = useNavigate();
  const [news, setNews] = useState('');
  const [articleIndex, setArticleIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const result = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=f0080e4784ae485ba2add0c338c84229");
        const data = await result.json();
        setNews(data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching the news", error);
      }
    };
    fetchNews();
  }, []);

  const nextNews = () => {
    if (news && news.articles) {
      const newIndex = (articleIndex + 1) % news.articles.length;
      setArticleIndex(newIndex);
    }
  };

  const handleNextPageClick = () => {
    redirectTo('/movies');
  };

  return (
    <div>
      {news && news.articles && news.articles.length > 0 ? (
        <div className='News'>
          <div>
            <img className='NewsImg' src={news.articles[articleIndex].urlToImage} alt="News Article" />
            <div className='NewsTitle'>
              <h2 className='Title'>{news.articles[articleIndex].title}</h2><br />
              <p className='DateTime'>{news.articles[articleIndex].publishedAt}</p>
            </div>
          </div>
          <p className='NewsText'>{news.articles[articleIndex].description} <span className='ReadMore'><a href={news.articles[articleIndex].url} target='_blank' rel='noopener noreferrer'>Click here to read more...</a></span>
            <h4 className='nextNews' onClick={nextNews}>Next News →</h4>
          </p>
        </div>
      ) : (
        <p className='newsError'>Sorry! Access to fetch News from API has been blocked due to CORS policy restrictions.</p>
      )}
      <button id="nextBtn2" onClick={handleNextPageClick}><b>Next Page</b></button>
    </div>
  );
}

export default News;
