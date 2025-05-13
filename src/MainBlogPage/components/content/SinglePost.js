import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './SinglePost.css'; // Assuming CSS file for styling

// --- Mock Data (You would fetch this based on postId) ---
// In a real app, you'd have a function fetchPostById(id)
const findMockPost = (id) => {
  // Simulate fetching - replace with actual logic
  const posts = {
    post1: {
      id: 'post1',
      title: '开博宣言',
      imageUrl: '/images/postone_1.png',
      publishDate: '2025-05-12',
      updateDate: '2025-05-12',
      author: '我',
      commentCount: 0,
      // Full content would be here
      contentHtml: `
        <h1>advx给予我执行力...... ✨</h1>

        <p>很久之前就想做一个博客，因为自从接触互联网后，几乎每天都在收藏着有趣的东西。当然和大多数人一样，收藏之后就积灰了 🕸️。</p>

        <p>等某天心血来潮再去翻看，却发现人去楼空，已然不存在了。</p>

        <blockquote>（bilibili 就是一个非常非常典型的例子：经常性的删除视频也就算了，关键是你根本想不起它删的是什么。我认为这非常遗憾。）</blockquote>

        <p>是命运？还是缘分已尽？</p>

        <p>看到互联网上浩如烟海的帖子、知识、音乐、视频……我都会收藏起来，也会截图下来。但是它们都分散在各个平台，彼此封闭。这让一个有"实物收藏癖"好的我非常难受 <span class="emote">😣</span>。</p>

        <p>于是便想着做一个"收藏站"，也算是我的一个小宝库 🧳。</p>

        <p>可是啊，一直拖延，一边收藏新的事物，一边刷视频、打王者……惰性简直拉满 <span class="emote">😭</span>。</p>

        <p>而一次随口而出的杭州旅行，竟成为了真正说走就走的行动。</p>

        <p>第一次去路演会，第一次去漫展，第一次接触社会上的新鲜产品，第一次看见 startup 的雄心壮志……与尚处于象牙塔、日趋颓废的我形成了鲜明对比。</p>

        <p>于是我鼓起勇气去要了 startup 的联系方式，开始学习他们如何从一个小小的想法变为商业化落地。</p>

        <p>在这个过程中，我偶然了解到了 Hackathon，进一步又接触到了 advx。</p>

        <p>我看到了他们的官网，看到他们的宣言——<strong>"让我们再次为创造失眠"</strong>，于是我尝试着申请了。</p>

        <p>进入官方群聊之后，通过他们分享的博客、Bonjour 名片，我看到了许多技术大佬。他们的见识、技术、项目、实习经历……早已远超同龄人。</p>

        <p>这回是真的见到了"吾辈楷模" 🙌。</p>

        <p>人啊，还是要多出去走走，不能囿于自己的一方小天地 🗺️。</p>

        <p>之前想做博客、想做收藏站的想法就这样被重新点燃。</p>

        <p>通过自己一番胡乱构思，尽管有无数 debug，但在 ChatGPT 🤖、Gemini、Grok、Cursor、Windsurf……的建议和帮助下，大致搭出来了一个博客的雏形。</p>

        <p>后期还需要不断完善博客的界面和功能，实现真正的前后端交互，做出属于我自己的收藏站 🛠️。</p>

        <p>有幸，在网络上遇见了不一样的、富有活力的同龄人。</p>

        <p>他们也在不停奔跑，不停创造 🏃。</p>

        <p>而我，也将会——</p>

        <h2 style="text-align:center; color: #444; margin-top: 2em;">Per Aspera Ad Astra 🌌</h2>
      `
      /*,tags
    : [],
      category: '随想',
      // Footer Meta Data (Separated for easier styling)
      footerMeta: {
          author: '我',
          articleLink: 'https://vioulo.com/archives/the-scale-of-time.html',
          copyright: '本博客所有文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> 许可协议。转载请注明来自<a href="https://vioulo.com">维奥路の航行日志</a>！',
          tags: [] // Example: [{ name: '标签1', slug: 'tag1' }]
      }*/
    },
    /*post2: {
      id: 'post2',
      title: '起点的标准',
      imageUrl: '/images/placeholder_vioulo.jpg',
      publishDate: '2024-04-29',
      updateDate: '2024-04-29',
      author: '我',
      commentCount: 2,
      contentHtml: '<p>我前不久打算开发一套个人博客系统。(仅供测试字样)</p><p>【此处省略大量内容】...(仅供测试字样)</p>',
      tags: ['技术', '博客', '开发'],
      category: '学习',
      footerMeta: {
          author: '我',
          articleLink: 'https://vioulo.com/archives/the-scale-of-time.html',
          copyright: '本博客所有文章除特别声明外，均采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> 许可协议。转载请注明来自<a href="https://vioulo.com">维奥路の航行日志</a>！',
          tags: [] // Example: [{ name: '标签1', slug: 'tag1' }]
      }
    },*/
  };
  return posts[id];
};
// -----------------------------------------------------

const SinglePost = () => {
  const { postId } = useParams(); // Get postId from URL parameters
  const post = findMockPost(postId);

  if (!post) {
    return <div className="post-not-found">文章未找到或已被删除。</div>;
  }

  // Style for the header background image
  const headerStyle = post.imageUrl ? {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${post.imageUrl})`
  } : {};

  return (
    <article className="single-post-container">
      {/* New Header with Background Image */} 
      <header className="single-post-header-featured" style={headerStyle}>
        <div className="header-content-overlay">
          <h1>{post.title}</h1>
          <div className="single-post-meta header-meta">
            {/* Display only essential meta here, or style differently */}
            <span><i className="icon-calendar"></i> {post.publishDate}</span>
            {/* <span><i className="icon-user"></i> {post.author}</span> */} 
            {post.commentCount > 0 && <span><i className="icon-eye"></i> {post.commentCount}</span>} {/* Assuming count is views */} 
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="single-post-main-content">
        {/* Render HTML content safely */}
        <div 
          className="single-post-content" 
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* New Footer Meta Box */} 
        {post.footerMeta && (
          <footer className="single-post-footer-box">
            <div><strong>作者:</strong> {post.footerMeta.author}</div>
            <div><strong>文章标题:</strong> {post.title} <a href="#" aria-label="Copy title">[icon]</a></div> {/* Placeholder icon */} 
            <div><strong>发表时间:</strong> {post.publishDate}</div>
            <div><strong>文章链接:</strong> <a href={post.footerMeta.articleLink} target="_blank" rel="noopener noreferrer">{post.footerMeta.articleLink}</a></div>
            <div><strong>版权说明:</strong> {post.footerMeta.copyright}</div>
            {post.footerMeta.tags && post.footerMeta.tags.length > 0 && (
              <div className="post-tags footer-tags">
                <strong>标签:</strong> 
                {post.footerMeta.tags.map(tag => (
                   <Link key={tag.slug} to={`/blog/tag/${tag.slug}`}>{tag.name}</Link>
                ))}
              </div>
            )}
          </footer>
        )}
      </div>
      
      {/* TODO: Add Comment Section */}
    </article>
  );
};

export default SinglePost; 