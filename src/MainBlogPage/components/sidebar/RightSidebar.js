import React from 'react';
import './RightSidebar.css';
// import ChromeDinoGame from 'react-chrome-dino'; // 移除旧的import
import DinoAnimation from './DinoAnimation'; // 导入新的动画组件

// Mock data for categories and archives
// ... existing code ...

const RightSidebar = () => {
  // Mock data for demonstration
  const categories = [
    { name: '技术', count: 15 },
    // ... other categories ...
  ];

  const archives = [
    { name: '2024年7月', count: 5 },
    // ... other archives ...
  ];


  return (
    <aside className="right-sidebar">
      {/* Spacer to push content down if needed, or adjust top margin */}
      {/*<div style={{ height: '50px' }}></div> */}

      <div className="sidebar-section dino-game-section"> {/* 可以复用这个外层容器的class */} 
        <h4>动感小恐龙</h4> {/* 可以改个标题 */}
        {/* <ChromeDinoGame /> */} {/* 移除旧的组件 */}
        <DinoAnimation /> {/* 添加新的动画组件 */}
      </div>


      <div className="sidebar-section">
        <h4><a href="/about">关于我</a></h4> {/* Link for Self-intro */}
      </div>
// ... existing code ...

</aside>
  );
};

export default RightSidebar;
