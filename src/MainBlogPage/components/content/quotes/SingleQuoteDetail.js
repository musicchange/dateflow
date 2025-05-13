import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './SingleQuoteDetail.css'; // 稍后创建

// --- 模拟数据 ---
const mockQuotesData = {
  '1': [
    { id: 'q1', authorId: '1', authorName:'Up 主A', title: '关于React状态管理的思考', content: 'Context API 适合中小型应用...', timestamp: '2024-05-10T10:00:00Z', tags: ['React', '状态管理'], views: 150, myThoughts: `我对这个看法的补充是...` },
    { id: 'q2', authorId: '1', authorName:'Up 主A', title: 'Tailwind CSS 初体验', content: '原子化 CSS 提高了开发效率...', timestamp: '2024-05-11T14:30:00Z', tags: ['CSS', 'Tailwind'], views: 200, myThoughts: `确实，但需要注意项目规模。
大家也可以看看这个相关的讨论：[链接]` },
  ],
  '2': [
    { id: 'q3', authorId: '2', authorName:'作者B', title: '写作的艺术', content: '持之以恒是关键...', timestamp: '2024-04-20T09:00:00Z', tags: ['写作'], views: 500, myThoughts: `深有同感！` },
  ],
  '3': [], 
};
const allQuotes = Object.values(mockQuotesData).flat();
// ----------------

const SingleQuoteDetail = () => {
  const { quoteId } = useParams();
  const quote = allQuotes.find(q => q.id === quoteId);

  if (!quote) {
    return <div>言论未找到。 <Link to="/blog/quotes/by-quote">返回言论列表</Link></div>;
  }
  
  const formattedTimestamp = new Date(quote.timestamp).toLocaleString();

  return (
    <div className="single-quote-detail">
      <div className="quote-main-content">
        <h1>{quote.title}</h1>
        <p className="quote-author-info">
          由 <Link to={`/blog/quotes/author/${quote.authorId}`}>{quote.authorName}</Link> 发布于 {formattedTimestamp}
        </p>
        <div className="quote-tags-detail">
          {quote.tags.map(tag => (
            <Link key={tag} to={`/blog/tag/${tag.toLowerCase()}`} className="quote-tag-link">#{tag}</Link>
          ))}
        </div>
        <blockquote className="quote-text-block">
          {quote.content}
        </blockquote>
      </div>

      <div className="my-thoughts-section">
        <h3>我的看法/回答时间线：</h3>
        {quote.myThoughts ? (
          <div className="my-thoughts-content" dangerouslySetInnerHTML={{ __html: quote.myThoughts.replace(/\n/g, '<br />') }}></div>
        ) : (
          <p>关于此言论，我暂时还没有添加看法。</p>
        )}
      </div>

      <Link to="/blog/quotes/by-quote" className="back-link-sq">返回言论列表</Link>
    </div>
  );
};

export default SingleQuoteDetail; 