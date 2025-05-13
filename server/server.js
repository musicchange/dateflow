const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001; // You can choose another port if this is taken

// --- Mock Recommendations Data (Copied from frontend) ---
// ** Ideally, this data would come from a database **
const mockRecommendations = {
  books: [
    { id: 'b1', title: '《人类简史》', author: '尤瓦尔·赫拉利', imageUrl: '/images/book_sapiens.jpg', review: '从认知革命、农业革命到科学革命，重新审视人类历史的宏大叙事。' },
    { id: 'b2', title: '《呼吸》', author: '特德·姜', imageUrl: '/images/book_exhalation.jpg', review: '科幻短篇小说集，充满了对时间、自由意志和科技伦理的深刻思考。' },
  ],
  movies: [
    { id: 'm1', title: '《星际穿越》', director: '克里斯托弗·诺兰', imageUrl: '/images/movie_interstellar.jpg', review: '硬核科幻与情感内核的完美结合，视觉效果震撼。' },
    { id: 'm2', title: '《千与千寻》', director: '宫崎骏', imageUrl: '/images/movie_spirited_away.jpg', review: '吉卜力的经典之作，想象力丰富，温暖治愈。' },
  ],
  websites: [
    { id: 'w1', name: 'GitHub', url: 'https://github.com', description: '全球最大的代码托管平台和开源社区。' },
    { id: 'w2', name: 'Stack Overflow', url: 'https://stackoverflow.com', description: '程序员问答社区，解决编程问题的好去处。' },
    { id: 'w3', name: 'Figma Community', url: 'https://www.figma.com/community', description: '发现优秀的设计资源和插件。' },
  ],
  blogs: [
    { id: 'bl1', name: '阮一峰的网络日志', url: 'http://www.ruanyifeng.com/blog/', description: '内容广泛的技术博客，涵盖前后端、工具等。' },
    { id: 'bl2', name: 'Wait But Why', url: 'https://waitbutwhy.com/', description: '深度长文博客，用独特的火柴人插画解释复杂概念。' },
  ],
  music: [
    { id: 'mu1', title: 'Interstellar (Main Theme)', artist: 'Hans Zimmer', albumCoverUrl: '/images/music_interstellar.jpg' },
    { id: 'mu2', title: 'Viva La Vida', artist: 'Coldplay', albumCoverUrl: '/images/music_vivalavida.jpg' },
  ]
};
// ---------------------------------------------------------

// Enable CORS for requests from your React app's origin (e.g., http://localhost:3000)
app.use(cors({ /* origin: 'http://localhost:3000' */ })); // Allow all origins for now, refine later if needed

// --- API Routes ---

// GET endpoint for recommendations
app.get('/api/recommendations', (req, res) => {
  console.log('Received request for /api/recommendations');
  // Simulate potential delay (optional)
  // setTimeout(() => {
  //   res.json(mockRecommendations);
  // }, 500);
  res.json(mockRecommendations); // Send the mock data as JSON
});

// Placeholder for other potential routes
app.get('/api/posts', (req, res) => {
  res.json({ message: 'Posts endpoint placeholder' });
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
}); 