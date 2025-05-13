import React from 'react';
import { Link } from 'react-router-dom';
import './AllPosts.css'; // Import the CSS file for styling

// --- Mock Post Data ---
// Replace with actual data fetching later
const mockPosts = [
  {
    id: 'post1',
    title: '开博宣言',
    imageUrl: '/images/postone_1.png', // Replace with actual image path
    publishDate: '2025-05-14',
    updateDate: '2025-05-14',
    author: 'crystal',
    commentCount: 0,
    excerpt: '黑客松给予我执行力......',
    tags: ['随想', '时间'], // Example tags
    category: '随想', // Example category
  },
  /*{
    id: 'post2',
    title: '起点的标准',
    imageUrl: '/images/placeholder_vioulo.jpg', // Replace with actual image path
    publishDate: '2024-04-29',
    updateDate: '2024-04-29',
    author: '我',
    commentCount: 2,
    excerpt: '我前不久打算开发一套个人博客系统。',
    tags: ['技术', '博客', '开发'],
    category: '技术',
  },*/
  // Add more mock posts if needed
];
// ---------------------

const AllPosts = () => {
  return (
    <div className="all-posts-container">
      {mockPosts.map((post, index) => (
        <article key={post.id} className={`post-card ${index % 2 === 1 ? 'image-right' : 'image-left'}`}>
          <div className="post-image-container">
            <Link to={`/blog/post/${post.id}`}> {/* Link to the full post */} 
              <img src={post.imageUrl} alt={post.title} className="post-image" loading="lazy" />
            </Link>
          </div>
          <div className="post-content-container">
            <header className="post-header">
              <h2 className="post-title">
                <Link to={`/blog/post/${post.id}`}>{post.title}</Link>
              </h2>
              <div className="post-meta">
                <span><i className="icon-calendar"></i> 发表于 {post.publishDate}</span>
                {post.updateDate !== post.publishDate && 
                  <span><i className="icon-refresh"></i> 更新于 {post.updateDate}</span>
                }
                <span><i className="icon-user"></i> 作者: {post.author}</span>
                <span><i className="icon-comment"></i> {post.commentCount} 条评论</span>
                {/* Add Category/Tags if needed here */} 
              </div>
            </header>
            <div className="post-excerpt">
              <p>{post.excerpt}</p>
            </div>
            <footer className="post-footer">
              <Link to={`/blog/post/${post.id}`} className="read-more-link">阅读全文 &rarr;</Link>
            </footer>
          </div>
        </article>
      ))}
      {/* TODO: Add Pagination */} 
    </div>
  );
};

export default AllPosts; 