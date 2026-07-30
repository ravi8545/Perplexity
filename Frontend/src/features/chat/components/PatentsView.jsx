import React, { useState } from 'react';

/* ─── Static patents data (random, Perplexity-style) ─── */

const patentStats = [
  { label: 'Patents Filed (2026)', value: '3.8M', icon: '📄', sub: 'Global YTD' },
  { label: 'Grants Issued', value: '1.2M', icon: '✅', sub: 'This Year' },
  { label: 'AI/ML Patents', value: '+47%', icon: '🤖', sub: 'YoY Growth' },
  { label: 'Top Filer', value: 'Samsung', icon: '🏆', sub: '6,248 patents' },
];

const patentDomains = [
  { label: 'Artificial Intelligence', emoji: '🧠' },
  { label: 'Semiconductors', emoji: '💾' },
  { label: 'Biotechnology', emoji: '🧬' },
  { label: 'Clean Energy', emoji: '⚡' },
  { label: 'Autonomous Vehicles', emoji: '🚗' },
  { label: 'Quantum Computing', emoji: '⚛️' },
  { label: '5G / 6G', emoji: '📡' },
  { label: 'Robotics', emoji: '🦾' },
];

const featuredPatents = [
  {
    id: 1,
    number: 'US 12,345,678 B2',
    title: 'Method and System for Real-Time Neural Architecture Search Using Reinforcement Learning',
    assignee: 'Google LLC',
    filed: 'Mar 14, 2024',
    granted: 'Jan 8, 2026',
    domain: 'AI / Machine Learning',
    domainColor: '#20B2AA',
    abstract: 'A system that dynamically optimizes neural network architectures during inference by applying reinforcement learning agents to evaluate and modify layer configurations in real-time.',
    claims: 24,
  },
  {
    id: 2,
    number: 'US 12,456,789 B1',
    title: 'Solid-State Battery with Sulfide Electrolyte and Silicon-Carbon Composite Anode',
    assignee: 'Toyota Motor Corp',
    filed: 'Jun 22, 2024',
    granted: 'Mar 15, 2026',
    domain: 'Energy Storage',
    domainColor: '#00d68f',
    abstract: 'A solid-state lithium battery utilizing a novel argyrodite-type sulfide electrolyte paired with a nano-structured silicon-carbon anode achieving 500 Wh/kg energy density.',
    claims: 18,
  },
  {
    id: 3,
    number: 'EP 4,567,890 A1',
    title: 'CRISPR-Based Diagnostic Platform for Multiplexed Pathogen Detection in Under 15 Minutes',
    assignee: 'Sherlock Biosciences',
    filed: 'Sep 3, 2024',
    granted: 'Pending',
    domain: 'Biotechnology',
    domainColor: '#7B68EE',
    abstract: 'A portable diagnostic device combining CRISPR-Cas13 with lateral flow readout for simultaneous detection of up to 12 respiratory pathogens from a single nasal swab sample.',
    claims: 31,
  },
];

const patentCategories = [
  {
    name: 'Artificial Intelligence',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    color: '#20B2AA',
    patents: [
      { title: 'Transformer-based model compression via knowledge distillation with attention transfer', assignee: 'Microsoft', number: 'US 12,501,234', status: 'Granted' },
      { title: 'Federated learning system with differential privacy guarantees for healthcare data', assignee: 'Apple Inc', number: 'US 12,502,567', status: 'Granted' },
      { title: 'Multi-modal large language model with integrated vision and audio processing', assignee: 'OpenAI', number: 'US 12,503,890', status: 'Pending' },
      { title: 'Autonomous code generation and debugging using agentic AI frameworks', assignee: 'Anthropic', number: 'US 12,504,123', status: 'Pending' },
    ],
  },
  {
    name: 'Semiconductors & Hardware',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
    color: '#FF6B9D',
    patents: [
      { title: '3nm GAA transistor architecture with backside power delivery network', assignee: 'TSMC', number: 'US 12,601,234', status: 'Granted' },
      { title: 'Photonic interconnect for chiplet-based AI accelerator packaging', assignee: 'Intel Corp', number: 'US 12,602,567', status: 'Granted' },
      { title: 'High-bandwidth memory (HBM4) with 3D hybrid bonding technology', assignee: 'SK Hynix', number: 'US 12,603,890', status: 'Pending' },
      { title: 'Neuromorphic processor with memristive synaptic crossbar arrays', assignee: 'IBM', number: 'US 12,604,123', status: 'Granted' },
    ],
  },
  {
    name: 'Clean Energy & Sustainability',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    color: '#00d68f',
    patents: [
      { title: 'Perovskite-silicon tandem solar cell with 33.7% conversion efficiency', assignee: 'LONGi Green Energy', number: 'CN 118,901,234', status: 'Granted' },
      { title: 'Direct air carbon capture using electrochemical pH-swing membrane', assignee: 'Climeworks', number: 'EP 4,701,567', status: 'Pending' },
      { title: 'Green hydrogen production via anion exchange membrane electrolysis at scale', assignee: 'Siemens Energy', number: 'DE 102,024,567', status: 'Granted' },
      { title: 'Modular small nuclear reactor with passive safety cooling system', assignee: 'NuScale Power', number: 'US 12,704,123', status: 'Granted' },
    ],
  },
  {
    name: 'Biotech & Pharma',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3v7.2c0 .3-.1.6-.3.8L4.2 16.4c-1.1 1.4-.2 3.6 1.5 3.6h12.6c1.7 0 2.6-2.2 1.5-3.6l-4.5-5.4c-.2-.2-.3-.5-.3-.8V3" />
        <line x1="9" y1="3" x2="15" y2="3" />
      </svg>
    ),
    color: '#FFAA00',
    patents: [
      { title: 'Lipid nanoparticle formulation for organ-targeted mRNA delivery', assignee: 'Moderna', number: 'US 12,801,234', status: 'Granted' },
      { title: 'Base editing therapy for progeria via in vivo delivery of ABE8e', assignee: 'Beam Therapeutics', number: 'US 12,802,567', status: 'Pending' },
      { title: 'AI-designed de novo protein therapeutics for autoimmune disorders', assignee: 'Generate Biomedicines', number: 'US 12,803,890', status: 'Pending' },
      { title: 'Continuous glucose monitor using interstitial fluid microneedle array', assignee: 'Dexcom', number: 'US 12,804,123', status: 'Granted' },
    ],
  },
];

const topFilers = [
  { rank: 1, name: 'Samsung Electronics', country: '🇰🇷', count: '6,248', change: '+8%' },
  { rank: 2, name: 'Huawei Technologies', country: '🇨🇳', count: '5,891', change: '+12%' },
  { rank: 3, name: 'Qualcomm', country: '🇺🇸', count: '4,567', change: '+5%' },
  { rank: 4, name: 'TSMC', country: '🇹🇼', count: '3,912', change: '+15%' },
  { rank: 5, name: 'Apple Inc', country: '🇺🇸', count: '3,478', change: '+3%' },
  { rank: 6, name: 'Google / Alphabet', country: '🇺🇸', count: '3,201', change: '+22%' },
];

const PatentsView = () => {
  const [expandedCat, setExpandedCat] = useState(null);

  return (
    <div className="patents-root">
      {/* ─── Header ─── */}
      <div className="patents-header">
        <h1 className="patents-title">Patents</h1>
        <p className="patents-subtitle">Innovations, filings & intellectual property insights</p>
      </div>

      {/* ─── Quick Stats ─── */}
      <div className="patents-stats">
        {patentStats.map((s) => (
          <div key={s.label} className="patents-stat-card">
            <span className="patents-stat-card__icon">{s.icon}</span>
            <span className="patents-stat-card__value">{s.value}</span>
            <span className="patents-stat-card__label">{s.label}</span>
            <span className="patents-stat-card__sub">{s.sub}</span>
          </div>
        ))}
      </div>

      {/* ─── Domain Pills ─── */}
      <div className="patents-domains">
        <div className="patents-domains__label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Browse Domains
        </div>
        <div className="patents-domains__pills">
          {patentDomains.map((d) => (
            <button key={d.label} className="patents-pill">
              <span className="patents-pill__emoji">{d.emoji}</span>
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Featured Patents ─── */}
      <section className="patents-section">
        <h2 className="patents-section__heading">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Notable Patents
        </h2>
        <div className="patents-featured-list">
          {featuredPatents.map((p) => (
            <div key={p.id} className="patents-card">
              <div className="patents-card__top">
                <span className="patents-card__domain" style={{ color: p.domainColor, borderColor: p.domainColor + '40', background: p.domainColor + '12' }}>
                  {p.domain}
                </span>
                <span className="patents-card__number">{p.number}</span>
              </div>
              <h3 className="patents-card__title">{p.title}</h3>
              <p className="patents-card__abstract">{p.abstract}</p>
              <div className="patents-card__details">
                <div className="patents-card__detail">
                  <span className="patents-card__detail-label">Assignee</span>
                  <span className="patents-card__detail-value">{p.assignee}</span>
                </div>
                <div className="patents-card__detail">
                  <span className="patents-card__detail-label">Filed</span>
                  <span className="patents-card__detail-value">{p.filed}</span>
                </div>
                <div className="patents-card__detail">
                  <span className="patents-card__detail-label">Status</span>
                  <span className={`patents-card__status ${p.granted === 'Pending' ? 'patents-card__status--pending' : 'patents-card__status--granted'}`}>
                    {p.granted === 'Pending' ? '⏳ Pending' : `✅ ${p.granted}`}
                  </span>
                </div>
                <div className="patents-card__detail">
                  <span className="patents-card__detail-label">Claims</span>
                  <span className="patents-card__detail-value">{p.claims}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Top Filers ─── */}
      <section className="patents-section">
        <h2 className="patents-section__heading">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          Top Patent Filers (2026)
        </h2>
        <div className="patents-filers-table-wrap">
          <table className="patents-filers-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Organization</th>
                <th className="patents-filers-table__right">Patents</th>
                <th className="patents-filers-table__right">YoY</th>
              </tr>
            </thead>
            <tbody>
              {topFilers.map((f) => (
                <tr key={f.rank} className="patents-filers-table__row">
                  <td>
                    <span className="patents-filers__rank">{f.rank}</span>
                  </td>
                  <td>
                    <span className="patents-filers__name">{f.country} {f.name}</span>
                  </td>
                  <td className="patents-filers-table__right">
                    <span className="patents-filers__count">{f.count}</span>
                  </td>
                  <td className="patents-filers-table__right">
                    <span className="patents-filers__change">{f.change}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ─── Category Sections ─── */}
      {patentCategories.map((cat) => (
        <section key={cat.name} className="patents-section">
          <h2
            className="patents-section__heading patents-section__heading--clickable"
            onClick={() => setExpandedCat(expandedCat === cat.name ? null : cat.name)}
            style={{ '--cat-color': cat.color }}
          >
            <span className="patents-section__icon" style={{ color: cat.color }}>{cat.icon}</span>
            {cat.name}
            <svg className={`patents-section__chevron ${expandedCat === cat.name ? 'patents-section__chevron--open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </h2>
          <div className={`patents-cat-items ${expandedCat === cat.name ? 'patents-cat-items--collapsed' : ''}`}>
            {cat.patents.map((patent, idx) => (
              <div key={idx} className="patents-item">
                <div className="patents-item__index" style={{ color: cat.color }}>{String(idx + 1).padStart(2, '0')}</div>
                <div className="patents-item__content">
                  <h4 className="patents-item__title">{patent.title}</h4>
                  <div className="patents-item__meta">
                    <span className="patents-item__assignee">{patent.assignee}</span>
                    <span className="patents-item__sep">·</span>
                    <span className="patents-item__num">{patent.number}</span>
                    <span className="patents-item__sep">·</span>
                    <span className={`patents-item__status ${patent.status === 'Pending' ? 'patents-item__status--pending' : 'patents-item__status--granted'}`}>
                      {patent.status}
                    </span>
                  </div>
                </div>
                <div className="patents-item__arrow">
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
      <div className="patents-footer">
        <p>Data sourced from USPTO, EPO, WIPO, and other global patent offices</p>
      </div>

      {/* ─── Scoped Styles ─── */}
      <style>{`
        .patents-root {
          width: 100%; max-width: 860px; margin: 0 auto; padding: 24px 20px 60px;
          animation: patFadeIn 0.4s ease;
        }
        @keyframes patFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .patents-header { margin-bottom: 24px; }
        .patents-title {
          font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 6px;
          background: linear-gradient(135deg, var(--color-text-primary) 0%, #FFAA00 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .patents-subtitle { font-size: 0.92rem; color: var(--color-text-muted); }

        /* Stats */
        .patents-stats {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 28px;
        }
        @media (min-width: 640px) { .patents-stats { grid-template-columns: repeat(4, 1fr); } }
        .patents-stat-card {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          padding: 18px 12px; background: var(--color-bg-card); border: 1px solid var(--color-border);
          border-radius: var(--radius-lg); transition: all 0.25s; cursor: default;
        }
        .patents-stat-card:hover {
          background: var(--color-bg-card-hover); border-color: var(--color-accent-glow);
          transform: translateY(-2px); box-shadow: var(--shadow-card);
        }
        .patents-stat-card__icon { font-size: 1.5rem; }
        .patents-stat-card__value { font-size: 1.15rem; font-weight: 700; color: var(--color-text-primary); }
        .patents-stat-card__label { font-size: 0.78rem; font-weight: 600; color: var(--color-text-secondary); text-align: center; }
        .patents-stat-card__sub { font-size: 0.68rem; color: var(--color-text-muted); text-align: center; }

        /* Domains */
        .patents-domains { margin-bottom: 28px; }
        .patents-domains__label {
          display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 600;
          color: #FFAA00; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;
        }
        .patents-domains__pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .patents-pill {
          display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px;
          background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 20px;
          color: var(--color-text-secondary); font-family: var(--font-primary); font-size: 0.82rem;
          font-weight: 500; cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .patents-pill:hover {
          background: var(--color-bg-card-hover); border-color: rgba(255, 170, 0, 0.3);
          color: var(--color-text-primary); transform: translateY(-1px);
        }
        .patents-pill__emoji { font-size: 1rem; }

        /* Sections */
        .patents-section { margin-bottom: 28px; }
        .patents-section__heading {
          display: flex; align-items: center; gap: 8px; font-size: 1rem; font-weight: 700;
          color: var(--color-text-primary); margin-bottom: 16px; padding-bottom: 10px;
          border-bottom: 1px solid var(--color-border);
        }
        .patents-section__heading--clickable { cursor: pointer; user-select: none; transition: color 0.2s; }
        .patents-section__heading--clickable:hover { color: var(--cat-color, var(--color-accent)); }
        .patents-section__icon { display: flex; align-items: center; }
        .patents-section__chevron { margin-left: auto; color: var(--color-text-muted); transition: transform 0.25s ease; }
        .patents-section__chevron--open { transform: rotate(180deg); }

        /* Featured Patents */
        .patents-featured-list { display: flex; flex-direction: column; gap: 14px; }
        .patents-card {
          background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg);
          padding: 22px; cursor: pointer; transition: all 0.25s; display: flex; flex-direction: column; gap: 10px;
        }
        .patents-card:hover {
          background: var(--color-bg-card-hover); border-color: var(--color-accent-glow);
          transform: translateY(-2px); box-shadow: var(--shadow-card);
        }
        .patents-card__top { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        .patents-card__domain {
          display: inline-flex; padding: 3px 10px; border-radius: 12px; font-size: 0.7rem;
          font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; border: 1px solid;
        }
        .patents-card__number { font-size: 0.76rem; font-weight: 600; color: var(--color-text-muted); font-family: 'SF Mono', 'Fira Code', monospace; }
        .patents-card__title { font-size: 0.96rem; font-weight: 650; color: var(--color-text-primary); line-height: 1.45; }
        .patents-card__abstract { font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.55; }
        .patents-card__details {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;
          padding: 12px; background: var(--color-bg-primary); border: 1px solid var(--color-border);
          border-radius: var(--radius-sm); margin-top: 4px;
        }
        @media (min-width: 640px) { .patents-card__details { grid-template-columns: repeat(4, 1fr); } }
        .patents-card__detail { display: flex; flex-direction: column; gap: 2px; }
        .patents-card__detail-label { font-size: 0.68rem; font-weight: 600; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .patents-card__detail-value { font-size: 0.82rem; font-weight: 500; color: var(--color-text-secondary); }
        .patents-card__status { font-size: 0.8rem; font-weight: 600; }
        .patents-card__status--granted { color: var(--color-success); }
        .patents-card__status--pending { color: var(--color-warning); }

        /* Top Filers Table */
        .patents-filers-table-wrap {
          border: 1px solid var(--color-border); border-radius: var(--radius-lg);
          overflow: hidden; margin-bottom: 8px;
        }
        .patents-filers-table { width: 100%; border-collapse: collapse; font-size: 0.86rem; }
        .patents-filers-table thead { background: var(--color-bg-secondary); }
        .patents-filers-table th {
          padding: 12px 16px; text-align: left; font-weight: 600; font-size: 0.74rem;
          color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.06em;
          border-bottom: 1px solid var(--color-border);
        }
        .patents-filers-table td { padding: 13px 16px; border-bottom: 1px solid var(--color-border); }
        .patents-filers-table__row { transition: background 0.15s; cursor: pointer; }
        .patents-filers-table__row:hover { background: var(--color-bg-card); }
        .patents-filers-table__row:last-child td { border-bottom: none; }
        .patents-filers-table__right { text-align: right !important; }
        .patents-filers__rank {
          display: inline-flex; align-items: center; justify-content: center;
          width: 24px; height: 24px; background: var(--color-bg-card); border: 1px solid var(--color-border);
          border-radius: 6px; font-size: 0.76rem; font-weight: 700; color: var(--color-text-secondary);
        }
        .patents-filers__name { font-weight: 550; color: var(--color-text-primary); font-size: 0.88rem; }
        .patents-filers__count { font-weight: 700; color: var(--color-text-primary); }
        .patents-filers__change { font-weight: 600; color: var(--color-success); font-size: 0.82rem; }

        /* Category Items */
        .patents-cat-items {
          display: flex; flex-direction: column; gap: 2px; overflow: hidden;
          max-height: 600px; transition: max-height 0.35s ease, opacity 0.25s ease; opacity: 1;
        }
        .patents-cat-items--collapsed { max-height: 0; opacity: 0; margin-top: -16px; }
        .patents-item {
          display: flex; align-items: center; gap: 14px; padding: 14px 16px;
          border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s;
        }
        .patents-item:hover { background: var(--color-bg-card); }
        .patents-item:hover .patents-item__arrow { opacity: 1; transform: translateX(0); }
        .patents-item:hover .patents-item__title { color: var(--color-text-primary); }
        .patents-item__index { font-size: 0.82rem; font-weight: 700; min-width: 24px; opacity: 0.7; }
        .patents-item__content { flex: 1; min-width: 0; }
        .patents-item__title { font-size: 0.88rem; font-weight: 550; color: var(--color-text-secondary); line-height: 1.45; transition: color 0.2s; }
        .patents-item__meta { display: flex; align-items: center; flex-wrap: wrap; gap: 5px; font-size: 0.72rem; color: var(--color-text-muted); margin-top: 4px; }
        .patents-item__assignee { font-weight: 600; color: var(--color-text-secondary); opacity: 0.8; }
        .patents-item__num { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.7rem; opacity: 0.7; }
        .patents-item__sep { opacity: 0.35; }
        .patents-item__status { font-weight: 600; }
        .patents-item__status--granted { color: var(--color-success); }
        .patents-item__status--pending { color: var(--color-warning); }
        .patents-item__arrow { display: flex; color: var(--color-text-muted); opacity: 0; transform: translateX(-6px); transition: all 0.2s; flex-shrink: 0; }

        .patents-footer { text-align: center; padding: 28px 0 0; border-top: 1px solid var(--color-border); margin-top: 12px; }
        .patents-footer p { font-size: 0.74rem; color: var(--color-text-muted); opacity: 0.5; }

        @media (max-width: 640px) {
          .patents-root { padding: 16px 14px 48px; }
          .patents-title { font-size: 1.5rem; }
          .patents-domains__pills { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
          .patents-domains__pills::-webkit-scrollbar { display: none; }
          .patents-item { padding: 12px 10px; }
          .patents-card { padding: 16px; }
          .patents-filers-table th, .patents-filers-table td { padding: 10px 12px; }
        }
      `}</style>
    </div>
  );
};

export default PatentsView;
