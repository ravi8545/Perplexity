import React, { useState } from 'react';

/* ─── Static health data (random, Perplexity-style) ─── */

const healthTopics = [
  { label: 'Nutrition', emoji: '🥗' },
  { label: 'Mental Health', emoji: '🧠' },
  { label: 'Fitness', emoji: '💪' },
  { label: 'Sleep', emoji: '😴' },
  { label: 'Vaccines', emoji: '💉' },
  { label: 'Heart Health', emoji: '❤️' },
  { label: 'Gut Health', emoji: '🦠' },
  { label: 'Longevity', emoji: '⏳' },
];

const featuredArticles = [
  {
    id: 1,
    category: 'Research',
    categoryColor: '#FF4D6A',
    title: 'mRNA cancer vaccines show remarkable 70% tumor reduction in Phase 3 trials',
    summary: 'Moderna and Merck\'s personalized mRNA vaccine targets melanoma and has shown durable responses lasting over 18 months in trial participants.',
    source: 'The Lancet',
    time: '2h ago',
    reads: '156K',
  },
  {
    id: 2,
    category: 'Wellness',
    categoryColor: '#00d68f',
    title: 'New study reveals optimal sleep window linked to 30% lower cardiovascular risk',
    summary: 'Research from the European Heart Journal shows sleeping between 10pm–11pm consistently reduces heart disease risk across all age groups.',
    source: 'Harvard Health',
    time: '4h ago',
    reads: '98K',
  },
  {
    id: 3,
    category: 'Nutrition',
    categoryColor: '#FFAA00',
    title: 'Mediterranean diet now shown to slow biological aging by up to 9 years',
    summary: 'A landmark 20-year study tracking telomere length found adherence to Mediterranean eating patterns significantly delayed cellular aging markers.',
    source: 'Nature Medicine',
    time: '6h ago',
    reads: '212K',
  },
];

const healthCategories = [
  {
    name: 'Medical Breakthroughs',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    color: '#FF4D6A',
    items: [
      { title: 'AI-powered blood test detects 50 types of cancer before symptoms appear', source: 'MIT Tech Review', time: '1h ago' },
      { title: 'First pig-to-human kidney transplant patient survives past 6-month mark', source: 'NEJM', time: '3h ago' },
      { title: 'CRISPR gene therapy cures sickle cell disease in 94% of trial patients', source: 'Science', time: '5h ago' },
      { title: 'Wearable patch continuously monitors blood sugar without needles', source: 'MedTech Dive', time: '8h ago' },
    ],
  },
  {
    name: 'Mental Health',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    color: '#7B68EE',
    items: [
      { title: 'Psilocybin therapy approved by FDA for treatment-resistant depression', source: 'Psychiatric Times', time: '2h ago' },
      { title: 'Social media breaks of just 7 days significantly reduce anxiety levels, study finds', source: 'APA Monitor', time: '4h ago' },
      { title: 'New digital CBT app matches in-person therapy effectiveness for mild depression', source: 'The Guardian', time: '7h ago' },
      { title: 'Workplace mental health programs save $4 for every $1 invested, WHO reports', source: 'WHO', time: '10h ago' },
    ],
  },
  {
    name: 'Fitness & Exercise',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    color: '#20B2AA',
    items: [
      { title: 'Just 11 minutes of daily walking reduces risk of premature death by 25%', source: 'British J. Sports Med', time: '1h ago' },
      { title: 'Strength training twice a week linked to 40% lower dementia risk in elderly', source: 'JAMA Neurology', time: '5h ago' },
      { title: 'Cold water immersion after exercise shown to boost immune function by 30%', source: 'Frontiers in Physiology', time: '8h ago' },
      { title: 'Zone 2 cardio confirmed as most effective exercise for metabolic health', source: 'Cell Metabolism', time: '12h ago' },
    ],
  },
  {
    name: 'Nutrition & Diet',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    color: '#FFAA00',
    items: [
      { title: 'Fermented foods daily for 6 weeks significantly diversifies gut microbiome', source: 'Cell', time: '2h ago' },
      { title: 'Ultra-processed food consumption linked to 32% higher depression risk', source: 'BMJ', time: '6h ago' },
      { title: 'Intermittent fasting shows no long-term advantage over calorie restriction', source: 'NEJM', time: '9h ago' },
      { title: 'Omega-3 supplementation reduces inflammation markers by 20% in large trial', source: 'The Lancet', time: '14h ago' },
    ],
  },
];

const quickStats = [
  { label: 'Daily Steps Goal', value: '10,000', icon: '👟', sub: 'WHO Recommendation' },
  { label: 'Sleep Needed', value: '7–9 hrs', icon: '🛏️', sub: 'Adults 18-64' },
  { label: 'Water Intake', value: '2.7–3.7 L', icon: '💧', sub: 'Daily Average' },
  { label: 'Exercise Weekly', value: '150 min', icon: '🏃', sub: 'Moderate Intensity' },
];

const HealthView = () => {
  const [expandedCat, setExpandedCat] = useState(null);

  return (
    <div className="health-root">
      {/* ─── Header ─── */}
      <div className="health-header">
        <h1 className="health-title">Health</h1>
        <p className="health-subtitle">Medical research, wellness & fitness insights</p>
      </div>

      {/* ─── Quick Stats ─── */}
      <div className="health-stats">
        {quickStats.map((stat) => (
          <div key={stat.label} className="health-stat-card">
            <span className="health-stat-card__icon">{stat.icon}</span>
            <span className="health-stat-card__value">{stat.value}</span>
            <span className="health-stat-card__label">{stat.label}</span>
            <span className="health-stat-card__sub">{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* ─── Trending Topics ─── */}
      <div className="health-topics">
        <div className="health-topics__label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          Popular Topics
        </div>
        <div className="health-topics__pills">
          {healthTopics.map((t) => (
            <button key={t.label} className="health-pill">
              <span className="health-pill__emoji">{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Featured Articles ─── */}
      <section className="health-section">
        <h2 className="health-section__title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Featured
        </h2>
        <div className="health-featured-grid">
          {featuredArticles.map((article) => (
            <div key={article.id} className="health-featured-card">
              <div className="health-featured-card__badge" style={{ color: article.categoryColor, borderColor: article.categoryColor + '40', background: article.categoryColor + '12' }}>
                {article.category}
              </div>
              <h3 className="health-featured-card__title">{article.title}</h3>
              <p className="health-featured-card__summary">{article.summary}</p>
              <div className="health-featured-card__meta">
                <span className="health-featured-card__source">{article.source}</span>
                <span className="health-featured-card__dot">·</span>
                <span>{article.time}</span>
                <span className="health-featured-card__dot">·</span>
                <span className="health-featured-card__reads">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {article.reads}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Category Sections ─── */}
      {healthCategories.map((cat) => (
        <section key={cat.name} className="health-section">
          <h2
            className="health-section__title health-section__title--clickable"
            onClick={() => setExpandedCat(expandedCat === cat.name ? null : cat.name)}
            style={{ '--cat-color': cat.color }}
          >
            <span className="health-section__icon" style={{ color: cat.color }}>{cat.icon}</span>
            {cat.name}
            <svg className={`health-section__chevron ${expandedCat === cat.name ? 'health-section__chevron--open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </h2>
          <div className={`health-cat-items ${expandedCat === cat.name ? 'health-cat-items--collapsed' : ''}`}>
            {cat.items.map((item, idx) => (
              <div key={idx} className="health-item">
                <div className="health-item__dot" style={{ background: cat.color }} />
                <div className="health-item__content">
                  <h4 className="health-item__title">{item.title}</h4>
                  <div className="health-item__meta">
                    <span className="health-item__source">{item.source}</span>
                    <span className="health-item__sep">·</span>
                    <span>{item.time}</span>
                  </div>
                </div>
                <div className="health-item__arrow">
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
      <div className="health-footer">
        <p>For informational purposes only. Always consult a healthcare professional.</p>
      </div>

      {/* ─── Scoped Styles ─── */}
      <style>{`
        .health-root {
          width: 100%;
          max-width: 860px;
          margin: 0 auto;
          padding: 24px 20px 60px;
          animation: healthFadeIn 0.4s ease;
        }
        @keyframes healthFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .health-header { margin-bottom: 24px; }
        .health-title {
          font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 6px;
          background: linear-gradient(135deg, var(--color-text-primary) 0%, #FF4D6A 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .health-subtitle { font-size: 0.92rem; color: var(--color-text-muted); }

        /* Stats */
        .health-stats {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 28px;
        }
        @media (min-width: 640px) { .health-stats { grid-template-columns: repeat(4, 1fr); } }

        .health-stat-card {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          padding: 18px 12px; background: var(--color-bg-card); border: 1px solid var(--color-border);
          border-radius: var(--radius-lg); transition: all 0.25s; cursor: default;
        }
        .health-stat-card:hover {
          background: var(--color-bg-card-hover); border-color: var(--color-accent-glow);
          transform: translateY(-2px); box-shadow: var(--shadow-card);
        }
        .health-stat-card__icon { font-size: 1.5rem; }
        .health-stat-card__value { font-size: 1.15rem; font-weight: 700; color: var(--color-text-primary); }
        .health-stat-card__label { font-size: 0.78rem; font-weight: 600; color: var(--color-text-secondary); text-align: center; }
        .health-stat-card__sub { font-size: 0.68rem; color: var(--color-text-muted); text-align: center; }

        /* Topics */
        .health-topics { margin-bottom: 28px; }
        .health-topics__label {
          display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 600;
          color: #FF4D6A; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;
        }
        .health-topics__pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .health-pill {
          display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px;
          background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 20px;
          color: var(--color-text-secondary); font-family: var(--font-primary); font-size: 0.82rem;
          font-weight: 500; cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .health-pill:hover {
          background: var(--color-bg-card-hover); border-color: rgba(255, 77, 106, 0.3);
          color: var(--color-text-primary); transform: translateY(-1px);
        }
        .health-pill__emoji { font-size: 1rem; }

        /* Sections */
        .health-section { margin-bottom: 28px; }
        .health-section__title {
          display: flex; align-items: center; gap: 8px; font-size: 1rem; font-weight: 700;
          color: var(--color-text-primary); margin-bottom: 16px; padding-bottom: 10px;
          border-bottom: 1px solid var(--color-border);
        }
        .health-section__title--clickable { cursor: pointer; user-select: none; transition: color 0.2s; }
        .health-section__title--clickable:hover { color: var(--cat-color, var(--color-accent)); }
        .health-section__icon { display: flex; align-items: center; }
        .health-section__chevron { margin-left: auto; color: var(--color-text-muted); transition: transform 0.25s ease; }
        .health-section__chevron--open { transform: rotate(180deg); }

        /* Featured */
        .health-featured-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media (min-width: 640px) { .health-featured-grid { grid-template-columns: repeat(3, 1fr); } }
        .health-featured-card {
          background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg);
          padding: 20px; cursor: pointer; transition: all 0.25s; display: flex; flex-direction: column; gap: 10px;
        }
        .health-featured-card:hover {
          background: var(--color-bg-card-hover); border-color: var(--color-accent-glow);
          transform: translateY(-3px); box-shadow: var(--shadow-card), var(--shadow-glow);
        }
        .health-featured-card__badge {
          display: inline-flex; align-self: flex-start; padding: 3px 10px; border-radius: 12px;
          font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; border: 1px solid;
        }
        .health-featured-card__title { font-size: 0.94rem; font-weight: 650; color: var(--color-text-primary); line-height: 1.4; }
        .health-featured-card__summary { font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.55; flex: 1; }
        .health-featured-card__meta { display: flex; align-items: center; gap: 6px; font-size: 0.74rem; color: var(--color-text-muted); margin-top: 4px; }
        .health-featured-card__source { font-weight: 600; color: var(--color-text-secondary); }
        .health-featured-card__dot { opacity: 0.4; }
        .health-featured-card__reads { display: inline-flex; align-items: center; gap: 3px; }

        /* Category Items */
        .health-cat-items {
          display: flex; flex-direction: column; gap: 2px; overflow: hidden;
          max-height: 600px; transition: max-height 0.35s ease, opacity 0.25s ease; opacity: 1;
        }
        .health-cat-items--collapsed { max-height: 0; opacity: 0; margin-top: -16px; }
        .health-item {
          display: flex; align-items: center; gap: 14px; padding: 14px 16px;
          border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s;
        }
        .health-item:hover { background: var(--color-bg-card); }
        .health-item:hover .health-item__arrow { opacity: 1; transform: translateX(0); }
        .health-item:hover .health-item__title { color: var(--color-text-primary); }
        .health-item__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; opacity: 0.8; }
        .health-item__content { flex: 1; min-width: 0; }
        .health-item__title { font-size: 0.88rem; font-weight: 550; color: var(--color-text-secondary); line-height: 1.45; transition: color 0.2s; }
        .health-item__meta { display: flex; align-items: center; gap: 5px; font-size: 0.72rem; color: var(--color-text-muted); margin-top: 4px; }
        .health-item__source { font-weight: 600; color: var(--color-text-secondary); opacity: 0.8; }
        .health-item__sep { opacity: 0.35; }
        .health-item__arrow { display: flex; color: var(--color-text-muted); opacity: 0; transform: translateX(-6px); transition: all 0.2s; flex-shrink: 0; }

        .health-footer { text-align: center; padding: 28px 0 0; border-top: 1px solid var(--color-border); margin-top: 12px; }
        .health-footer p { font-size: 0.74rem; color: var(--color-text-muted); opacity: 0.5; font-style: italic; }

        @media (max-width: 640px) {
          .health-root { padding: 16px 14px 48px; }
          .health-title { font-size: 1.5rem; }
          .health-topics__pills { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
          .health-topics__pills::-webkit-scrollbar { display: none; }
          .health-item { padding: 12px 10px; }
          .health-featured-card { padding: 16px; }
        }
      `}</style>
    </div>
  );
};

export default HealthView;
