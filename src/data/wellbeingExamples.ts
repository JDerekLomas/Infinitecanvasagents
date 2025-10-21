// Wellbeing-focused examples for each agent pattern
// Organized by wellbeing domains: mental health, education, personal growth, community, physical health

export interface WellbeingExample {
  domain: "Mental Health" | "Education" | "Personal Growth" | "Community" | "Physical Health" | "Workplace";
  headline: string;
  steps: string[];
  snippet?: string;
  context?: string;
}

export const WELLBEING_EXAMPLES: Record<string, WellbeingExample[]> = {
  deep_research: [
    {
      domain: "Mental Health",
      headline: "Research evidence-based interventions for student anxiety in high-stakes testing",
      steps: [
        "Planner → break into: (a) validated anxiety measures for students, (b) pre-test interventions, (c) implementation studies, (d) effect sizes",
        "Searcher → queries: 'test anxiety interventions meta-analysis', 'brief mindfulness before exams RCT', 'cognitive reappraisal academic performance'",
        "Reader/Extractor → extract: intervention protocols, sample sizes, effect sizes (Cohen's d), implementation details",
        "Evidence Store → organize by: intervention type, age group, context, outcome measures",
        "Verifier → cross-check effect sizes across studies; flag p-hacking indicators; verify replication status",
        "Writer → create decision matrix: intervention × (ease, time, evidence quality, effect size) with citations"
      ],
      snippet: "Output: 'Brief mindfulness (5-min body scan): d=0.42, high feasibility, 3 RCTs. Cognitive reappraisal training: d=0.56, moderate complexity, requires 2 sessions. Recommendation: Start with mindfulness for immediate use; plan reappraisal training for recurring exams.'",
      context: "Educational psychologist preparing evidence-based recommendations for school counselors"
    },
    {
      domain: "Personal Growth",
      headline: "Find and compare gratitude journaling protocols for sustained wellbeing",
      steps: [
        "Planner → research: (a) optimal frequency (daily vs weekly), (b) prompt structure, (c) duration studies, (d) individual differences",
        "Searcher → 'gratitude journal frequency Emmons', 'three good things Seligman protocol', 'gratitude adaptation effects'",
        "Reader/Extractor → extract journaling prompts, timing recommendations, moderators (baseline wellbeing, personality)",
        "Verifier → check sample diversity, follow-up periods, control conditions",
        "Writer → create personalized recommendation based on user profile + evidence synthesis"
      ],
      snippet: "For beginners: 3x/week (Wed/Fri/Sun evenings) using 'Three Good Things' format prevents adaptation better than daily practice (Lyubomirsky 2011). Include *why* it was meaningful to boost impact.",
      context: "Wellbeing coach designing personalized positive psychology interventions"
    },
    {
      domain: "Workplace",
      headline: "Research autonomy-supportive management practices that boost employee wellbeing",
      steps: [
        "Planner → investigate: (a) Self-Determination Theory in workplace, (b) autonomy support behaviors, (c) wellbeing outcomes, (d) practical implementation guides",
        "Searcher → 'autonomy supportive leadership SDT', 'manager autonomy support scale', 'workplace autonomy wellbeing meta-analysis'",
        "Reader → extract specific manager behaviors, measurement tools, causal evidence",
        "Verifier → distinguish correlation from causation; check for reverse causality",
        "Writer → create manager training guide with concrete behavioral examples + evidence"
      ],
      context: "HR professional designing manager training for psychological needs support"
    }
  ],

  react: [
    {
      domain: "Personal Growth",
      headline: "Help me build a daily wellbeing routine based on my energy patterns",
      steps: [
        "Think → User wants routine. Need to understand: current sleep, energy dips, existing habits, goals",
        "Act → ask_user({ questions: ['What time do you typically feel most energized?', 'Current morning routine?', 'Wellbeing goals?'] })",
        "Observe → Responses: Peak energy 9-11am; rushes mornings; wants more calm + focus",
        "Think → Suggest morning routine that front-loads important tasks; add mindfulness in energy dip",
        "Act → create_routine({ morning: 'mindful coffee + journaling 7:30-7:45', peak: 'creative work 9-11', dip: '5-min walk 2pm' })",
        "Answer → Present routine with rationale; offer to calendar-block these times"
      ],
      context: "Personal wellbeing coach helping establish sustainable daily practices"
    },
    {
      domain: "Education",
      headline: "Detect when a student needs emotional support during online learning and provide resources",
      steps: [
        "Think → Monitor student engagement signals: camera off, silence, incomplete work pattern",
        "Act → analyze_engagement({ student_id: 'S123', timeframe: 'last_week' })",
        "Observe → Participation dropped 80%, no camera for 3 sessions, assignment late for first time",
        "Think → Concerning pattern change. Check if other students affected (environmental) or individual",
        "Act → check_cohort_patterns() + prepare_gentle_check_in()",
        "Observe → Only this student affected. Pattern suggests personal challenge",
        "Think → Reach out with care; offer support resources; notify instructor if persistent",
        "Act → send_message({ tone: 'warm', content: 'Noticed you've been quieter. Everything ok? Here are some resources...', include: [counseling_link, extension_info, office_hours] })"
      ],
      context: "AI teaching assistant monitoring student wellbeing indicators"
    },
    {
      domain: "Mental Health",
      headline: "Guide someone through an anxiety spiral using grounding techniques",
      steps: [
        "Think → User reports racing thoughts, difficulty breathing. Need immediate grounding.",
        "Act → offer_grounding({ technique: '5-4-3-2-1 sensory', pacing: 'slow' })",
        "Observe → User engaged, breathing slowing",
        "Think → Continue sensory grounding, then offer cognitive reframe",
        "Act → guide_breathing({ pattern: '4-4-4', duration: '2min' })",
        "Observe → User reports feeling calmer",
        "Think → Stabilized. Offer next step: journal, talk, distraction, or rest",
        "Act → present_options({ with_rationale: true })"
      ],
      context: "Mental health support chatbot providing crisis de-escalation"
    }
  ],

  reflexion: [
    {
      domain: "Education",
      headline: "Improve a lesson plan after students showed low engagement",
      steps: [
        "Attempt → Delivered 30-min lecture on growth mindset; assigned reading",
        "Feedback → Post-lesson survey: 2.3/5 engagement, 'too abstract', 'wanted examples'",
        "Reflect → Failed to connect concept to students' lived experience. Too much tell, not enough show. No active learning.",
        "Memory → Store: 'Abstract concepts need concrete, relatable examples. Build from student experience. Include active components.'",
        "Retry → Redesigned: Start with student challenge stories (5min), introduce concept with their examples (10min), pair activity applying to personal goal (10min), share-out (5min)",
        "Feedback → 4.2/5 engagement, 'helped me see it in my own life', 'pair activity was useful'"
      ],
      snippet: "Lesson learned: Start concrete (student experience) → Abstract (concept) → Applied (personal goal). Active learning > lecture for wellbeing topics.",
      context: "Teacher iterating on social-emotional learning curriculum"
    },
    {
      domain: "Personal Growth",
      headline: "Iterate on meditation practice after repeated failure to maintain consistency",
      steps: [
        "Attempt → Committed to 20-min morning meditation daily",
        "Feedback → Lasted 3 days; felt frustrating, 'mind too busy', gave up",
        "Reflect → Unrealistic starting point. 20min is advanced. Morning may not suit my rhythm. No strategy for 'busy mind' (that's normal!). All-or-nothing thinking.",
        "Memory → 'Start smaller than feels necessary. Match practice to energy. Normalize difficulty. Build streak, then duration.'",
        "Retry → Start with 3-min body scan, 3x/week, evening when calmer. Use guided audio. Track in visible place.",
        "Feedback → Completed 8/9 sessions over 3 weeks. Gradually increased to 5min. Feels sustainable."
      ],
      context: "Meditation app AI coach helping users find sustainable practice"
    },
    {
      domain: "Workplace",
      headline: "Refine team check-in format after surface-level responses",
      steps: [
        "Attempt → Weekly team check-in: 'How are you? Any blockers?'",
        "Feedback → Always 'fine' and 'no blockers' despite clear stress signals",
        "Reflect → Question too generic and professional. No psychological safety cues. Leader goes first sets 'all good' tone. No vulnerability modeled.",
        "Memory → 'Psychological safety requires specific, leader-modeled vulnerability. Use gradations not binary.'",
        "Retry → New format: Leader shares challenge first. Use 1-5 energy scale. Specific prompt: 'What drained/energized you this week?' Optional pass.",
        "Feedback → More authentic sharing. Team identifying support needs earlier."
      ],
      context: "Manager improving team wellbeing practices through iteration"
    }
  ],

  tree_of_thoughts: [
    {
      domain: "Personal Growth",
      headline: "Explore multiple paths to improve work-life balance",
      steps: [
        "Seed → 'I need better work-life balance'",
        "Expand → Generate 5 approaches: (1) Boundary-setting, (2) Time-blocking, (3) Delegation, (4) Energy management, (5) Values clarification",
        "Score each → (1) Impact: 8, Difficulty: 7, Speed: 6 | (2) Impact: 7, Difficulty: 4, Speed: 8 | (3) Impact: 9, Difficulty: 6, Speed: 5 | (4) Impact: 8, Difficulty: 3, Speed: 9 | (5) Impact: 9, Difficulty: 5, Speed: 3",
        "Select → Top 2: Energy management (quick wins) + Values clarification (deep alignment)",
        "Expand → For Energy: (A) Track energy by task, (B) Protect peak hours, (C) Strategic rest | For Values: (A) Wheel of life, (B) Peak experience analysis, (C) Eulogy exercise",
        "Score → Select: Track energy + Wheel of life (complement each other)",
        "Action plan → Week 1: Energy tracking. Week 2: Wheel of life + initial boundary from insights"
      ],
      context: "Life coach helping client navigate complex wellbeing goals"
    },
    {
      domain: "Education",
      headline: "Design multiple approaches to support student belonging in online class",
      steps: [
        "Seed → 'Increase student belonging in async online course'",
        "Expand → 5 strategies: (1) Peer connection activities, (2) Instructor presence, (3) Cultural responsiveness, (4) Choice/autonomy, (5) Collaborative work",
        "Score → Evaluate on: feasibility for async, research support, student preference data, instructor time",
        "Select → Top 2: Peer connection + Instructor presence (address isolation + visibility)",
        "Expand further → Peer: (A) Discussion pods, (B) Peer review, (C) Study groups | Instructor: (A) Video feedback, (B) Weekly check-ins, (C) Discussion participation",
        "Final plan → Combine: Small discussion pods (6 students) + instructor video feedback on first assignment"
      ],
      context: "Instructional designer optimizing for student wellbeing outcomes"
    },
    {
      domain: "Mental Health",
      headline: "Generate coping strategies for different anxiety trigger scenarios",
      steps: [
        "Seed → 'User experiences social anxiety before meetings'",
        "Expand → 5 intervention timings: (1) Day-before prep, (2) Morning-of routine, (3) 5-min-before grounding, (4) During-meeting anchors, (5) Post-meeting processing",
        "Score → Evaluate preventive power vs. ease of adoption",
        "Select → Focus on: 5-min-before + During-meeting (highest impact, critical moments)",
        "Expand 5-min → (A) Box breathing + affirmation, (B) Body scan, (C) Power pose + reframe, (D) Call supportive person",
        "Expand During → (A) Mindful object (fidget), (B) Breathing pace, (C) Cognitive reframe card, (D) Ally eye contact",
        "Personalize → User preference: Breathing + mindful object. Create practice plan."
      ],
      context: "Therapy chatbot helping user build personalized coping toolbox"
    }
  ],

  multi_agent_debate: [
    {
      domain: "Education",
      headline: "Should we prioritize grades or wellbeing when students are stressed?",
      steps: [
        "Agent A (Academic Success) → 'Maintain standards. Lowering expectations hurts long-term outcomes. Teach resilience through challenge. Data shows grade inflation harms.'",
        "Agent B (Wellbeing First) → 'Student mental health crisis is real. Burnout damages learning capacity. Grades don't predict life success. Need sustainable pace.'",
        "Rebuttal A → 'Agree wellbeing matters, but it comes FROM mastery and accomplishment. Remove challenge, remove growth. False compassion.'",
        "Rebuttal B → 'Challenge ≠ overwhelm. Research shows optimal stress zone. We're beyond that. Need strategic relief, not elimination of rigor.'",
        "Judge → 'Both correct on different timescales. Synthesis: Maintain learning standards, but increase flexibility in PATHS to demonstrate mastery. Add: late policies with grace periods, alternative assessments, strategic deadline spacing. Wellbeing enables academic success; false dichotomy.'"
      ],
      snippet: "Decision: Implement 'mastery flexibility' – same learning goals, more paths/pacing options. Monitor wellbeing + learning outcomes quarterly.",
      context: "School leadership team resolving policy tension"
    },
    {
      domain: "Workplace",
      headline: "Debate optimal approach to employee wellbeing: benefits vs. culture",
      steps: [
        "Agent A (Benefits) → 'Invest in concrete benefits: mental health coverage, gym, PTO. Measurable, equitable, employees value.'",
        "Agent B (Culture) → 'Benefits mean nothing if culture burns people out. Fix workload, manager quality, psychological safety first.'",
        "Rebuttal A → 'Culture change is slow and hard to measure. Benefits show immediate care, attract talent.'",
        "Rebuttal B → 'Benefits are band-aids if culture is toxic. People leave managers, not companies. ROI on culture is higher.'",
        "Judge → 'Both necessary, different mechanisms. Benefits are table stakes; culture determines whether people can USE them. Recommendation: Baseline benefits (parity with market) + targeted culture interventions (manager training, workload audits, psych safety metrics). Track both.'"
      ],
      context: "HR team allocating wellbeing budget"
    },
    {
      domain: "Personal Growth",
      headline: "Should I focus on fixing weaknesses or amplifying strengths for growth?",
      steps: [
        "Agent A (Strengths) → 'Research shows strengths-based development increases engagement, performance, wellbeing. You'll excel more in natural talents.'",
        "Agent B (Weaknesses) → 'Weaknesses create bottlenecks. Shore up deficits for well-rounded competence. Can't avoid everything you're bad at.'",
        "Rebuttal A → 'Distinguish between weaknesses that matter vs. don't. Outsource/work around non-critical ones. Strengths create flow.'",
        "Rebuttal B → 'Some weaknesses (e.g., emotional regulation, communication) can't be outsourced. They're life skills.'",
        "Judge → '80/20 rule: 80% energy on strengths, 20% on critical weaknesses. Critical = can't delegate + impacts multiple life areas. For weaknesses: aim for \"good enough,\" not mastery. For strengths: aim for excellence.'"
      ],
      context: "Coach helping client with personal development strategy"
    }
  ],

  assembly_line: [
    {
      domain: "Mental Health",
      headline: "Build a peer support chatbot for college students",
      steps: [
        "Planner → Break down: (1) Needs assessment, (2) Conversation design, (3) Safety protocol, (4) Technical build, (5) Pilot testing",
        "Researcher → Gather: student mental health data, peer support best practices, crisis detection methods, privacy requirements",
        "Designer → Create: conversation flows for common issues (stress, loneliness, academic pressure), empathetic response patterns, escalation triggers",
        "Coder → Implement: NLP for intent detection, safety keyword monitoring, resource database, feedback collection",
        "Safety Specialist → Add: crisis keyword detection → human handoff, mandatory disclaimers, counseling center integration",
        "Tester → Validate: conversation quality, safety triggers, false positive rate, user experience, accessibility",
        "Report → Documentation: user guide, safety protocol, evaluation metrics, maintenance plan"
      ],
      snippet: "Output: Chatbot with 12 conversation flows, 97% crisis detection accuracy, <5% false positive, integrated with campus counseling. Pilot: 200 students, 85% found helpful.",
      context: "University wellbeing team creating scalable peer support"
    },
    {
      domain: "Education",
      headline: "Create a teacher wellbeing program from research to implementation",
      steps: [
        "Planner → Phases: (1) Teacher needs analysis, (2) Evidence review, (3) Program design, (4) Training materials, (5) Evaluation plan",
        "Researcher → Survey teachers on stressors, energy, support needs; review burnout prevention literature",
        "Program Designer → Design 3-tier system: (1) Universal (all teachers), (2) Targeted (high-risk groups), (3) Intensive (individuals)",
        "Content Creator → Build: micro-learning modules on boundaries, stress management, community building; manager guide for autonomy support",
        "Trainer → Develop: facilitator training, peer coaching model, practice scenarios",
        "Evaluator → Create measurement plan: baseline + quarterly pulse on burnout, engagement, efficacy, absences",
        "Report → Package: implementation guide, facilitator materials, evaluation toolkit, case studies"
      ],
      context: "District-level initiative to address teacher burnout"
    },
    {
      domain: "Workplace",
      headline: "Design and deploy a team wellbeing dashboard",
      steps: [
        "Planner → Components: (1) Metric selection, (2) Data sources, (3) Privacy design, (4) Visualization, (5) Action guidance",
        "Researcher → Identify leading indicators: psychological safety, workload, autonomy, support, purpose; ensure no individual identification",
        "Data Engineer → Integrate: pulse survey data, calendar analysis (meeting load), Slack sentiment, PTO usage – all aggregated to team level",
        "Privacy Specialist → Ensure: minimum team size for reporting (n≥5), anonymized verbatim, opt-out mechanism, clear data use policy",
        "Designer → Create: visual dashboard with trend lines, peer comparisons, deep-dive modules, manager action suggestions",
        "Tester → Validate: with pilot teams, test for bias, ensure actionability, gather manager feedback",
        "Trainer → Prepare: manager guide for interpreting data + having conversations, team communication rollout"
      ],
      context: "People analytics team creating wellbeing measurement system"
    }
  ],

  router_graph: [
    {
      domain: "Mental Health",
      headline: "Route mental health support requests to appropriate resource level",
      steps: [
        "Router → Assess message: keywords (suicide, harm) → Crisis, severity language → Therapist, general stress → Peer support, resources only → Self-serve",
        "Crisis Node → If detected: Immediate crisis protocol (hotline, emergency contact, stay-with-me script)",
        "Therapist Node → If moderate-severe: Match to available counselor, provide intake info, book appointment",
        "Peer Support Node → If mild-moderate: Connect to peer supporter, share coping resources, schedule check-in",
        "Self-Serve Node → If information-seeking: Provide resource library, self-help tools, psychoeducation",
        "State Store → Track: user severity over time, resources used, outcomes, escalation patterns",
        "Monitor → Flag: repeated use without improvement → suggest higher level of care"
      ],
      snippet: "95% accuracy in routing. Crisis response <1min. 78% of peer support users report improvement without needing therapist.",
      context: "University counseling center managing tiered support system"
    },
    {
      domain: "Education",
      headline: "Adaptive learning system routes students to personalized wellbeing support",
      steps: [
        "Router → Monitor signals: quiz anxiety patterns → Test prep support, isolation indicators → Social connection, perfectionism → Growth mindset, disengagement → Motivation support",
        "Test Prep Node → Provide: anxiety management techniques, study strategies, practice opportunities",
        "Social Connection Node → Suggest: study groups, discussion participation, peer mentor matching",
        "Growth Mindset Node → Deliver: reframe exercises, effort attribution training, mistake normalization",
        "Motivation Node → Offer: goal-setting tools, progress visualization, autonomy choices",
        "State → Remember student preferences, track what works, avoid repetition",
        "Integrate → All nodes can escalate to human advisor if persistent difficulty"
      ],
      context: "EdTech platform with integrated student wellbeing support"
    },
    {
      domain: "Workplace",
      headline: "Route employee wellbeing concerns to appropriate intervention",
      steps: [
        "Router → Classify request: Work-life balance → Time management, Team conflict → Mediation, Burnout → Workload audit, Career stagnation → Development, Manager issue → HR",
        "Each Node → Specialized workflow: assessments, resources, human expert connection as needed",
        "State Store → Track patterns: If multiple workload complaints from same team → trigger org-level review",
        "Feedback Loop → Measure intervention effectiveness, route future similar cases to what worked",
        "Privacy Layer → Ensure manager doesn't see individual requests unless escalated"
      ],
      context: "Employee assistance program with intelligent routing"
    }
  ],

  mcp: [
    {
      domain: "Education",
      headline: "Access validated wellbeing assessment library via MCP",
      steps: [
        "LLM Client → User asks: 'Find me a brief loneliness measure for college students'",
        "MCP Client → Request tools: assessment_library.search()",
        "MCP Server → Connects to validated assessment database",
        "Search → Query: { construct: 'loneliness', population: 'college', length: 'brief' }",
        "Server Returns → UCLA Loneliness Scale (3-item), psychometrics, citation, usage rights",
        "LLM → Synthesizes: 'Here's the ULS-3. 3 items, α=0.82 in college samples, 1 minute to complete. [Shows items]. Citation: Hughes et al. (2004). Free for research use.'"
      ],
      context: "Researcher designing wellbeing study with AI assistance"
    },
    {
      domain: "Mental Health",
      headline: "Pull evidence-based therapy protocols from clinical database",
      steps: [
        "LLM Client → Therapist asks: 'What's the CBT protocol for health anxiety?'",
        "MCP Client → Call: clinical_protocols.retrieve({ condition: 'health_anxiety', approach: 'CBT' })",
        "MCP Server → Access clinical guidelines database",
        "Server → Returns structured protocol: assessment tools, session-by-session guide, worksheets, outcome measures",
        "LLM → Formats for therapist: 'Here's the evidence-based protocol (Clark & Wells, 2007): [Summarizes key components]. Full session guides attached. Typical duration: 12-16 sessions.'"
      ],
      context: "Clinical AI assistant providing therapists with protocol access"
    },
    {
      domain: "Workplace",
      headline: "Integrate company wellbeing policy database into HR chatbot",
      steps: [
        "LLM Client → Employee asks: 'What mental health benefits do we have?'",
        "MCP Client → Query: company_policies.get({ category: 'mental_health_benefits' })",
        "MCP Server → Connects to HR policy system",
        "Server → Returns: EAP details, therapy coverage, mental health days policy, manager training availability",
        "LLM → Synthesizes personalized response with action steps: 'You have access to: [Lists benefits]. To use EAP: [Steps]. Your manager is trained in mental health first aid.'"
      ],
      context: "HR chatbot with secure access to company wellbeing resources"
    }
  ],

  computer_use: [
    {
      domain: "Personal Growth",
      headline: "Automatically log daily mood and activities to identify wellbeing patterns",
      steps: [
        "Plan → Each evening: open mood tracker, input mood rating, log activities, save to database",
        "Computer Use → Navigate to app, click 'New Entry', input today's date",
        "Observe → Screenshot shows entry form ready",
        "Computer Use → Select mood (7/10), check activity boxes (exercise, socializing, work), add note",
        "Observe → Confirm entry saved",
        "Plan → Weekly: analyze patterns (mood × activities correlation), generate insights",
        "Computer Use → Run analysis script, create visualization",
        "Approval Gate → Ask user: 'Found pattern: Exercise days 1.2 points higher mood. Want to set exercise reminders?'"
      ],
      context: "Personal wellbeing tracking with automated pattern detection"
    },
    {
      domain: "Education",
      headline: "Automatically populate student wellbeing dashboard from multiple sources",
      steps: [
        "Plan → Daily: pull engagement data, survey responses, support requests; update dashboard",
        "Computer Use → Log into LMS, export participation data",
        "Observe → CSV downloaded with engagement metrics",
        "Computer Use → Access survey platform, pull latest wellbeing check-in responses",
        "Computer Use → Open dashboard spreadsheet, paste data into respective sheets",
        "Computer Use → Run analysis: flag students with ≥2 concerning indicators",
        "Approval Gate → Present flagged students to advisor: 'These 3 students show concerning patterns. Review?'"
      ],
      context: "Student support team monitoring wellbeing indicators"
    },
    {
      domain: "Workplace",
      headline: "Automate meeting audit to assess impact on employee deep work time",
      steps: [
        "Plan → Access team calendars, calculate meeting load, identify meeting-free blocks, generate report",
        "Computer Use → Open calendar admin, export team calendar data (aggregated, anonymized)",
        "Observe → Calendar data exported successfully",
        "Computer Use → Run analysis script: % time in meetings, average meeting-free block length, focus time availability",
        "Computer Use → Generate visualization: heat map of meeting density, focus time trends",
        "Approval Gate → Show manager: 'Team avg: 65% time in meetings (recommended <50%). Only 2hrs avg continuous focus time. Recommend: No-meeting Thursdays?'"
      ],
      context: "Manager optimizing team time for wellbeing and productivity"
    }
  ],

  web_researcher: [
    {
      domain: "Mental Health",
      headline: "Research the efficacy of digital CBT for adolescent depression",
      steps: [
        "Controller → Define search: RCTs on digital CBT, adolescent population, depression outcomes, last 5 years",
        "Retriever → Search: PubMed, PsycINFO, Google Scholar; queries: 'internet-based CBT adolescent depression RCT', 'mobile app CBT youth randomized'",
        "Retriever → Filter: peer-reviewed, n>30, control group, depression measure outcome",
        "Reader → Extract from each study: N, age range, intervention details, control type, outcome measure, effect size, follow-up",
        "Evidence Store → Organize: [Study citation, intervention, d=effect size, quality rating]",
        "Synthesizer → Write: 'Meta-analysis of 8 RCTs (n=1,847 adolescents) shows digital CBT reduces depression symptoms (pooled d=0.43, 95% CI: 0.28-0.58). Strongest effects with therapist support component. Evidence quality: moderate. [Citations]'"
      ],
      snippet: "Output: Evidence summary table + narrative + clinical recommendations + gaps in literature",
      context: "Clinician evaluating whether to recommend digital interventions"
    },
    {
      domain: "Education",
      headline: "Compare flipped classroom vs. traditional for student wellbeing outcomes",
      steps: [
        "Controller → Search parameters: flipped classroom research, wellbeing/stress/engagement outcomes, comparison studies",
        "Retriever → Queries: 'flipped classroom student stress', 'flipped learning engagement well-being', 'inverted classroom anxiety'",
        "Retriever → Collect: 15 studies with wellbeing measures (stress, anxiety, satisfaction, engagement)",
        "Reader → Extract: instructional approach details, wellbeing measures used, sample characteristics, key findings",
        "Evidence Store → Tag: outcome type, direction of effect, study quality, educational level",
        "Synthesizer → 'Mixed evidence: Flipped classroom associated with lower anxiety in 6/8 studies, higher engagement in 9/10, but higher initial stress during adaptation (3/5 studies). Key moderator: quality of pre-class materials. Recommendation: Gradual implementation with strong scaffolding. [Citations]'"
      ],
      context: "Instructional designer weighing pedagogical approaches"
    },
    {
      domain: "Workplace",
      headline: "Research 4-day workweek impact on employee wellbeing and productivity",
      steps: [
        "Controller → Search: 4-day workweek trials, wellbeing outcomes, productivity measures, recent implementations",
        "Retriever → Queries: '4-day work week trial results wellbeing', 'four day workweek productivity burnout', '32-hour workweek pilot outcomes'",
        "Reader → Extract: company size, industry, trial duration, wellbeing metrics, productivity metrics, retention impact",
        "Evidence Store → Organize by: trial design quality, outcome domain, industry type",
        "Synthesizer → 'Analysis of 12 organizational trials (2020-2024): Wellbeing improvements: burnout ↓38%, stress ↓33%, sleep quality ↑42%. Productivity: maintained or improved in 11/12 trials. Retention: +13% on average. Implementation success factors: [list with citations]. Challenges: [list]. Overall: Strong evidence for wellbeing gains without productivity loss.'"
      ],
      context: "HR team building business case for work schedule change"
    }
  ]
};

// Helper to get examples for a pattern
export function getWellbeingExamples(patternKey: string): WellbeingExample[] {
  return WELLBEING_EXAMPLES[patternKey] || [];
}
