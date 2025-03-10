import React, { useState, useEffect, useCallback } from 'react';
import NewsList from './NewsList';

const API_KEY = 'YOUR_ACTUAL_NEWS_API_KEY';
const API_URL = 'https://newsapi.org/v2/top-headlines';

const categories = ['general', 'business', 'technology', 'sports', 'entertainment'];

const NewsApp = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchNews = useCallback(async (reset = false) => {
    setLoading(true);
    try {
      const url = `${API_URL}?country=us&category=${category}&page=${page}&apiKey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log('Fetched news data:', data); 
      if (reset) {
        setArticles(data.articles);
      } else {
        setArticles(prev => [...prev, ...data.articles]);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  }, [category, page]);

  useEffect(() => {
    setPage(1);
    fetchNews(true);
  }, [category, fetchNews]);

  useEffect(() => {
    if (page > 1) {
      fetchNews();
    }
  }, [page, fetchNews]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="news-app">
      <div className="category-filter">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => handleCategoryChange(cat)}
            className={category === cat ? 'active' : ''}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <NewsList articles={articles} />
      {loading && <p className="loading">Loading...</p>}
      <div className="load-more">
        <button onClick={loadMore} disabled={loading}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default NewsApp;
