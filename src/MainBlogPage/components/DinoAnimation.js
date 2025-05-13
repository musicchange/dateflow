import React, { useEffect, useRef, useState } from 'react';
import './DinoAnimation.css'; // 引入CSS文件

const DinoAnimation = () => {
  const dinoRef = useRef(null); // 恐龙元素的引用
  const obstaclesRef = useRef(null); // 障碍物容器的引用
  const [isJumping, setIsJumping] = useState(false); // 恐龙是否正在跳跃的状态
  const [obstacles, setObstacles] = useState([]); // 障碍物数组
  const obstacleIdCounter = useRef(0); // 用于生成唯一的障碍物ID

  // 恐龙跳跃逻辑
  const triggerJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      // 动画结束后重置跳跃状态，CSS动画的持续时间为700ms
      setTimeout(() => {
        setIsJumping(false);
      }, 700); 
    }
  };

  // 定期触发跳跃 (模拟之前的随机跳跃)
  useEffect(() => {
    const jumpInterval = () => {
      triggerJump();
      const nextJumpDelay = 2000 + Math.random() * 3000; // 2-5秒后再次尝试跳跃
      return setTimeout(jumpInterval, nextJumpDelay);
    };
    let jumpTimeoutId = jumpInterval();

    return () => clearTimeout(jumpTimeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 依赖为空，仅在挂载和卸载时运行

  // 创建和管理障碍物
  useEffect(() => {
    const createObstacle = () => {
      const newObstacleId = obstacleIdCounter.current++;
      const newObstacle = {
        id: newObstacleId,
        // 随机高度，通过CSS类控制或直接style (这里用CSS类更佳，但为简化暂不实现随机高低)
        // type: Math.random() < 0.3 ? 'tall' : 'short', 
        animationDuration: (2 + Math.random() * 1).toFixed(2) + 's', // 随机动画时长 2-3s
      };
      setObstacles(prevObstacles => [...prevObstacles, newObstacle]);

      // 移除超出屏幕的障碍物 (基于动画时长)
      // CSS动画结束后，元素如果还在DOM中，需要手动移除
      setTimeout(() => {
        setObstacles(prev => prev.filter(obs => obs.id !== newObstacleId));
      }, parseFloat(newObstacle.animationDuration) * 1000 + 200); // 动画时长 + 一点缓冲
    };

    const obstacleInterval = 2000 + Math.random() * 1500; // 2-3.5秒创建一个新的障碍物
    const creationIntervalId = setInterval(createObstacle, obstacleInterval);

    return () => {
      clearInterval(creationIntervalId);
      // 组件卸载时清空障碍物，以防内存泄漏和意外的setTimeout执行
      setObstacles([]);
    };
  }, []);

  return (
    <div className="dino-game-container">
      <div 
        ref={dinoRef} 
        className={`dino ${isJumping ? 'jump' : ''}`} 
        onClick={triggerJump} // 点击恐龙也可以触发跳跃
      ></div>
      <div ref={obstaclesRef} className="obstacles">
        {obstacles.map(obstacle => (
          <div 
            key={obstacle.id} 
            className="cactus" 
            style={{ animationDuration: obstacle.animationDuration }}
            // 如果实现了高低仙人掌，可以这样加类名: className={`cactus ${obstacle.type}`}
          ></div>
        ))}
      </div>
      <div className="ground"></div>
    </div>
  );
};

export default DinoAnimation; 