import React, { useState, useEffect } from 'react';
import './Recommendations.css'; // 稍后创建

// --- Mock data is now moved to the server ---
// const mockRecommendations = { ... }; 
// -------------------------------------------

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState(null); // Initial state for data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:3001/api/recommendations')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setRecommendations(data);
        setLoading(false);
      })
      .catch(fetchError => {
        console.error("Failed to fetch recommendations:", fetchError);
        setError(fetchError.message);
        setLoading(false);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div className="loading-message">加载推荐内容中...</div>;
  }

  if (error) {
    return <div className="error-message">加载推荐内容失败: {error}</div>;
  }

  if (!recommendations) {
    // This case should ideally be covered by loading/error states
    return <div className="info-message">暂无推荐内容。</div>;
  }

  return (
    <div className="recommendations-section">
      <h2>推荐</h2>
      <p>一些我觉得很棒的书籍、影视、网站、博客和音乐。</p>

      {/* 书籍推荐 */}
      {recommendations.books && recommendations.books.length > 0 && (
        <section className="rec-category">
          <h3><i className="icon-book"></i> 书籍</h3>
          <div className="rec-list book-list">
            {recommendations.books.map(book => (
              <div key={book.id} className="rec-item book-item">
                {book.imageUrl && <img src={book.imageUrl} alt={book.title} className="rec-image book-cover" loading="lazy" />}
                <div className="rec-info">
                  <h4 className="rec-title">{book.title}</h4>
                  <p className="rec-author">作者: {book.author}</p>
                  <p className="rec-review">{book.review}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 影视推荐 */}
      {recommendations.movies && recommendations.movies.length > 0 && (
        <section className="rec-category">
          <h3><i className="icon-movie"></i> 影视</h3>
          <div className="rec-list movie-list">
            {recommendations.movies.map(movie => (
              <div key={movie.id} className="rec-item movie-item">
                {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} className="rec-image movie-poster" loading="lazy" />}
                <div className="rec-info">
                  <h4 className="rec-title">{movie.title}</h4>
                  <p className="rec-director">导演: {movie.director}</p>
                  <p className="rec-review">{movie.review}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 网站推荐 */}
      {recommendations.websites && recommendations.websites.length > 0 && (
        <section className="rec-category">
          <h3><i className="icon-website"></i> 网站</h3>
          <ul className="rec-list website-list">
            {recommendations.websites.map(site => (
              <li key={site.id} className="rec-item website-item">
                <a href={site.url} target="_blank" rel="noopener noreferrer" className="rec-link">
                  <h4 className="rec-title site-name">{site.name}</h4>
                </a>
                <p className="rec-description">{site.description}</p>
                <a href={site.url} target="_blank" rel="noopener noreferrer" className="rec-external-link">访问 <span aria-hidden="true">→</span></a>
              </li>
            ))}
          </ul>
        </section>
      )}
      
      {/* 博客推荐 */}
      {recommendations.blogs && recommendations.blogs.length > 0 && (
          <section className="rec-category">
              <h3><i className="icon-blog"></i> 博客</h3>
              <ul className="rec-list blog-list">
                  {recommendations.blogs.map(blog => (
                      <li key={blog.id} className="rec-item blog-item">
                          <a href={blog.url} target="_blank" rel="noopener noreferrer" className="rec-link">
                              <h4 className="rec-title blog-name">{blog.name}</h4>
                          </a>
                          <p className="rec-description">{blog.description}</p>
                          <a href={blog.url} target="_blank" rel="noopener noreferrer" className="rec-external-link">访问 <span aria-hidden="true">→</span></a>
                      </li>
                  ))}
              </ul>
          </section>
      )}

      {/* 音乐推荐 */}
      {recommendations.music && recommendations.music.length > 0 && (
        <section className="rec-category">
          <h3><i className="icon-music"></i> 音乐</h3>
          <div className="rec-list music-list">
            {recommendations.music.map(music => (
              <div key={music.id} className="rec-item music-item">
                {music.albumCoverUrl && <img src={music.albumCoverUrl} alt={`${music.title} Album Cover`} className="rec-image album-cover" loading="lazy" />}
                <div className="rec-info">
                  <h4 className="rec-title">{music.title}</h4>
                  <p className="rec-artist">艺术家: {music.artist}</p>
                  {/* 可以添加播放链接或嵌入播放器 */} 
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default Recommendations; 