import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat.js'

const Dashboards = () => {
  const chat = useChat()
  const { user } = useSelector((state) => state.auth)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    chat.initializeSocketConnection()
  }, [])

  // Close sidebar on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsSidebarOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const navItems = [
    {
      label: 'Computer',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      label: 'Spaces',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
        </svg>
      ),
    },
    {
      label: 'Artifacts',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      label: 'Customize',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      ),
    },
  ]

  const sidebarSubItems = [
    { label: 'Connectors' },
    { label: 'Skills' },
    { label: 'Workflows' },
    { label: 'Memory' },
  ]

  const historyItems = [
    'create and update resume i...',
    'class Solution { static List...',
    'create a Image lion',
    'i want learn basic English to...',
  ]

  const topNavLinks = ['Discover', 'Finance', 'Health', 'Academic', 'Patents']

  return (
    <div className="dashboard-root">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ─────────── SIDEBAR ─────────── */}
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar--open' : ''}`}>
        {/* Logo row */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {/* Perplexity-style abstract logo */}
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
              <path d="M14 2L4 8v12l10 6 10-6V8L14 2z" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <path d="M14 2v24M4 8l10 6 10-6M4 20l10-6 10 6" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
            </svg>
          </div>

          {/* Close button (mobile) */}
          <button
            className="sidebar-close"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* New Thread button */}
        <div className="sidebar-new-wrapper">
          <button className="sidebar-new-btn">
            <span className="sidebar-new-btn__left">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>New</span>
            </span>
            <kbd className="sidebar-kbd">Ctrl I</kbd>
          </button>
        </div>

        {/* Primary nav */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <a key={item.label} href="#" className="sidebar-nav-item">
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Sub-items under Customize */}
        <div className="sidebar-sub">
          {sidebarSubItems.map((item) => (
            <a key={item.label} href="#" className="sidebar-sub-item">
              {item.label}
            </a>
          ))}
        </div>

        {/* History */}
        <div className="sidebar-history">
          <h4 className="sidebar-history__title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            History
          </h4>
          {historyItems.map((item, idx) => (
            <a key={idx} href="#" className="sidebar-history-item">
              {item}
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div className="sidebar-bottom">
          <button className="sidebar-upgrade-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Upgrade plan
          </button>

          <div className="sidebar-user">
            <div className="sidebar-user__avatar">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <span className="sidebar-user__name">
              {user?.name || 'User'}
            </span>
            <button className="sidebar-user__bell" aria-label="Notifications">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ─────────── MAIN ─────────── */}
      <main className="main-area">
        {/* Top bar */}
        <header className="topbar">
          <div className="topbar__left">
            <button
              className="topbar__hamburger"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <span className="topbar__plan">
              Free plan · <a href="#">Upgrade</a>
            </span>
          </div>

          <nav className="topbar__links">
            {topNavLinks.map((link) => (
              <a key={link} href="#" className="topbar__link">
                {link}
              </a>
            ))}
          </nav>

          <div className="topbar__right">
            <button className="topbar__scheduled-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Scheduled
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <button className="topbar__icon-btn" aria-label="Settings">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
          </div>
        </header>

        {/* Center hero */}
        <div className="hero-section">
          <h1 className="hero-title">perplexity</h1>

          {/* Search box */}
          <div className="search-box">
            <div className="search-box__input-area">
              <textarea
                className="search-box__textarea"
                placeholder="Ask anything..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={2}
              />
            </div>

            <div className="search-box__toolbar">
              <div className="search-box__toolbar-left">
                <button className="search-box__action-btn" title="Attach">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>

                <button className="search-box__pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Search
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <button className="search-box__pill search-box__pill--hide-mobile">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  Computer
                </button>
              </div>

              <div className="search-box__toolbar-right">
                <button className="search-box__model-btn">
                  Model
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <button className="search-box__mic-btn" title="Voice input">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                    <path d="M19 10v2a7 7 0 01-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </button>

                <button
                  className={`search-box__submit ${query.trim() ? 'search-box__submit--active' : ''}`}
                  disabled={!query.trim()}
                  title="Submit"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ─────────── SCOPED STYLES ─────────── */}
      <style>{`
        /* ===== LAYOUT ROOT ===== */
        .dashboard-root {
          display: flex;
          height: 100vh;
          background: var(--color-bg-primary);
          color: var(--color-text-primary);
          font-family: var(--font-primary);
          overflow: hidden;
        }

        /* ===== SIDEBAR OVERLAY (mobile) ===== */
        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          z-index: 90;
        }

        @media (min-width: 768px) {
          .sidebar-overlay { display: none; }
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
          position: fixed;
          inset-block: 0;
          left: 0;
          width: 240px;
          background: var(--color-bg-secondary);
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          z-index: 100;
          transform: translateX(-100%);
          transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .sidebar--open {
          transform: translateX(0);
        }

        @media (min-width: 768px) {
          .sidebar {
            position: static;
            transform: none;
          }
        }

        /* Header */
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 16px 8px;
        }

        .sidebar-logo {
          color: var(--color-text-primary);
          display: flex;
          align-items: center;
        }

        .sidebar-close {
          display: flex;
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.15s, background 0.15s;
        }

        .sidebar-close:hover {
          color: var(--color-text-primary);
          background: var(--color-bg-card);
        }

        @media (min-width: 768px) {
          .sidebar-close { display: none; }
        }

        /* New button */
        .sidebar-new-wrapper {
          padding: 8px 12px;
        }

        .sidebar-new-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 8px 12px;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          color: var(--color-text-primary);
          font-family: var(--font-primary);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }

        .sidebar-new-btn:hover {
          background: var(--color-bg-card-hover);
          border-color: var(--color-accent-glow);
        }

        .sidebar-new-btn__left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sidebar-kbd {
          font-family: inherit;
          font-size: 0.65rem;
          color: var(--color-text-muted);
          background: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          padding: 2px 6px;
          letter-spacing: 0.03em;
        }

        /* Nav items */
        .sidebar-nav {
          padding: 8px 8px 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sidebar-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 0.84rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.15s, background 0.15s;
        }

        .sidebar-nav-item:hover {
          color: var(--color-text-primary);
          background: var(--color-bg-card-hover);
        }

        /* Sub-items */
        .sidebar-sub {
          padding: 4px 8px 0 44px;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .sidebar-sub-item {
          display: block;
          padding: 4px 0;
          font-size: 0.78rem;
          color: var(--color-text-muted);
          text-decoration: none;
          transition: color 0.15s;
        }

        .sidebar-sub-item:hover {
          color: var(--color-text-secondary);
        }

        /* History */
        .sidebar-history {
          flex: 1;
          overflow-y: auto;
          padding: 16px 8px 8px;
          min-height: 0;
        }

        .sidebar-history__title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0 12px 8px;
        }

        .sidebar-history-item {
          display: block;
          padding: 5px 12px;
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border-radius: 6px;
          transition: color 0.15s, background 0.15s;
        }

        .sidebar-history-item:hover {
          color: var(--color-text-primary);
          background: var(--color-bg-card-hover);
        }

        /* Bottom */
        .sidebar-bottom {
          padding: 12px;
          border-top: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sidebar-upgrade-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 8px 0;
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: 20px;
          color: var(--color-text-primary);
          font-family: var(--font-primary);
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }

        .sidebar-upgrade-btn:hover {
          background: var(--color-bg-card-hover);
          border-color: var(--color-accent-glow);
        }

        .sidebar-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sidebar-user__avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-accent), #7B68EE);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.78rem;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }

        .sidebar-user__name {
          flex: 1;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--color-text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .sidebar-user__bell {
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          display: flex;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.15s;
        }

        .sidebar-user__bell:hover {
          color: var(--color-text-secondary);
        }

        /* ===== MAIN AREA ===== */
        .main-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          min-width: 0;
        }

        /* Top bar */
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          flex-shrink: 0;
        }

        .topbar__left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .topbar__hamburger {
          display: flex;
          background: none;
          border: none;
          color: var(--color-text-secondary);
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.15s;
        }

        .topbar__hamburger:hover {
          color: var(--color-text-primary);
        }

        @media (min-width: 768px) {
          .topbar__hamburger { display: none; }
        }

        .topbar__plan {
          font-size: 0.82rem;
          color: var(--color-text-muted);
        }

        .topbar__plan a {
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.15s;
        }

        .topbar__plan a:hover {
          color: var(--color-text-primary);
        }

        .topbar__links {
          display: none;
          align-items: center;
          gap: 24px;
        }

        @media (min-width: 900px) {
          .topbar__links { display: flex; }
        }

        .topbar__link {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.15s;
        }

        .topbar__link:hover {
          color: var(--color-text-primary);
        }

        .topbar__right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .topbar__scheduled-btn {
          display: none;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          color: var(--color-text-secondary);
          font-family: var(--font-primary);
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }

        .topbar__scheduled-btn:hover {
          background: var(--color-bg-card-hover);
          color: var(--color-text-primary);
        }

        @media (min-width: 640px) {
          .topbar__scheduled-btn { display: flex; }
        }

        .topbar__icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          border-radius: 6px;
          transition: color 0.15s, background 0.15s;
        }

        .topbar__icon-btn:hover {
          color: var(--color-text-secondary);
          background: var(--color-bg-card);
        }

        /* ===== HERO / CENTER ===== */
        .hero-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 20px 100px;
          max-width: 680px;
          margin: 0 auto;
          width: 100%;
        }

        .hero-title {
          font-size: 2.8rem;
          font-weight: 600;
          letter-spacing: -0.03em;
          color: var(--color-text-primary);
          margin-bottom: 32px;
          user-select: none;
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 2rem; }
        }

        /* ===== SEARCH BOX ===== */
        .search-box {
          width: 100%;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .search-box:focus-within {
          border-color: rgba(32, 178, 170, 0.45);
          box-shadow: 0 0 0 3px rgba(32, 178, 170, 0.08), 0 4px 24px rgba(0, 0, 0, 0.2);
        }

        .search-box__input-area {
          padding: 16px 18px 8px;
        }

        .search-box__textarea {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          resize: none;
          font-family: var(--font-primary);
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--color-text-primary);
          min-height: 44px;
          max-height: 160px;
        }

        .search-box__textarea::placeholder {
          color: var(--color-text-muted);
        }

        /* Toolbar */
        .search-box__toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-top: 1px solid rgba(42, 42, 69, 0.5);
        }

        .search-box__toolbar-left,
        .search-box__toolbar-right {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* + button */
        .search-box__action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: var(--color-bg-primary);
          border: none;
          border-radius: 8px;
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: color 0.15s, background 0.15s;
        }

        .search-box__action-btn:hover {
          color: var(--color-text-primary);
          background: var(--color-bg-card-hover);
        }

        /* Pill buttons */
        .search-box__pill {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 6px 12px;
          background: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          color: var(--color-text-primary);
          font-family: var(--font-primary);
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }

        .search-box__pill:hover {
          background: var(--color-bg-card-hover);
          border-color: rgba(32, 178, 170, 0.3);
        }

        .search-box__pill--hide-mobile {
          display: none;
        }

        @media (min-width: 560px) {
          .search-box__pill--hide-mobile { display: flex; }
        }

        /* Model button */
        .search-box__model-btn {
          display: none;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: var(--color-text-secondary);
          font-family: var(--font-primary);
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.15s;
        }

        .search-box__model-btn:hover {
          color: var(--color-text-primary);
        }

        @media (min-width: 560px) {
          .search-box__model-btn { display: flex; }
        }

        /* Mic button */
        .search-box__mic-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          border-radius: 6px;
          transition: color 0.15s;
        }

        .search-box__mic-btn:hover {
          color: var(--color-text-primary);
        }

        /* Submit */
        .search-box__submit {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: none;
          background: var(--color-border);
          color: var(--color-bg-primary);
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }

        .search-box__submit:disabled {
          opacity: 0.45;
          cursor: default;
        }

        .search-box__submit--active {
          background: var(--color-accent);
          box-shadow: 0 0 16px rgba(32, 178, 170, 0.35);
        }

        .search-box__submit--active:hover {
          background: var(--color-accent-hover);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  )
}

export default Dashboards