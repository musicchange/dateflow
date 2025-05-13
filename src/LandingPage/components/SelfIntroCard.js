import React from 'react';
import { Link } from 'react-router-dom';
import './SelfIntroCard.css';

// 假设的SVG箭头组件或图片路径
// import ArrowSVG from '../../assets/playful-arrow.svg'; 

const SelfIntroCard = () => {
  // TODO: 替换为真实的个人介绍链接
  const detailedIntroLink = "/about-me"; // 内部路由或外部链接

  return (
    <div className="self-intro-card">
      {/* 可以考虑在这里放置俏皮的箭头指向标题 */}
      {/* <img src={ArrowSVG} alt="Arrow pointing to title" className="playful-arrow" /> */}
      
      {/* 添加一个包裹元素来定位箭头 */}  
      <div className="title-container">
         <Link to={detailedIntroLink} className="card-title-link">
             <h2 className="card-title">GMcrystal的个人使用说明书</h2>
         </Link>
         {/* 这里可以添加一个小的SVG箭头图标增强可点击性 */} 
         {/* <span className="click-indicator">➔</span> */}
      </div>
     
      <p className="card-description">
        这里是简洁优雅的基本信息展示区。
        例如：探索者 | 开发者 | 摄影爱好者
      </p>
      {/* 可以添加更多信息或社交链接 */}
    </div>
  );
};

export default SelfIntroCard; 