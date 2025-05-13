import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage'; // 导入 LandingPage 组件
import MainBlogPage from './MainBlogPage/MainBlogPage'; // 导入 MainBlogPage
import AboutMePage from './AboutMePage/AboutMePage';   // 导入 AboutMePage


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/blog/*" element={<MainBlogPage />} />
          <Route path="/about-me" element={<AboutMePage />} />
          <Route path="*" element={<div><h1>404 - 页面未找到</h1><p>您访问的页面不存在。</p></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;