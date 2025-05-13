import React, { useState } from 'react';
import './Photography.css'; // 稍后创建

// --- 模拟摄影作品数据 ---
// **请替换为你真实的图片 URL 和描述**
const mockPhotos = [
  { id: 'p1', title: '落日熔金', description: '海边的黄昏，云彩被染成金色。', imageUrl: '/images/placeholder1.jpg', timestamp: '2024-05-01' },
  { id: 'p2', title: '街角光影', description: '午后阳光穿过狭窄的巷道。', imageUrl: '/images/placeholder2.jpg', timestamp: '2024-04-15' },
  { id: 'p3', title: '雨后新绿', description: '雨水洗刷过的叶子，格外清新。', imageUrl: '/images/placeholder3.jpg', timestamp: '2024-03-20' },
  { id: 'p4', title: '城市脉络', description: '夜晚的车流轨迹。', imageUrl: '/images/placeholder4.jpg', timestamp: '2024-02-10' },
  { id: 'p5', title: '静谧湖泊', description: '清晨湖面的倒影。', imageUrl: '/images/placeholder5.jpg', timestamp: '2024-01-05' },
  // 添加更多图片...
];
// -------------------------

// (可选) 图片模态框/灯箱组件
const Lightbox = ({ photo, onClose }) => {
  if (!photo) return null;
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}> 
        <img src={photo.imageUrl} alt={photo.title} />
        <div className="lightbox-caption">
          <h4>{photo.title}</h4>
          <p>{photo.description}</p>
          <p><small>拍摄于: {new Date(photo.timestamp).toLocaleDateString()}</small></p>
        </div>
        <button className="lightbox-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

const Photography = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="photography-section">
      <h2>摄影集</h2>
      <p>记录光影的瞬间。</p>
      
      <div className="photo-gallery">
        {mockPhotos.map(photo => (
          <div 
            key={photo.id} 
            className="photo-item"
            onClick={() => setSelectedPhoto(photo)} // 点击打开灯箱
          >
            <img src={photo.imageUrl} alt={photo.title} loading="lazy" />
            <div className="photo-overlay">
               <p>{photo.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 灯箱组件 */}
      <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
    </div>
  );
};

export default Photography; 