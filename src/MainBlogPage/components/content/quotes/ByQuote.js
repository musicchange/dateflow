import React from 'react';
import QuoteCard from './QuoteCard';
import './ByQuote.css'; // 稍后创建 (如果需要)

// --- 复用之前的模拟数据 --- 
// 注意：在实际应用中，你应该从 API 直接获取所有 quotes，而不是这样合并
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

// 合并所有引用到一个数组
const allQuotes = Object.values(mockQuotesData).flat();

// 按时间戳排序 (最新在前)
const sortedQuotes = [...allQuotes].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
// --------------------------

const ByQuote = () => {
  return (
    <div className="quotes-by-quote">
      <h4>按言论浏览（最新在前）</h4>
      
      <div className="quote-list-full">
        {sortedQuotes.length > 0 ? (
          sortedQuotes.map(quote => (
            <QuoteCard key={quote.id} quote={quote} />
          ))
        ) : (
          <p>暂无任何收录言论。</p>
        )}
      </div>

      {/* 
        - 中间列展示言论列表，以长条卡片形式呈现。
        - 卡片包括标题，时间戳，标签，up名。 (已由 QuoteCard 实现)
        - 排名顺序：按时间先后顺序。 (已实现排序)
        - 点击后呈现相关回答时间线，内容，推主名。 (QuoteCard 中有占位符)
        - 点击长条卡片的标签，推主名均分别跳转到含有这个标签下的所有言论和该推主的个人介绍界面。
      */}
      {/* TODO: 实现按言论浏览的详细功能 */}
    </div>
  );
};

export default ByQuote; 