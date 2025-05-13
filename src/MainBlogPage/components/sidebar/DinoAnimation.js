import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './DinoAnimation.css';

const DinoAnimation = () => {
  const dinoRef = useRef(null);
  const cactusRef = useRef(null);
  const animationContainerRef = useRef(null);

  useEffect(() => {
    if (!dinoRef.current || !cactusRef.current || !animationContainerRef.current) {
      return;
    }

    const containerWidth = animationContainerRef.current.offsetWidth;

    // 仙人掌动画：从右到左无限循环
    const cactusAnimation = anime({
      targets: cactusRef.current,
      translateX: [containerWidth, -50], // 从容器右边到左边消失 (-50是仙人掌宽度)
      easing: 'linear',
      duration: 3000, // 仙人掌移动速度
      loop: true,
      delay: 500, // 延迟一点开始，避免和跳跃同时触发显得奇怪
    });

    // 小恐龙跳跃动画：
    // 这个函数会在仙人掌快到的时候被调用（简化版，实际同步会更复杂）
    const jump = () => {
      const randomJumpHeight = -(Math.random() * 50 + 50); // 随机跳跃高度 (50-100px)
      anime.remove(dinoRef.current); // 移除之前的动画实例，避免冲突
      anime({
        targets: dinoRef.current,
        translateY: [
          { value: 0, duration: 0 }, // 确保从地面开始
          { value: randomJumpHeight, duration: 400, easing: 'easeOutQuad' },
          { value: 0, duration: 400, easing: 'easeInQuad' }
        ],
        // loop: true, // 不在这里loop，由外部逻辑控制
        // easing: 'linear'
      });
    };
    
    // 简化版：每隔一段时间尝试跳跃，模拟躲避仙人掌
    // 更完善的方案需要检测仙人掌位置来精确触发跳跃
    const jumpInterval = setInterval(() => {
        // 估算仙人掌是否在跳跃区域（非常粗略）
        const cactusPos = cactusRef.current.getBoundingClientRect().left;
        const dinoPos = dinoRef.current.getBoundingClientRect().right;
        if (cactusPos < dinoPos + 50 && cactusPos > dinoPos - 100 ) { // 仙人掌在恐龙前方一定范围内
            jump();
        }
    }, 3000); // 尝试与仙人掌动画周期匹配，可以调整

    // 页面加载时先跳一次
    jump();


    return () => {
      cactusAnimation.pause();
      anime.remove(dinoRef.current);
      anime.remove(cactusRef.current);
      clearInterval(jumpInterval);
    };
  }, []);

  return (
    <div ref={animationContainerRef} className="dino-animation-container">
      <div ref={dinoRef} className="dino"></div>
      <div ref={cactusRef} className="cactus"></div>
      {/* 您可以添加多个仙人掌，并为它们分别设置动画和ref */}
    </div>
  );
};

export default DinoAnimation; 