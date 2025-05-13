import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ByAuthor.css'; // Assuming CSS for this component

// --- Mock Author Data ---
export const mockAuthors = [
  {
    id: 'author1',
    name: '我',
    avatarUrl: '/images/avatar_placeholder.png', // Replace with actual avatar
    backgroundImageUrl: '/images/profile_bg_placeholder.jpg', // 新增：背景图URL
    description: '一个热衷于探索和记录的开发者。',
    socialLinks: [ // 新增：社交媒体链接
      { platform: 'Twitter', url: 'https://twitter.com/example' },
      { platform: 'Bilibili', url: 'https://space.bilibili.com/example' },
    ],
    quotes: [
      {
        id: 'q1a1',
        text: '时间是最好的刻度，记录着成长的轨迹。这是一段比较长的文本，用于测试摘要功能是否能够正确截取并显示省略号。(仅供测试字样)',
        timestamp: '2024-07-28T10:00:00Z',
        originalPostUrl: 'https://example.com/post/q1a1',
        originalScreenshotUrl: '/images/screenshot_placeholder_1.jpg', // Placeholder path
        articleId: 'article_A1_1',
        orderInArticle: 1
      },
      {
        id: 'q2a1',
        text: '确实如此，每一刻都值得被铭记。这是构成同一篇文章的第二部分。(仅供测试字样)',
        timestamp: '2024-07-28T10:05:00Z',
        originalPostUrl: 'https://example.com/post/q1a1', // Assuming it's part of the same original post
        originalScreenshotUrl: '/images/screenshot_placeholder_2.jpg',
        articleId: 'article_A1_1',
        orderInArticle: 2
      },
      {
        id: 'q3a1',
        text: '铭记的方式也有很多种，文字、图片、视频... 你更喜欢哪种？这是同一篇文章的第三部分，并且是最后一部分。(仅供测试字样)',
        timestamp: '2024-07-28T10:12:00Z',
        originalPostUrl: 'https://example.com/post/q1a1',
        articleId: 'article_A1_1',
        orderInArticle: 3
      },
      {
        id: 'q5a1', // Was q4a1, then q5a1, keeping it q5a1 as an example of a separate quote
        text: '今天天气真不错，适合出去走走。这是一个独立的言论，不属于任何文章序列。(仅供测试字样)',
        timestamp: '2024-07-29T09:00:00Z',
        originalPostUrl: 'https://example.com/post/q5a1',
        // No originalScreenshotUrl for this one, to test optional field
        // No articleId or orderInArticle for this one
      }
    ]
  },
  {
    id: 'author2',
    name: '张三',
    avatarUrl: '/images/avatar_luolei.png', // Replace with actual avatar
    backgroundImageUrl: '/images/profile_bg_placeholder2.jpg', // 新增
    description: '专注于计算机图形学和 Web 开发。',
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com/example' },
    ],
    quotes: [
      {
        id: 'q1a2',
        text: '用代码描绘世界，用技术解决问题。这是张三的第一条言论，也可能会比较长一些，以便测试摘要的显示效果。(仅供测试字样)',
        timestamp: '2024-07-26T09:00:00Z',
        originalPostUrl: 'https://example.com/post/q1a2',
        originalScreenshotUrl: '/images/screenshot_placeholder_3.jpg',
        articleId: 'article_A2_1',
        orderInArticle: 1
      },
      {
        id: 'q2a2',
        text: '非常赞同！技术的力量是无穷的。这是张三文章的第一部分的第二段。(仅供测试字样)',
        timestamp: '2024-07-26T09:05:00Z',
        originalPostUrl: 'https://example.com/post/q1a2',
        articleId: 'article_A2_1',
        orderInArticle: 2
      },
      {
        id: 'q4a2', // Was q3a2, then q4a2, now a separate item
        text: '是的，持续学习，拥抱变化。这是张三的另一条独立言论。(仅供测试字样)',
        timestamp: '2024-07-25T11:20:00Z', // Older timestamp
        originalPostUrl: 'https://example.com/post/q4a2',
        originalScreenshotUrl: '/images/screenshot_placeholder_4.jpg',
      }
    ]
  },
  // Add more authors
];
// ----------------------

// 辅助函数：格式化时间戳 (示例)
const formatQuoteTimestamp = (isoString) => {
  if (!isoString) return '';
  try {
    return new Date(isoString).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch (e) {
    return '日期无效';
  }
};

// 新增：生成文本摘要的辅助函数
const generateSummary = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) {
    return text;
  }
  // 尝试找到第一个句子作为摘要，如果第一个句子太长，则按长度截断
  const firstSentenceEnd = text.match(/[。！？]/);
  if (firstSentenceEnd && firstSentenceEnd.index < maxLength) {
    return text.substring(0, firstSentenceEnd.index + 1);
  }
  return text.substring(0, maxLength) + '...';
};

const ByAuthor = () => {
  const [hoveredAuthor, setHoveredAuthor] = useState(mockAuthors[0]); // Default to showing the first author

  return (
    <div className="by-author-container">
      {/* Left Column: Author List */}
      <div className="author-list-column">
        <ul className="author-list">
          {mockAuthors.map(author => (
            <li 
              key={author.id} 
              className={`author-list-item ${hoveredAuthor?.id === author.id ? 'active' : ''}`}
              onMouseEnter={() => setHoveredAuthor(author)}
              // onMouseLeave={() => setHoveredAuthor(null)} // Optional: clear on mouse leave
            >
              <Link to={`/blog/author/${author.id}`} className="author-link"> {/* Link to author detail page */} 
                <img src={author.avatarUrl} alt={author.name} className="author-avatar" />
                <span className="author-name">{author.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column: Author Details & Quotes (New Layout) */}
      <div className="author-details-column">
        {hoveredAuthor ? (
          <div className="author-profile-card"> {/* 新的卡片容器 */}
            <div 
              className="profile-background-image" 
              style={{ backgroundImage: `url(${hoveredAuthor.backgroundImageUrl || 'default-bg.jpg'})` }}
            >
              {/* 背景图通过CSS background-image 设置 */} 
            </div>
            <div className="profile-header-section">
              <img 
                src={hoveredAuthor.avatarUrl} 
                alt={hoveredAuthor.name} 
                className="profile-avatar-main" 
              />
              <div className="profile-social-icons">
                {hoveredAuthor.socialLinks && hoveredAuthor.socialLinks.map(link => (
                  <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" title={link.platform} className={`social-icon ${link.platform.toLowerCase()}`}>
                    {/* 实际图标会用CSS或SVG替换，这里用文字占位 */}
                    {link.platform.substring(0,1)}
                  </a>
                ))}
              </div>
            </div>
            <div className="profile-info-section">
              <h3 className="profile-name">{hoveredAuthor.name}</h3>
              <p className="profile-description">{hoveredAuthor.description}</p>
            </div>
            
            {/* <h4>言论摘录:</h4> // 移除此标题 */}
            <ul className="author-quotes-list-new">
              {hoveredAuthor.quotes && hoveredAuthor.quotes.length > 0 ? (
                hoveredAuthor.quotes.map(quote => (
                  <li key={quote.id} className="quote-card-item">
                    <Link to={`/blog/quotes/${quote.id}`} className="quote-link"> 
                      <p className="quote-text">{generateSummary(quote.text, 80)}</p> {/* 使用摘要函数，限制80字符 */}
                      {quote.timestamp && (
                        <span className="quote-timestamp">
                          {formatQuoteTimestamp(quote.timestamp)}
                        </span>
                      )}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="no-quotes-message">暂无公开言论。</li>
              )}
            </ul>
            {/* <Link to={`/blog/author/${hoveredAuthor.id}`} className="view-all-quotes-link">查看全部 &rarr;</Link> // 移除此链接 */}
          </div>
        ) : (
          <div className="author-details-placeholder">请在左侧选择一位作者查看详情。</div>
        )}
      </div>
    </div>
  );
};

export default ByAuthor; 