import React from 'react'

const HealthView = () => {
  const articles = [
    {
      id: 1,
      title: "Mediterranean Diet linked to 23% lower risk of mortality in women, 25-year study finds",
      published: "5 hours ago",
      summary: "A landmark study tracking over 25,000 women over 25 years confirms that high adherence to a Mediterranean diet significantly reduces all-cause mortality, primarily driven by improvements in cardiometabolic biomarkers, inflammatory pathways, and insulin resistance.",
      sources: "JAMA Network, Harvard Health, Mayo Clinic",
      sourceCount: 38,
      category: "Nutrition",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "The science of sleep: How deep sleep clears brain waste and boosts immunity",
      published: "10 hours ago",
      summary: "Neurological research demonstrates how slow-wave (deep) sleep triggers the glymphatic system to wash away metabolic waste products, including amyloid-beta, which is associated with cognitive decline. Chronic sleep deprivation impairs cellular immunity.",
      sources: "Nature Neuroscience, NIH, Sleep Foundation",
      sourceCount: 22,
      category: "Neurology",
      image: "https://images.unsplash.com/photo-1511295742364-92767fa62d9f?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "FDA approves breakthrough gene therapy for genetic blindness",
      published: "1 day ago",
      summary: "The FDA has granted approval to a novel CRISPR-based gene therapy targeting inherited retinal dystrophy. Clinical trials showed significant vision restoration in patients after a single subretinal treatment, opening doors for somatic editing.",
      sources: "FDA, New England Journal of Medicine, STAT News",
      sourceCount: 47,
      category: "Medicine & Biotech",
      image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Intermittent fasting vs calorie restriction: No significant weight difference found in clinical trial",
      published: "2 days ago",
      summary: "A randomized controlled trial published in the Annals of Internal Medicine reveals that time-restricted eating (intermittent fasting) and traditional daily calorie restriction yield similar results in weight loss and insulin sensitivity over 12 months.",
      sources: "Annals of Internal Medicine, Johns Hopkins Medicine",
      sourceCount: 29,
      category: "Nutrition & Metabolism",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Daily walking reduces chronic disease risk even in low step counts, meta-analysis shows",
      published: "3 days ago",
      summary: "A new meta-analysis of 17 cohort studies shows that walking just 4,000 steps a day starts significantly reducing the risk of all-cause mortality, with the benefits continuing to scale up to 20,000 steps, showing cardiovascular improvements.",
      sources: "European Journal of Preventive Cardiology, WHO",
      sourceCount: 35,
      category: "Fitness & Prevention",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "Common environmental microplastics detected in human vascular plaque samples",
      published: "4 days ago",
      summary: "In a groundbreaking pilot study, researchers have identified microplastics and nanoplastics in plaque removed from the carotid arteries of patients. The study suggests a potential link to increased cardiovascular events.",
      sources: "New England Journal of Medicine, Lancet Health",
      sourceCount: 51,
      category: "Environmental Health",
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=600&q=80"
    }
  ]

  const metrics = [
    { label: "Optimal Sleep", value: "7-9 Hours", status: "Recommended" },
    { label: "Water Intake", value: "2.7 - 3.7 L", status: "Daily Target" },
    { label: "Physical Activity", value: "150 Mins", status: "Weekly Goal" },
    { label: "Daily Steps", value: "8,000+", status: "Active Target" },
    { label: "Fasting Glucose", value: "70-99 mg/dL", status: "Normal Range" },
    { label: "Blood Pressure", value: "< 120/80", status: "Systolic/Diastolic" }
  ]

  return (
    <div className="health-view w-full overflow-y-auto bg-[#0a0a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-8">
        
        {/* Left Main Content */}
        <div className="flex-1 space-y-8">
          
          {/* Header and Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2a2a45]">
            <h2 className="text-xl font-bold text-[#f0f0f5] flex items-center gap-2">
              <span>🩺</span> Perplexity Health
            </h2>
            <div className="relative w-full sm:w-80">
              <input 
                type="text" 
                placeholder="Search symptoms, treatments, drugs..." 
                className="w-full text-xs bg-[#1a1a2e] border border-[#2a2a45] rounded-full px-4 py-2.5 pl-10 text-[#f0f0f5] placeholder-[#6b6b85] focus:outline-none focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA]/30 transition-all"
              />
              <span className="absolute left-3.5 top-3 text-xs text-[#6b6b85]">🔍</span>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-6 text-xs text-[#9898b0] font-medium overflow-x-auto pb-2 border-b border-[#2a2a45]/30 scrollbar-none">
            <button className="text-[#f0f0f5] border-b-2 border-[#20B2AA] pb-2 focus:outline-none shrink-0">General Health</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">Nutrition & Diet</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">Mental Wellness</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">BioTech & Research</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">Clinical Guidelines</button>
          </div>

          {/* Articles List */}
          <div className="space-y-6">
            {articles.map((article) => (
              <div key={article.id} className="group bg-[#1a1a2e] border border-[#2a2a45] p-6 rounded-2xl hover:bg-[#1e1e35] hover:border-[#20B2AA]/20 transition-all duration-300 flex flex-col md:flex-row gap-6 cursor-pointer">
                <div className="flex-1 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="inline-block text-[10px] font-bold text-[#20B2AA] bg-[#20B2AA]/10 px-2 py-0.5 rounded uppercase tracking-wider">{article.category}</span>
                    <h3 className="text-base font-bold text-[#f0f0f5] leading-snug group-hover:text-[#20B2AA] transition-colors">{article.title}</h3>
                    <p className="text-xs text-[#6b6b85]">{article.published} ago</p>
                    <p className="text-xs text-[#9898b0] leading-relaxed font-light">{article.summary}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-[#2a2a45]/20 text-[10px] text-[#6b6b85]">
                    <div className="w-4.5 h-4.5 rounded-full bg-red-650 flex items-center justify-center text-[7px] font-bold text-white">H</div>
                    <span>{article.sourceCount} medically verified sources</span>
                  </div>
                </div>
                <div className="w-full md:w-52 h-36 md:h-auto min-h-[140px] rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 space-y-6 flex-shrink-0">
          
          {/* Daily Health Tips */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-5 rounded-2xl space-y-3.5">
            <h3 className="text-sm font-semibold text-[#f0f0f5] flex items-center gap-1.5">
              <span>💡</span> Wellness Guidelines
            </h3>
            <p className="text-xs text-[#9898b0] leading-relaxed font-light">
              "Try the 20-20-20 rule to reduce digital eye strain: Every 20 minutes, look at something 20 feet away for at least 20 seconds. It relaxes ciliary muscles and prevents screen-induced headaches."
            </p>
            <div className="text-[10px] text-[#6b6b85] pt-2 border-t border-[#2a2a45]/30">Source: American Academy of Ophthalmology</div>
          </div>

          {/* Health Metrics Card */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-semibold text-[#f0f0f5]">📊 Health Reference Values</h3>
            <div className="space-y-3">
              {metrics.map((m, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-[#2a2a45]/30 pb-2.5 last:border-0 last:pb-0">
                  <div>
                    <p className="text-xs font-semibold text-[#f0f0f5]">{m.label}</p>
                    <p className="text-[10px] text-[#6b6b85] mt-0.5">{m.status}</p>
                  </div>
                  <span className="text-xs font-bold text-[#20B2AA] bg-[#20B2AA]/10 px-2.5 py-0.5 rounded-lg">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Symptoms Assessment Card */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-5 rounded-2xl space-y-3">
            <h3 className="text-sm font-semibold text-[#f0f0f5]">Symptom Checker</h3>
            <p className="text-xs text-[#9898b0] leading-relaxed font-light">Describe your symptoms to receive general guidance, potential classifications, and recommended clinical consult timings.</p>
            <button className="w-full text-xs font-semibold py-2.5 bg-[#20B2AA] hover:bg-[#1a9e97] text-white rounded-xl transition-all shadow-md">
              Start Assessment
            </button>
            <p className="text-[9px] text-[#6b6b85] text-center font-light leading-normal">
              Not a substitute for emergency or formal professional medical advice.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HealthView
