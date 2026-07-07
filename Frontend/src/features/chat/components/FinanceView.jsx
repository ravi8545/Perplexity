import React from 'react'

const FinanceView = () => {
  const assets = [
    { name: "NIFTY 50", price: "24,270.85", change: "+0.39%", value: "+95.15", isPositive: true, sparkline: "M 0 30 Q 25 10 50 25 T 100 10 T 150 5" },
    { name: "S&P BSE Sensex", price: "77,763.91", change: "+0.34%", value: "+261.79", isPositive: true, sparkline: "M 0 25 Q 30 20 60 15 T 120 10 T 150 8" },
    { name: "Nifty Bank Index", price: "57,938.50", change: "-0.16%", value: "-93.15", isPositive: false, sparkline: "M 0 10 Q 25 20 50 15 T 100 35 T 150 40" },
    { name: "Bitcoin", price: "$62,863.47", change: "+0.67%", value: "+$420.47", isPositive: true, sparkline: "M 0 35 Q 25 15 50 20 T 100 5 T 150 2" },
    { name: "Ethereum", price: "$3,450.12", change: "+1.24%", value: "+$42.30", isPositive: true, sparkline: "M 0 28 Q 20 10 40 22 T 80 12 T 120 4 T 150 1" },
    { name: "Solana", price: "$142.80", change: "-2.45%", value: "-$3.59", isPositive: false, sparkline: "M 0 12 Q 25 24 50 18 T 100 38 T 150 42" }
  ]

  const watchlist = [
    { name: "HDFC Bank Limited", ticker: "HDFCBANK.NSF", price: "₹801.05", change: "+0.65%", isPositive: true },
    { name: "Reliance Industries L...", ticker: "RELIANCE.BSE", price: "₹1,304.25", change: "+0.03%", isPositive: true },
    { name: "ICICI Lombard General...", ticker: "ICICIGI.NSE", price: "₹1,772.8", change: "+0.67%", isPositive: true },
    { name: "Infosys Limited", ticker: "INFY.NSE", price: "₹1,047.2", change: "+0.61%", isPositive: true },
    { name: "Tata Motors Limited", ticker: "TATAMOTORS.NSE", price: "₹942.50", change: "-1.12%", isPositive: false },
    { name: "State Bank of India", ticker: "SBIN.NSE", price: "₹812.30", change: "+0.84%", isPositive: true }
  ]

  const heatMap = [
    { name: "RELIANCE.NS", change: "+0.04%", weight: "col-span-2", color: "bg-emerald-950/60 border-emerald-800 text-emerald-300" },
    { name: "ADANIENT.NS", change: "+1.09%", weight: "col-span-1", color: "bg-emerald-800/80 border-emerald-500 text-emerald-100" },
    { name: "BHARTIARTL.NS", change: "+1.89%", weight: "col-span-2", color: "bg-emerald-700/80 border-emerald-400 text-emerald-550" },
    { name: "HINDUNILVR", change: "-0.43%", weight: "col-span-1", color: "bg-rose-950/60 border-rose-800 text-rose-300" },
    { name: "ITC.NS", change: "+0.02%", weight: "col-span-1", color: "bg-emerald-950/40 border-emerald-900 text-emerald-400" },
    { name: "NESTLEIND", change: "-0.12%", weight: "col-span-1", color: "bg-rose-950/40 border-rose-900 text-rose-400" }
  ]

  return (
    <div className="finance-view w-full overflow-y-auto bg-[#0a0a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-8">
        
        {/* Left Main Content */}
        <div className="flex-1 space-y-8">
          
          {/* Header and Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2a2a45]">
            <h2 className="text-xl font-bold text-[#f0f0f5] flex items-center gap-2">
              <span>📊</span> Perplexity Finance
            </h2>
            <div className="relative w-full sm:w-80">
              <input 
                type="text" 
                placeholder="Search stocks, indices, crypto..." 
                className="w-full text-xs bg-[#1a1a2e] border border-[#2a2a45] rounded-full px-4 py-2.5 pl-10 text-[#f0f0f5] placeholder-[#6b6b85] focus:outline-none focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA]/30 transition-all"
              />
              <span className="absolute left-3.5 top-3 text-xs text-[#6b6b85]">🔍</span>
            </div>
          </div>

          {/* Sub Navigation Links */}
          <div className="flex items-center gap-6 text-xs text-[#9898b0] font-medium overflow-x-auto pb-2 border-b border-[#2a2a45]/30 scrollbar-none">
            <button className="text-[#f0f0f5] border-b-2 border-[#20B2AA] pb-2 focus:outline-none shrink-0">India Markets</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">Crypto</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">US Markets</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">Earnings</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">Predictions</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">Screener</button>
          </div>

          {/* Top Assets */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-[#6b6b85] uppercase tracking-wider">Top Assets</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {assets.map((asset, idx) => (
                <div key={idx} className="bg-[#1a1a2e] border border-[#2a2a45] p-5 rounded-2xl flex flex-col justify-between hover:bg-[#1e1e35] hover:border-[#20B2AA]/20 transition-all duration-300 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-[#9898b0] font-medium">{asset.name}</p>
                      <p className="text-lg font-bold text-[#f0f0f5] mt-1">{asset.price}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${asset.isPositive ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
                      {asset.change}
                    </span>
                  </div>
                  <div className="flex justify-between items-end mt-4 pt-3 border-t border-[#2a2a45]/20">
                    <span className="text-[10px] text-[#6b6b85]">{asset.value}</span>
                    <svg width="90" height="24" className="overflow-visible">
                      <path 
                        d={asset.sparkline} 
                        fill="none" 
                        stroke={asset.isPositive ? "#10B981" : "#EF4444"} 
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Summary */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-6 rounded-2xl space-y-3">
            <h3 className="text-xs font-semibold text-[#6b6b85] uppercase tracking-wider">Market Analysis</h3>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#f0f0f5]">Domestic Indices consolidate near life-highs</h4>
              <p className="text-xs text-[#9898b0] leading-relaxed font-light">
                Indian benchmark indices Nifty 50 and Sensex ended marginally higher following choppy trading sessions, supported by selective buying in banking and tech heavyweights. FII outflows slowed down while DIIs continued showing robust purchasing resilience in retail segments. No additional volatile macroeconomic data was released during this cycle.
              </p>
            </div>
          </div>

          {/* Top 500 Heatmap Grid */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#2a2a45]/30">
              <h3 className="text-xs font-semibold text-[#6b6b85] uppercase tracking-wider">Market Heatmap (Top Weighted)</h3>
              <button className="text-xs text-[#20B2AA] hover:underline">Full View ↗</button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {heatMap.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col justify-center p-3.5 rounded-xl border text-center cursor-pointer hover:scale-[1.02] transition-all ${item.weight} ${item.color}`}
                >
                  <span className="font-bold text-xs truncate">{item.name}</span>
                  <span className="text-[10px] font-medium mt-1 opacity-90">{item.change}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 text-[10px] text-[#6b6b85] font-light pt-2">
              <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-800 rounded-sm"></span> Positive {"(>0.5%)"}</div>
              <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-950 rounded-sm"></span> Flat (0-0.5%)</div>
              <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-rose-950 rounded-sm"></span> Negative {"(<0%)"}</div>
            </div>
          </div>

          {/* Chat Query Box */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-4 rounded-2xl flex items-center gap-3">
            <span className="text-base text-[#20B2AA]">💬</span>
            <input 
              type="text" 
              placeholder="Ask anything about Indian markets, stocks or crypto..." 
              className="flex-1 bg-transparent text-xs text-[#f0f0f5] placeholder-[#6b6b85] outline-none"
            />
            <button className="w-8 h-8 rounded-full bg-[#2a2a45] hover:bg-[#20B2AA] text-white transition-all flex items-center justify-center text-xs">
              ➔
            </button>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="w-full lg:w-80 space-y-6 flex-shrink-0">
          
          {/* Watchlist */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-5 rounded-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-[#f0f0f5]">My Watchlist</h3>
              <button className="text-xs text-[#6b6b85] hover:text-[#f0f0f5] font-medium">➕ Add</button>
            </div>
            <div className="space-y-3.5">
              {watchlist.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-[#2a2a45]/30 pb-2 last:border-0 last:pb-0 hover:bg-[#1e1e35]/30 transition-colors p-1 rounded-lg">
                  <div>
                    <p className="text-xs font-semibold text-[#f0f0f5] truncate w-36">{item.name}</p>
                    <p className="text-[9px] text-[#6b6b85] font-mono mt-0.5">{item.ticker}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-[#f0f0f5]">{item.price}</p>
                    <p className={`text-[10px] font-semibold mt-0.5 ${item.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>{item.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prediction Markets */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-5 rounded-2xl space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-[#f0f0f5]">Prediction Markets</h3>
              <p className="text-[10px] text-[#6b6b85] mt-1 font-light">Crowdsourced probability indices</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2.5">
                <p className="text-xs text-[#9898b0] font-semibold leading-relaxed">What will WTI Crude Oil price settle at in July 2026?</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center border-b border-[#2a2a45]/20 pb-1.5">
                    <span className="text-[#9898b0]">Below $65</span>
                    <span className="font-semibold text-[#f0f0f5]">65.0% <span className="text-rose-500 ml-1">↘ 6.0%</span></span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#2a2a45]/20 pb-1.5">
                    <span className="text-[#9898b0]">$60 - $75</span>
                    <span className="font-semibold text-[#f0f0f5]">22.0% <span className="text-rose-500 ml-1">↘ 3.0%</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#9898b0]">Above $80</span>
                    <span className="font-semibold text-[#f0f0f5]">17.0% <span className="text-emerald-500 ml-1">↗ 1.5%</span></span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[9px] text-[#6b6b85] pt-1">
                  <span>Vol: $766,800</span>
                  <span className="font-medium hover:underline cursor-pointer">Polymarket</span>
                </div>
              </div>

              <div className="border-t border-[#2a2a45]/30 pt-4 space-y-2.5">
                <p className="text-xs text-[#9898b0] font-semibold leading-relaxed">How many Fed rate cuts will occur in 2026?</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center border-b border-[#2a2a45]/20 pb-1.5">
                    <span className="text-[#9898b0]">No rate cuts</span>
                    <span className="font-semibold text-[#f0f0f5]">77.0% <span className="text-rose-500 ml-1">↘ 0.2%</span></span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#2a2a45]/20 pb-1.5">
                    <span className="text-[#9898b0]">1 cut (25 bps)</span>
                    <span className="font-semibold text-[#f0f0f5]">14.0% <span className="text-emerald-500 ml-1">↗ 0.5%</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#9898b0]">2 cuts (50 bps)</span>
                    <span className="font-semibold text-[#f0f0f5]">5.0% <span className="text-emerald-500 ml-1">↗ 0.5%</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FinanceView
