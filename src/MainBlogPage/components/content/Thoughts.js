import React from 'react';
import './Thoughts.css'; // 稍后创建

// --- 模拟随想文章数据 ---
const mockThoughtsPosts = [
  {
    id: 't1',
    title: '关于个人博客搭建的一些思考',
    timestamp: '2024-05-12T08:30:00Z',
    content: `
<p>最近在搭建这个个人博客平台 (Dateflow)，过程虽然繁琐，但也引发了我对信息组织和呈现方式的一些思考。</p>
<p>最初的需求是希望能有一个现代感强、内容饱满的平台，不仅是技术的展示，更是个人想法和收藏的沉淀地。Landing Page 的设计希望能吸引人，而主页的三栏布局则借鉴了信息流平台的组织方式，希望能清晰地分类内容。</p>
<h2>技术选型与挑战</h2>
<p>选择 React 作为前端框架是比较自然的选择，生态成熟，组件化开发也很方便。状态管理和路由是其中的关键点。目前使用了 React Router v6 来处理页面跳转和嵌套路由，对于"段落切片"这种有二级分类的场景非常有用。</p>
<p>最大的挑战可能在于后期的内容管理。如何让非技术人员（或者未来的我）能够方便地更新文章、引用、摄影作品等，而不需要直接修改代码，这是一个需要仔细考虑的问题。简单的 Markdown 文件管理可能是一个起点，但一个简单的 CMS 或后台界面会更加友好。</p>
<h2>未来的展望</h2>
<p>希望 Dateflow 不仅仅是一个静态的展示页面，更能成为一个动态的、不断成长的个人空间。后面会逐步完善摄影集、推荐、CS 学习记录等模块，让内容更加丰富。</p>
<p><em>（以上内容为模拟，请替换为真实随想）</em></p>
` // 使用反引号允许多行 HTML
  },
  {
    id: 't2',
    title: '学习的乐趣与焦虑',
    timestamp: '2024-05-01T11:00:00Z',
    content: '<p>探索新知识总是令人兴奋，但随之而来的信息爆炸和"学不过来"的焦虑也真实存在...</p><p>（更多内容）</p>'
  }
];
// -------------------------

const Thoughts = () => {
  // 按时间排序 (最新在前)
  const sortedPosts = [...mockThoughtsPosts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="thoughts-section">
      <h2>随想</h2>
      {sortedPosts.length > 0 ? (
        sortedPosts.map(post => (
          <article key={post.id} className="thought-post">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-meta">发布于: {new Date(post.timestamp).toLocaleDateString()}</p>
            {/* 使用 dangerouslySetInnerHTML 来渲染 HTML 内容 */}
            {/* 注意：确保你的内容源是可信的，以防止 XSS 攻击 */}
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
            {/* 可以添加评论区、分享按钮等 */}
          </article>
        ))
      ) : (
        <p>还没有发布任何随想。</p>
      )}
    </div>
  );
};

export default Thoughts; 