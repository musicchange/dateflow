import React from 'react';
import { Link } from 'react-router-dom'; // 确保 Link 已导入
import './QuoteCard.css'; // 稍后创建样式

const QuoteCard = ({ quote }) => {
  // 格式化时间戳 (可选)
  const formattedTimestamp = new Date(quote.timestamp).toLocaleDateString();

  return (
    <div className="quote-card">
      {/* 标题链接到单条引用详情页 */}
      <Link to={`/blog/quotes/quote/${quote.id}`} className="quote-title-link">
         <h6 className="quote-title">{quote.title}</h6>
      </Link>
      
      <p className="quote-content">{quote.content}</p>
      
      <div className="quote-meta">
        {/* 作者链接到作者详情页 */}
        <Link to={`/blog/quotes/author/${quote.authorId}`} className="quote-author-link">
          <span className="quote-author">{quote.authorName}</span>
        </Link>
        
        <span className="quote-timestamp">{formattedTimestamp}</span>
        
        <div className="quote-tags">
          {/* 标签链接到标签详情页 */}
          {quote.tags.map(tag => (
            <Link key={tag} to={`/blog/tag/${tag.toLowerCase()}`} className="quote-tag-link-card">
              <span className="quote-tag">{tag}</span>
            </Link>
          ))}
        </div>
      </div>
      {/* 可以添加热度/点击量显示 */}
    </div>
  );
};

export default QuoteCard; 