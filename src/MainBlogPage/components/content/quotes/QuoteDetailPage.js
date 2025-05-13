import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockAuthors } from './ByAuthor';
import './QuoteDetailPage.css';

// Flatten all quotes from all authors once, including new fields
const allQuotesGlobal = (() => {
  let quotes = [];
  mockAuthors.forEach(author => {
    author.quotes.forEach(q => {
      quotes.push({ 
        ...q, 
        authorId: author.id, 
        authorName: author.name, 
        authorAvatar: author.avatarUrl
        // originalPostUrl, originalScreenshotUrl, articleId, orderInArticle are already in q
      });
    });
  });
  return quotes;
})();

const findQuoteByIdGlobal = (quoteId) => {
  return allQuotesGlobal.find(q => q.id === quoteId) || null;
};

// Simplified component to render a single quote in the new timeline/article view
const TimelineQuoteCard = ({ quote, isTarget, showScreenshot, onToggleScreenshot }) => {
  if (!quote) return null;

  const formatTimestamp = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleString('zh-CN', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className={`quote-node article-item ${isTarget ? 'target-node' : ''}`}>
      <div className={`quote-card ${isTarget ? 'target-quote-highlight' : ''}`}>
        <div className="quote-card-header">
          <Link to={`/blog/author/${quote.authorId}`} className="quote-author-link">
            <img src={quote.authorAvatar} alt={quote.authorName} className="quote-author-avatar-small" />
            <span className="quote-author-name-small">{quote.authorName}</span>
          </Link>
          <Link to={`/blog/quotes/${quote.id}`} className="quote-timestamp-link">
            <span className="quote-timestamp-small">{formatTimestamp(quote.timestamp)}</span>
          </Link>
        </div>
        <p className="quote-text-detail">{quote.text}</p>
        <div className="quote-actions">
          {quote.originalScreenshotUrl && (
            <button onClick={() => onToggleScreenshot(quote.id)} className="action-button screenshot-button">
              {showScreenshot ? '隐藏截图' : '原贴截图'}
            </button>
          )}
          {quote.originalPostUrl && (
            <a href={quote.originalPostUrl} target="_blank" rel="noopener noreferrer" className="action-button link-button">
              原帖链接
            </a>
          )}
        </div>
        {showScreenshot && quote.originalScreenshotUrl && (
          <div className="screenshot-display">
            <img src={quote.originalScreenshotUrl} alt={`Screenshot for ${quote.id}`} />
          </div>
        )}
      </div>
    </div>
  );
};

const QuoteDetailPage = () => {
  const { quoteId: targetQuoteId } = useParams();
  const navigate = useNavigate();
  
  const [targetQuote, setTargetQuote] = useState(null);
  const [timelineQuotes, setTimelineQuotes] = useState([]); // Quotes to display in sequence
  const [visibleScreenshotId, setVisibleScreenshotId] = useState(null); // ID of quote whose screenshot is visible
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('article'); // 'article' (uses orderInArticle then timestamp) or 'time'

  useEffect(() => {
    setLoading(true);
    setError(null);
    setVisibleScreenshotId(null); // Reset screenshot on navigation

    const currentTarget = findQuoteByIdGlobal(targetQuoteId);
    if (!currentTarget) {
      setError('目标言论未找到。');
      setTargetQuote(null);
      setTimelineQuotes([]);
      setLoading(false);
      return;
    }
    setTargetQuote(currentTarget);

    let quotesForTimeline = [];
    if (currentTarget.articleId) {
      // If target has an articleId, fetch all quotes with the same articleId from the same author
      quotesForTimeline = allQuotesGlobal.filter(
        q => q.authorId === currentTarget.authorId && q.articleId === currentTarget.articleId
      );
    } else {
      // If no articleId, show only this quote itself (or all author quotes - decided to show only itself for now)
      // To show all author quotes instead: 
      // quotesForTimeline = allQuotesGlobal.filter(q => q.authorId === currentTarget.authorId);
      quotesForTimeline = [currentTarget]; 
    }
    setTimelineQuotes(quotesForTimeline);
    setLoading(false);
  }, [targetQuoteId]);

  const sortedTimelineQuotes = useMemo(() => {
    return [...timelineQuotes].sort((a, b) => {
      if (sortOrder === 'article') {
        if (a.articleId && b.articleId && a.articleId === b.articleId) {
          // If same article, sort by orderInArticle, then by time as fallback
          if (a.orderInArticle !== b.orderInArticle) {
            return (a.orderInArticle || 0) - (b.orderInArticle || 0);
          }
        }
        // Fallback to time if not in same article or no orderInArticle
      }
      // Default or fallback to time sort
      return new Date(a.timestamp) - new Date(b.timestamp); // Ascending time
    });
  }, [timelineQuotes, sortOrder]);

  const toggleScreenshot = (quoteIdForScreenshot) => {
    setVisibleScreenshotId(prevId => prevId === quoteIdForScreenshot ? null : quoteIdForScreenshot);
  };
  
  const handleSortChange = () => {
      // Simple toggle for now, could be more elaborate
      setSortOrder(prev => prev === 'article' ? 'time' : 'article');
  };

  if (loading) return <div className="quote-detail-loading">正在加载...</div>;
  if (error) return <div className="quote-detail-error">错误: {error}</div>;
  if (!targetQuote && !loading) return <div className="quote-detail-error">无法加载目标言论。</div>;

  return (
    <div className="quote-detail-page conversation-thread-view new-timeline-view">
      <div className="page-header-controls">
        <button onClick={() => navigate(-1)} className="back-button">
          &larr; 返回
        </button>
        <div className="thread-controls">
          <button onClick={handleSortChange} className="sort-button-main">
            排序: {sortOrder === 'article' ? '按文章顺序' : '按时间'}
          </button>
        </div>
      </div>

      {sortedTimelineQuotes.map(quote => (
        <TimelineQuoteCard 
          key={quote.id} 
          quote={quote} 
          isTarget={quote.id === targetQuoteId}
          showScreenshot={visibleScreenshotId === quote.id}
          onToggleScreenshot={toggleScreenshot}
        />
      ))}
      {sortedTimelineQuotes.length === 0 && !loading && <p>没有可显示的言论。</p>} 
    </div>
  );
};

export default QuoteDetailPage; 