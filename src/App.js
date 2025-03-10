import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsList from "./components/NewsList";
import Filter from "./components/Filter";
import InfiniteScroll from "react-infinite-scroll-component";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("general");
  const [hasMore, setHasMore] = useState(true);

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  console.log("API Key:", apiKey);
  const baseUrl = "https://newsapi.org/v2/top-headlines";

  const fetchNews = async (reset = false) => {
    setLoading(true);
    try {
      const response = await axios.get(baseUrl, {
        params: {
          apiKey,
          category,
          page,
          pageSize: 10,
          country: "us",
        },
      });
      const newArticles = response.data.articles;
      if (reset) {
        setArticles(newArticles);
      } else {
        setArticles((prev) => [...prev, ...newArticles]);
      }
      setHasMore(newArticles.length > 0);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews(true);
  }, [category]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
    fetchNews();
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
    setArticles([]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">News App</h1>
      </header>
      <main className="container mx-auto p-4">
        <Filter setCategory={handleCategoryChange} />
        <InfiniteScroll
          dataLength={articles.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<h4 className="text-center">Loading...</h4>}
          endMessage={<p className="text-center">No more news to load.</p>}
        >
          <NewsList articles={articles} />
        </InfiniteScroll>
        {loading && page === 1 && (
          <p className="text-center">Loading initial news...</p>
        )}
      </main>
    </div>
  );
};

export default App;