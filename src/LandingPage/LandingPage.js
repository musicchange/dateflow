import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import SelfIntroCard from './components/SelfIntroCard';
import { TypeAnimation } from 'react-type-animation';

// 预定义的随机高级句子
const randomSentences = [
  "The only way to do great work is to love what you do.",
  "Strive not to be a success, but rather to be of value.",
  "The mind is everything. What you think you become.",
  "Your time is limited, so don't waste it living someone else's life.",
  "The best way to predict the future is to create it."
];

const LandingPage = () => {
  const [sentence, setSentence] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 页面加载时设置随机句子
    setSentence(randomSentences[Math.floor(Math.random() * randomSentences.length)]);
  }, []);

  const handleStartClick = () => {
    console.log("Start button clicked! Navigating to /blog");
    navigate('/blog');
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <p className="random-sentence">{sentence}</p>
      </header>
      
      <main className="landing-main">
        <div className="welcome-container">
          <h1 className="welcome-message">
            <TypeAnimation
              sequence={[
                '哦！我的朋友祝你一生愉快！',
                2000,
                '',
                500,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              style={{ 
                display: 'inline-block', 
                '--type-animation-cursor-color': 'skyblue'
              }}
              className="typewriter-text"
            />
          </h1>
        </div>
        
        <SelfIntroCard />
        
        <button className="start-button" onClick={handleStartClick}>
          START
        </button>
      </main>
      
      <footer className="landing-footer">
        {/* 可以添加一些页脚信息 */}
      </footer>
    </div>
  );
};

export default LandingPage; 