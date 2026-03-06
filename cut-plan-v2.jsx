import { useState } from "react";

const workoutData = {
  core: [
    {
      day: "MON",
      name: "PUSH A — Heavy",
      type: "core",
      exercises: [
        { name: "Barbell Bench Press", sets: "4×5", rest: "3 min", weight: "85 kg", progression: "+2.5 kg when all reps hit at RPE 8", note: "RPE 8–9" },
        { name: "Overhead Press", sets: "3×6", rest: "2.5 min", weight: "45 kg", progression: "+2.5 kg every 2 weeks if all reps clean", note: "Strict form" },
        { name: "Incline DB Press", sets: "3×8–10", rest: "90s", weight: "28 kg/hand", progression: "+2 kg when hitting 10 reps all sets", note: "Controlled eccentric" },
        { name: "Cable Lateral Raise", sets: "3×12–15", rest: "60s", weight: "7.5 kg", progression: "+1.25 kg when 15 reps easy", note: "Slow, squeeze" },
        { name: "Tricep Dips (weighted)", sets: "3×8–10", rest: "90s", weight: "BW +10 kg", progression: "+2.5 kg when hitting 10 reps", note: "Belt or DB" },
        { name: "Overhead Tricep Extension", sets: "2×12–15", rest: "60s", weight: "15 kg", progression: "+2.5 kg when 15 reps easy", note: "Cable or DB" },
      ],
    },
    {
      day: "WED",
      name: "PULL A — Heavy",
      type: "core",
      exercises: [
        { name: "Barbell Deadlift", sets: "4×5", rest: "3 min", weight: "90 kg", progression: "+5 kg every 1–2 weeks (fastest gainer)", note: "RPE 8–9" },
        { name: "Weighted Pull-ups", sets: "3×6–8", rest: "2.5 min", weight: "BW +5 kg", progression: "+2.5 kg when hitting 8 reps all sets", note: "Add weight progressively" },
        { name: "Barbell Row", sets: "3×6–8", rest: "2 min", weight: "65 kg", progression: "+2.5 kg every 2 weeks", note: "Pendlay or bent-over" },
        { name: "Face Pulls", sets: "3×15–20", rest: "60s", weight: "15 kg", progression: "+2.5 kg when 20 reps easy", note: "External rotation at top" },
        { name: "Barbell Curl", sets: "3×8–10", rest: "60s", weight: "30 kg", progression: "+2.5 kg when 10 reps all sets", note: "Strict, no swinging" },
        { name: "Hammer Curl", sets: "2×10–12", rest: "60s", weight: "14 kg/hand", progression: "+2 kg when 12 reps clean", note: "Brachialis focus" },
      ],
    },
    {
      day: "FRI",
      name: "LEGS A — Heavy",
      type: "core",
      exercises: [
        { name: "Barbell Back Squat", sets: "4×5", rest: "3 min", weight: "70 kg", progression: "+5 kg every 1–2 weeks (room to grow)", note: "RPE 8–9" },
        { name: "Romanian Deadlift", sets: "3×8–10", rest: "2 min", weight: "70 kg", progression: "+5 kg every 2 weeks", note: "Stretch hamstrings" },
        { name: "Leg Press", sets: "3×10–12", rest: "90s", weight: "140 kg", progression: "+10 kg when 12 reps all sets", note: "Full ROM" },
        { name: "Walking Lunges", sets: "3×12/leg", rest: "90s", weight: "12 kg/hand", progression: "+2 kg when all reps stable", note: "DB loaded" },
        { name: "Calf Raises (standing)", sets: "4×12–15", rest: "60s", weight: "60 kg", progression: "+5 kg when 15 reps easy", note: "Pause at bottom" },
        { name: "Hanging Leg Raises", sets: "3×12–15", rest: "60s", weight: "BW", progression: "Add ankle weights when 15 easy", note: "Slow & controlled" },
      ],
    },
  ],
  optional: [
    {
      day: "TUE",
      name: "PUSH B — Volume",
      type: "optional",
      exercises: [
        { name: "DB Bench Press", sets: "3×10–12", rest: "90s", weight: "30 kg/hand", progression: "+2 kg when 12 reps all sets", note: "Mind-muscle" },
        { name: "Machine Shoulder Press", sets: "3×10–12", rest: "90s", weight: "35 kg", progression: "+2.5 kg when 12 reps", note: "Controlled reps" },
        { name: "Cable Fly (low-to-high)", sets: "3×12–15", rest: "60s", weight: "10 kg/side", progression: "+1.25 kg when 15 reps", note: "Upper chest" },
        { name: "Lateral Raise (drop set)", sets: "3×12+8+8", rest: "90s", weight: "10→7→5 kg", progression: "+1 kg top set every 3 wks", note: "Triple drop" },
        { name: "Skull Crushers", sets: "3×10–12", rest: "60s", weight: "25 kg EZ bar", progression: "+2.5 kg when 12 reps", note: "EZ bar" },
        { name: "Push-ups to Failure", sets: "2×AMRAP", rest: "60s", weight: "BW", progression: "Beat last week's total reps", note: "Finisher" },
      ],
    },
    {
      day: "THU",
      name: "PULL B — Volume",
      type: "optional",
      exercises: [
        { name: "Lat Pulldown", sets: "3×10–12", rest: "90s", weight: "55 kg", progression: "+2.5 kg when 12 reps all sets", note: "Wide grip" },
        { name: "Seated Cable Row", sets: "3×10–12", rest: "90s", weight: "50 kg", progression: "+2.5 kg when 12 reps", note: "Squeeze scapulae" },
        { name: "Single-Arm DB Row", sets: "3×10–12", rest: "60s", weight: "24 kg", progression: "+2 kg when 12 reps clean", note: "Full stretch" },
        { name: "Rear Delt Fly (machine)", sets: "3×15–20", rest: "60s", weight: "25 kg", progression: "+2.5 kg when 20 reps", note: "Slow negative" },
        { name: "Incline DB Curl", sets: "3×10–12", rest: "60s", weight: "10 kg/hand", progression: "+1 kg when 12 reps all sets", note: "Stretch at bottom" },
        { name: "Cable Curl (21s)", sets: "2×21", rest: "90s", weight: "15 kg", progression: "+2.5 kg every 3 weeks", note: "7-7-7 method" },
      ],
    },
    {
      day: "SAT",
      name: "LEGS B — Volume + Core",
      type: "optional",
      exercises: [
        { name: "Front Squat", sets: "3×8–10", rest: "2 min", weight: "50 kg", progression: "+5 kg every 2 weeks", note: "Upright torso" },
        { name: "Leg Curl (lying)", sets: "3×10–12", rest: "60s", weight: "35 kg", progression: "+2.5 kg when 12 reps", note: "Squeeze hamstrings" },
        { name: "Bulgarian Split Squat", sets: "3×10/leg", rest: "90s", weight: "14 kg/hand", progression: "+2 kg when 10 reps stable", note: "DB loaded" },
        { name: "Leg Extension", sets: "3×12–15", rest: "60s", weight: "40 kg", progression: "+2.5 kg when 15 reps", note: "Squeeze at top" },
        { name: "Ab Wheel Rollout", sets: "3×10–12", rest: "60s", weight: "BW", progression: "Extend range → standing rollout", note: "Full extension" },
        { name: "Plank (weighted)", sets: "3×45–60s", rest: "60s", weight: "+10 kg plate", progression: "+5 kg or +15s when easy", note: "Plate on back" },
      ],
    },
  ],
};

const cardioData = [
  { day: "TUE", type: "LISS", detail: "30–40 min easy run, Zone 2 (130–145 bpm)", when: "Fasted AM or post-weights" },
  { day: "THU", type: "HIIT", detail: "20 min: 30s sprint / 60s walk × 12–15 rounds", when: "Post-weights or separate session" },
  { day: "SAT", type: "LISS", detail: "35–45 min easy run or incline treadmill walk", when: "Fasted AM or post-weights" },
];

const dietPlan = {
  meals: [
    {
      time: "12:00 PM", name: "Meal 1 — Break Fast", calories: 550,
      items: ["200g chicken breast (grilled/air-fried) — 46g P", "2 whole eggs (scrambled or boiled) — 12g P", "150g broccoli / kai lan / bok choy", "1 tbsp olive oil for cooking", "50g rice (cooked) OR skip for faster results"],
      macros: "~58g P / 22g F / 15g C",
    },
    {
      time: "4:00 PM", name: "Protein Shake (peri-workout)", calories: 200,
      items: ["1.5 scoops whey isolate — 38g P", "5g creatine monohydrate", "Water or unsweetened almond milk"],
      macros: "~38g P / 2g F / 3g C",
    },
    {
      time: "7:30 PM", name: "Meal 2 — Final Meal", calories: 550,
      items: ["250g white fish (dory/barramundi) or 200g chicken thigh — 45g P", "200g mixed vegetables (stir-fried w/ 1 tsp oil)", "100g tofu or 2 egg whites for extra protein", "Condiments: soy sauce, chili, lime (minimal sugar)"],
      macros: "~52g P / 20g F / 18g C",
    },
    {
      time: "8:30 PM", name: "Pre-Bed (optional, within IF window)", calories: 150,
      items: ["200g Greek yogurt (0% fat) — 20g P", "OR casein shake with water — 24g P"],
      macros: "~22g P / 2g F / 8g C",
    },
  ],
};

const weeklySchedule = [
  { day: "MON", gym: "PUSH A ★", cardio: "—", fasting: "16:8", sleep: "10:30 PM → 6:00 AM" },
  { day: "TUE", gym: "PUSH B", cardio: "LISS Run 35min", fasting: "16:8", sleep: "10:30 PM → 6:00 AM" },
  { day: "WED", gym: "PULL A ★", cardio: "—", fasting: "16:8", sleep: "10:30 PM → 6:00 AM" },
  { day: "THU", gym: "PULL B", cardio: "HIIT Run 20min", fasting: "16:8", sleep: "10:30 PM → 6:00 AM" },
  { day: "FRI", gym: "LEGS A ★", cardio: "—", fasting: "16:8", sleep: "10:30 PM → 6:00 AM" },
  { day: "SAT", gym: "LEGS B", cardio: "LISS Run 40min", fasting: "16:8", sleep: "10:30 PM → 6:00 AM" },
  { day: "SUN", gym: "REST", cardio: "Walk 12k+ steps", fasting: "18:6 or OMAD", sleep: "10:00 PM → 6:30 AM" },
];

const timeline = [
  { week: "Week 1", weight: "72.9 → ~71.5 kg", bf: "~19.5%", notes: "Water drop from low carb + creatine load complete. Calibrate all weights. Baseline eVolt scan.", scan: true },
  { week: "Week 2", weight: "~71.5 → ~70.5 kg", bf: "~18.5%", notes: "True fat loss kicks in. Energy may dip — caffeine + electrolytes. Strength may drop 5–10%.", scan: false },
  { week: "Week 3", weight: "~70.5 → ~69.5 kg", bf: "~17.2%", notes: "Upper abs start showing. eVolt scan #2 — compare SMM and BF%. Oblique lines appear.", scan: true },
  { week: "Week 4", weight: "~69.5 → ~68.7 kg", bf: "~16.0%", notes: "Clear 4-pack visible. Consider 1 refeed day (maintenance kcal, high carb).", scan: false },
  { week: "Week 5–6", weight: "~68.7 → ~67.5 kg", bf: "~14.5–15%", notes: "Full 6-pack in good lighting. Final eVolt scan. Ready to reverse diet into lean bulk.", scan: true },
];

const supplements = [
  { name: "Creatine Monohydrate", dose: "5g/day (maintenance)", timing: "With protein shake", priority: "Essential" },
  { name: "Whey Isolate", dose: "1.5 scoops (~38g P)", timing: "Peri-workout", priority: "Essential" },
  { name: "Caffeine", dose: "200mg (black coffee)", timing: "Fasted AM / pre-workout", priority: "High" },
  { name: "Electrolytes", dose: "Na/K/Mg supplement", timing: "Morning + intra-workout", priority: "High" },
  { name: "Fish Oil (Omega-3)", dose: "2–3g EPA+DHA", timing: "With meal", priority: "Medium" },
  { name: "Vitamin D3", dose: "2000–4000 IU", timing: "With meal (fat)", priority: "Medium" },
  { name: "Magnesium Glycinate", dose: "200–400mg", timing: "Before bed", priority: "Medium" },
];

const lifestyleHacks = [
  { category: "NEAT Boost", tip: "Stand desk 50% of work time. Set 30-min alarm to walk 2 min. Target 12k steps on rest days.", impact: "+200–400 kcal/day" },
  { category: "Cold Exposure", tip: "End showers with 2 min cold water. Activates brown adipose tissue (BAT).", impact: "Metabolic + recovery" },
  { category: "Sleep Hygiene", tip: "No screens 30 min before bed. Room at 18–20°C. Magnesium before bed. Blackout curtains.", impact: "Lower cortisol" },
  { category: "Fasting Extension", tip: "On rest days (Sunday), extend fast to 18:6 or try OMAD for extra deficit.", impact: "+200–300 kcal deficit" },
  { category: "Caffeine Timing", tip: "Black coffee at 7 AM to suppress appetite through fast. Cut caffeine by 2 PM.", impact: "Appetite control" },
  { category: "Stress Management", tip: "5 min box breathing before bed (4-4-4-4). High cortisol = belly fat retention.", impact: "Better fat loss" },
  { category: "Meal Prep Sunday", tip: "Batch cook 2kg chicken breast + 1kg fish + chop vegetables for the week.", impact: "100% adherence" },
  { category: "Accountability", tip: "Weigh daily AM (after toilet, before food). Track weekly average, not daily.", impact: "Data-driven" },
];

const metricsData = [
  { metric: "Body Weight (scale)", freq: "Daily → weekly avg", method: "Weigh AM fasted, after bathroom. Record in app. Compare WEEKLY averages only.", target: "↓ 0.8–1.1 kg/week avg", priority: "track" },
  { metric: "eVolt Body Scan", freq: "Every 2 weeks", method: "Same time of day, same hydration level (AM fasted). Book consistent slot.", target: "BF% ↓, SMM ± 0.5 kg", priority: "track" },
  { metric: "Progress Photos", freq: "Weekly (Sunday AM)", method: "Front / side / back. Same lighting, same location, fasted. No pump.", target: "Visual change every 2 wks", priority: "track" },
  { metric: "Big 3 Strength", freq: "Every session", method: "Log weight × reps for Bench / Squat / Deadlift. Flag if >10% drop.", target: "Maintain ± 5%", priority: "alert" },
  { metric: "Waist Circumference", freq: "Weekly (Sunday AM)", method: "Measure at navel, relaxed, fasted. Same tape tension.", target: "↓ 1–2 cm/week initially", priority: "track" },
  { metric: "Daily Steps", freq: "Daily", method: "Phone or watch. Check by 6 PM — walk more if under target.", target: "≥ 10,000 (12k rest days)", priority: "track" },
  { metric: "Sleep Duration", freq: "Daily", method: "Track with phone/watch. Log bed time and wake time.", target: "≥ 7.0 hrs (7.5 ideal)", priority: "alert" },
  { metric: "Protein Intake", freq: "Daily", method: "Track in MFP or tally: each source ≈ 40–50g × count.", target: "≥ 160g / day", priority: "alert" },
  { metric: "Energy / Mood (1–10)", freq: "Daily", method: "Quick self-rating AM. If < 5 for 3+ days, add refeed or rest.", target: "Avg ≥ 6", priority: "alert" },
  { metric: "Calorie Intake", freq: "Daily (wk 1–2), spot-check after", method: "Track everything wk 1–2 to calibrate. Then estimate unless stalling.", target: "1,400–1,500 kcal", priority: "track" },
];

const progressionRules = [
  { rule: "ON A CUT: Strength maintenance IS progression", detail: "Lifting the same weight for same reps while losing body fat = getting relatively stronger. Don't chase PRs." },
  { rule: "The +2.5 kg Rule (compounds)", detail: "Only add weight when you hit ALL prescribed reps at RPE 8 or below. If the last set is RPE 9.5+, stay at same weight." },
  { rule: "The +1 kg Rule (isolation)", detail: "Smaller muscles progress slower. Use micro-plates (0.5–1.25 kg) or bump reps first, then weight." },
  { rule: "Deload Trigger", detail: "If you miss reps on a compound for 2 consecutive sessions → deload 10% for 1 week, then rebuild." },
  { rule: "Squat & Deadlift Exception", detail: "Your squat (<80 kg) and deadlift (<100 kg) are below potential for your frame. You may see +5 kg jumps even on a cut. Ride this wave." },
  { rule: "Volume Adjustment", detail: "If recovery tanks (sleep <6.5h, mood <5), drop optional days to 2 sets/exercise or skip them. Never cut core days." },
];

const checklistData = {
  daily: [
    { id: "d1", text: "Weigh yourself AM (fasted, post-bathroom)", category: "Tracking" },
    { id: "d2", text: "Rate energy/mood (1–10)", category: "Tracking" },
    { id: "d3", text: "Log all lifts (weight × reps × sets)", category: "Tracking" },
    { id: "d4", text: "Hit ≥ 160g protein", category: "Diet" },
    { id: "d5", text: "Stay within 1,400–1,500 kcal", category: "Diet" },
    { id: "d6", text: "No eating outside IF window (12–8 PM)", category: "Diet" },
    { id: "d7", text: "Zero liquid calories (black coffee/tea/water only)", category: "Diet" },
    { id: "d8", text: "Drink 3–4 litres water", category: "Diet" },
    { id: "d9", text: "Take creatine (5g)", category: "Supplements" },
    { id: "d10", text: "Take fish oil + Vitamin D with meal", category: "Supplements" },
    { id: "d11", text: "Magnesium glycinate before bed", category: "Supplements" },
    { id: "d12", text: "Hit ≥ 10,000 steps", category: "Activity" },
    { id: "d13", text: "Complete scheduled workout (gym or cardio)", category: "Activity" },
    { id: "d14", text: "In bed by 10:30 PM", category: "Sleep" },
    { id: "d15", text: "≥ 7 hours sleep", category: "Sleep" },
    { id: "d16", text: "No screens 30 min before bed", category: "Sleep" },
  ],
  weekly: [
    { id: "w1", text: "Calculate weekly weight average from daily logs", category: "Tracking" },
    { id: "w2", text: "Take progress photos (Sun AM — front / side / back, same lighting)", category: "Tracking" },
    { id: "w3", text: "Measure waist circumference (Sun AM, at navel, relaxed)", category: "Tracking" },
    { id: "w4", text: "Review Big 3 strength trend — flag if >10% drop from baseline", category: "Training" },
    { id: "w5", text: "Compare weekly avg weight to last week (target: ↓ 0.8–1.1 kg)", category: "Tracking" },
    { id: "w6", text: "Complete all 3 core gym sessions (Mon / Wed / Fri)", category: "Training" },
    { id: "w7", text: "Complete ≥ 2 cardio sessions", category: "Activity" },
    { id: "w8", text: "Meal prep: batch cook protein + chop vegs", category: "Diet" },
    { id: "w9", text: "Review sleep average — adjust if < 7 hrs", category: "Sleep" },
    { id: "w10", text: "Check avg energy/mood — refeed if < 5 for 3+ days", category: "Recovery" },
  ],
  biweekly: [
    { id: "b1", text: "eVolt body scan (AM fasted, same time, same hydration, same clothes)", category: "Tracking" },
    { id: "b2", text: "Compare BF%, SMM, visceral fat area vs last scan", category: "Tracking" },
    { id: "b3", text: "Review & update all working weights in training log", category: "Training" },
    { id: "b4", text: "If weight stalled 2+ weeks → cut 100 kcal from fat OR add 1 HIIT", category: "Adjustment" },
    { id: "b5", text: "If strength dropped >15% → add 1 refeed day, reassess sleep", category: "Adjustment" },
    { id: "b6", text: "If SMM dropped >0.5 kg → increase kcal to 1,600, protein to 180g", category: "Adjustment" },
    { id: "b7", text: "Schedule refeed day (maintenance kcal, high carb) if not done yet", category: "Recovery" },
  ],
};

const catColors = {
  Tracking: "#00b4d8", Diet: "#00ff87", Supplements: "#c77dff",
  Activity: "#f9c74f", Sleep: "#a78bfa", Training: "#ff6b6b",
  Recovery: "#f9c74f", Adjustment: "#ff6b6b",
};

function Tab({ label, active, onClick, accent }) {
  return (
    <button onClick={onClick} style={{
      padding: "10px 14px", border: "none",
      borderBottom: active ? `3px solid ${accent}` : "3px solid transparent",
      background: "transparent", color: active ? "#e8e8e8" : "#777",
      fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
      fontWeight: active ? 700 : 400, cursor: "pointer",
      letterSpacing: "0.5px", transition: "all 0.2s", textTransform: "uppercase",
    }}>{label}</button>
  );
}

function SectionTitle({ children, accent = "#00ff87" }) {
  return (
    <h2 style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", fontWeight: 700,
      color: accent, letterSpacing: "2px", textTransform: "uppercase",
      marginBottom: "16px", marginTop: "8px",
    }}>{children}</h2>
  );
}

function WorkoutCard({ workout, accent }) {
  return (
    <div style={{ background: "#1a1a2e", border: `1px solid ${workout.type === "core" ? accent : "#333"}`, borderRadius: "8px", padding: "16px", marginBottom: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "15px", fontWeight: 700, color: "#e8e8e8" }}>{workout.name}</span>
          {workout.type === "core" && (
            <span style={{ marginLeft: "10px", background: accent, color: "#0a0a1a", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>CORE</span>
          )}
        </div>
        <span style={{ color: "#666", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>{workout.day}</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #333" }}>
              {["Exercise", "Sets×Reps", "Start Wt", "Rest", "Progression Rule"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "6px 8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#666", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workout.exercises.map((ex, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #1f1f3a" }}>
                <td style={{ padding: "8px", color: "#d0d0d0", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 500, minWidth: "160px" }}>{ex.name}</td>
                <td style={{ padding: "8px", color: accent, fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 700, whiteSpace: "nowrap" }}>{ex.sets}</td>
                <td style={{ padding: "8px", color: "#f9c74f", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 700, whiteSpace: "nowrap" }}>{ex.weight}</td>
                <td style={{ padding: "8px", color: "#888", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", whiteSpace: "nowrap" }}>{ex.rest}</td>
                <td style={{ padding: "8px", color: "#aaa", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", minWidth: "200px" }}>{ex.progression}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChecklistSection({ title, items, accent, checked, onToggle }) {
  const grouped = {};
  items.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });
  const completedCount = items.filter(item => checked[item.id]).length;
  const pct = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
        <SectionTitle accent={accent}>{title}</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#888", fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>{completedCount}/{items.length}</span>
          <div style={{ width: "100px", height: "6px", background: "#1f1f3a", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: accent, borderRadius: "3px", transition: "width 0.3s" }} />
          </div>
          <span style={{ color: accent, fontSize: "11px", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{pct}%</span>
        </div>
      </div>
      {Object.entries(grouped).map(([cat, catItems]) => (
        <div key={cat} style={{ marginBottom: "8px" }}>
          <div style={{ fontSize: "10px", color: catColors[cat] || "#888", fontWeight: 700, letterSpacing: "1px", marginBottom: "4px", fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>{cat}</div>
          {catItems.map(item => (
            <div key={item.id} onClick={() => onToggle(item.id)} style={{
              display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px",
              background: checked[item.id] ? "#0a2a1a" : "#1a1a2e",
              border: `1px solid ${checked[item.id] ? "#00ff8744" : "#2a2a4a"}`,
              borderRadius: "6px", marginBottom: "4px", cursor: "pointer", transition: "all 0.2s",
            }}>
              <div style={{
                width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                border: checked[item.id] ? "2px solid #00ff87" : "2px solid #444",
                background: checked[item.id] ? "#00ff8722" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {checked[item.id] && <span style={{ color: "#00ff87", fontSize: "12px", fontWeight: 800 }}>✓</span>}
              </div>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "12px",
                color: checked[item.id] ? "#666" : "#d0d0d0",
                textDecoration: checked[item.id] ? "line-through" : "none", transition: "all 0.2s",
              }}>{item.text}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function CutPlan() {
  const [activeTab, setActiveTab] = useState("overview");
  const [checked, setChecked] = useState({});
  const accent = "#00ff87";
  const accent2 = "#00b4d8";
  const accent3 = "#ff6b6b";

  const toggleCheck = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const resetChecklist = () => setChecked({});

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "workout", label: "Workouts" },
    { id: "diet", label: "Diet" },
    { id: "cardio", label: "Cardio" },
    { id: "metrics", label: "Metrics" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "timeline", label: "Timeline" },
    { id: "checklist", label: "Checklist" },
  ];

  return (
    <div style={{ background: "#0a0a1a", minHeight: "100vh", color: "#e8e8e8", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0a0a1a 100%)", padding: "32px 24px 16px", borderBottom: `1px solid ${accent}33` }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "4px" }}>
            <span style={{ fontSize: "28px", fontWeight: 800, color: accent, letterSpacing: "-1px" }}>SHRED</span>
            <span style={{ fontSize: "28px", fontWeight: 300, color: "#e8e8e8", letterSpacing: "-1px" }}>PROTOCOL</span>
            <span style={{ fontSize: "12px", color: "#555", fontWeight: 400, marginLeft: "4px" }}>v2</span>
          </div>
          <p style={{ color: "#666", fontSize: "12px", letterSpacing: "2px", margin: 0 }}>
            20.6% → 15% BF &nbsp;|&nbsp; 72.9 → 68 KG &nbsp;|&nbsp; 5–6 WEEK AGGRESSIVE CUT
          </p>
          <div style={{ display: "flex", gap: "2px", marginTop: "20px", overflowX: "auto", flexWrap: "wrap" }}>
            {tabs.map((t) => <Tab key={t.id} label={t.label} active={activeTab === t.id} onClick={() => setActiveTab(t.id)} accent={accent} />)}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "24px" }}>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            <SectionTitle accent={accent}>Weekly Schedule</SectionTitle>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
                <thead><tr>
                  {["Day", "Gym", "Cardio", "IF", "Sleep"].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 8px", fontSize: "10px", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", borderBottom: `2px solid ${accent}44` }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {weeklySchedule.map((row, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #1f1f3a", background: row.day === "SUN" ? "#1a1a2e" : "transparent" }}>
                      <td style={{ padding: "10px 8px", fontWeight: 700, color: "#e8e8e8", fontSize: "12px" }}>{row.day}</td>
                      <td style={{ padding: "10px 8px", color: row.gym.includes("★") ? accent : "#aaa", fontSize: "12px", fontWeight: row.gym.includes("★") ? 700 : 400 }}>{row.gym}</td>
                      <td style={{ padding: "10px 8px", color: row.cardio === "—" ? "#444" : accent2, fontSize: "12px" }}>{row.cardio}</td>
                      <td style={{ padding: "10px 8px", color: "#888", fontSize: "12px" }}>{row.fasting}</td>
                      <td style={{ padding: "10px 8px", color: "#888", fontSize: "12px" }}>{row.sleep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ color: "#666", fontSize: "11px", marginBottom: "24px" }}>★ = Core days (never skip)</div>

            <SectionTitle accent={accent2}>Key Daily Targets</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px", marginBottom: "24px" }}>
              {[
                { label: "Calories", value: "1,450", unit: "kcal", color: accent3 },
                { label: "Protein", value: "170", unit: "g", color: accent },
                { label: "Deficit", value: "~1,050", unit: "kcal/day", color: accent2 },
                { label: "Steps", value: "10–12k", unit: "daily", color: "#f9c74f" },
                { label: "Sleep", value: "7.5", unit: "hours", color: "#c77dff" },
                { label: "Water", value: "3–4", unit: "litres", color: accent2 },
              ].map((item, i) => (
                <div key={i} style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: "8px", padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: item.color }}>{item.value}</div>
                  <div style={{ fontSize: "10px", color: "#666", letterSpacing: "1px", marginTop: "4px" }}>{item.unit}</div>
                  <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{item.label}</div>
                </div>
              ))}
            </div>

            <SectionTitle accent={accent}>Supplement Stack</SectionTitle>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>
                {["Supplement", "Dose", "Timing", "Priority"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px", fontSize: "10px", color: accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", borderBottom: `1px solid ${accent}33` }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {supplements.map((s, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1a1a2e" }}>
                    <td style={{ padding: "8px", color: "#d0d0d0", fontSize: "12px", fontWeight: 500 }}>{s.name}</td>
                    <td style={{ padding: "8px", color: "#aaa", fontSize: "12px" }}>{s.dose}</td>
                    <td style={{ padding: "8px", color: "#888", fontSize: "11px" }}>{s.timing}</td>
                    <td style={{ padding: "8px" }}>
                      <span style={{ background: s.priority === "Essential" ? accent + "22" : s.priority === "High" ? accent2 + "22" : "#ffffff11", color: s.priority === "Essential" ? accent : s.priority === "High" ? accent2 : "#888", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: 600 }}>{s.priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* WORKOUT */}
        {activeTab === "workout" && (
          <div>
            <SectionTitle accent="#f9c74f">Weight Progression Rules (On a Cut)</SectionTitle>
            <div style={{ marginBottom: "24px" }}>
              {progressionRules.map((r, i) => (
                <div key={i} style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: "8px", padding: "14px 16px", marginBottom: "6px" }}>
                  <div style={{ color: "#f9c74f", fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{r.rule}</div>
                  <div style={{ color: "#aaa", fontSize: "12px", lineHeight: "1.6" }}>{r.detail}</div>
                </div>
              ))}
            </div>

            <SectionTitle accent={accent3}>Core Days — Never Skip</SectionTitle>
            <p style={{ color: "#666", fontSize: "11px", marginBottom: "16px" }}>
              <span style={{ color: "#f9c74f" }}>■</span> Yellow = starting weight (calibrate week 1, adjust ±5 kg) &nbsp;&nbsp;
              <span style={{ color: accent }}>■</span> Green = sets × reps target
            </p>
            {workoutData.core.map((w, i) => <WorkoutCard key={i} workout={w} accent={accent} />)}

            <div style={{ marginTop: "24px" }} />
            <SectionTitle accent={accent2}>Optional Days — High Volume</SectionTitle>
            {workoutData.optional.map((w, i) => <WorkoutCard key={i} workout={w} accent={accent2} />)}

            <div style={{ background: "#1a1a2e", border: `1px solid ${accent}44`, borderRadius: "8px", padding: "16px", marginTop: "20px" }}>
              <div style={{ color: accent, fontSize: "12px", fontWeight: 700, marginBottom: "8px", letterSpacing: "1px" }}>⚡ TRAINING RULES ON A CUT</div>
              <ul style={{ color: "#aaa", fontSize: "12px", lineHeight: "2", margin: 0, paddingLeft: "16px" }}>
                <li>Prioritize strength on compounds — if you lose strength, you're losing muscle</li>
                <li>Week 1 = calibration week. Find your true working weights. Adjust all numbers above.</li>
                <li>Drop volume before intensity: cut 1 set per exercise, never drop weight</li>
                <li>Train within 2 hours of your first meal for best performance</li>
                <li>Minimum viable: Mon/Wed/Fri core days are non-negotiable</li>
              </ul>
            </div>
          </div>
        )}

        {/* DIET */}
        {activeTab === "diet" && (
          <div>
            <SectionTitle accent={accent}>Daily Meal Plan — 1,450 kcal</SectionTitle>
            <p style={{ color: "#888", fontSize: "12px", marginBottom: "20px", lineHeight: "1.6" }}>IF 16:8 window: 12 PM – 8 PM. High protein, low carb, moderate fat.</p>

            <div style={{ display: "flex", height: "28px", borderRadius: "6px", overflow: "hidden", marginBottom: "8px", border: "1px solid #333" }}>
              <div style={{ width: "47%", background: accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#0a0a1a" }}>PROTEIN 170g (47%)</span>
              </div>
              <div style={{ width: "37%", background: "#f9c74f", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#0a0a1a" }}>FAT 60g (37%)</span>
              </div>
              <div style={{ width: "16%", background: accent2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#0a0a1a" }}>CARB 55g</span>
              </div>
            </div>
            <div style={{ color: "#555", fontSize: "10px", marginBottom: "24px", textAlign: "right" }}>Optimized for muscle preservation on aggressive deficit</div>

            {dietPlan.meals.map((meal, i) => (
              <div key={i} style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: "8px", padding: "16px", marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div>
                    <span style={{ color: accent2, fontSize: "11px", fontWeight: 600 }}>{meal.time}</span>
                    <span style={{ color: "#e8e8e8", fontSize: "13px", fontWeight: 700, marginLeft: "12px" }}>{meal.name}</span>
                  </div>
                  <span style={{ color: accent3, fontSize: "12px", fontWeight: 600 }}>~{meal.calories} kcal</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: "16px", listStyle: "none" }}>
                  {meal.items.map((item, j) => (
                    <li key={j} style={{ color: "#bbb", fontSize: "12px", lineHeight: "1.8", position: "relative", paddingLeft: "12px" }}>
                      <span style={{ position: "absolute", left: 0, color: "#444" }}>›</span>{item}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: "8px", color: "#666", fontSize: "11px", fontStyle: "italic" }}>{meal.macros}</div>
              </div>
            ))}

            <div style={{ background: "#1a1a2e", border: `1px solid ${accent3}44`, borderRadius: "8px", padding: "16px", marginTop: "16px" }}>
              <div style={{ color: accent3, fontSize: "12px", fontWeight: 700, marginBottom: "8px", letterSpacing: "1px" }}>🔥 DIET RULES</div>
              <ul style={{ color: "#aaa", fontSize: "12px", lineHeight: "2", margin: 0, paddingLeft: "16px" }}>
                <li><strong style={{ color: "#e8e8e8" }}>Protein first</strong> — hit 170g no matter what</li>
                <li><strong style={{ color: "#e8e8e8" }}>SG hawker hacks</strong> — chicken rice (skip rice), yong tau foo (tofu + veg + fish)</li>
                <li><strong style={{ color: "#e8e8e8" }}>Zero liquid calories</strong> — water, black coffee, green tea only</li>
                <li><strong style={{ color: "#e8e8e8" }}>Weigh food week 1</strong> — calibrate your eye, estimate after</li>
                <li><strong style={{ color: "#e8e8e8" }}>Refeed</strong> — every 10–14 days, maintenance kcal, high carbs</li>
              </ul>
            </div>
          </div>
        )}

        {/* CARDIO */}
        {activeTab === "cardio" && (
          <div>
            <SectionTitle accent={accent2}>Cardio Protocol</SectionTitle>
            <p style={{ color: "#888", fontSize: "12px", marginBottom: "20px" }}>Cardio = deficit tool. LISS preserves muscle. HIIT once/week max on a hard cut.</p>

            {cardioData.map((c, i) => (
              <div key={i} style={{ background: "#1a1a2e", border: `1px solid ${c.type === "HIIT" ? accent3 : accent2}44`, borderRadius: "8px", padding: "16px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "8px", background: c.type === "HIIT" ? accent3 + "22" : accent2 + "22", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 800, color: c.type === "HIIT" ? accent3 : accent2 }}>{c.day}</div>
                  <div style={{ fontSize: "9px", color: c.type === "HIIT" ? accent3 : accent2, fontWeight: 600 }}>{c.type}</div>
                </div>
                <div>
                  <div style={{ color: "#e8e8e8", fontSize: "13px", fontWeight: 600 }}>{c.detail}</div>
                  <div style={{ color: "#666", fontSize: "11px", marginTop: "4px" }}>{c.when}</div>
                </div>
              </div>
            ))}

            <div style={{ background: "#1a1a2e", border: `1px solid ${accent2}44`, borderRadius: "8px", padding: "16px", marginTop: "20px" }}>
              <div style={{ color: accent2, fontSize: "12px", fontWeight: 700, marginBottom: "10px", letterSpacing: "1px" }}>HEART RATE ZONES</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {[
                  { zone: "Zone 2 (LISS)", range: "130–145 bpm", desc: "Conversational. Fat-burning.", color: accent2 },
                  { zone: "Sprint (HIIT)", range: "170–185 bpm", desc: "All-out. 30s max.", color: accent3 },
                  { zone: "Recovery", range: "100–120 bpm", desc: "Between intervals.", color: "#888" },
                ].map((z, i) => (
                  <div key={i} style={{ flex: "1 1 180px", background: "#0a0a1a", border: `1px solid ${z.color}33`, borderRadius: "6px", padding: "12px" }}>
                    <div style={{ color: z.color, fontSize: "12px", fontWeight: 700 }}>{z.zone}</div>
                    <div style={{ color: "#e8e8e8", fontSize: "16px", fontWeight: 800, margin: "4px 0" }}>{z.range}</div>
                    <div style={{ color: "#666", fontSize: "10px" }}>{z.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "16px", marginTop: "16px", border: "1px solid #2a2a4a" }}>
              <div style={{ color: "#e8e8e8", fontSize: "12px", fontWeight: 700, marginBottom: "8px" }}>EXTRA BURN IDEAS (Singapore)</div>
              <ul style={{ color: "#aaa", fontSize: "12px", lineHeight: "2", margin: 0, paddingLeft: "16px" }}>
                <li>Swimming at public pool — 400–600 kcal/hr, low impact</li>
                <li>MacRitchie / Southern Ridges — long LISS in nature</li>
                <li>Basketball / badminton pickup — social HIIT</li>
                <li>PCN cycling — easy on joints, great LISS</li>
              </ul>
            </div>
          </div>
        )}

        {/* METRICS */}
        {activeTab === "metrics" && (
          <div>
            <SectionTitle accent={accent2}>Metrics & Tracking Protocol</SectionTitle>
            <p style={{ color: "#888", fontSize: "12px", marginBottom: "20px" }}>What gets measured gets managed. "Track" = monitor trend. "Alert" = act immediately if out of range.</p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px", minWidth: "750px" }}>
                <thead><tr>
                  {["Metric", "Frequency", "How to Measure", "Target", ""].map(h => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 8px", fontSize: "10px", color: accent2, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", borderBottom: `2px solid ${accent2}44` }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {metricsData.map((m, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #1f1f3a" }}>
                      <td style={{ padding: "10px 8px", color: "#e8e8e8", fontSize: "12px", fontWeight: 600, minWidth: "130px" }}>{m.metric}</td>
                      <td style={{ padding: "10px 8px", color: "#f9c74f", fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap" }}>{m.freq}</td>
                      <td style={{ padding: "10px 8px", color: "#aaa", fontSize: "11px", lineHeight: "1.5" }}>{m.method}</td>
                      <td style={{ padding: "10px 8px", color: accent, fontSize: "11px", fontWeight: 600, whiteSpace: "nowrap" }}>{m.target}</td>
                      <td style={{ padding: "10px 8px" }}>
                        <span style={{ background: m.priority === "alert" ? accent3 + "22" : accent2 + "22", color: m.priority === "alert" ? accent3 : accent2, padding: "2px 8px", borderRadius: "4px", fontSize: "9px", fontWeight: 700, textTransform: "uppercase" }}>{m.priority === "alert" ? "⚠ Alert" : "📊 Track"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SectionTitle accent="#c77dff">eVolt Body Scan Protocol</SectionTitle>
            <div style={{ background: "#1a1a2e", border: "1px solid #c77dff44", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <div style={{ color: "#c77dff", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", marginBottom: "4px" }}>FREQUENCY</div>
                  <div style={{ color: "#e8e8e8", fontSize: "20px", fontWeight: 800 }}>Every 2 weeks</div>
                  <div style={{ color: "#888", fontSize: "11px" }}>4 total scans across the cut</div>
                </div>
                <div>
                  <div style={{ color: "#c77dff", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", marginBottom: "4px" }}>SCAN SCHEDULE</div>
                  <div style={{ color: "#e8e8e8", fontSize: "13px", fontWeight: 600, lineHeight: "1.8" }}>
                    Wk 1 (Baseline) → Wk 3 → Wk 5 → Wk 6 (Final)
                  </div>
                </div>
              </div>

              <div style={{ color: "#c77dff", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", marginBottom: "8px", marginTop: "12px" }}>KEY eVOLT METRICS TO COMPARE</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
                {[
                  { metric: "Total Body Fat %", baseline: "20.6%", target: "↓ to 15%", color: accent3 },
                  { metric: "Skeletal Muscle Mass", baseline: "32.2 kg", target: "Maintain ± 0.5 kg", color: accent },
                  { metric: "Visceral Fat Area", baseline: "69 cm²", target: "↓ to < 50 cm²", color: "#f9c74f" },
                  { metric: "Visceral Fat Level", baseline: "8", target: "↓ to 5–6", color: "#f9c74f" },
                  { metric: "Total Body Water", baseline: "41.7 kg", target: "Maintain (hydration)", color: accent2 },
                  { metric: "Protein Mass", baseline: "12.0 kg", target: "Maintain (muscle indicator)", color: accent },
                ].map((m, i) => (
                  <div key={i} style={{ background: "#0a0a1a", border: "1px solid #2a2a4a", borderRadius: "6px", padding: "10px" }}>
                    <div style={{ color: "#aaa", fontSize: "10px", marginBottom: "4px" }}>{m.metric}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ color: "#666", fontSize: "12px" }}>{m.baseline}</span>
                      <span style={{ color: m.color, fontSize: "11px", fontWeight: 700 }}>{m.target}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "16px", padding: "12px", background: "#0a0a1a", borderRadius: "6px", border: "1px solid #c77dff22" }}>
                <div style={{ color: "#c77dff", fontSize: "11px", fontWeight: 700, marginBottom: "6px" }}>SCAN CONSISTENCY RULES</div>
                <ul style={{ color: "#aaa", fontSize: "11px", lineHeight: "1.8", margin: 0, paddingLeft: "16px" }}>
                  <li>Always scan <strong style={{ color: "#e8e8e8" }}>same time of day</strong> — AM fasted is best</li>
                  <li>Drink <strong style={{ color: "#e8e8e8" }}>500ml water 30 min before</strong> — same hydration each time</li>
                  <li>No training <strong style={{ color: "#e8e8e8" }}>12 hours before scan</strong> — exercise shifts fluid</li>
                  <li>Steady <strong style={{ color: "#e8e8e8" }}>5g/day creatine</strong> — keeps water consistent</li>
                  <li>Same <strong style={{ color: "#e8e8e8" }}>minimal clothing</strong> each time</li>
                </ul>
              </div>
            </div>

            <SectionTitle accent={accent3}>Decision Tree — When to Adjust</SectionTitle>
            <div style={{ display: "grid", gap: "8px" }}>
              {[
                { trigger: "Weight stall > 2 weeks (weekly avg flat)", action: "Cut 100 kcal from fat OR add 1 extra HIIT session", color: accent3 },
                { trigger: "Strength drop > 10% on Big 3", action: "Add 1 refeed day (maintenance kcal, high carb). Check sleep ≥ 7h.", color: accent3 },
                { trigger: "Energy/mood avg < 5 for 3+ days", action: "Take 1 full rest day. Add refeed. Consider 1,600 kcal.", color: "#f9c74f" },
                { trigger: "eVolt: SMM dropped > 0.5 kg", action: "Reduce deficit to 1,600 kcal. Increase protein to 180g. Fix sleep.", color: accent3 },
                { trigger: "Losing > 1.2 kg/week consistently", action: "Too aggressive — add 150 kcal from carbs around training.", color: "#f9c74f" },
                { trigger: "Everything tracking well", action: "Change nothing. Consistency > optimization. Stay the course.", color: accent },
              ].map((d, i) => (
                <div key={i} style={{ background: "#1a1a2e", border: `1px solid ${d.color}33`, borderRadius: "8px", padding: "14px 16px", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ color: d.color, fontSize: "16px", flexShrink: 0, marginTop: "2px" }}>{d.color === accent ? "✓" : "⚠"}</div>
                  <div>
                    <div style={{ color: "#e8e8e8", fontSize: "12px", fontWeight: 600, marginBottom: "4px" }}>IF: {d.trigger}</div>
                    <div style={{ color: "#aaa", fontSize: "12px" }}>THEN: {d.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LIFESTYLE */}
        {activeTab === "lifestyle" && (
          <div>
            <SectionTitle accent="#c77dff">Sleep Protocol</SectionTitle>
            <div style={{ background: "#1a1a2e", border: "1px solid #c77dff44", borderRadius: "8px", padding: "20px", marginBottom: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <div style={{ color: "#c77dff", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", marginBottom: "4px" }}>TARGET</div>
                  <div style={{ color: "#e8e8e8", fontSize: "20px", fontWeight: 800 }}>7.5 hours</div>
                  <div style={{ color: "#888", fontSize: "11px" }}>Up from your current 6–7</div>
                </div>
                <div>
                  <div style={{ color: "#c77dff", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", marginBottom: "4px" }}>SCHEDULE</div>
                  <div style={{ color: "#e8e8e8", fontSize: "20px", fontWeight: 800 }}>10:30 → 6:00</div>
                  <div style={{ color: "#888", fontSize: "11px" }}>Consistent daily, even weekends</div>
                </div>
              </div>
              <div style={{ color: "#aaa", fontSize: "12px", lineHeight: "1.8" }}>
                <strong style={{ color: "#c77dff" }}>Why this matters:</strong> Research shows sleep-restricted dieters lost significantly less fat and more muscle on the same deficit. Sleep is your #1 recovery tool.
              </div>
            </div>

            <SectionTitle accent="#f9c74f">Lifestyle Optimizations</SectionTitle>
            {lifestyleHacks.map((hack, i) => (
              <div key={i} style={{ background: "#1a1a2e", border: "1px solid #2a2a4a", borderRadius: "8px", padding: "14px 16px", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 280px" }}>
                  <span style={{ color: "#f9c74f", fontSize: "11px", fontWeight: 700 }}>{hack.category}</span>
                  <div style={{ color: "#ccc", fontSize: "12px", marginTop: "4px", lineHeight: "1.6" }}>{hack.tip}</div>
                </div>
                <div style={{ background: "#f9c74f11", border: "1px solid #f9c74f33", borderRadius: "4px", padding: "4px 10px", fontSize: "10px", color: "#f9c74f", fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0 }}>{hack.impact}</div>
              </div>
            ))}

            <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2a1a3e 100%)", border: "1px solid #c77dff44", borderRadius: "8px", padding: "16px", marginTop: "20px" }}>
              <div style={{ color: "#c77dff", fontSize: "12px", fontWeight: 700, marginBottom: "8px", letterSpacing: "1px" }}>⚠️ CUT SABOTEURS</div>
              <ul style={{ color: "#aaa", fontSize: "12px", lineHeight: "2", margin: 0, paddingLeft: "16px" }}>
                <li><strong style={{ color: accent3 }}>Alcohol</strong> — 7 kcal/g, halts fat oxidation 24–48 hrs</li>
                <li><strong style={{ color: accent3 }}>Late-night work</strong> — cortisol + poor sleep + snacking</li>
                <li><strong style={{ color: accent3 }}>Kopi with condensed milk</strong> → kopi-O kosong</li>
                <li><strong style={{ color: accent3 }}>Weekend binges</strong> — one hawker session can erase 3 days of deficit</li>
                <li><strong style={{ color: accent3 }}>Skipping core days</strong> — Mon/Wed/Fri are non-negotiable</li>
              </ul>
            </div>
          </div>
        )}

        {/* TIMELINE */}
        {activeTab === "timeline" && (
          <div>
            <SectionTitle accent={accent}>Projected Progress — 6 Week Cut</SectionTitle>
            <p style={{ color: "#888", fontSize: "12px", marginBottom: "24px" }}>Based on ~1,050 kcal/day deficit. Trust the weekly average.</p>

            <div style={{ position: "relative", paddingLeft: "24px" }}>
              <div style={{ position: "absolute", left: "8px", top: "12px", bottom: "12px", width: "2px", background: `linear-gradient(to bottom, ${accent}, ${accent3})` }} />
              {timeline.map((week, i) => (
                <div key={i} style={{ position: "relative", marginBottom: "20px", paddingLeft: "20px" }}>
                  <div style={{ position: "absolute", left: "-20px", top: "12px", width: "12px", height: "12px", borderRadius: "50%", background: i === timeline.length - 1 ? accent : "#1a1a2e", border: `2px solid ${accent}` }} />
                  <div style={{ background: "#1a1a2e", border: i === timeline.length - 1 ? `1px solid ${accent}` : "1px solid #2a2a4a", borderRadius: "8px", padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ color: accent, fontSize: "14px", fontWeight: 800 }}>{week.week}</span>
                        {week.scan && <span style={{ background: "#c77dff22", color: "#c77dff", padding: "2px 8px", borderRadius: "4px", fontSize: "9px", fontWeight: 700 }}>eVOLT SCAN</span>}
                      </div>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <span style={{ color: "#e8e8e8", fontSize: "12px", fontWeight: 600 }}>{week.weight}</span>
                        <span style={{ background: accent + "22", color: accent, padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 700 }}>{week.bf}</span>
                      </div>
                    </div>
                    <div style={{ color: "#aaa", fontSize: "12px", lineHeight: "1.6" }}>{week.notes}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "linear-gradient(135deg, #0a2a1a 0%, #1a1a2e 100%)", border: `1px solid ${accent}`, borderRadius: "8px", padding: "20px", marginTop: "24px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", color: accent, fontWeight: 700, letterSpacing: "2px", marginBottom: "8px" }}>POST-CUT: REVERSE DIET</div>
              <div style={{ color: "#e8e8e8", fontSize: "13px", lineHeight: "1.8", maxWidth: "600px", margin: "0 auto" }}>
                At ~15% BF → add 100–150 kcal/week back to maintenance over 3–4 weeks. Then lean bulk at +200–300 kcal surplus. Insulin sensitivity will be primed.
              </div>
            </div>
          </div>
        )}

        {/* CHECKLIST */}
        {activeTab === "checklist" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ color: "#888", fontSize: "12px" }}>Tap items to check off. Use as a daily/weekly template.</div>
              <button onClick={resetChecklist} style={{
                background: "#1a1a2e", border: "1px solid #444", borderRadius: "6px", padding: "6px 14px",
                color: "#888", fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", cursor: "pointer",
                transition: "all 0.2s",
              }}>Reset All</button>
            </div>

            <ChecklistSection title="Daily Checklist (Every Day)" items={checklistData.daily} accent={accent} checked={checked} onToggle={toggleCheck} />
            <ChecklistSection title="Weekly Checklist (Sunday)" items={checklistData.weekly} accent={accent2} checked={checked} onToggle={toggleCheck} />
            <ChecklistSection title="Bi-Weekly Checklist (Every 2 Weeks)" items={checklistData.biweekly} accent="#c77dff" checked={checked} onToggle={toggleCheck} />

            <div style={{ background: "#1a1a2e", border: `1px solid ${accent}44`, borderRadius: "8px", padding: "16px", marginTop: "16px" }}>
              <div style={{ color: accent, fontSize: "12px", fontWeight: 700, marginBottom: "8px", letterSpacing: "1px" }}>💡 ADHERENCE TIPS</div>
              <ul style={{ color: "#aaa", fontSize: "12px", lineHeight: "2", margin: 0, paddingLeft: "16px" }}>
                <li>Screenshot the daily checklist → set as phone wallpaper for week 1</li>
                <li>First 2 weeks build habits — after that, autopilot kicks in</li>
                <li>If you consistently miss the same item → redesign your environment, not willpower</li>
                <li>80% adherence still gets 80% of results — don't let perfect kill consistent</li>
                <li>The checklist is a tool, not a test. Miss a day? Check off tomorrow.</li>
              </ul>
            </div>
          </div>
        )}

        <div style={{ marginTop: "32px", padding: "16px", borderTop: "1px solid #1f1f3a", color: "#444", fontSize: "10px", textAlign: "center", letterSpacing: "1px" }}>
          SHRED PROTOCOL v2 — 72.9 KG @ 20.6% → 68 KG @ 15% — 5–6 WEEKS
        </div>
      </div>
    </div>
  );
}
