import React from 'react'

const DiscoverView = () => {
  const articles = [
    {
      id: 1,
      title: "Investors flee AI stocks, turn to India for shelter",
      published: "4 hours ago",
      summary: "Bloomberg reports global capital is rotating toward Indian equities as Big Tech's $2.3 trillion June rout shakes confidence in AI valuations. Investors are finding a safe haven in India's robust domestic demand, expanding manufacturing capacity, and massive infrastructure growth initiatives.",
      sources: "Bloomberg, Reuters, Economic Times",
      sourceCount: 53,
      category: "Finance",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Maersk places first-ever container order from India",
      published: "6 hours ago",
      summary: "A.P. Moller - Maersk has placed its first-ever container manufacturing order from Indian companies. This move is part of the logistics giant's strategy to diversify its sourcing, decrease reliance on traditional manufacturing hubs, and support the 'Make in India' initiative.",
      sources: "CNBC, Maritime Gateway, Livemint",
      sourceCount: 15,
      category: "Business",
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "India withdraws gas supply curbs as Middle East LNG shipments stabilize",
      published: "12 hours ago",
      summary: "The Indian government has lifted the domestic gas supply restrictions previously imposed on gas-based power plants and fertilizer units. This comes as long-term LNG shipments from Qatar and the UAE return to normal schedules after brief maritime logistics disruptions.",
      sources: "Reuters, NDTV, Oil & Gas Journal",
      sourceCount: 65,
      category: "Energy",
      image: "https://images.unsplash.com/photo-1542060748-10c28b629f6f?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "CBI arrests ex-Reliance Capital CFO in ₹9,280 cr fraud probe",
      published: "1 day ago",
      summary: "The Central Bureau of Investigation (CBI) has taken the former Chief Financial Officer of Reliance Capital into custody regarding an alleged bank loan fraud amounting to ₹9,280 crore. The investigation is probing deep into the diversion of corporate funds to shell entities.",
      sources: "Times of India, PTI, Moneycontrol",
      sourceCount: 15,
      category: "Crime & Law",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Gujarat draws ₹1.24 lakh crore in semiconductor investments across 3 projects",
      published: "2 days ago",
      summary: "The state of Gujarat has signed memorandums of understanding with global tech consortiums to build three semiconductor assembly and testing plants. This cements India's bid to become a key player in the global chip supply chain, backed by aggressive federal subsidy policies.",
      sources: "TechCrunch, Business Standard, EETimes",
      sourceCount: 42,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "SpaceX successfully launches 22 Starlink satellites to orbit from California",
      published: "3 days ago",
      summary: "SpaceX launched 22 Starlink satellites to low-Earth orbit from Vandenberg Space Force Base in California. The Falcon 9 first stage booster returned safely, landing on the 'Of Course I Still Love You' droneship in the Pacific Ocean.",
      sources: "Space.com, NASA Spaceflight, TechNews",
      sourceCount: 28,
      category: "Science",
      image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 7,
      title: "Global Art Market shifts toward digital and hybrid exhibitions, report shows",
      published: "4 days ago",
      summary: "The annual Global Art Market Report reveals a 14% increase in online-only and hybrid physical-digital sales. Younger collectors are driving the shift, showing a strong preference for digital provenance verification and virtual gallery walkthroughs.",
      sources: "Artnet, The Art Newspaper, Forbes",
      sourceCount: 18,
      category: "Arts & Culture",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 8,
      title: "FIFA introduces AI-driven offside technology for upcoming World Cup matches",
      published: "5 days ago",
      summary: "FIFA has confirmed the deployment of advanced semi-automated offside technology for all upcoming World Cup qualifiers. The system uses 12 tracking cameras and limb-tracking AI to make instant offside decisions, reducing VAR check times.",
      sources: "ESPN, Sky Sports, The Athletic",
      sourceCount: 31,
      category: "Sports",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80"
    }
  ]

  const topics = ["Tech & Science", "Business", "Arts & Culture", "Sports", "Entertainment"]

  return (
    <div className="discover-view w-full overflow-y-auto bg-[#0a0a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-8">
        
        {/* Left Main Content */}
        <div className="flex-1 space-y-8">
          
          {/* Section Header */}
          <div className="flex items-center justify-between border-b border-[#2a2a45] pb-4">
            <div className="flex space-x-6 text-sm font-medium">
              <button className="text-[#f0f0f5] border-b-2 border-[#20B2AA] pb-4 -mb-[18px] focus:outline-none transition-all">For You</button>
              <button className="text-[#9898b0] hover:text-[#f0f0f5] pb-4 focus:outline-none transition-all">Top</button>
              <button className="text-[#9898b0] hover:text-[#f0f0f5] pb-4 focus:outline-none transition-all">Topics</button>
            </div>
            <button className="flex items-center gap-2 text-xs text-[#9898b0] hover:text-[#f0f0f5] bg-[#1a1a2e] border border-[#2a2a45] hover:bg-[#1e1e35] px-4 py-2 rounded-full transition-all">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Share
            </button>
          </div>

          {/* Featured Big Article */}
          {articles.length > 0 && (
            <div className="featured-article group flex flex-col md:flex-row gap-6 bg-[#1a1a2e] border border-[#2a2a45] p-6 rounded-2xl hover:bg-[#1e1e35] hover:border-[#20B2AA]/30 transition-all duration-300 cursor-pointer">
              <div className="flex-1 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="inline-block text-[10px] font-bold text-[#20B2AA] bg-[#20B2AA]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">{articles[0].category}</span>
                  <h2 className="text-xl md:text-2xl font-bold leading-snug text-[#f0f0f5] group-hover:text-[#20B2AA] transition-colors">{articles[0].title}</h2>
                  <p className="text-xs text-[#6b6b85]">{articles[0].published} ago</p>
                  <p className="text-sm text-[#9898b0] leading-relaxed font-light">{articles[0].summary}</p>
                </div>
                <div className="flex items-center gap-2 pt-4 text-xs text-[#6b6b85] border-t border-[#2a2a45]/50">
                  <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-[9px] font-bold text-white">E</div>
                  <span>{articles[0].sourceCount} sources linked</span>
                </div>
              </div>
              <div className="w-full md:w-80 h-48 md:h-auto min-h-[200px] rounded-xl overflow-hidden flex-shrink-0 relative">
                <img src={articles[0].image} alt={articles[0].title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
              </div>
            </div>
          )}

          {/* Grid of Other Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.slice(1).map((article) => (
              <div key={article.id} className="group bg-[#1a1a2e] border border-[#2a2a45] rounded-2xl overflow-hidden hover:bg-[#1e1e35] hover:border-[#20B2AA]/30 transition-all duration-300 flex flex-col cursor-pointer justify-between">
                <div className="h-48 w-full overflow-hidden relative">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                  <span className="absolute top-4 left-4 text-[9px] font-bold text-[#20B2AA] bg-[#0a0a0f]/80 backdrop-blur-sm px-2 py-1 rounded-full uppercase tracking-wider">{article.category}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold leading-snug text-[#f0f0f5] group-hover:text-[#20B2AA] transition-colors">{article.title}</h3>
                    <p className="text-[11px] text-[#6b6b85]">{article.published}</p>
                    <p className="text-xs text-[#9898b0] leading-relaxed line-clamp-3 font-light">{article.summary}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-[#2a2a45]/30 text-[11px] text-[#6b6b85]">
                    <div className="w-4 h-4 rounded-full bg-teal-600 flex items-center justify-center text-[7px] font-bold text-white">S</div>
                    <span>{article.sourceCount} sources</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="w-full lg:w-80 space-y-6 flex-shrink-0">
          
          {/* Make It Yours Widget */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-5 rounded-2xl">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-sm font-semibold text-[#f0f0f5]">Customize Feed</h3>
              <button className="text-[#6b6b85] hover:text-[#f0f0f5]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <p className="text-xs text-[#9898b0] leading-relaxed mb-4 font-light">Select topics and interests to tailor your Discover experience.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {topics.map((t, idx) => (
                <button key={idx} className="text-xs bg-[#0a0a0f] border border-[#2a2a45] hover:border-[#20B2AA] px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 text-[#9898b0] hover:text-[#f0f0f5]">
                  <span>{idx % 2 === 0 ? '💻' : '⚡'}</span>
                  {t}
                </button>
              ))}
            </div>
            <button className="w-full text-xs font-semibold py-2.5 bg-[#20B2AA] hover:bg-[#1a9e97] text-white rounded-xl transition-all shadow-md">
              Save Interests
            </button>
          </div>

          {/* Weather Widget */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-5 rounded-2xl flex justify-between items-center">
            <div>
              <h4 className="text-xs text-[#6b6b85] font-medium uppercase tracking-wider">Lucknow</h4>
              <p className="text-2xl font-bold text-[#f0f0f5] mt-1">35° <span className="text-xs text-[#9898b0] font-normal">C / F</span></p>
              <p className="text-xs text-[#9898b0] mt-1 font-light">Mostly cloudy</p>
            </div>
            <div className="text-right">
              <span className="text-4xl filter drop-shadow-[0_2px_8px_rgba(32,178,170,0.2)]">☁️</span>
              <p className="text-[10px] text-[#6b6b85] mt-2 font-medium">H: 37° L: 29°</p>
            </div>
          </div>

          {/* Market Outlook Widget */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-5 rounded-2xl">
            <h4 className="text-xs font-semibold text-[#6b6b85] uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Market Outlook</span>
              <span className="text-[10px] text-[#20B2AA] hover:underline cursor-pointer normal-case">Details</span>
            </h4>
            <div className="space-y-3.5">
              <div className="flex justify-between items-center text-xs border-b border-[#2a2a45]/30 pb-2 last:border-0 last:pb-0">
                <span className="text-[#9898b0] font-medium">S&P Futures</span>
                <span className="text-emerald-500 font-semibold">+0.39% <span className="text-[10px] text-emerald-500/70 font-light">($7,557.25)</span></span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-[#2a2a45]/30 pb-2 last:border-0 last:pb-0">
                <span className="text-[#9898b0] font-medium">NASDAQ Fut.</span>
                <span className="text-emerald-500 font-semibold">+1.17% <span className="text-[10px] text-emerald-500/70 font-light">($29,901.75)</span></span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#9898b0] font-medium">Bitcoin</span>
                <span className="text-emerald-500 font-semibold">+0.67% <span className="text-[10px] text-emerald-500/70 font-light">($62,863.47)</span></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DiscoverView
