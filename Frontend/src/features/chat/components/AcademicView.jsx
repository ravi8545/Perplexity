import React from 'react'

const AcademicView = () => {
  const papers = [
    {
      id: 1,
      title: "Attention Is All You Need",
      authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
      journal: "Advances in Neural Information Processing Systems (NeurIPS)",
      year: "2017",
      citations: "134,800+",
      doi: "10.48550/arXiv.1706.03762",
      abstract: "We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in translation quality, more parallelizable, and requiring significantly less time to train.",
      category: "Large Language Models"
    },
    {
      id: 2,
      title: "Deep Residual Learning for Image Recognition (ResNet)",
      authors: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun",
      journal: "IEEE Conference on Computer Vision and Pattern Recognition (CVPR)",
      year: "2016",
      citations: "204,500+",
      doi: "10.1109/CVPR.2016.90",
      abstract: "We present a residual learning framework to ease the training of networks that are substantially deeper than those previously used. We provide comprehensive empirical evidence showing that these residual networks are easier to optimize, and can gain accuracy from considerably increased depth.",
      category: "Computer Vision"
    },
    {
      id: 3,
      title: "Generative Adversarial Nets (GANs)",
      authors: "Ian J. Goodfellow, Jean Pouget-Abadie, Mehdi Mirza, Bing Xu, David Warde-Farley, Sherjil Ozair, Aaron Courville, Yoshua Bengio",
      journal: "Advances in Neural Information Processing Systems (NeurIPS)",
      year: "2014",
      citations: "89,100+",
      doi: "10.1145/3422622",
      abstract: "We propose a new framework for estimating generative models via an adversarial process, in which we simultaneously train two models: a generative model G that captures the data distribution, and a discriminative model D that estimates the probability that a sample came from the training data rather than G.",
      category: "Generative AI"
    },
    {
      id: 4,
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
      journal: "NAACL-HLT",
      year: "2019",
      citations: "115,200+",
      doi: "10.18653/v1/N19-1423",
      abstract: "We introduce a new language representation model called BERT, which stands for Bidirectional Encoder Representations from Transformers. Unlike recent language representation models, BERT is designed to pre-train bidirectional representations from unlabeled text by jointly conditioning on both left and right context.",
      category: "Natural Language Processing"
    },
    {
      id: 5,
      title: "Adam: A Method for Stochastic Optimization",
      authors: "Diederik P. Kingma, Jimmy Ba",
      journal: "International Conference on Learning Representations (ICLR)",
      year: "2015",
      citations: "167,400+",
      doi: "10.48550/arXiv.1412.6980",
      abstract: "We introduce Adam, an algorithm for first-order gradient-based optimization of stochastic objective functions, based on adaptive estimates of lower-order moments. The method is straightforward to implement, is computationally efficient, has little memory requirements, and is invariant to diagonal rescaling of gradients.",
      category: "Optimization & Math"
    },
    {
      id: 6,
      title: "ImageNet: A Large-Scale Hierarchical Image Database",
      authors: "Jia Deng, Wei Dong, Richard Socher, Li-Jia Li, Kai Li, Li Fei-Fei",
      journal: "IEEE Conference on Computer Vision and Pattern Recognition (CVPR)",
      year: "2009",
      citations: "74,300+",
      doi: "10.1109/CVPR.2009.5206848",
      abstract: "Many computer vision tasks require high-quality annotated databases. Here we introduce ImageNet, a large-scale ontology of images, built on the backbone of WordNet. Over 14 million images are annotated with bounding boxes and hierarchical classifications, driving a decade of deep learning breakthroughs.",
      category: "Data Engineering"
    }
  ]

  const domains = [
    { name: "Large Language Models", trend: "+45% search interest" },
    { name: "Quantum Machine Learning", trend: "+15% citation rate" },
    { name: "Somatic CRISPR Editing", trend: "+32% pub density" },
    { name: "High-Temperature Superconductors", trend: "+118% paper volume" },
    { name: "Zero-Knowledge Cryptography", trend: "+24% conference acceptance" }
  ]

  return (
    <div className="academic-view w-full overflow-y-auto bg-[#0a0a0f] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-8">
        
        {/* Left Main Content */}
        <div className="flex-1 space-y-8">
          
          {/* Header and Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2a2a45]">
            <h2 className="text-xl font-bold text-[#f0f0f5] flex items-center gap-2">
              <span>🎓</span> Perplexity Academic
            </h2>
            <div className="relative w-full sm:w-80">
              <input 
                type="text" 
                placeholder="Search publications, authors, DOI, arXiv..." 
                className="w-full text-xs bg-[#1a1a2e] border border-[#2a2a45] rounded-full px-4 py-2.5 pl-10 text-[#f0f0f5] placeholder-[#6b6b85] focus:outline-none focus:border-[#20B2AA] focus:ring-1 focus:ring-[#20B2AA]/30 transition-all"
              />
              <span className="absolute left-3.5 top-3 text-xs text-[#6b6b85]">🔍</span>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-6 text-xs text-[#9898b0] font-medium overflow-x-auto pb-2 border-b border-[#2a2a45]/30 scrollbar-none">
            <button className="text-[#f0f0f5] border-b-2 border-[#20B2AA] pb-2 focus:outline-none shrink-0">Computer Science</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">Physics & Astronomy</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">Mathematics</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">Bio & Medicine</button>
            <button className="hover:text-[#f0f0f5] pb-2 focus:outline-none shrink-0">Chemistry & Materials</button>
          </div>

          {/* Papers List */}
          <div className="space-y-6">
            {papers.map((paper) => (
              <div key={paper.id} className="group bg-[#1a1a2e] border border-[#2a2a45] p-6 rounded-2xl hover:bg-[#1e1e35] hover:border-[#20B2AA]/20 transition-all duration-300 flex flex-col justify-between cursor-pointer space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="inline-block text-[10px] font-bold text-[#20B2AA] bg-[#20B2AA]/10 px-2 py-0.5 rounded uppercase tracking-wider">{paper.category}</span>
                    <span className="text-[10px] text-[#9898b0] font-semibold bg-[#0a0a0f] px-2.5 py-1 rounded border border-[#2a2a45]">
                      Citations: {paper.citations}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#f0f0f5] leading-snug group-hover:text-[#20B2AA] transition-colors">{paper.title}</h3>
                  <p className="text-xs text-[#9898b0] leading-relaxed font-light italic">Authors: {paper.authors}</p>
                  <p className="text-[11px] text-[#6b6b85] font-medium">{paper.journal} • {paper.year}</p>
                  <p className="text-xs text-[#9898b0] leading-relaxed font-light">{paper.abstract}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-[#2a2a45]/30 text-[10px] text-[#6b6b85]">
                  <span>DOI: <span className="text-[#9898b0] hover:underline font-mono">{paper.doi}</span></span>
                  <span className="flex items-center gap-1.5 hover:text-[#f0f0f5] font-semibold text-[#20B2AA]">
                    📄 Open Access PDF ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 space-y-6 flex-shrink-0">
          
          {/* Citation Indices */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-semibold text-[#f0f0f5]">📈 Trending Research Fields</h3>
            <div className="space-y-3">
              {domains.map((d, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-[#2a2a45]/30 pb-2.5 last:border-0 last:pb-0 hover:bg-[#1e1e35]/30 p-0.5 rounded transition-colors">
                  <span className="text-xs font-medium text-[#f0f0f5] hover:underline cursor-pointer truncate w-40">{d.name}</span>
                  <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-lg shrink-0">
                    {d.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Citation Box */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-5 rounded-2xl space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-[#f0f0f5]">📋 Reference Exporter</h3>
              <p className="text-xs text-[#9898b0] leading-relaxed mt-1 font-light">Select formatting layouts to generate dynamic academic citations.</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <button className="text-xs py-2 bg-[#0a0a0f] hover:border-[#20B2AA] border border-[#2a2a45] text-[#9898b0] hover:text-[#f0f0f5] rounded-lg transition-all font-medium">APA 7th</button>
              <button className="text-xs py-2 bg-[#0a0a0f] hover:border-[#20B2AA] border border-[#2a2a45] text-[#9898b0] hover:text-[#f0f0f5] rounded-lg transition-all font-medium">MLA 9th</button>
              <button className="text-xs py-2 bg-[#0a0a0f] hover:border-[#20B2AA] border border-[#2a2a45] text-[#9898b0] hover:text-[#f0f0f5] rounded-lg transition-all font-medium">IEEE</button>
              <button className="text-xs py-2 bg-[#0a0a0f] hover:border-[#20B2AA] border border-[#2a2a45] text-[#9898b0] hover:text-[#f0f0f5] rounded-lg transition-all font-medium">BibTeX</button>
            </div>
          </div>

          {/* Academic Profile Tracker */}
          <div className="bg-[#1a1a2e] border border-[#2a2a45] p-5 rounded-2xl space-y-3.5">
            <h3 className="text-sm font-semibold text-[#f0f0f5]">ORCID Sync</h3>
            <p className="text-xs text-[#9898b0] leading-relaxed font-light">Link your ORCID researcher credentials to automatically index your published papers and monitor citations in real time.</p>
            <button className="w-full text-xs font-semibold py-2.5 bg-[#20B2AA] hover:bg-[#1a9e97] text-white rounded-xl transition-all shadow-md">
              Connect ORCID
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AcademicView
