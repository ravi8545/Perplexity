import React, { useState } from 'react';

/* ─── Static discover data (random, Perplexity-style) ─── */

const trendingTopics = [
  { label: 'AI Agents', emoji: '🤖' },
  { label: 'SpaceX Starship', emoji: '🚀' },
  { label: 'Quantum Computing', emoji: '⚛️' },
  { label: 'Climate Tech', emoji: '🌍' },
  { label: 'CRISPR Advances', emoji: '🧬' },
  { label: 'Electric Vehicles', emoji: '⚡' },
  { label: 'Fusion Energy', emoji: '☀️' },
  { label: 'Open Source LLMs', emoji: '🧠' },
];

const topStories = [
  {
    id: 1,
    category: 'Technology',
    categoryColor: '#20B2AA',
    title: 'OpenAI announces GPT-5 with real-time reasoning capabilities',
    summary: 'The latest model demonstrates unprecedented chain-of-thought reasoning, scoring 92% on graduate-level mathematics benchmarks.',
    source: 'TechCrunch',
    time: '2h ago',
    views: '124K',
  },
  {
    id: 2,
    category: 'Science',
    categoryColor: '#7B68EE',
    title: 'NASA confirms water ice deposits on the Moon\'s south pole',
    summary: 'New data from the Lunar Reconnaissance Orbiter reveals extensive ice reserves that could support future Artemis missions.',
    source: 'Nature',
    time: '4h ago',
    views: '89K',
  },
  {
    id: 3,
    category: 'Business',
    categoryColor: '#00d68f',
    title: 'Global semiconductor market projected to reach $1 trillion by 2030',
    summary: 'Rising AI chip demand and expansion of fab capacity worldwide are driving record growth forecasts for the industry.',
    source: 'Bloomberg',
    time: '6h ago',
    views: '67K',
  },
];

const categories = [
  {
    name: 'Technology',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    color: '#20B2AA',
    items: [
      { title: 'Apple Vision Pro 2 rumored for early 2027 with thinner design', source: 'The Verge', time: '1h ago' },
      { title: 'Google DeepMind achieves breakthrough in protein-drug interaction prediction', source: 'Wired', time: '3h ago' },
      { title: 'Linux kernel 7.0 released with major performance improvements', source: 'Ars Technica', time: '5h ago' },
      { title: 'Microsoft integrates AI copilot into Windows system settings', source: 'ZDNet', time: '7h ago' },
    ],
  },
  {
    name: 'Science',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3v7.2c0 .3-.1.6-.3.8L4.2 16.4c-1.1 1.4-.2 3.6 1.5 3.6h12.6c1.7 0 2.6-2.2 1.5-3.6l-4.5-5.4c-.2-.2-.3-.5-.3-.8V3" />
        <line x1="9" y1="3" x2="15" y2="3" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
    color: '#7B68EE',
    items: [
      { title: 'CERN detects anomalous particle behavior that defies Standard Model', source: 'Scientific American', time: '2h ago' },
      { title: 'New antibiotic discovered in deep-sea microbes shows promise against superbugs', source: 'Nature', time: '4h ago' },
      { title: 'James Webb Telescope captures earliest galaxy ever observed', source: 'Space.com', time: '6h ago' },
      { title: 'Brain-computer interface allows paralyzed patients to type at 90 words per minute', source: 'MIT Tech Review', time: '8h ago' },
    ],
  },
  {
    name: 'Business',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    color: '#00d68f',
    items: [
      { title: 'Federal Reserve signals potential rate cut as inflation cools to 2.1%', source: 'Reuters', time: '1h ago' },
      { title: 'Nvidia surpasses $5 trillion market cap milestone', source: 'CNBC', time: '3h ago' },
      { title: 'Y Combinator reports record 12,000 applications for Summer 2026 batch', source: 'TechCrunch', time: '5h ago' },
      { title: 'India overtakes Japan as world\'s fourth-largest economy', source: 'Financial Times', time: '9h ago' },
    ],
  },
  {
    name: 'Entertainment',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
        <line x1="17" y1="17" x2="22" y2="17" />
      </svg>
    ),
    color: '#FF6B9D',
    items: [
      { title: 'Marvel announces Phase 7 slate with 8 new films through 2029', source: 'Variety', time: '2h ago' },
      { title: 'Spotify surpasses 700 million premium subscribers worldwide', source: 'Billboard', time: '4h ago' },
      { title: 'The Last of Us Season 3 breaks HBO viewership records', source: 'Deadline', time: '6h ago' },
      { title: 'Nintendo Switch 2 pre-orders sell out within 12 minutes globally', source: 'IGN', time: '10h ago' },
    ],
  },
  {
    name: 'Health',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    color: '#FF4D6A',
    items: [
      { title: 'mRNA cancer vaccine shows 70% tumor reduction in Phase 3 trials', source: 'The Lancet', time: '3h ago' },
      { title: 'WHO declares end of mpox global health emergency', source: 'BBC Health', time: '5h ago' },
      { title: 'New study links gut microbiome diversity to improved mental health', source: 'Harvard Health', time: '7h ago' },
      { title: 'Wearable AI patch detects early signs of cardiac arrhythmia', source: 'MedTech Dive', time: '11h ago' },
    ],
  },
  {
    name: 'Sports',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    color: '#FFAA00',
    items: [
      { title: 'FIFA announces expanded Club World Cup format for 2027', source: 'ESPN', time: '1h ago' },
      { title: 'Usain Bolt\'s 100m record finally broken at World Athletics Championships', source: 'BBC Sport', time: '4h ago' },
      { title: 'F1 confirms new Las Vegas night race extended through 2035', source: 'Autosport', time: '8h ago' },
      { title: 'NBA approves expansion teams in Seattle and Las Vegas for 2028', source: 'The Athletic', time: '12h ago' },
    ],
  },
];

const DiscoverView = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="discover-root">
      {/* ─── Header ─── */}
      <div className="discover-header">
        <h1 className="discover-title">Discover</h1>
        <p className="discover-subtitle">Trending stories, curated for you</p>
      </div>

      {/* ─── Trending Topics Pill Bar ─── */}
      <div className="discover-trending">
        <div className="discover-trending__label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          Trending
        </div>
        <div className="discover-trending__pills">
          {trendingTopics.map((topic) => (
            <button key={topic.label} className="discover-pill">
              <span className="discover-pill__emoji">{topic.emoji}</span>
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Top Stories ─── */}
      <section className="discover-section">
        <h2 className="discover-section__title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          Top Stories
        </h2>
        <div className="discover-top-stories">
          {topStories.map((story) => (
            <div key={story.id} className="discover-story-card">
              <div className="discover-story-card__badge" style={{ color: story.categoryColor, borderColor: story.categoryColor + '40', background: story.categoryColor + '12' }}>
                {story.category}
              </div>
              <h3 className="discover-story-card__title">{story.title}</h3>
              <p className="discover-story-card__summary">{story.summary}</p>
              <div className="discover-story-card__meta">
                <span className="discover-story-card__source">{story.source}</span>
                <span className="discover-story-card__dot">·</span>
                <span>{story.time}</span>
                <span className="discover-story-card__dot">·</span>
                <span className="discover-story-card__views">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {story.views}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Category Sections ─── */}
      {categories.map((cat) => (
        <section key={cat.name} className="discover-section">
          <h2
            className={`discover-section__title discover-section__title--clickable ${activeCategory === cat.name ? 'discover-section__title--active' : ''}`}
            onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
            style={{ '--cat-color': cat.color }}
          >
            <span className="discover-section__icon" style={{ color: cat.color }}>{cat.icon}</span>
            {cat.name}
            <svg className={`discover-section__chevron ${activeCategory === cat.name ? 'discover-section__chevron--open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </h2>
          <div className={`discover-category-items ${activeCategory === cat.name ? 'discover-category-items--collapsed' : ''}`}>
            {cat.items.map((item, idx) => (
              <div key={idx} className="discover-item">
                <div className="discover-item__number" style={{ color: cat.color }}>{String(idx + 1).padStart(2, '0')}</div>
                <div className="discover-item__content">
                  <h4 className="discover-item__title">{item.title}</h4>
                  <div className="discover-item__meta">
                    <span className="discover-item__source">{item.source}</span>
                    <span className="discover-item__dot">·</span>
                    <span>{item.time}</span>
                  </div>
                </div>
                <div className="discover-item__arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* ─── Footer ─── */}
      <div className="discover-footer">
        <p>Content curated and refreshed throughout the day</p>
      </div>

      {/* ─── Scoped Styles ─── */}
      <style>{`
        .discover-root {
          width: 100%;
          max-width: 860px;
          margin: 0 auto;
          padding: 24px 20px 60px;
          animation: discoverFadeIn 0.4s ease;
        }

        @keyframes discoverFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ─── Header ─── */
        .discover-header {
          margin-bottom: 28px;
        }

        .discover-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--color-text-primary);
          letter-spacing: -0.03em;
          margin-bottom: 6px;
          background: linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .discover-subtitle {
          font-size: 0.92rem;
          color: var(--color-text-muted);
          font-weight: 400;
        }

        /* ─── Trending ─── */
        .discover-trending {
          margin-bottom: 32px;
        }

        .discover-trending__label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }

        .discover-trending__pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .discover-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: 20px;
          color: var(--color-text-secondary);
          font-family: var(--font-primary);
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .discover-pill:hover {
          background: var(--color-bg-card-hover);
          border-color: var(--color-accent-glow);
          color: var(--color-text-primary);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .discover-pill__emoji {
          font-size: 1rem;
        }

        /* ─── Sections ─── */
        .discover-section {
          margin-bottom: 28px;
        }

        .discover-section__title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--color-border);
        }

        .discover-section__title--clickable {
          cursor: pointer;
          transition: color 0.2s;
          user-select: none;
        }

        .discover-section__title--clickable:hover {
          color: var(--cat-color, var(--color-accent));
        }

        .discover-section__icon {
          display: flex;
          align-items: center;
        }

        .discover-section__chevron {
          margin-left: auto;
          color: var(--color-text-muted);
          transition: transform 0.25s ease;
        }

        .discover-section__chevron--open {
          transform: rotate(180deg);
        }

        /* ─── Top Stories Cards ─── */
        .discover-top-stories {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        @media (min-width: 640px) {
          .discover-top-stories {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .discover-story-card {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          cursor: pointer;
          transition: all 0.25s;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .discover-story-card:hover {
          background: var(--color-bg-card-hover);
          border-color: var(--color-accent-glow);
          transform: translateY(-3px);
          box-shadow: var(--shadow-card), var(--shadow-glow);
        }

        .discover-story-card__badge {
          display: inline-flex;
          align-self: flex-start;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border: 1px solid;
        }

        .discover-story-card__title {
          font-size: 0.94rem;
          font-weight: 650;
          color: var(--color-text-primary);
          line-height: 1.4;
        }

        .discover-story-card__summary {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          line-height: 1.55;
          flex: 1;
        }

        .discover-story-card__meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.74rem;
          color: var(--color-text-muted);
          margin-top: 4px;
        }

        .discover-story-card__source {
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .discover-story-card__dot {
          opacity: 0.4;
        }

        .discover-story-card__views {
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        /* ─── Category Items ─── */
        .discover-category-items {
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow: hidden;
          max-height: 600px;
          transition: max-height 0.35s ease, opacity 0.25s ease;
          opacity: 1;
        }

        .discover-category-items--collapsed {
          max-height: 0;
          opacity: 0;
          margin-top: -16px;
        }

        .discover-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s;
        }

        .discover-item:hover {
          background: var(--color-bg-card);
        }

        .discover-item:hover .discover-item__arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .discover-item:hover .discover-item__title {
          color: var(--color-text-primary);
        }

        .discover-item__number {
          font-size: 0.82rem;
          font-weight: 700;
          min-width: 24px;
          opacity: 0.7;
        }

        .discover-item__content {
          flex: 1;
          min-width: 0;
        }

        .discover-item__title {
          font-size: 0.88rem;
          font-weight: 550;
          color: var(--color-text-secondary);
          line-height: 1.45;
          transition: color 0.2s;
        }

        .discover-item__meta {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          color: var(--color-text-muted);
          margin-top: 4px;
        }

        .discover-item__source {
          font-weight: 600;
          color: var(--color-text-secondary);
          opacity: 0.8;
        }

        .discover-item__dot {
          opacity: 0.35;
        }

        .discover-item__arrow {
          display: flex;
          color: var(--color-text-muted);
          opacity: 0;
          transform: translateX(-6px);
          transition: all 0.2s;
          flex-shrink: 0;
        }

        /* ─── Footer ─── */
        .discover-footer {
          text-align: center;
          padding: 32px 0 0;
          border-top: 1px solid var(--color-border);
          margin-top: 12px;
        }

        .discover-footer p {
          font-size: 0.78rem;
          color: var(--color-text-muted);
          opacity: 0.6;
        }

        /* ─── Responsive ─── */
        @media (max-width: 640px) {
          .discover-root {
            padding: 16px 14px 48px;
          }

          .discover-title {
            font-size: 1.5rem;
          }

          .discover-trending__pills {
            flex-wrap: nowrap;
            overflow-x: auto;
            scrollbar-width: none;
            padding-bottom: 4px;
          }

          .discover-trending__pills::-webkit-scrollbar {
            display: none;
          }

          .discover-item {
            padding: 12px 10px;
          }

          .discover-story-card {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default DiscoverView;
