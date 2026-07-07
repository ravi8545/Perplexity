import React from 'react'

const PatentsView = () => {
  const patents = [
    {
      id: 1,
      number: "US-11985458-B2",
      title: "Neural network processing unit with hardware-managed cache coherence",
      assignee: "Apple Inc. (Cupertino, CA)",
      inventors: "John L. Miller, Wayne P. Chen",
      date: "Granted May 14, 2024",
      classification: "G06F 12/0811 (Computing; digital data processing)",
      abstract: "A neural network processing unit (NPU) utilizes a dedicated hardware-managed cache coherence protocol to maintain data consistency between local vector memory banks and host system memories, improving inference speeds.",
      status: "Active / Granted"
    },
    {
      id: 2,
      number: "US-12048991-B1",
      title: "Method and apparatus for zero-emission energy storage using compressed hydrogen grids",
      assignee: "Tesla Inc. (Austin, TX)",
      inventors: "Elon R. Musk, JB Straubel, Sarah E. Jenkins",
      date: "Granted April 22, 2025",
      classification: "H01M 8/04082 (Fuel cells; manufacture thereof)",
      abstract: "An energy storage grid utilizes redundant solar generation to electrolyze water, producing compressed hydrogen stored in subterranean geological features. A fuel cell generator converts the hydrogen back to electricity during high grid demand.",
      status: "Active / Granted"
    },
    {
      id: 3,
      number: "EP-3982701-A1",
      title: "Decentralized cryptographic verification of identity across multi-tenant networks",
      assignee: "Ethereum Foundation (Zug, CH)",
      inventors: "Vitalik Buterin, Karl Floersch",
      date: "Published Sept 12, 2023",
      classification: "H04L 9/3239 (Security protocols in network communication)",
      abstract: "A method for securely verifying decentralized identities utilizing zero-knowledge proofs. Multi-tenant networks can check claims without gaining access to underlying identifying datasets or private cryptographic credentials.",
      status: "Pending / Application"
    },
    {
      id: 4,
      number: "US-11854129-B2",
      title: "Solid-state electrolyte composition with lithium-ion conductive polymer binders",
      assignee: "Toyota Motor Corp. (Aichi, JP)",
      inventors: "Hiroshi Sato, Kenji Yamada",
      date: "Granted Dec 26, 2023",
      classification: "H01M 10/0562 (Solid-state batteries)",
      abstract: "A solid-state lithium battery electrolyte having improved ionic conductivity and resistance to dendrite formation. A composite mixture of sulfide-based solid electrolytes and crosslinked polyethers facilitates higher current loading.",
      status: "Active / Granted"
    },
    {
      id: 5,
      number: "US-12154388-B1",
      title: "Self-supervised model pre-training on multi-modal satellite spectral datastreams",
      assignee: "Google LLC (Mountain View, CA)",
      inventors: "Ananya Patel, David T. Rodriguez",
      date: "Granted Feb 11, 2026",
      classification: "G06N 3/08 (Machine learning models)",
      abstract: "A system for training geospatial deep learning models. Multi-modal transformer networks are pre-trained on unlabelled satellite imagery using contrastive learning to align synthetic aperture radar (SAR) and optical wavelengths.",
      status: "Active / Granted"
    },
    {
      id: 6,
      number: "EP-4109852-A2",
      title: "mRNA delivery vectors based on ionizable lipid nanoparticles for targeted oncology",
      assignee: "BioNTech SE (Mainz, DE)",
      inventors: "Ugur Sahin, Ozlem Tureci",
      date: "Published Jan 04, 2024",
      classification: "A61K 9/5123 (Liposomes and nanocapsules)",
      abstract: "Ionizable lipid formulation designed to encapsulate therapeutic mRNA transcripts. The lipid nanoparticles (LNPs) exhibit selective accumulation in tumor microenvironments, facilitating cellular uptake and translation of antigen proteins.",
      status: "Pending / Application"
    }
  ]

  const sectors = [
    { name: "Semiconductors & AI Chips", pct: "32%", count: "1,240 patents" },
    { name: "Hydrogen Storage & Clean Energy", pct: "24%", count: "982 patents" },
    { name: "Zero-Knowledge Encryption", pct: "18%", count: "650 patents" },
    { name: "Solid-State Battery Tech", pct: "15%", count: "512 patents" }
  ]

  return (
    <div className="patents-view w-full overflow-y-auto bg-[#0a0a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-8">
        
        {/* Left Main Content */}
        <div className="flex-1 space-y-8">
          
          {/* Header and Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2a2a45]">
            <h2 className="text-xl font-bold text-[#f0f0f5] flex items-center gap-2">
              <span>📜</span> Perplexity Patents
            </h2>
            <div className="relative w-full sm:w-80">
              <input 
                type="text" 
                placeholder="Search patent IDs, classifications, assignees..." 
                className="w-full text-xs bg-[#1a1a2e] border border-[#2a2a45] rounded-full px-4 py-2.5 pl-10 text-[#f0f0f5] placeholder-[#6b6b85] focus:outline-none focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA]/30 transition-all"
              />
              <span className="absolute left-3.5 top-3 text-xs text-[#6b6b85]">🔍</span>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-6 text-xs text-[#9898b0] font-medium overflow-x-auto pb-2 border-b border-[#2a2a45]/30 scrollbar-none">
            <button className="text-[#f0f0f5] border-b-2 border-[#20B2AA] pb-2 focus:outline-none shrink-0">All Jurisdictions</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">USPTO (United States)</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">EPO (Europe)</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">WIPO (PCT)</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">JPO (Japan)</button>
          </div>

          {/* Patents List */}
          <div className="space-y-6">
            {patents.map((patent) => (
              <div key={patent.id} className="group bg-[#1a1a2e] border border-[#2a2a45] p-6 rounded-2xl hover:bg-[#1e1e35] hover:border-[#20B2AA]/20 transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-semibold text-[#20B2AA] bg-[#20B2AA]/10 px-2.5 py-0.5 rounded-full">
                      {patent.number}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${patent.status.includes('Granted') ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10'}`}>
                      {patent.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#f0f0f5] leading-snug group-hover:text-[#20B2AA] transition-colors">{patent.title}</h3>
                  <div className="text-[11px] text-[#9898b0] space-y-1 font-light">
                    <p><span className="text-[#6b6b85] font-medium">Assignee:</span> {patent.assignee}</p>
                    <p><span className="text-[#6b6b85] font-medium">Inventors:</span> {patent.inventors}</p>
                  </div>
                  <p className="text-[11px] text-[#6b6b85] font-medium">{patent.date} • Class: {patent.classification}</p>
                  <p className="text-xs text-[#9898b0] leading-relaxed font-light">{patent.abstract}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#2a2a45]/30 text-[10px] text-[#6b6b85]">
                  <span>Patent Classification Index</span>
                  <span className="flex items-center gap-1.5 hover:text-[#f0f0f5] font-semibold text-[#20B2AA]">
                    📁 Request Full PDF ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 space-y-6 flex-shrink-0">
          
          {/* Patent Classification Shares */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-5 rounded-2xl space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-[#f0f0f5]">📊 IP Classification Shares</h3>
              <p className="text-[10px] text-[#6b6b85] mt-1 font-light">Most active IPC sub-categories</p>
            </div>
            
            <div className="space-y-4">
              {sectors.map((s, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-[#9898b0] hover:underline cursor-pointer">{s.name}</span>
                    <span className="text-[#20B2AA]">{s.pct}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#0a0a0f] rounded-full overflow-hidden">
                    <div className="bg-[#20B2AA] h-full rounded-full" style={{ width: s.pct }} />
                  </div>
                  <p className="text-[9px] text-[#6b6b85] text-right font-light">{s.count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Patent Services Info */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-5 rounded-2xl space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-[#f0f0f5]">🛡️ Patent Monitoring</h3>
              <p className="text-xs text-[#9898b0] leading-relaxed mt-1 font-light">
                Monitor specific patent categories or companies. Get real-time alerts whenever a new application is published in USPTO, EPO, or WIPO.
              </p>
            </div>
            <button className="w-full text-xs font-semibold py-2.5 bg-[#20B2AA] hover:bg-[#1a9e97] text-white rounded-xl transition-all shadow-md">
              Setup Alert Triggers
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PatentsView
