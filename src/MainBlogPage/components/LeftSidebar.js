import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './LeftSidebar.css';

const LeftSidebar = () => {
  const location = useLocation();
  const [isQuotesSubmenuOpen, setIsQuotesSubmenuOpen] = useState(false);

  const isQuotesActive = location.pathname.startsWith('/blog/quotes');

  useEffect(() => {
    if (isQuotesActive) {
      setIsQuotesSubmenuOpen(true);
    }
  }, [isQuotesActive]);

  const getNavLinkClass = ({ isActive }) => {
    return isActive ? 'nav-link active' : 'nav-link';
  };

  const getQuotesParentSpanClass = () => {
    let classes = 'nav-link';
    if (isQuotesActive) {
        classes += ' active';
    }
    return classes;
  };

  const getSubNavLinkClass = ({ isActive }) => {
    return isActive ? 'sub-nav-link active' : 'sub-nav-link';
  };

  const toggleQuotesSubmenu = (e) => {
    e.preventDefault();
    setIsQuotesSubmenuOpen(!isQuotesSubmenuOpen);
  };

  return (
    <nav className="left-sidebar">
      <h3>导航</h3>
      <ul>
        <li><NavLink to="/blog" end className={getNavLinkClass}>全部</NavLink></li>
        {/* <li><NavLink to="thoughts" className={getNavLinkClass}>随想</NavLink></li> */}
        
        <li className={isQuotesSubmenuOpen ? 'has-submenu open' : 'has-submenu'}> 
          <span 
            className={getQuotesParentSpanClass()} 
            onClick={toggleQuotesSubmenu} 
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleQuotesSubmenu(e); }}
          >
            段落切片
          </span>
          <ul className="sub-menu">
            <li><NavLink to="quotes/by-author" className={getSubNavLinkClass}>按 Up 主/作者</NavLink></li>
            <li><NavLink to="quotes/by-quote" className={getSubNavLinkClass}>按言论</NavLink></li>
          </ul>
        </li>

        <li><NavLink to="photography" className={getNavLinkClass}>摄影集</NavLink></li>
        <li><NavLink to="recommendations" className={getNavLinkClass}>推荐</NavLink></li>
        <li><NavLink to="cs-journey" className={getNavLinkClass}>CS之路</NavLink></li>
      </ul>
    </nav>
  );
};

export default LeftSidebar; 