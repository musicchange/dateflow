import React from 'react';
import { useParams, Link } from 'react-router-dom';
import QuoteCard from './QuoteCard';
import './AuthorDetail.css'; // 稍后创建

// --- 复用之前的模拟数据 (实际应用中应从API获取) ---
const mockAuthors = [
  { id: '1', name: 'Up 主A', bio: '这是 Up 主 A 的简介... 这是更长的一段描述，说明这位作者的背景、领域或风格等等。', link: 'https://twitter.com/up_a' },
  { id: '2', name: '作者B', bio: '作家 B，著有... 专注于历史和文化领域的研究与写作。', link: 'https://example.com/author_b' },
  { id: '3', name: '博主C', bio: '分享科技与生活的博主 C。热衷于探索最新的技术趋势。', link: null },
];
const mockQuotes = {
  '1': [
    { id: 'q1', authorId: '1', authorName:'Up 主A', title: '关于React状态管理的思考', content: 'Context API 适合中小型应用...', timestamp: '2024-05-10T10:00:00Z', tags: ['React', '状态管理'], views: 150 },
    { id: 'q2', authorId: '1', authorName:'Up 主A', title: 'Tailwind CSS 初体验', content: '原子化 CSS 提高了开发效率...', timestamp: '2024-05-11T14:30:00Z', tags: ['CSS', 'Tailwind'], views: 200 },
  ],
  '2': [
    { id: 'q3', authorId: '2', authorName:'作者B', title: '写作的艺术', content: '持之以恒是关键...', timestamp: '2024-04-20T09:00:00Z', tags: ['写作'], views: 500 },
  ],
  '3': [],
};
// ----------------------------------------------------

const AuthorDetail = () => {
  const { authorId } = useParams(); // 从 URL 获取 authorId
  const author = mockAuthors.find(a => a.id === authorId);
  const authorQuotes = mockQuotes[authorId] || [];

  // 按时间排序引用 (最新在前)
  const sortedQuotes = [...authorQuotes].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  if (!author) {
    return <div>作者未找到。 <Link to="/blog/quotes/by-author">返回列表</Link></div>;
  }

  return (
    <div className="author-detail">
      <div className="author-header">
        <h2>{author.name}</h2>
        {author.link && (
          <a href={author.link} target="_blank" rel="noopener noreferrer" className="author-social-link">
            访问社交媒体/主页
          </a>
        )}
      </div>
      <p className="author-bio">{author.bio}</p>

      <hr />

      <h3>收录言论 ({sortedQuotes.length})</h3>
      <div className="quote-list">
        {sortedQuotes.length > 0 ? (
          sortedQuotes.map(quote => (
            <QuoteCard key={quote.id} quote={quote} />
          ))
        ) : (
          <p>暂无收录该作者的言论。</p>
        )}
      </div>

      <Link to="/blog/quotes/by-author" className="back-link">返回作者列表</Link>
    </div>
  );
};

export default AuthorDetail; 