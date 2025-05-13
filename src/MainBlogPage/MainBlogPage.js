import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Outlet is not directly used here anymore, but in QuotesSection
import './MainBlogPage.css'; // 引入CSS文件
import LeftSidebar from './components/LeftSidebar';
// import MainContent from './components/MainContent'; // 不再直接使用 MainContent 组件
import RightSidebar from './components/RightSidebar';

// 导入内容组件
import AllPosts from './components/content/AllPosts';
import Thoughts from './components/content/Thoughts';
import QuotesSection from './components/content/QuotesSection';
import Photography from './components/content/Photography';
import Recommendations from './components/content/Recommendations';
import CSJourney from './components/content/CSJourney';
import SinglePost from './components/content/SinglePost'; // Import SinglePost component

// 导入 QuotesSection 的子组件
import ByAuthor from './components/content/quotes/ByAuthor';
import ByQuote from './components/content/quotes/ByQuote';
import AuthorDetail from './components/content/quotes/AuthorDetail'; // 导入 AuthorDetail
// import SingleQuoteDetail from './components/content/quotes/SingleQuoteDetail'; // 不再使用这个，改用 QuoteDetailPage
import QuoteDetailPage from './components/content/quotes/QuoteDetailPage'; // 导入新的 QuoteDetailPage
import TagDetail from './components/content/tags/TagDetail';           // 导入 TagDetail

const MainBlogPage = () => {
  return (
    <div className="main-blog-page">
      <LeftSidebar />
      
      {/* 中间内容区现在用于渲染匹配的子路由 */}
      <main className="main-content">
        <Routes>
          {/* 定义相对于 /blog 的嵌套路由 */}
          {/* 注意：默认显示 AllPosts 可以用 index route */}
          <Route index element={<AllPosts />} /> 
          <Route path="all" element={<AllPosts />} />
          <Route path="thoughts" element={<Thoughts />} />
          
          {/* 更新 quotes 路由以包含子路由 */}
          <Route path="quotes" element={<QuotesSection />}>
            {/* 默认子路由 (例如，当访问 /blog/quotes) */}
            {/* 让 "按 Up 主/作者" 作为默认选项 */}
            <Route index element={<ByAuthor />} /> 
            <Route path="by-author" element={<ByAuthor />} />
            <Route path="by-quote" element={<ByQuote />} />
            {/* 使用 AuthorDetail 组件 */}
            <Route path="author/:authorId" element={<AuthorDetail />} /> 
            {/* 添加单条引用详情路由 - 更新为此 */}
            <Route path=":quoteId" element={<QuoteDetailPage />} /> 
            {/* 可以为 quotes 添加一个未匹配子路由的提示 */}
            <Route path="*" element={<div>请选择一个分类</div>} /> 
          </Route>

          {/* 添加标签详情路由 (放在 quotes 外面，因为它不是 quotes 的直接子页面，而是由 quote 触发) */}
          <Route path="tag/:tagName" element={<TagDetail />} />

          <Route path="photography" element={<Photography />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="cs-journey" element={<CSJourney />} />
          
          {/* Add route for single posts */}
          <Route path="post/:postId" element={<SinglePost />} />

          {/* Catch-all route for unmatched paths within /blog */}
          <Route path="*" element={<div>内容未找到 (Blog Section)</div>} /> 
        </Routes>
        {/* <Outlet />  // 如果将 Routes 定义在 App.js 中，则在这里用 Outlet */}
      </main>

      <RightSidebar />
    </div>
  );
};

export default MainBlogPage; 