import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 用于点击跳转
import './AuthorCard.css'; // 稍后创建样式

const AuthorCard = ({ author }) => {
  const [isHovering, setIsHovering] = useState(false);

  // 点击跳转到作者详情页（示例路由）
  // 实际应用中可能需要更复杂的逻辑或不同的路由结构
  const authorDetailPath = `/blog/quotes/author/${author.id}`;

  return (
    <div 
      className="author-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Link to={authorDetailPath} className="author-link">
        <h5 className="author-name">{author.name}</h5>
      </Link>
      {isHovering && (
        <div className="author-tooltip">
          <p>{author.bio || '暂无简介'}</p>
          {author.link && <a href={author.link} target="_blank" rel="noopener noreferrer">社交媒体</a>}
        </div>
      )}
      {/* 点击卡片或链接跳转，这里 Link 已经处理了 */} 
    </div>
  );
};

export default AuthorCard; 