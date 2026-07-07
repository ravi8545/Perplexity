import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat.js'
import { useAuth } from '../../auth/hook/useAuth.js'
import { useNavigate } from 'react-router'
import MarkdownRenderer from '../components/MarkdownRenderer.jsx'
import DiscoverView from '../components/DiscoverView.jsx'
import FinanceView from '../components/FinanceView.jsx'
import HealthView from '../components/HealthView.jsx'
import AcademicView from '../components/AcademicView.jsx'
import PatentsView from '../components/PatentsView.jsx'

const Dashboards = () => {
  const chat = useChat()
  const { handleLogout } = useAuth()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [showProfile, setShowProfile] = useState(false)
  const [currentView, setCurrentView] = useState('home')
  const messagesEndRef = useRef(null)

  // Load chats and initialize socket on mount
  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleLoadChats()
  }, [])

  // Close sidebar on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false)
        setShowProfile(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  // Ctrl+I for new chat
  useEffect(() => {
    const handleKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault()
        chat.handleNewChat()
        setCurrentView('home')
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat.messages])

  const handleSubmit = async () => {
    const trimmed = query.trim()
    if (!trimmed || chat.isSending) return

    setQuery('')
    await chat.handleSendMessage({
      message: trimmed,
      chatId: chat.currentChatId,
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const onLogout = async () => {
    await handleLogout()
    navigate('/login', { replace: true })
  }

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

  const topNavLinks = ['Discover', 'Finance', 'Health', 'Academic', 'Patents']

  // Determine if we are in chat view or home view
  const isInChat = chat.currentChatId !== null
  const activeChat = chat.chats.find(c => c._id === chat.currentChatId)

  return (
    <div className="dashboard-root">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Profile modal overlay */}
      {showProfile && (
        <div className="profile-overlay" onClick={() => setShowProfile(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal__header">
              <h2 className="profile-modal__title">Profile</h2>
              <button className="profile-modal__close" onClick={() => setShowProfile(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="profile-modal__body">
              <div className="profile-modal__avatar">
                {user?.username ? user.username[0].toUpperCase() : 'U'}
              </div>
              <div className="profile-modal__info">
                <div className="profile-modal__row">
                  <span className="profile-modal__label">Username</span>
                  <span className="profile-modal__value">{user?.username || 'N/A'}</span>
                </div>
                <div className="profile-modal__row">
                  <span className="profile-modal__label">Email</span>
                  <span className="profile-modal__value">{user?.email || 'N/A'}</span>
                </div>
                {user?.createdAt && (
                  <div className="profile-modal__row">
                    <span className="profile-modal__label">Member since</span>
                    <span className="profile-modal__value">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
              <button className="profile-modal__logout" onClick={onLogout}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────── SIDEBAR ─────────── */}
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar--open' : ''}`}>
        {/* Logo row */}
        <div className="sidebar-header">
          <div 
            className="sidebar-logo"
            onClick={() => {
              chat.handleNewChat()
              setCurrentView('home')
            }}
            style={{ cursor: 'pointer' }}
          >
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
          <button className="sidebar-new-btn" onClick={() => {
            chat.handleNewChat()
            setCurrentView('home')
          }}>
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

        {/* History — real chats from backend */}
        <div className="sidebar-history">
          <h4 className="sidebar-history__title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            History
          </h4>
          {chat.chats.length === 0 && !chat.isLoading && (
            <p className="sidebar-history__empty">No chats yet</p>
          )}
          {chat.chats.map((chatItem) => (
            <div
              key={chatItem._id}
              className={`sidebar-history-item-wrapper ${chat.currentChatId === chatItem._id ? 'sidebar-history-item-wrapper--active' : ''}`}
            >
              <a
                href="#"
                className="sidebar-history-item"
                onClick={(e) => {
                  e.preventDefault()
                  chat.handleSelectChat(chatItem._id)
                  setIsSidebarOpen(false)
                }}
              >
                {chatItem.title || 'Untitled Chat'}
              </a>
              <button
                className="sidebar-history-item__delete"
                onClick={(e) => {
                  e.stopPropagation()
                  chat.handleDeleteChat(chatItem._id)
                }}
                title="Delete chat"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </button>
            </div>
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

          <div className="sidebar-user" onClick={() => setShowProfile(true)} style={{ cursor: 'pointer' }}>
            <div className="sidebar-user__avatar">
              {user?.username ? user.username[0].toUpperCase() : 'U'}
            </div>
            <span className="sidebar-user__name">
              {user?.username || 'User'}
            </span>
            <button className="sidebar-user__bell" aria-label="Notifications" onClick={(e) => e.stopPropagation()}>
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
            {topNavLinks.map((link) => {
              const viewKey = link.toLowerCase();
              const isActive = currentView === viewKey;
              return (
                <button 
                  key={link} 
                  onClick={() => {
                    chat.handleNewChat();
                    setCurrentView(viewKey);
                  }} 
                  className={`topbar__link ${isActive ? 'topbar__link--active' : ''}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '4px 0',
                    cursor: 'pointer',
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    borderBottom: isActive ? '2px solid var(--color-accent)' : 'none',
                    fontWeight: isActive ? '600' : '500',
                    transition: 'all 0.2s',
                  }}
                >
                  {link}
                </button>
              );
            })}
          </nav>

          <div className="topbar__right">
            {/* Download button — only shown when in a chat */}
            {isInChat && chat.messages.length > 0 && (
              <button
                className="topbar__icon-btn"
                aria-label="Download chat"
                title="Download as text"
                onClick={() => chat.handleDownloadChat(chat.currentChatId)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            )}
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

        {/* Mobile Category Links (Only visible on mobile/tablet) */}
        <nav className="mobile-category-bar">
          {topNavLinks.map((link) => {
            const viewKey = link.toLowerCase();
            const isActive = currentView === viewKey && !isInChat;
            return (
              <button 
                key={link} 
                onClick={() => {
                  chat.handleNewChat();
                  setCurrentView(viewKey);
                }} 
                className={`mobile-category-link ${isActive ? 'mobile-category-link--active' : ''}`}
                style={{
                  background: isActive ? 'var(--color-bg-card)' : 'none',
                  border: isActive ? '1.5px solid var(--color-border)' : '1.5px solid transparent',
                  borderRadius: '16px',
                  fontFamily: 'var(--font-primary)',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  padding: '5px 12px',
                  transition: 'all 0.2s',
                }}
              >
                {link}
              </button>
            );
          })}
        </nav>

        {/* ─── CONDITIONAL: Chat View or Hero View ─── */}
        {isInChat ? (
          /* ─── CHAT VIEW ─── */
          <div className="chat-view">
            {/* Chat header with title */}
            <div className="chat-view__header">
              <button className="chat-view__back" onClick={() => {
                chat.handleNewChat()
                setCurrentView('home')
              }} title="Back to home">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <h2 className="chat-view__title">{activeChat?.title || 'Chat'}</h2>
            </div>

            {/* Messages */}
            <div className="chat-view__messages">
              {chat.isLoading && chat.messages.length === 0 && (
                <div className="chat-loading-center">
                  <div className="chat-loading-pulse">
                    <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                      <path d="M14 2L4 8v12l10 6 10-6V8L14 2z" stroke="currentColor" strokeWidth="1.6" fill="none" />
                      <path d="M14 2v24M4 8l10 6 10-6M4 20l10-6 10 6" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
                    </svg>
                  </div>
                  <span className="chat-loading-text">Loading messages...</span>
                </div>
              )}
              {chat.messages.map((msg, idx) => (
                <div
                  key={msg._id || idx}
                  className={`chat-msg ${msg.role === 'user' ? 'chat-msg--user' : 'chat-msg--ai'}`}
                >
                  <div className="chat-msg__avatar">
                    {msg.role === 'user' ? (
                      user?.username ? user.username[0].toUpperCase() : 'U'
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                        <path d="M14 2L4 8v12l10 6 10-6V8L14 2z" stroke="currentColor" strokeWidth="1.6" fill="none" />
                      </svg>
                    )}
                  </div>
                  <div className="chat-msg__content">
                    <span className="chat-msg__role">{msg.role === 'user' ? 'You' : 'AI'}</span>
                    <div className="chat-msg__text">
                      {msg.role === 'user' ? msg.content : <MarkdownRenderer content={msg.content} />}
                    </div>
                  </div>
                </div>
              ))}
              {chat.isSending && (
                <div className="chat-msg chat-msg--ai">
                  <div className="chat-msg__avatar">
                    <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                      <path d="M14 2L4 8v12l10 6 10-6V8L14 2z" stroke="currentColor" strokeWidth="1.6" fill="none" />
                    </svg>
                  </div>
                  <div className="chat-msg__content">
                    <span className="chat-msg__role">AI</span>
                    <div className="chat-msg__typing">
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="chat-view__input-area">
              <div className="search-box">
                <div className="search-box__input-area">
                  <textarea
                    className="search-box__textarea"
                    placeholder="Ask a follow-up..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
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
                  </div>

                  <div className="search-box__toolbar-right">
                    <button
                      className={`search-box__submit ${query.trim() ? 'search-box__submit--active' : ''}`}
                      disabled={!query.trim() || chat.isSending}
                      title="Submit"
                      onClick={handleSubmit}
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
          </div>
        ) : (
          currentView === 'discover' ? (
            <DiscoverView />
          ) : currentView === 'finance' ? (
            <FinanceView />
          ) : currentView === 'health' ? (
            <HealthView />
          ) : currentView === 'academic' ? (
            <AcademicView />
          ) : currentView === 'patents' ? (
            <PatentsView />
          ) : (
            /* ─── HOME / HERO VIEW ─── */
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
                    onKeyDown={handleKeyDown}
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
                      disabled={!query.trim() || chat.isSending}
                      title="Submit"
                      onClick={handleSubmit}
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
          )
        )}
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

        .sidebar-history__empty {
          font-size: 0.78rem;
          color: var(--color-text-muted);
          padding: 8px 12px;
        }

        .sidebar-history-item-wrapper {
          display: flex;
          align-items: center;
          border-radius: 6px;
          transition: background 0.15s;
        }

        .sidebar-history-item-wrapper:hover {
          background: var(--color-bg-card-hover);
        }

        .sidebar-history-item-wrapper--active {
          background: var(--color-bg-card);
        }

        .sidebar-history-item {
          display: block;
          flex: 1;
          padding: 5px 12px;
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          border-radius: 6px;
          transition: color 0.15s;
        }

        .sidebar-history-item-wrapper:hover .sidebar-history-item {
          color: var(--color-text-primary);
        }

        .sidebar-history-item__delete {
          display: none;
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          flex-shrink: 0;
          transition: color 0.15s;
        }

        .sidebar-history-item-wrapper:hover .sidebar-history-item__delete {
          display: flex;
        }

        .sidebar-history-item__delete:hover {
          color: var(--color-error);
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

        /* Mobile Category Bar Styles */
        .mobile-category-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          border-bottom: 1px solid var(--color-border);
          background: var(--color-bg-secondary);
          overflow-x: auto;
          scrollbar-width: none;
          flex-shrink: 0;
        }
        .mobile-category-bar::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 900px) {
          .mobile-category-bar {
            display: none;
          }
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

        /* ===== CHAT VIEW ===== */
        .chat-view {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
          max-width: 820px;
          margin: 0 auto;
          width: 100%;
        }

        .chat-view__header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 20px 12px;
          border-bottom: 1px solid var(--color-border);
          flex-shrink: 0;
        }

        .chat-view__back {
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

        .chat-view__back:hover {
          color: var(--color-text-primary);
          background: var(--color-bg-card);
        }

        .chat-view__title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .chat-view__messages {
          flex: 1;
          overflow-y: auto;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Centered loading animation */
        .chat-loading-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          min-height: 300px;
        }

        .chat-loading-pulse {
          color: var(--color-accent);
          animation: loadingPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes loadingPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.92); }
          50% { opacity: 1; transform: scale(1.08); }
        }

        .chat-loading-text {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          animation: loadingTextFade 2s ease-in-out infinite;
        }

        @keyframes loadingTextFade {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        /* Chat messages */
        .chat-msg {
          display: flex;
          gap: 14px;
          animation: msgFadeIn 0.3s ease;
        }

        @keyframes msgFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .chat-msg__avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 0.75rem;
          font-weight: 700;
          color: #fff;
        }

        .chat-msg--user .chat-msg__avatar {
          background: linear-gradient(135deg, var(--color-accent), #7B68EE);
        }

        .chat-msg--ai .chat-msg__avatar {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          color: var(--color-text-primary);
        }

        .chat-msg__content {
          flex: 1;
          min-width: 0;
        }

        .chat-msg__role {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-text-muted);
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .chat-msg__text {
          font-size: 0.92rem;
          line-height: 1.7;
          color: var(--color-text-primary);
          white-space: pre-wrap;
          word-break: break-word;
        }

        /* Typing indicator */
        .chat-msg__typing {
          display: flex;
          gap: 5px;
          padding: 8px 0;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          background: var(--color-text-muted);
          border-radius: 50%;
          animation: typingBounce 1.4s infinite both;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.16s; }
        .typing-dot:nth-child(3) { animation-delay: 0.32s; }

        @keyframes typingBounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* Chat input area */
        .chat-view__input-area {
          padding: 12px 20px 20px;
          flex-shrink: 0;
        }

        /* ===== PROFILE MODAL ===== */
        .profile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(6px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .profile-modal {
          width: 100%;
          max-width: 400px;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-card);
          animation: modalSlideUp 0.3s ease;
          margin: 20px;
        }

        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .profile-modal__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px 0;
        }

        .profile-modal__title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .profile-modal__close {
          display: flex;
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.15s, background 0.15s;
        }

        .profile-modal__close:hover {
          color: var(--color-text-primary);
          background: var(--color-bg-card-hover);
        }

        .profile-modal__body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .profile-modal__avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-accent), #7B68EE);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
        }

        .profile-modal__info {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .profile-modal__row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px;
          background: var(--color-bg-primary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
        }

        .profile-modal__label {
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--color-text-muted);
        }

        .profile-modal__value {
          font-size: 0.88rem;
          font-weight: 500;
          color: var(--color-text-primary);
        }

        .profile-modal__logout {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 11px 0;
          background: transparent;
          border: 1px solid var(--color-error-border);
          border-radius: var(--radius-md);
          color: var(--color-error);
          font-family: var(--font-primary);
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .profile-modal__logout:hover {
          background: var(--color-error-bg);
          border-color: var(--color-error);
        }
      `}</style>
    </div>
  )
}

export default Dashboards