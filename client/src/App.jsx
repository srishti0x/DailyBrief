import { useEffect, useState } from "react";
import { fetchAllNews, fetchTopHeadlines, fetchCountryNews } from "./api";
import "./App.css";

function App() {
  const [news, setNews] = useState([]);
  const [headlines, setHeadlines] = useState([]);
  const [indiaNews, setIndiaNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingHeadlines, setLoadingHeadlines] = useState(true);
  const [loadingIndia, setLoadingIndia] = useState(true);

  useEffect(() => {
    // Load All News
    const loadAllNews = async () => {
      const data = await fetchAllNews(1, 20);
      if (data.success && data.data?.articles) {
        setNews(data.data.articles);
      } else {
        setNews([]);
      }
      setLoadingNews(false);
    };

    // Load Top Headlines
    const loadHeadlines = async () => {
      const data = await fetchTopHeadlines("general", 1, 20);
      if (data.success && data.data?.articles) {
        setHeadlines(data.data.articles);
      } else {
        setHeadlines([]);
      }
      setLoadingHeadlines(false);
    };

    // Load India News
    const loadIndiaNews = async () => {
      const data = await fetchCountryNews("in", 1, 20);
      if (data.success && data.data?.articles) {
        setIndiaNews(data.data.articles);
      } else {
        setIndiaNews([]);
      }
      setLoadingIndia(false);
    };

    loadAllNews();
    loadHeadlines();
    loadIndiaNews();
  }, []);

  return (
    <div className="container">
      {/* Top Headlines */}
      <h1 className="section-title">Top Headlines</h1>
      <div className="headlines-grid">
        {loadingHeadlines ? (
          <p>Loading...</p>
        ) : (
          headlines.map((article, index) => (
            <div key={index} className="headline-card">
              {article.urlToImage && <img src={article.urlToImage} alt="News" className="news-img" />}
              <h3 className="news-title">{article.title}</h3>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Read more</a>
            </div>
          ))
        )}
      </div>

      {/* India News */}
      <h1 className="section-title">India News</h1>
      <div className="news-grid">
        {loadingIndia ? (
          <p>Loading...</p>
        ) : (
          indiaNews.map((article, index) => (
            <div key={index} className="news-card">
              {article.urlToImage && <img src={article.urlToImage} alt="News" className="news-img" />}
              <h3 className="news-title">{article.title}</h3>
              <p className="news-desc">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Read more</a>
            </div>
          ))
        )}
      </div>

      {/* All News */}
      <h1 className="section-title">All News</h1>
      <div className="news-grid">
        {loadingNews ? (
          <p>Loading...</p>
        ) : (
          news.map((article, index) => (
            <div key={index} className="news-card">
              {article.urlToImage && <img src={article.urlToImage} alt="News" className="news-img" />}
              <h3 className="news-title">{article.title}</h3>
              <p className="news-desc">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">Read more</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
