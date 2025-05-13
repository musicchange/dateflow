import React from 'react';
import { useParams, Link } from 'react-router-dom';
import QuoteCard from '../quotes/QuoteCard'; // 复用 QuoteCard

// --- 模拟数据 (与 ByQuote.js 类似，实际应从 API 获取) ---
const mockQuotesData = {
  '1': [
    { id: 'q1', authorId: '1', authorName:'Up 主A', title: '关于React状态管理的思考', content: 'Context API 适合中小型应用...', timestamp: '2024-05-10T10:00:00Z', tags: ['React', '状态管理'], views: 150 },
    { id: 'q2', authorId: '1', authorName:'Up 主A', title: 'Tailwind CSS 初体验', content: '原子化 CSS 提高了开发效率...', timestamp: '2024-05-11T14:30:00Z', tags: ['CSS', 'Tailwind'], views: 200 },
  ],
  '2': [
    { id: 'q3', authorId: '2', authorName:'作者B', title: '写作的艺术', content: '持之以恒是关键...', timestamp: '2024-04-20T09:00:00Z', tags: ['写作'], views: 500 },
  ],
  '3': [], 
};
const allQuotes = Object.values(mockQuotesData).flat();
// ---------------------------------------------------

const TagDetail = () => {
  const { tagName } = useParams(); // 从 URL 获取 tagName

  // 筛选包含该标签的引用
  const taggedQuotes = allQuotes.filter(quote => 
    quote.tags.map(t => t.toLowerCase()).includes(tagName.toLowerCase())
  );

  // 按时间排序
  const sortedQuotes = [...taggedQuotes].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="tag-detail">
      <h2>标签: #{tagName}</h2>
      <p>包含此标签的言论 ({sortedQuotes.length})</p>

      <div className="quote-list">
        {sortedQuotes.length > 0 ? (
          sortedQuotes.map(quote => (
            <QuoteCard key={quote.id} quote={quote} />
          ))
        ) : (
          <p>没有找到包含此标签的言论。</p>
        )}
      </div>
      <Link to="/blog/quotes/by-quote" style={{ marginTop: '20px', display: 'inline-block' }}>返回言论列表</Link>
      {' | '} 
      <Link to="/blog/quotes/by-author" style={{ marginTop: '20px', display: 'inline-block' }}>查看作者列表</Link>
    </div>
  );
};

export default TagDetail; 