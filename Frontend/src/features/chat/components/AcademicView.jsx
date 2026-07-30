import React, { useState } from 'react';

/* ─── Static academic data (random, Perplexity-style) ─── */

const researchFields = [
  { label: 'Machine Learning', emoji: '🤖' },
  { label: 'Neuroscience', emoji: '🧠' },
  { label: 'Quantum Physics', emoji: '⚛️' },
  { label: 'Biotechnology', emoji: '🧬' },
  { label: 'Climate Science', emoji: '🌎' },
  { label: 'Mathematics', emoji: '📐' },
  { label: 'Astrophysics', emoji: '🔭' },
  { label: 'Materials Science', emoji: '🔬' },
];

const featuredPapers = [
  {
    id: 1,
    field: 'Computer Science',
    fieldColor: '#20B2AA',
    title: 'Scaling Laws for Neural Language Models: A Comprehensive Analysis Beyond Chinchilla',
    authors: 'J. Chen, A. Patel, M. Rodriguez et al.',
    journal: 'Nature Machine Intelligence',
    year: '2026',
    citations: 342,
    abstract: 'We demonstrate that compute-optimal training extends beyond the Chinchilla framework when incorporating mixture-of-experts architectures and synthetic data augmentation.',
  },
  {
    id: 2,
    field: 'Biology',
    fieldColor: '#00d68f',
    title: 'Single-Cell Spatial Transcriptomics Reveals Novel Cell Types in Human Brain Cortex',
    authors: 'S. Kim, R. Gupta, L. Fernandez et al.',
    journal: 'Cell',
    year: '2026',
    citations: 187,
    abstract: 'Using Slide-seq V3 at subcellular resolution, we identify 14 previously unknown neuronal subtypes in the human prefrontal cortex with distinct spatial organization patterns.',
  },
  {
    id: 3,
    field: 'Physics',
    fieldColor: '#7B68EE',
    title: 'Observation of Room-Temperature Superconductivity in Hydrogen-Rich Compounds at Moderate Pressure',
    authors: 'H. Tanaka, P. Williams, K. Osei et al.',
    journal: 'Physical Review Letters',
    year: '2026',
    citations: 891,
    abstract: 'We report zero-resistance measurements in ternary hydride LaYH₂₄ at 267K and 42 GPa, representing the lowest pressure room-temperature superconductor to date.',
  },
];

const academicCategories = [
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
    papers: [
      { title: 'Test-Time Compute Scaling with Verifier-Guided Search in Mathematical Reasoning', journal: 'ICML 2026', citations: 156 },
      { title: 'Constitutional AI: Harmlessness from AI Feedback with Iterative Refinement', journal: 'NeurIPS 2026', citations: 298 },
      { title: 'Efficient Long-Context Transformers via Hierarchical Sparse Attention', journal: 'ICLR 2026', citations: 123 },
      { title: 'World Models for Autonomous Driving: A Survey and Benchmark', journal: 'IEEE TPAMI', citations: 87 },
    ],
  },
  {
    name: 'Life Sciences',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3v7.2c0 .3-.1.6-.3.8L4.2 16.4c-1.1 1.4-.2 3.6 1.5 3.6h12.6c1.7 0 2.6-2.2 1.5-3.6l-4.5-5.4c-.2-.2-.3-.5-.3-.8V3" />
        <line x1="9" y1="3" x2="15" y2="3" />
      </svg>
    ),
    color: '#00d68f',
    papers: [
      { title: 'AlphaFold 3 predicts the structure and interactions of all biological molecules', journal: 'Nature', citations: 1243 },
      { title: 'Pan-cancer detection using cell-free DNA fragmentomics and deep learning', journal: 'Science', citations: 412 },
      { title: 'Base editing corrects DMD mutations in patient-derived cardiomyocytes', journal: 'Nature Medicine', citations: 189 },
      { title: 'Spatial multi-omics atlas of the developing human cerebellum', journal: 'Cell', citations: 234 },
    ],
  },
  {
    name: 'Physical Sciences',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    color: '#7B68EE',
    papers: [
      { title: 'Topological quantum error correction on a distance-7 surface code', journal: 'Nature Physics', citations: 567 },
      { title: 'Direct imaging of exoplanet atmospheres with JWST coronagraphy', journal: 'Astrophysical Journal', citations: 321 },
      { title: 'Room-temperature quantum coherence in biological photosynthetic complexes', journal: 'PNAS', citations: 198 },
      { title: 'Synthesis of a carbon-based 2D semiconductor with bandgap tunability', journal: 'Science', citations: 276 },
    ],
  },
  {
    name: 'Mathematics',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    color: '#FFAA00',
    papers: [
      { title: 'Machine-assisted proof of the Ramanujan conjecture for symmetric power L-functions', journal: 'Annals of Mathematics', citations: 89 },
      { title: 'A polynomial-time algorithm for Nash equilibrium in two-player games', journal: 'STOC 2026', citations: 145 },
      { title: 'New bounds on the sphere packing problem in high dimensions', journal: 'Inventiones Mathematicae', citations: 67 },
      { title: 'Geometric deep learning on manifolds: foundations and applications', journal: 'Acta Mathematica', citations: 203 },
    ],
  },
];

const journalStats = [
  { name: 'Nature', impact: '64.8', papers: '2,847', color: '#FF4D6A' },
  { name: 'Science', impact: '56.9', papers: '2,134', color: '#20B2AA' },
  { name: 'Cell', impact: '45.5', papers: '1,567', color: '#7B68EE' },
  { name: 'NEJM', impact: '158.5', papers: '1,892', color: '#00d68f' },
];

const AcademicView = () => {
  const [expandedCat, setExpandedCat] = useState(null);

  return (
    <div className="academic-root">
      {/* ─── Header ─── */}
      <div className="academic-header">
        <h1 className="academic-title">Academic</h1>
        <p className="academic-subtitle">Research papers, journals & scholarly insights</p>
      </div>

      {/* ─── Journal Impact Cards ─── */}
      <div className="academic-journals">
        {journalStats.map((j) => (
          <div key={j.name} className="academic-journal-card">
            <div className="academic-journal-card__name" style={{ color: j.color }}>{j.name}</div>
            <div className="academic-journal-card__stat">
              <span className="academic-journal-card__value">{j.impact}</span>
              <span className="academic-journal-card__label">Impact Factor</span>
            </div>
            <div className="academic-journal-card__papers">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              {j.papers} papers/yr
            </div>
          </div>
        ))}
      </div>

      {/* ─── Research Fields ─── */}
      <div className="academic-fields">
        <div className="academic-fields__label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Explore Fields
        </div>
        <div className="academic-fields__pills">
          {researchFields.map((f) => (
            <button key={f.label} className="academic-pill">
              <span className="academic-pill__emoji">{f.emoji}</span>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Featured Papers ─── */}
      <section className="academic-section">
        <h2 className="academic-section__heading">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Highly Cited Papers
        </h2>
        <div className="academic-featured-list">
          {featuredPapers.map((paper) => (
            <div key={paper.id} className="academic-paper-card">
              <div className="academic-paper-card__top">
                <span className="academic-paper-card__field" style={{ color: paper.fieldColor, borderColor: paper.fieldColor + '40', background: paper.fieldColor + '12' }}>
                  {paper.field}
                </span>
                <span className="academic-paper-card__citations">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  {paper.citations} citations
                </span>
              </div>
              <h3 className="academic-paper-card__title">{paper.title}</h3>
              <p className="academic-paper-card__authors">{paper.authors}</p>
              <p className="academic-paper-card__abstract">{paper.abstract}</p>
              <div className="academic-paper-card__meta">
                <span className="academic-paper-card__journal">{paper.journal}</span>
                <span className="academic-paper-card__dot">·</span>
                <span>{paper.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Category Sections ─── */}
      {academicCategories.map((cat) => (
        <section key={cat.name} className="academic-section">
          <h2
            className="academic-section__heading academic-section__heading--clickable"
            onClick={() => setExpandedCat(expandedCat === cat.name ? null : cat.name)}
            style={{ '--cat-color': cat.color }}
          >
            <span className="academic-section__icon" style={{ color: cat.color }}>{cat.icon}</span>
            {cat.name}
            <svg className={`academic-section__chevron ${expandedCat === cat.name ? 'academic-section__chevron--open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </h2>
          <div className={`academic-cat-items ${expandedCat === cat.name ? 'academic-cat-items--collapsed' : ''}`}>
            {cat.papers.map((paper, idx) => (
              <div key={idx} className="academic-item">
                <div className="academic-item__index" style={{ color: cat.color }}>{String(idx + 1).padStart(2, '0')}</div>
                <div className="academic-item__content">
                  <h4 className="academic-item__title">{paper.title}</h4>
                  <div className="academic-item__meta">
                    <span className="academic-item__journal">{paper.journal}</span>
                    <span className="academic-item__sep">·</span>
                    <span className="academic-item__cites">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                      {paper.citations}
                    </span>
                  </div>
                </div>
                <div className="academic-item__arrow">
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
      <div className="academic-footer">
        <p>Sources include arXiv, PubMed, Semantic Scholar, and major journals</p>
      </div>

      {/* ─── Scoped Styles ─── */}
      <style>{`
        .academic-root {
          width: 100%; max-width: 860px; margin: 0 auto; padding: 24px 20px 60px;
          animation: acadFadeIn 0.4s ease;
        }
        @keyframes acadFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .academic-header { margin-bottom: 24px; }
        .academic-title {
          font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 6px;
          background: linear-gradient(135deg, var(--color-text-primary) 0%, #7B68EE 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .academic-subtitle { font-size: 0.92rem; color: var(--color-text-muted); }

        /* Journals */
        .academic-journals {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 28px;
        }
        @media (min-width: 640px) { .academic-journals { grid-template-columns: repeat(4, 1fr); } }

        .academic-journal-card {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 18px 12px; background: var(--color-bg-card); border: 1px solid var(--color-border);
          border-radius: var(--radius-lg); transition: all 0.25s; cursor: default;
        }
        .academic-journal-card:hover {
          background: var(--color-bg-card-hover); border-color: var(--color-accent-glow);
          transform: translateY(-2px); box-shadow: var(--shadow-card);
        }
        .academic-journal-card__name { font-size: 0.92rem; font-weight: 700; }
        .academic-journal-card__stat { display: flex; flex-direction: column; align-items: center; }
        .academic-journal-card__value { font-size: 1.3rem; font-weight: 800; color: var(--color-text-primary); }
        .academic-journal-card__label { font-size: 0.65rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .academic-journal-card__papers {
          display: flex; align-items: center; gap: 4px; font-size: 0.72rem; color: var(--color-text-muted);
        }

        /* Fields */
        .academic-fields { margin-bottom: 28px; }
        .academic-fields__label {
          display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 600;
          color: #7B68EE; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;
        }
        .academic-fields__pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .academic-pill {
          display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px;
          background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: 20px;
          color: var(--color-text-secondary); font-family: var(--font-primary); font-size: 0.82rem;
          font-weight: 500; cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .academic-pill:hover {
          background: var(--color-bg-card-hover); border-color: rgba(123, 104, 238, 0.3);
          color: var(--color-text-primary); transform: translateY(-1px);
        }
        .academic-pill__emoji { font-size: 1rem; }

        /* Sections */
        .academic-section { margin-bottom: 28px; }
        .academic-section__heading {
          display: flex; align-items: center; gap: 8px; font-size: 1rem; font-weight: 700;
          color: var(--color-text-primary); margin-bottom: 16px; padding-bottom: 10px;
          border-bottom: 1px solid var(--color-border);
        }
        .academic-section__heading--clickable { cursor: pointer; user-select: none; transition: color 0.2s; }
        .academic-section__heading--clickable:hover { color: var(--cat-color, var(--color-accent)); }
        .academic-section__icon { display: flex; align-items: center; }
        .academic-section__chevron { margin-left: auto; color: var(--color-text-muted); transition: transform 0.25s ease; }
        .academic-section__chevron--open { transform: rotate(180deg); }

        /* Featured Papers */
        .academic-featured-list { display: flex; flex-direction: column; gap: 14px; }

        .academic-paper-card {
          background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg);
          padding: 22px; cursor: pointer; transition: all 0.25s; display: flex; flex-direction: column; gap: 8px;
        }
        .academic-paper-card:hover {
          background: var(--color-bg-card-hover); border-color: var(--color-accent-glow);
          transform: translateY(-2px); box-shadow: var(--shadow-card);
        }
        .academic-paper-card__top { display: flex; align-items: center; justify-content: space-between; }
        .academic-paper-card__field {
          display: inline-flex; padding: 3px 10px; border-radius: 12px; font-size: 0.7rem;
          font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; border: 1px solid;
        }
        .academic-paper-card__citations {
          display: inline-flex; align-items: center; gap: 4px; font-size: 0.76rem;
          font-weight: 600; color: var(--color-accent);
        }
        .academic-paper-card__title { font-size: 0.96rem; font-weight: 650; color: var(--color-text-primary); line-height: 1.45; }
        .academic-paper-card__authors { font-size: 0.8rem; color: var(--color-text-secondary); font-style: italic; }
        .academic-paper-card__abstract { font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.55; }
        .academic-paper-card__meta { display: flex; align-items: center; gap: 6px; font-size: 0.76rem; color: var(--color-text-muted); margin-top: 2px; }
        .academic-paper-card__journal { font-weight: 600; color: var(--color-text-secondary); }
        .academic-paper-card__dot { opacity: 0.4; }

        /* Category Items */
        .academic-cat-items {
          display: flex; flex-direction: column; gap: 2px; overflow: hidden;
          max-height: 600px; transition: max-height 0.35s ease, opacity 0.25s ease; opacity: 1;
        }
        .academic-cat-items--collapsed { max-height: 0; opacity: 0; margin-top: -16px; }

        .academic-item {
          display: flex; align-items: center; gap: 14px; padding: 14px 16px;
          border-radius: var(--radius-md); cursor: pointer; transition: all 0.2s;
        }
        .academic-item:hover { background: var(--color-bg-card); }
        .academic-item:hover .academic-item__arrow { opacity: 1; transform: translateX(0); }
        .academic-item:hover .academic-item__title { color: var(--color-text-primary); }
        .academic-item__index { font-size: 0.82rem; font-weight: 700; min-width: 24px; opacity: 0.7; }
        .academic-item__content { flex: 1; min-width: 0; }
        .academic-item__title { font-size: 0.88rem; font-weight: 550; color: var(--color-text-secondary); line-height: 1.45; transition: color 0.2s; }
        .academic-item__meta { display: flex; align-items: center; gap: 5px; font-size: 0.72rem; color: var(--color-text-muted); margin-top: 4px; }
        .academic-item__journal { font-weight: 600; color: var(--color-text-secondary); opacity: 0.8; }
        .academic-item__sep { opacity: 0.35; }
        .academic-item__cites { display: inline-flex; align-items: center; gap: 3px; color: var(--color-accent); font-weight: 600; }
        .academic-item__arrow { display: flex; color: var(--color-text-muted); opacity: 0; transform: translateX(-6px); transition: all 0.2s; flex-shrink: 0; }

        .academic-footer { text-align: center; padding: 28px 0 0; border-top: 1px solid var(--color-border); margin-top: 12px; }
        .academic-footer p { font-size: 0.74rem; color: var(--color-text-muted); opacity: 0.5; }

        @media (max-width: 640px) {
          .academic-root { padding: 16px 14px 48px; }
          .academic-title { font-size: 1.5rem; }
          .academic-fields__pills { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
          .academic-fields__pills::-webkit-scrollbar { display: none; }
          .academic-item { padding: 12px 10px; }
          .academic-paper-card { padding: 16px; }
        }
      `}</style>
    </div>
  );
};

export default AcademicView;
