import { useState } from "react";

const CFAStudyPlan = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [completedItems, setCompletedItems] = useState({});

  const toggleComplete = (id) => {
    setCompletedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "schedule", label: "9-Week Schedule" },
    { id: "topics", label: "Topic Strategy" },
    { id: "methods", label: "80/20 Methods" },
    { id: "resources", label: "Resources" },
    { id: "review", label: "Review Phase" },
  ];

  const CheckRow = ({ id, children, bold }) => (
    <tr
      className={`cursor-pointer transition-colors ${completedItems[id] ? "bg-green-50 line-through text-gray-400" : "hover:bg-gray-50"}`}
      onClick={() => toggleComplete(id)}
    >
      <td className="p-2 border border-gray-200 text-center w-8">
        <input type="checkbox" checked={!!completedItems[id]} readOnly className="accent-green-600" />
      </td>
      {children}
    </tr>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 font-sans text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-t-xl">
        <h1 className="text-2xl font-bold">CFA Level I — 63-Day Battle Plan</h1>
        <p className="text-blue-200 mt-1">March 6 → May 8, 2025 · Target: First-try pass</p>
        <div className="flex gap-6 mt-4 text-sm">
          <div className="bg-blue-800 rounded-lg px-4 py-2">
            <div className="text-blue-300">Completed</div>
            <div className="font-bold">QM + FSA</div>
          </div>
          <div className="bg-blue-800 rounded-lg px-4 py-2">
            <div className="text-blue-300">New Material</div>
            <div className="font-bold">~5 weeks</div>
          </div>
          <div className="bg-blue-800 rounded-lg px-4 py-2">
            <div className="text-blue-300">Review + Mocks</div>
            <div className="font-bold">~4 weeks</div>
          </div>
          <div className="bg-blue-800 rounded-lg px-4 py-2">
            <div className="text-blue-300">PSM</div>
            <div className="font-bold">10–15 hrs</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-blue-700 text-blue-700 bg-blue-50"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl p-6">
        {/* ==================== OVERVIEW ==================== */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r">
              <h3 className="font-bold text-amber-800">Core Strategy</h3>
              <p className="text-sm text-amber-700 mt-1">
                You have 63 days. QM + FSA done (~22% of exam weight). Finish remaining 8 topics in ~5 weeks (by ~April 6), 
                then pure review/mocks for 4+ weeks. Ethics studied twice — once now, once in final 2 weeks.
              </p>
            </div>

            <h3 className="font-bold text-lg">CFA L1 2025 Topic Weights & Your Status</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="p-2 border border-blue-800 text-left">Topic</th>
                    <th className="p-2 border border-blue-800 text-center">Weight</th>
                    <th className="p-2 border border-blue-800 text-center">~Questions</th>
                    <th className="p-2 border border-blue-800 text-center">Status</th>
                    <th className="p-2 border border-blue-800 text-center">Study Hours</th>
                    <th className="p-2 border border-blue-800 text-center">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Ethics & Prof. Standards", "15–20%", "27–36", "⬜ Not started", "30–35", "🔴 Critical"],
                    ["Quantitative Methods", "6–9%", "11–16", "✅ Done", "5 (review)", "🟢 Review"],
                    ["Economics", "6–9%", "11–16", "⬜ Not started", "20–25", "🟡 Medium"],
                    ["Financial Statement Analysis", "11–14%", "20–25", "✅ Done", "8 (review)", "🟢 Review"],
                    ["Corporate Issuers", "6–9%", "11–16", "⬜ Not started", "12–15", "🟡 Medium"],
                    ["Equity Investments", "11–14%", "20–25", "⬜ Not started", "20–25", "🔴 Critical"],
                    ["Fixed Income", "11–14%", "20–25", "⬜ Not started", "25–30", "🔴 Critical"],
                    ["Derivatives", "5–8%", "9–14", "⬜ Not started", "15–18", "🟡 Medium"],
                    ["Alternative Investments", "7–10%", "13–18", "⬜ Not started", "10–12", "🟢 Quick Win"],
                    ["Portfolio Management", "8–12%", "14–22", "⬜ Not started", "15–18", "🟡 Medium"],
                  ].map((row, i) => (
                    <tr key={i} className={`${row[3].includes("✅") ? "bg-green-50" : i % 2 === 0 ? "bg-gray-50" : ""}`}>
                      {row.map((cell, j) => (
                        <td key={j} className={`p-2 border border-gray-200 ${j > 0 ? "text-center" : "font-medium"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-blue-50 font-bold">
                    <td className="p-2 border border-gray-200">TOTAL</td>
                    <td className="p-2 border border-gray-200 text-center">100%</td>
                    <td className="p-2 border border-gray-200 text-center">180</td>
                    <td className="p-2 border border-gray-200 text-center">2/10</td>
                    <td className="p-2 border border-gray-200 text-center">~170–200</td>
                    <td className="p-2 border border-gray-200 text-center">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-900">The 80/20 Math</h3>
              <p className="text-sm mt-1">
                <strong>Ethics + FSA + Equity + Fixed Income = ~50–62%</strong> of exam weight. 
                You've done FSA. Nail the other three and you're already in strong position. 
                The remaining 6 topics (QM review, Econ, Corp Issuers, Derivatives, Alts, PM) fill the rest.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-bold text-red-800">⚠️ Don't Forget: PSM</h4>
                <p className="text-sm text-red-700 mt-1">
                  You must complete one Practical Skills Module (Python, Data Science, or Analyst Skills) 
                  to receive your exam result. Budget 10–15 hrs. Do it on weekends during Weeks 1–4.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800">✅ Your Advantage</h4>
                <p className="text-sm text-green-700 mt-1">
                  QM & FSA done (~18–23% weight). QM foundations help Fixed Income & Derivatives. 
                  FSA feeds into Equity. You're further ahead than you think.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== SCHEDULE ==================== */}
        {activeTab === "schedule" && (
          <div className="space-y-4">
            <div className="bg-gray-100 p-3 rounded-lg text-sm">
              <strong>Daily target:</strong> ~3.5–4 hrs weekdays, ~5–6 hrs weekends | <strong>Weekly:</strong> ~25–30 hrs
            </div>

            <h3 className="font-bold text-lg">Phase 1: New Material (Weeks 1–5)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="p-2 border border-blue-800 text-left w-8">✓</th>
                    <th className="p-2 border border-blue-800 text-left">Week</th>
                    <th className="p-2 border border-blue-800 text-left">Dates</th>
                    <th className="p-2 border border-blue-800 text-left">Topics</th>
                    <th className="p-2 border border-blue-800 text-left">Daily Actions</th>
                    <th className="p-2 border border-blue-800 text-center">Hrs</th>
                  </tr>
                </thead>
                <tbody>
                  <CheckRow id="w1">
                    <td className="p-2 border border-gray-200 font-bold">1</td>
                    <td className="p-2 border border-gray-200 whitespace-nowrap">Mar 6–12</td>
                    <td className="p-2 border border-gray-200"><strong>Fixed Income</strong> (Part 1) + PSM start</td>
                    <td className="p-2 border border-gray-200 text-xs">Read IFT notes → do 20–30 Qs/day from CFA ecosystem. Weekend: PSM 3 hrs</td>
                    <td className="p-2 border border-gray-200 text-center">28</td>
                  </CheckRow>
                  <CheckRow id="w2">
                    <td className="p-2 border border-gray-200 font-bold">2</td>
                    <td className="p-2 border border-gray-200 whitespace-nowrap">Mar 13–19</td>
                    <td className="p-2 border border-gray-200"><strong>Fixed Income</strong> (Part 2) + <strong>Equity</strong> (Part 1)</td>
                    <td className="p-2 border border-gray-200 text-xs">Finish FI, start Equity. 25 Qs/day. Weekend: PSM 3 hrs</td>
                    <td className="p-2 border border-gray-200 text-center">28</td>
                  </CheckRow>
                  <CheckRow id="w3">
                    <td className="p-2 border border-gray-200 font-bold">3</td>
                    <td className="p-2 border border-gray-200 whitespace-nowrap">Mar 20–26</td>
                    <td className="p-2 border border-gray-200"><strong>Equity</strong> (Part 2) + <strong>Ethics</strong> (1st pass)</td>
                    <td className="p-2 border border-gray-200 text-xs">Finish Equity. Start Ethics — read standards carefully, do scenario Qs. PSM 3 hrs</td>
                    <td className="p-2 border border-gray-200 text-center">30</td>
                  </CheckRow>
                  <CheckRow id="w4">
                    <td className="p-2 border border-gray-200 font-bold">4</td>
                    <td className="p-2 border border-gray-200 whitespace-nowrap">Mar 27–Apr 2</td>
                    <td className="p-2 border border-gray-200"><strong>Ethics</strong> (finish) + <strong>Economics</strong></td>
                    <td className="p-2 border border-gray-200 text-xs">Ethics done by Wed. Econ rest of week. 30 Qs/day. Finish PSM this weekend.</td>
                    <td className="p-2 border border-gray-200 text-center">28</td>
                  </CheckRow>
                  <CheckRow id="w5">
                    <td className="p-2 border border-gray-200 font-bold">5</td>
                    <td className="p-2 border border-gray-200 whitespace-nowrap">Apr 3–9</td>
                    <td className="p-2 border border-gray-200"><strong>Derivatives</strong> + <strong>Corp Issuers</strong> + <strong>Alt Inv</strong> + <strong>PM</strong></td>
                    <td className="p-2 border border-gray-200 text-xs">Blitz week: 4 lighter topics. Derivatives 2d, Corp 1.5d, Alts 1d, PM 1.5d. 30 Qs/day</td>
                    <td className="p-2 border border-gray-200 text-center">32</td>
                  </CheckRow>
                </tbody>
              </table>
            </div>

            <h3 className="font-bold text-lg mt-6">Phase 2: Review & Mocks (Weeks 6–9)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-green-800 text-white">
                    <th className="p-2 border border-green-700 text-left w-8">✓</th>
                    <th className="p-2 border border-green-700 text-left">Week</th>
                    <th className="p-2 border border-green-700 text-left">Dates</th>
                    <th className="p-2 border border-green-700 text-left">Focus</th>
                    <th className="p-2 border border-green-700 text-left">Actions</th>
                    <th className="p-2 border border-green-700 text-center">Hrs</th>
                  </tr>
                </thead>
                <tbody>
                  <CheckRow id="w6">
                    <td className="p-2 border border-gray-200 font-bold">6</td>
                    <td className="p-2 border border-gray-200 whitespace-nowrap">Apr 10–16</td>
                    <td className="p-2 border border-gray-200"><strong>QM + FSA deep review</strong> + Mock 1</td>
                    <td className="p-2 border border-gray-200 text-xs">Re-read QM & FSA formula sheets. Sat: Mock 1 (timed). Sun: review all wrong answers</td>
                    <td className="p-2 border border-gray-200 text-center">28</td>
                  </CheckRow>
                  <CheckRow id="w7">
                    <td className="p-2 border border-gray-200 font-bold">7</td>
                    <td className="p-2 border border-gray-200 whitespace-nowrap">Apr 17–23</td>
                    <td className="p-2 border border-gray-200"><strong>Weak-topic drills</strong> + Mock 2 + Mock 3</td>
                    <td className="p-2 border border-gray-200 text-xs">Target weakest 3 topics from Mock 1. Midweek: Mock 2 (half). Weekend: Mock 3 (full, timed)</td>
                    <td className="p-2 border border-gray-200 text-center">30</td>
                  </CheckRow>
                  <CheckRow id="w8">
                    <td className="p-2 border border-gray-200 font-bold">8</td>
                    <td className="p-2 border border-gray-200 whitespace-nowrap">Apr 24–30</td>
                    <td className="p-2 border border-gray-200"><strong>Ethics 2nd pass</strong> + Mock 4 + formula drills</td>
                    <td className="p-2 border border-gray-200 text-xs">Re-read all Ethics standards + GIPS. Mock 4 full timed. Daily formula sheet review.</td>
                    <td className="p-2 border border-gray-200 text-center">30</td>
                  </CheckRow>
                  <CheckRow id="w9">
                    <td className="p-2 border border-gray-200 font-bold">9</td>
                    <td className="p-2 border border-gray-200 whitespace-nowrap">May 1–7</td>
                    <td className="p-2 border border-gray-200"><strong>Final polish</strong> + Mock 5</td>
                    <td className="p-2 border border-gray-200 text-xs">Mon–Tue: Mock 5 + review. Wed–Thu: weak spots only. Fri: light Ethics + formulas. Sat: rest. Sun (May 8): EXAM</td>
                    <td className="p-2 border border-gray-200 text-center">20</td>
                  </CheckRow>
                </tbody>
              </table>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mt-4">
              <h4 className="font-bold text-amber-800">Buffer built in</h4>
              <p className="text-sm text-amber-700 mt-1">
                Week 5 is aggressive by design. If you fall behind in Weeks 1–4, you can spill Corp Issuers or Alts into 
                Week 6. The schedule has ~2–3 days of slack total. Don't sacrifice mock exam time — it's the highest-ROI activity.
              </p>
            </div>
          </div>
        )}

        {/* ==================== TOPIC STRATEGY ==================== */}
        {activeTab === "topics" && (
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Study Order Rationale (80/20 optimised)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="p-2 border border-blue-800 text-center">#</th>
                    <th className="p-2 border border-blue-800 text-left">Topic</th>
                    <th className="p-2 border border-blue-800 text-left">Why This Order</th>
                    <th className="p-2 border border-blue-800 text-left">Key Focus Areas (Highest Yield)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["1", "Fixed Income", "11–14% weight. Uses QM concepts (TVM, stats). Study while QM is fresh.", "Bond valuation, yield measures, duration/convexity, yield curve, credit risk, MBS basics"],
                    ["2", "Equity Investments", "11–14% weight. Uses FSA knowledge directly.", "Industry analysis, company analysis, DDM & multiples valuation, market efficiency, equity indexes"],
                    ["3", "Ethics (1st pass)", "15–20% — single biggest weight. Needs TWO passes.", "Standards I–VII scenarios, Code of Ethics, GIPS overview. Focus on application, not memorisation"],
                    ["4", "Economics", "6–9%. Standalone topic, moderate difficulty.", "Currency exchange rates, aggregate demand/supply, business cycle, monetary/fiscal policy, trade"],
                    ["5", "Derivatives", "5–8%. Builds on QM & FI concepts.", "Forward/future pricing, option payoffs, put-call parity, swap basics, hedging applications"],
                    ["6", "Corporate Issuers", "6–9%. Relatively straightforward.", "Capital structure, cost of capital (WACC), corporate governance, ESG, leverage, dividends"],
                    ["7", "Alt Investments", "7–10%. Quick win — lots of conceptual, less calculation.", "PE/VC, real estate valuation, hedge fund strategies, commodities, infrastructure, digital assets"],
                    ["8", "Portfolio Mgmt", "8–12%. Capstone topic — synthesises everything.", "CAPM, portfolio risk/return, diversification, IPS, risk management framework, technical analysis"],
                    ["9", "Ethics (2nd pass)", "Re-read in final 2 weeks for freshness.", "Focus on tricky scenarios you got wrong. Re-do all Ethics practice Qs."],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="p-2 border border-gray-200 text-center font-bold">{row[0]}</td>
                      <td className="p-2 border border-gray-200 font-medium whitespace-nowrap">{row[1]}</td>
                      <td className="p-2 border border-gray-200 text-xs">{row[2]}</td>
                      <td className="p-2 border border-gray-200 text-xs">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-900">Formula Priority Tiers</h4>
              <div className="grid grid-cols-3 gap-3 mt-2 text-sm">
                <div className="bg-red-100 p-3 rounded">
                  <div className="font-bold text-red-800">🔴 Must Memorise</div>
                  <ul className="text-xs mt-1 space-y-1 text-red-700">
                    <li>TVM (PV, FV, annuities)</li>
                    <li>Bond pricing & duration</li>
                    <li>DDM / P/E valuation</li>
                    <li>WACC</li>
                    <li>CAPM</li>
                    <li>Put-call parity</li>
                    <li>DuPont decomposition</li>
                  </ul>
                </div>
                <div className="bg-amber-100 p-3 rounded">
                  <div className="font-bold text-amber-800">🟡 Know Well</div>
                  <ul className="text-xs mt-1 space-y-1 text-amber-700">
                    <li>Portfolio variance (2-asset)</li>
                    <li>Hypothesis testing (z, t)</li>
                    <li>Forward pricing</li>
                    <li>Breakeven inflation</li>
                    <li>Operating/financial leverage</li>
                    <li>Current/quick ratios</li>
                    <li>GDP components</li>
                  </ul>
                </div>
                <div className="bg-green-100 p-3 rounded">
                  <div className="font-bold text-green-800">🟢 Conceptual</div>
                  <ul className="text-xs mt-1 space-y-1 text-green-700">
                    <li>Ethics standards (scenarios)</li>
                    <li>GIPS overview</li>
                    <li>Alt investment characteristics</li>
                    <li>Market structures</li>
                    <li>Corporate governance</li>
                    <li>ESG integration approaches</li>
                    <li>Technical analysis patterns</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 80/20 METHODS ==================== */}
        {activeTab === "methods" && (
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Proven High-ROI Study Techniques</h3>

            <div className="space-y-4">
              {[
                {
                  title: "1. Active Recall + Spaced Repetition (Highest ROI)",
                  color: "red",
                  content: `After reading each learning module, CLOSE the book and write down everything you remember. 
                  Then check what you missed. Use Anki or physical flashcards for formulas & Ethics standards. 
                  Review cards daily — the algorithm spaces them optimally. This alone can boost retention 40–60% vs passive re-reading.`,
                  source: "Based on Ebbinghaus forgetting curve research"
                },
                {
                  title: "2. Question-First Learning (IFT + CFA Ecosystem)",
                  color: "blue",
                  content: `For each LM: (1) Read IFT notes once, (2) Immediately attempt 20–30 practice questions, 
                  (3) For every wrong answer, go back to the notes and understand WHY. Don't re-read entire chapters — 
                  only revisit the specific concept you got wrong. Your error log IS your study guide.`,
                  source: "300Hours: candidates who do 3000+ practice Qs have ~90% pass rate"
                },
                {
                  title: "3. The 'Error Journal' Method",
                  color: "green",
                  content: `Keep a single notebook/doc. For every wrong question, write: (a) the concept tested, 
                  (b) why you got it wrong, (c) the correct logic in your own words. Review this journal every Sunday. 
                  By exam week, this is your ONLY study material. It's a personalised weak-spot guide.`,
                  source: "Common technique among CFA top-scorers on Reddit/AnalystForum"
                },
                {
                  title: "4. Interleaved Practice (Mixed-Topic Sets)",
                  color: "purple",
                  content: `Don't just do 50 Ethics Qs in a row. Mix topics: 10 Ethics + 10 FI + 10 Equity + 10 FSA + 10 Random. 
                  This forces your brain to identify WHICH formula/framework to apply — exactly like the real exam. 
                  Start this from Week 3 onward.`,
                  source: "Cognitive science: interleaving outperforms blocked practice"
                },
                {
                  title: "5. The 'Teach It' Technique",
                  color: "orange",
                  content: `After finishing a topic, explain it out loud in 5 minutes (to yourself, a wall, or record a voice note). 
                  If you can't explain bond duration or put-call parity simply, you don't know it well enough. 
                  This exposes gaps faster than re-reading.`,
                  source: "Feynman technique — adapted for CFA"
                },
                {
                  title: "6. Mock Exam Autopsy (Week 6+ Critical)",
                  color: "teal",
                  content: `After each mock: (1) Score by topic — identify your 3 weakest, (2) For each wrong answer, 
                  categorize: "didn't know concept" vs "calculation error" vs "misread question", 
                  (3) Spend 2x time reviewing as you spent taking the mock. A mock without review is wasted time.`,
                  source: "300Hours data: scoring 65%+ on mocks → 87% pass rate"
                },
              ].map((method, i) => (
                <div key={i} className={`border-l-4 border-${method.color}-500 bg-${method.color}-50 p-4 rounded-r`}>
                  <h4 className="font-bold">{method.title}</h4>
                  <p className="text-sm mt-1 whitespace-pre-line">{method.content}</p>
                  <p className="text-xs text-gray-500 mt-2 italic">{method.source}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-bold">Daily Routine Template</h4>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="p-2 border text-left">Time Block</th>
                      <th className="p-2 border text-left">Activity</th>
                      <th className="p-2 border text-center">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Morning (fresh mind)", "New material: read IFT notes for 1 LM", "60–90 min"],
                      ["Mid-day", "Practice questions on today's LM", "60 min"],
                      ["Afternoon/Evening", "Review Anki cards + error journal", "30 min"],
                      ["Evening", "Mixed-topic question set (from Week 3+)", "45–60 min"],
                      ["Before bed", "Quick formula sheet scan (5 formulas)", "10 min"],
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                        <td className="p-2 border border-gray-200 font-medium">{row[0]}</td>
                        <td className="p-2 border border-gray-200">{row[1]}</td>
                        <td className="p-2 border border-gray-200 text-center">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==================== RESOURCES ==================== */}
        {activeTab === "resources" && (
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Materials Stack (Cost-Optimised)</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="p-2 border border-blue-800 text-left">Resource</th>
                    <th className="p-2 border border-blue-800 text-center">Cost</th>
                    <th className="p-2 border border-blue-800 text-left">Use For</th>
                    <th className="p-2 border border-blue-800 text-center">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["IFT Notes (2025) — your primary notes", "You have", "First-pass reading for all topics. Concise and LOS-aligned.", "🔴 Primary"],
                    ["CFA Learning Ecosystem (practice Qs + 1 free mock)", "Included w/ registration", "End-of-module practice Qs. These are FROM the exam writers.", "🔴 Primary"],
                    ["CFA Curriculum (full text)", "Included w/ registration", "Reference for topics IFT covers thinly. Read Ethics from here directly.", "🔴 Primary"],
                    ["CFA Practice Pack (5 mocks + 1000 Qs)", "~$250 USD", "Best ROI paid purchase. Official mocks closest to real exam.", "🔴 Strongly Rec."],
                    ["300Hours Free Mock (90 Qs)", "Free", "Good baseline test. Take in Week 6.", "🟢 Free"],
                    ["Salt Solutions Free Mock", "Free", "Full mock exam, harder than actual. Good for stress-testing.", "🟢 Free"],
                    ["AnalystPrep Free Mock + Qs", "Free", "1 free mock + topic Qs with explanations.", "🟢 Free"],
                    ["Kaplan Schweser 60-Q Diagnostic", "Free", "Quick diagnostic to find weak areas early.", "🟢 Free"],
                    ["IFT YouTube Channel", "Free", "Video explanations for tough topics (FI, Derivatives).", "🟢 Free"],
                    ["Mark Meldrum YouTube (older but solid)", "Free", "Excellent conceptual explanations for FI, PM, Derivatives.", "🟢 Free"],
                    ["Anki / flashcard app", "Free", "Spaced repetition for formulas + Ethics standards.", "🟡 Recommended"],
                    ["300Hours Study Planner (spreadsheet)", "Free", "Track hours & progress. Used by 120,000+ candidates.", "🟡 Recommended"],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="p-2 border border-gray-200 font-medium">{row[0]}</td>
                      <td className="p-2 border border-gray-200 text-center whitespace-nowrap">{row[1]}</td>
                      <td className="p-2 border border-gray-200 text-xs">{row[2]}</td>
                      <td className="p-2 border border-gray-200 text-center">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-800">💡 Zero-Cost Strategy That Works</h4>
              <p className="text-sm text-green-700 mt-1">
                <strong>IFT notes (you have) + CFA Ecosystem Qs (free with registration) + 3 free mocks (300Hours + Salt + AnalystPrep) + Anki + IFT YouTube</strong> = 
                a complete prep stack at $0 additional cost. The CFA Practice Pack ($250) is the only paid add-on truly worth considering — official mocks are the closest proxy to the real exam.
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h4 className="font-bold text-amber-800">How to Use IFT Notes vs CFA Curriculum</h4>
              <div className="text-sm text-amber-700 mt-2 space-y-2">
                <p><strong>IFT Notes (primary):</strong> Use for first pass of every topic. They're condensed and hit the key LOS efficiently. Perfect for your 5-week timeline.</p>
                <p><strong>CFA Curriculum (reference):</strong> Read the curriculum directly for Ethics (standards need full context). For other topics, consult the curriculum only when IFT explanations are unclear or when you get a practice Q wrong and need deeper understanding.</p>
                <p><strong>Don't read both cover-to-cover.</strong> That's 3000+ pages of curriculum vs ~600 pages of IFT. Your time is better spent on practice questions.</p>
              </div>
            </div>

            <h3 className="font-bold text-lg">Mock Exam Schedule</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="p-2 border text-center">Mock #</th>
                  <th className="p-2 border text-left">When</th>
                  <th className="p-2 border text-left">Source</th>
                  <th className="p-2 border text-left">Conditions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1", "Week 6 (Apr 12)", "300Hours Free Mock", "Timed, 90 Qs, diagnostic purpose"],
                  ["2", "Week 7 (Apr 19)", "Salt Solutions Free Mock", "Full timed. Harder than real — don't panic at score"],
                  ["3", "Week 7 (Apr 22)", "CFA Ecosystem Mock (free)", "Full timed. Closest to real format."],
                  ["4", "Week 8 (Apr 27)", "CFA Practice Pack or AnalystPrep", "Full timed. Target: 65%+"],
                  ["5", "Week 9 (May 3)", "CFA Practice Pack Mock 2", "Final dress rehearsal. Full timed. Target: 70%+"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                    {row.map((cell, j) => (
                      <td key={j} className={`p-2 border border-gray-200 ${j === 0 ? "text-center font-bold" : ""}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ==================== REVIEW PHASE ==================== */}
        {activeTab === "review" && (
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Review Phase Playbook (Weeks 6–9)</h3>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-900">The Review Phase Is Where Exams Are Won</h4>
              <p className="text-sm mt-1">
                According to 300Hours data from 15,000+ candidates, mock exams are the single most effective activity 
                in the final 4–6 weeks. Students scoring 65%+ on practice mocks have an 87% pass rate; 70%+ have a 93% pass rate.
              </p>
            </div>

            <h4 className="font-bold">Weekly Review Structure</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-green-800 text-white">
                    <th className="p-2 border text-left">Day</th>
                    <th className="p-2 border text-left">Activity</th>
                    <th className="p-2 border text-center">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Monday", "Review error journal + Anki cards + weak topic drill (50 Qs)", "3.5"],
                    ["Tuesday", "Formula sheet practice (write from memory) + topic-specific Qs", "3.5"],
                    ["Wednesday", "Mixed topic question set (60 Qs, timed: 90 seconds each)", "3.5"],
                    ["Thursday", "Deep-dive on weakest topic from latest mock", "3.5"],
                    ["Friday", "Ethics scenarios + light formula review", "3"],
                    ["Saturday", "FULL MOCK EXAM (timed, 2 sessions, exam conditions)", "5"],
                    ["Sunday", "Mock autopsy: review every wrong answer, update error journal", "4–5"],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="p-2 border border-gray-200 font-medium">{row[0]}</td>
                      <td className="p-2 border border-gray-200">{row[1]}</td>
                      <td className="p-2 border border-gray-200 text-center">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="font-bold mt-4">Final Week Protocol (May 1–8)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-red-800 text-white">
                    <th className="p-2 border text-left">Day</th>
                    <th className="p-2 border text-left">Activity</th>
                    <th className="p-2 border text-left">Key Rule</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Thu May 1", "Final mock (AM only = 90 Qs)", "Last new questions you'll see"],
                    ["Fri May 2", "Mock review + error journal final pass", "Update formula sheet with any new gaps"],
                    ["Sat May 3", "Weak topics only: targeted 40-Q sets", "No new material. Only reinforce."],
                    ["Sun May 4", "Ethics full re-read (Standards I–VII)", "This is your edge — Ethics is 15–20%"],
                    ["Mon May 5", "Formula sheet write-out from memory (2×)", "Morning + evening. Time yourself."],
                    ["Tue May 6", "Light review: error journal + 20 easy Qs", "Build confidence. No hard new material."],
                    ["Wed May 7", "REST DAY. Light Ethics scan only.", "Sleep well. Prep bag: passport, calculator, water."],
                    ["Thu May 8", "🎯 EXAM DAY", "Arrive 30 min early. Answer every question. No blanks."],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                      <td className="p-2 border border-gray-200 font-medium whitespace-nowrap">{row[0]}</td>
                      <td className="p-2 border border-gray-200">{row[1]}</td>
                      <td className="p-2 border border-gray-200 text-xs italic">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-bold text-red-800">❌ Common Mistakes to Avoid</h4>
                <ul className="text-sm text-red-700 mt-2 space-y-1">
                  <li>• Re-reading entire chapters passively</li>
                  <li>• Doing mocks without reviewing wrong answers</li>
                  <li>• Skipping Ethics 2nd pass (biggest single topic!)</li>
                  <li>• Studying new material in the final week</li>
                  <li>• Not timing practice sessions</li>
                  <li>• Ignoring the PSM requirement</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-800">✅ Exam Day Reminders</h4>
                <ul className="text-sm text-green-700 mt-2 space-y-1">
                  <li>• Bring: valid passport + approved calculator (TI BA II Plus or HP 12C)</li>
                  <li>• No penalty for wrong answers — answer EVERYTHING</li>
                  <li>• ~90 seconds per question. Flag and move on if stuck.</li>
                  <li>• 180 Qs in 2 sessions × 135 min each</li>
                  <li>• Dress in layers, bring water bottle</li>
                  <li>• PSM must be complete before exam day</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <h4 className="font-bold">Score Targets by Week</h4>
              <div className="flex items-center gap-2 mt-2">
                {[
                  { week: "Mock 1", target: "50–55%", color: "bg-red-200" },
                  { week: "Mock 2", target: "55–60%", color: "bg-orange-200" },
                  { week: "Mock 3", target: "60–65%", color: "bg-yellow-200" },
                  { week: "Mock 4", target: "65–70%", color: "bg-green-200" },
                  { week: "Mock 5", target: "70%+", color: "bg-green-300" },
                ].map((m, i) => (
                  <div key={i} className={`${m.color} p-3 rounded-lg text-center flex-1`}>
                    <div className="text-xs font-bold">{m.week}</div>
                    <div className="text-lg font-bold">{m.target}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Don't panic if Mock 1 is below 50%. That's normal before full review. Consistent improvement matters more than absolute score.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-800 text-white p-4 rounded-b-xl text-xs text-center mt-0">
        Sources: CFA Institute (cfainstitute.org), 300Hours.com, Soleadea.org, AnalystPrep | Topic weights: 2025–2026 cycle
      </div>
    </div>
  );
};

export default CFAStudyPlan;
