import React, { useState } from 'react';

/* ─── Static finance data (random, Perplexity-style) ─── */

const marketIndices = [
  { name: 'S&P 500', value: '5,842.31', change: '+1.24%', up: true },
  { name: 'NASDAQ', value: '19,473.56', change: '+1.68%', up: true },
  { name: 'DOW JONES', value: '43,127.84', change: '+0.87%', up: true },
  { name: 'NIFTY 50', value: '24,836.10', change: '-0.34%', up: false },
  { name: 'FTSE 100', value: '8,412.65', change: '+0.52%', up: true },
  { name: 'BITCOIN', value: '$98,432', change: '+3.21%', up: true },
];

const trendingStocks = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: '$892.40', change: '+4.32%', up: true, volume: '82.3M' },
  { symbol: 'AAPL', name: 'Apple Inc', price: '$234.18', change: '+1.15%', up: true, volume: '54.1M' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: '$312.67', change: '-2.41%', up: false, volume: '91.7M' },
  { symbol: 'MSFT', name: 'Microsoft', price: '$468.52', change: '+0.89%', up: true, volume: '28.4M' },
  { symbol: 'AMZN', name: 'Amazon', price: '$218.93', change: '+2.07%', up: true, volume: '45.6M' },
  { symbol: 'GOOGL', name: 'Alphabet', price: '$186.74', change: '+1.53%', up: true, volume: '31.2M' },
  { symbol: 'META', name: 'Meta Platforms', price: '$542.81', change: '-0.67%', up: false, volume: '22.8M' },
  { symbol: 'AMD', name: 'AMD Inc', price: '$178.39', change: '+3.18%', up: true, volume: '67.5M' },
];

const financeNews = [
  {
    id: 1,
    category: 'Markets',
    title: 'Federal Reserve holds interest rates steady, signals September cut likely',
    summary: 'Fed Chair Powell noted cooling inflation and a balanced labor market, hinting at a potential 25bp rate cut at the next meeting.',
    source: 'Reuters',
    time: '1h ago',
  },
  {
    id: 2,
    category: 'Earnings',
    title: 'NVIDIA reports Q2 revenue of $42B, beating estimates by 12%',
    summary: 'Data center revenue surged 154% year-over-year driven by unprecedented AI chip demand from hyperscale customers.',
    source: 'Bloomberg',
    time: '3h ago',
  },
  {
    id: 3,
    category: 'Crypto',
    title: 'Bitcoin ETFs see record $2.4B single-day inflow as BTC nears $100K',
    summary: 'Institutional adoption accelerates as BlackRock\'s IBIT leads inflows, with total crypto ETF AUM surpassing $120 billion.',
    source: 'CoinDesk',
    time: '5h ago',
  },
  {
    id: 4,
    category: 'Economy',
    title: 'US GDP growth revised up to 3.1% for Q2, exceeding forecasts',
    summary: 'Strong consumer spending and business investment drove the upward revision, easing recession concerns.',
    source: 'CNBC',
    time: '7h ago',
  },
];

const sectorPerformance = [
  { name: 'Technology', change: '+2.14%', up: true, bar: 85 },
  { name: 'Healthcare', change: '+1.32%', up: true, bar: 65 },
  { name: 'Energy', change: '-0.87%', up: false, bar: 40 },
  { name: 'Financials', change: '+0.94%', up: true, bar: 55 },
  { name: 'Consumer Disc.', change: '+1.67%', up: true, bar: 72 },
  { name: 'Industrials', change: '+0.43%', up: true, bar: 48 },
  { name: 'Real Estate', change: '-1.23%', up: false, bar: 32 },
  { name: 'Utilities', change: '+0.18%', up: true, bar: 38 },
];

const cryptoAssets = [
  { symbol: 'BTC', name: 'Bitcoin', price: '$98,432', change: '+3.21%', up: true, mcap: '$1.93T' },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,847', change: '+2.54%', up: true, mcap: '$462B' },
  { symbol: 'SOL', name: 'Solana', price: '$187.62', change: '+5.73%', up: true, mcap: '$86.4B' },
  { symbol: 'BNB', name: 'BNB', price: '$612.30', change: '+1.08%', up: true, mcap: '$91.2B' },
  { symbol: 'XRP', name: 'Ripple', price: '$0.634', change: '-1.42%', up: false, mcap: '$34.8B' },
  { symbol: 'ADA', name: 'Cardano', price: '$0.487', change: '+2.91%', up: true, mcap: '$17.1B' },
];

const FinanceView = () => {
  const [activeTab, setActiveTab] = useState('stocks');

  return (
    <div className="finance-root">
      {/* ─── Header ─── */}
      <div className="finance-header">
        <h1 className="finance-title">Finance</h1>
        <p className="finance-subtitle">Markets, stocks & financial insights</p>
      </div>

      {/* ─── Market Indices Ticker ─── */}
      <div className="finance-ticker">
        <div className="finance-ticker__scroll">
          {marketIndices.map((idx) => (
            <div key={idx.name} className="finance-ticker__item">
              <span className="finance-ticker__name">{idx.name}</span>
              <span className="finance-ticker__value">{idx.value}</span>
              <span className={`finance-ticker__change ${idx.up ? 'finance-ticker__change--up' : 'finance-ticker__change--down'}`}>
                {idx.up ? '▲' : '▼'} {idx.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Tab Navigation ─── */}
      <div className="finance-tabs">
        {[
          { key: 'stocks', label: 'Trending Stocks' },
          { key: 'crypto', label: 'Crypto' },
          { key: 'sectors', label: 'Sectors' },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`finance-tab ${activeTab === tab.key ? 'finance-tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Stocks Table ─── */}
      {activeTab === 'stocks' && (
        <div className="finance-table-wrap">
          <table className="finance-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Company</th>
                <th className="finance-table__right">Price</th>
                <th className="finance-table__right">Change</th>
                <th className="finance-table__right finance-table__hide-mobile">Volume</th>
              </tr>
            </thead>
            <tbody>
              {trendingStocks.map((stock) => (
                <tr key={stock.symbol} className="finance-table__row">
                  <td>
                    <span className="finance-symbol">{stock.symbol}</span>
                  </td>
                  <td className="finance-table__company">{stock.name}</td>
                  <td className="finance-table__right finance-table__price">{stock.price}</td>
                  <td className="finance-table__right">
                    <span className={`finance-change ${stock.up ? 'finance-change--up' : 'finance-change--down'}`}>
                      {stock.change}
                    </span>
                  </td>
                  <td className="finance-table__right finance-table__hide-mobile finance-table__volume">{stock.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── Crypto Table ─── */}
      {activeTab === 'crypto' && (
        <div className="finance-table-wrap">
          <table className="finance-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Name</th>
                <th className="finance-table__right">Price</th>
                <th className="finance-table__right">24h Change</th>
                <th className="finance-table__right finance-table__hide-mobile">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {cryptoAssets.map((coin) => (
                <tr key={coin.symbol} className="finance-table__row">
                  <td>
                    <span className="finance-symbol finance-symbol--crypto">{coin.symbol}</span>
                  </td>
                  <td className="finance-table__company">{coin.name}</td>
                  <td className="finance-table__right finance-table__price">{coin.price}</td>
                  <td className="finance-table__right">
                    <span className={`finance-change ${coin.up ? 'finance-change--up' : 'finance-change--down'}`}>
                      {coin.change}
                    </span>
                  </td>
                  <td className="finance-table__right finance-table__hide-mobile finance-table__volume">{coin.mcap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── Sectors Performance ─── */}
      {activeTab === 'sectors' && (
        <div className="finance-sectors">
          {sectorPerformance.map((sector) => (
            <div key={sector.name} className="finance-sector">
              <div className="finance-sector__header">
                <span className="finance-sector__name">{sector.name}</span>
                <span className={`finance-change ${sector.up ? 'finance-change--up' : 'finance-change--down'}`}>
                  {sector.change}
                </span>
              </div>
              <div className="finance-sector__bar-bg">
                <div
                  className={`finance-sector__bar-fill ${sector.up ? 'finance-sector__bar-fill--up' : 'finance-sector__bar-fill--down'}`}
                  style={{ width: `${sector.bar}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Finance News ─── */}
      <section className="finance-news-section">
        <h2 className="finance-news-section__title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          Financial News
        </h2>
        <div className="finance-news-grid">
          {financeNews.map((article) => (
            <div key={article.id} className="finance-news-card">
              <div className="finance-news-card__category">{article.category}</div>
              <h3 className="finance-news-card__title">{article.title}</h3>
              <p className="finance-news-card__summary">{article.summary}</p>
              <div className="finance-news-card__meta">
                <span className="finance-news-card__source">{article.source}</span>
                <span className="finance-news-card__dot">·</span>
                <span>{article.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <div className="finance-footer">
        <p>Data is for informational purposes only and may be delayed. Not financial advice.</p>
      </div>

      {/* ─── Scoped Styles ─── */}
      <style>{`
        .finance-root {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 24px 20px 60px;
          animation: financeFadeIn 0.4s ease;
        }

        @keyframes financeFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ─── Header ─── */
        .finance-header {
          margin-bottom: 24px;
        }

        .finance-title {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 6px;
          background: linear-gradient(135deg, var(--color-text-primary) 0%, #00d68f 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .finance-subtitle {
          font-size: 0.92rem;
          color: var(--color-text-muted);
        }

        /* ─── Market Ticker ─── */
        .finance-ticker {
          margin-bottom: 24px;
          overflow-x: auto;
          scrollbar-width: none;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          background: var(--color-bg-card);
        }

        .finance-ticker::-webkit-scrollbar {
          display: none;
        }

        .finance-ticker__scroll {
          display: flex;
          gap: 0;
          min-width: max-content;
        }

        .finance-ticker__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 14px 22px;
          border-right: 1px solid var(--color-border);
          min-width: 130px;
          transition: background 0.2s;
        }

        .finance-ticker__item:last-child {
          border-right: none;
        }

        .finance-ticker__item:hover {
          background: var(--color-bg-card-hover);
        }

        .finance-ticker__name {
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .finance-ticker__value {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }

        .finance-ticker__change {
          font-size: 0.76rem;
          font-weight: 600;
        }

        .finance-ticker__change--up {
          color: var(--color-success);
        }

        .finance-ticker__change--down {
          color: var(--color-error);
        }

        /* ─── Tabs ─── */
        .finance-tabs {
          display: flex;
          gap: 4px;
          padding: 4px;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          margin-bottom: 20px;
        }

        .finance-tab {
          flex: 1;
          padding: 9px 16px;
          background: transparent;
          border: none;
          border-radius: var(--radius-sm);
          color: var(--color-text-muted);
          font-family: var(--font-primary);
          font-size: 0.84rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .finance-tab:hover {
          color: var(--color-text-secondary);
        }

        .finance-tab--active {
          background: var(--color-bg-card);
          color: var(--color-text-primary);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }

        /* ─── Table ─── */
        .finance-table-wrap {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: 32px;
          animation: financeFadeIn 0.3s ease;
        }

        .finance-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.86rem;
        }

        .finance-table thead {
          background: var(--color-bg-secondary);
        }

        .finance-table th {
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          font-size: 0.74rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border-bottom: 1px solid var(--color-border);
        }

        .finance-table td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--color-border);
          color: var(--color-text-secondary);
        }

        .finance-table__row {
          transition: background 0.15s;
          cursor: pointer;
        }

        .finance-table__row:hover {
          background: var(--color-bg-card);
        }

        .finance-table__row:last-child td {
          border-bottom: none;
        }

        .finance-table__right {
          text-align: right !important;
        }

        .finance-table__company {
          color: var(--color-text-muted);
          font-size: 0.82rem;
        }

        .finance-table__price {
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .finance-table__volume {
          color: var(--color-text-muted);
          font-size: 0.8rem;
        }

        .finance-table__hide-mobile {}

        @media (max-width: 640px) {
          .finance-table__hide-mobile {
            display: none;
          }
        }

        .finance-symbol {
          display: inline-block;
          padding: 3px 8px;
          background: var(--color-accent-light);
          border: 1px solid var(--color-accent-glow);
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.8rem;
          color: var(--color-accent);
          letter-spacing: 0.03em;
        }

        .finance-symbol--crypto {
          background: rgba(255, 170, 0, 0.1);
          border-color: rgba(255, 170, 0, 0.25);
          color: var(--color-warning);
        }

        .finance-change {
          font-weight: 600;
          font-size: 0.84rem;
        }

        .finance-change--up {
          color: var(--color-success);
        }

        .finance-change--down {
          color: var(--color-error);
        }

        /* ─── Sectors ─── */
        .finance-sectors {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
          animation: financeFadeIn 0.3s ease;
        }

        .finance-sector {
          padding: 14px 18px;
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          transition: all 0.2s;
          cursor: pointer;
        }

        .finance-sector:hover {
          background: var(--color-bg-card-hover);
          border-color: var(--color-accent-glow);
        }

        .finance-sector__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .finance-sector__name {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .finance-sector__bar-bg {
          height: 6px;
          background: var(--color-bg-primary);
          border-radius: 3px;
          overflow: hidden;
        }

        .finance-sector__bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .finance-sector__bar-fill--up {
          background: linear-gradient(90deg, var(--color-success), rgba(0, 214, 143, 0.5));
        }

        .finance-sector__bar-fill--down {
          background: linear-gradient(90deg, var(--color-error), rgba(255, 77, 106, 0.5));
        }

        /* ─── News ─── */
        .finance-news-section {
          margin-bottom: 20px;
        }

        .finance-news-section__title {
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

        .finance-news-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 640px) {
          .finance-news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .finance-news-card {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 20px;
          cursor: pointer;
          transition: all 0.25s;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .finance-news-card:hover {
          background: var(--color-bg-card-hover);
          border-color: var(--color-accent-glow);
          transform: translateY(-2px);
          box-shadow: var(--shadow-card);
        }

        .finance-news-card__category {
          display: inline-flex;
          align-self: flex-start;
          padding: 3px 10px;
          background: var(--color-accent-light);
          border: 1px solid var(--color-accent-glow);
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--color-accent);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .finance-news-card__title {
          font-size: 0.92rem;
          font-weight: 650;
          color: var(--color-text-primary);
          line-height: 1.4;
        }

        .finance-news-card__summary {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          line-height: 1.55;
          flex: 1;
        }

        .finance-news-card__meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.74rem;
          color: var(--color-text-muted);
          margin-top: 4px;
        }

        .finance-news-card__source {
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .finance-news-card__dot {
          opacity: 0.4;
        }

        /* ─── Footer ─── */
        .finance-footer {
          text-align: center;
          padding: 28px 0 0;
          border-top: 1px solid var(--color-border);
          margin-top: 12px;
        }

        .finance-footer p {
          font-size: 0.74rem;
          color: var(--color-text-muted);
          opacity: 0.5;
          font-style: italic;
        }

        /* ─── Responsive ─── */
        @media (max-width: 640px) {
          .finance-root {
            padding: 16px 14px 48px;
          }

          .finance-title {
            font-size: 1.5rem;
          }

          .finance-ticker__item {
            padding: 10px 16px;
            min-width: 110px;
          }

          .finance-ticker__value {
            font-size: 0.92rem;
          }

          .finance-table th,
          .finance-table td {
            padding: 10px 12px;
          }

          .finance-news-card {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default FinanceView;
