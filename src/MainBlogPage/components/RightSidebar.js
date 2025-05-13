import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RightSidebar.css'; // Assuming a CSS file exists or will be created
import DinoAnimation from './DinoAnimation'; // Import the new component

// --- Mock Data ---
const mockCategories = [
  { name: '随想', count: 19, slug: 'thoughts' }, // Added slug for linking
  { name: '学习', count: 6, slug: 'tech' }, // Changed from 技术
  { name: '时评', count: 8, slug: 'blank' }, // Changed from 空白
  { name: '好物', count: 3, slug: 'illusion' }, // Changed from 幻觉
  { name: '疯语', count: 1, slug: 'lightspot' }, // Changed from 光点
  { name: '技术', count: 1, slug: 'muttering' }, // Changed from 呓语
];

const mockArchives = [
  { month: '5月', year: 2025, count: 1, slug: '2025-05' },
  { month: '4月', year: 2025, count: 8, slug: '2025-04' }, // Assuming 2025 from image
  { month: '3月', year: 2025, count: 3, slug: '2025-03' },
  { month: '2月', year: 2025, count: 3, slug: '2025-02' },
  { month: '1月', year: 2025, count: 1, slug: '2025-01' },
];
// ---------------

const RightSidebar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (searchTerm.trim()) {
      console.log(`Searching for: ${searchTerm}`);
      // TODO: Implement actual search logic
      // This might involve navigating to a search results page or updating main content state
      // For now, let's navigate to a placeholder route
      navigate(`/blog/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // Clear search box after initiating search
    }
  };

  return (
    <aside className="right-sidebar">
      {/* Dino Game Animation Section */}
      <section className="sidebar-section dino-animation-section">
        {/* You might want to add a title here if desired, e.g., <h4>小游戏</h4> */}
        <DinoAnimation />
      </section>

      {/* Section 1: Self Intro Link */}
      <section className="sidebar-section about-me-link">
        <h3>关于我</h3>
        <p>你好！探索我的数字花园。</p>
        {/* Using Link for internal navigation */}
        <Link to="/about" className="sidebar-link">了解更多 &rarr;</Link>
        {/* If /about-me is the correct route, use that instead */}
        {/* <Link to="/about-me" className="sidebar-link">了解更多 &rarr;</Link> */}
      </section>

      {/* Section 2: Search Box */}
      <section className="sidebar-section search-section">
        <h3>搜索内容</h3>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="search" // Use type="search" for semantics
            placeholder="输入关键词..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="搜索博客内容"
          />
          <button type="submit" className="search-button" aria-label="搜索">
            搜索
          </button>
        </form>
      </section>

      {/* Section: Categories (New) */}
      <section className="sidebar-section categories-section">
        <h3><i className="icon-folder"></i> 分类</h3>
        <ul className="sidebar-list">
          {mockCategories.map(category => (
            <li key={category.slug}>
              <Link to={`/blog/category/${category.slug}`} className="sidebar-link">
                {category.name}
                <span className="item-count">{category.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      
      {/* Section: Archives (New) */}
      <section className="sidebar-section archives-section">
        <h3><i className="icon-archive"></i> 归档</h3>
        <ul className="sidebar-list">
          {mockArchives.map(archive => (
            <li key={archive.slug}>
              <Link to={`/blog/archive/${archive.slug}`} className="sidebar-link">
                {archive.month} {archive.year}
                <span className="item-count">{archive.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Section: Hot Articles (Placeholder - Moved Down) */}
      <section className="sidebar-section hot-articles">
        <h3><i className="icon-fire"></i> 热门文章</h3>
        <ul className="article-list">
          {/* TODO: Fetch and list hot articles */} 
          <li><a href="#" className="sidebar-link">热门文章标题 1</a></li>
          <li><a href="#" className="sidebar-link">热门文章标题 2</a></li>
          <li><a href="#" className="sidebar-link">热门文章标题 3</a></li>
        </ul>
      </section>

      {/* Section: Recommended Articles (Placeholder - Moved Down) */}
      <section className="sidebar-section recommended-articles">
        <h3><i className="icon-star"></i> 推荐阅读</h3>
        <ul className="article-list">
          {/* TODO: Fetch and list recommended articles */} 
          <li><a href="#" className="sidebar-link">推荐文章标题 A</a></li>
          <li><a href="#" className="sidebar-link">推荐文章标题 B</a></li>
        </ul>
      </section>

    </aside>
  );
};

export default RightSidebar; 