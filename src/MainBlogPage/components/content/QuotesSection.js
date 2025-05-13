import React from 'react';
import { Outlet } from 'react-router-dom'; // 取消注释，引入 Outlet
import './QuotesSection.css'; // 引入 CSS 文件 (稍后创建)

const QuotesSection = () => {
  // 二级导航的 active 状态处理
  // const getSubNavLinkClass = ({ isActive }) => {
  //   return isActive ? 'sub-nav-link active' : 'sub-nav-link';
  // };
  
  return (
    <div>
      {/* <h2>段落切片</h2>  // 移除此标题 */}
      
      {/* 二级导航已被移至 LeftSidebar */}
      {/* 
      <nav className="quotes-sub-nav">
        <NavLink to="by-author" end className={getSubNavLinkClass}>按 Up 主/作者</NavLink>
        <NavLink to="by-quote" className={getSubNavLinkClass}>按言论</NavLink>
      </nav>
      */}

      {/* 用于显示二级路由匹配的组件 (ByAuthor 或 ByQuote) */}
      <div className="quotes-content">
        <Outlet /> 
      </div>
    </div>
  );
};

export default QuotesSection; 