import React, { useEffect, useMemo, useRef, useState } from "react";
import mermaid from "mermaid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, ZoomOut, Maximize, Search, Settings2, Info, Download, RefreshCw, Copy, ExternalLink, Sparkles } from "lucide-react";
import { getNodePrompts, type NodePromptData } from "@/data/nodePrompts";

// ---------------- Mermaid patterns (internal only; source not shown) ----------------
const PATTERNS: { key: string; title: string; code: string }[] = [
  {
    key: "deep_research",
    title: "Deep Research",
    code: `flowchart LR
  subgraph Orchestrator
    P[Planner] --> Q[Task Queue]
    W[Writer]
  end
  subgraph Web_Tools
    S[Searcher] --> R[Reader/Extractor]
  end
  subgraph Memory_Eval
    E[Evidence Store] --> V[Verifier]
  end
  Q --> S
  S --> R
  R --> E
  E --> V
  V --> W`
  },
  {
    key: "react",
    title: "ReAct (Reason + Act)",
    code: `flowchart LR
  T[Think] --> A[Act: Tool Call]
  A --> O[Observe]
  O --> T
  T -->|finish| ANS[Answer]`
  },
  {
    key: "reflexion",
    title: "Reflexion (Self‑Reflection)",
    code: `flowchart LR
  ATT[Attempt] --> FB[Feedback]
  FB --> REF[Reflect: self-critique]
  REF --> MEM[(Episodic Memory)]
  MEM --> RETRY[Retry]
  RETRY --> ATT`
  },
  {
    key: "tree_of_thoughts",
    title: "Tree of Thoughts",
    code: `flowchart LR
  S[Seed Thought] --> B1{Expand k thoughts}
  B1 -->|path 1| H1[Heuristic Score]
  B1 -->|path 2| H2[Heuristic Score]
  H1 --> SEL{Select/Prune}
  H2 --> SEL
  SEL -->|continue| B1`
  },
  {
    key: "multi_agent_debate",
    title: "Multi‑Agent Debate",
    code: `flowchart LR
  A1[Agent A: Proposal] --> J[Judge]
  B1[Agent B: Proposal] --> J
  A2[Rebuttal A] --> J
  B2[Rebuttal B] --> J
  J --> OUT[Decision / Merged Answer]`
  },
  {
    key: "assembly_line",
    title: "Assembly Line (Planner + Specialists)",
    code: `flowchart LR
  P[Planner] --> R[Researcher]
  R --> C[Coder]
  C --> T[Tester]
  T --> REP[Report]
  R -.write.-> S[(Shared Scratchpad)]
  C -.write.-> S
  T -.write.-> S`
  },
  {
    key: "router_graph",
    title: "Router + Skill Graph",
    code: `flowchart LR
  R[Router/Policy] --> N1[Node A: RAG]
  N1 --> N2[Node B: Tools]
  N2 --> N3[Node C: Summarize]
  N1 -.state.-> ST[(State Store)]
  N2 -.state.-> ST
  N3 -.state.-> ST`
  },
  {
    key: "mcp",
    title: "Model Context Protocol (MCP)",
    code: `flowchart LR
  L[LLM Client/App] --> C[MCP Client]
  C --> S[MCP Server(s): Tools/Data]
  S --> C
  C --> L`
  },
  {
    key: "computer_use",
    title: "Computer Use (UI Automation)",
    code: `flowchart LR
  P[Plan Step] --> CU[Computer Use Tool]
  CU --> VD[Virtual Desktop]
  VD --> CU
  CU --> P
  P -->|approval| G[Human Gate]`
  },
  {
    key: "web_researcher",
    title: "Web Researcher (search → read → cite)",
    code: `flowchart LR
  CTR[Controller] --> RET[Retriever]
  RET --> RD[Reader]
  RD --> EV[(Evidence Store)]
  EV --> SYN[Synthesizer]
  SYN --> OUT[Report + Citations]`
  }
];

// ---------------- Real examples to show under diagrams ----------------
const EXAMPLES: Record<string, { headline: string; steps: string[]; snippet?: string }> = {
  deep_research: {
    headline: "Find instruments for measuring well‑being (WHO‑5, PERMA, FS) and compare strengths",
    steps: [
      "Planner → break into subtasks: (a) official questionnaire links, (b) psychometrics, (c) usage tips",
      "Searcher → queries: 'WHO‑5 questionnaire official', 'PERMA profiler pdf', 'Flourishing Scale Diener'",
      "Reader/Extractor → pull key lines (items, scoring), store URL + quote in Evidence Store",
      "Verifier → cross‑check item counts/scoring across 2 sources each; drop duplicates/low‑cred",
      "Writer → synthesize: when to use each, with links and a 1‑line pro/con table"
    ],
    snippet: "Output fragment: 'WHO‑5: 5 items / 0–5 Likert → 0–25, ×4 → 0–100; good for brief positive affect & vitality. PERMA: multi‑domain well‑being; longer; use when you need sub‑scores.'"
  },
  react: {
    headline: "Schedule a study block when my calendar is free tomorrow afternoon",
    steps: [
      "Think → if any existing events 13:00–17:00? If none, propose 90‑minute block",
      "Act → call calendar.list({ date: 'tomorrow', window: '13:00-17:00' })",
      "Observe → results show 15:00–16:00 busy; free: 13:00–15:00 & 16:00–17:00",
      "Think → choose 13:30–15:00; prepare event details",
      "Act → calendar.create({ title:'Deep work', start:'13:30', end:'15:00' })",
      "Answer → confirm with the user"
    ]
  },
  reflexion: {
    headline: "Refine a lesson plan after weak student engagement",
    steps: [
      "Attempt → draft a 30‑min activity",
      "Feedback → engagement score 2/5 from pilot",
      "Reflect → note: instructions too long; add 3‑min demo video; include peer‑pairing",
      "Retry → new plan with demo + pair activity",
      "Attempt → run again and compare scores"
    ]
  },
  tree_of_thoughts: {
    headline: "Brainstorm wellbeing prompts for a journaling app",
    steps: [
      "Seed → 'Evening reflection prompt'",
      "Expand → generate 5 variants (gratitude, skill growth, connection, awe, kindness)",
      "Score → rate for autonomy, competence, relatedness support (1–5)",
      "Select/Prune → keep top 2; iterate to refine wording"
    ]
  },
  multi_agent_debate: {
    headline: "Should we use WHO‑5 or PERMA for a 1‑week classroom pilot?",
    steps: [
      "Agent A → argues WHO‑5: brevity + clear scoring",
      "Agent B → argues PERMA: multi‑dim insight",
      "Rebuttals → address sample size & participant fatigue",
      "Judge → picks WHO‑5 for pilot; recommends PERMA for follow‑up"
    ]
  },
  assembly_line: {
    headline: "Build a minimal wellbeing check‑in bot",
    steps: [
      "Planner → split: copy, UI, logging",
      "Researcher → gather 2‑item versions of scales",
      "Coder → implement UI + local store",
      "Tester → verify scoring + timestamps",
      "Report → README with setup + ethics note"
    ]
  },
  router_graph: {
    headline: "Answer student questions with citations, otherwise reply directly",
    steps: [
      "Router → if 'source?'/'cite'/'evidence' present → Node A (RAG), else Node C (Summarize)",
      "Node A → retrieve & rank; update State Store",
      "Node B → call tools (e.g., web, pdf) if gaps found",
      "Node C → compose final answer; attach citations if present in state"
    ]
  },
  mcp: {
    headline: "Pull a consent template from a policy repo via MCP",
    steps: [
      "LLM Client → asks MCP Client for `fs.search` tool",
      "MCP Client → calls MCP Server: fs.search({ q:'consent template wellbeing' })",
      "Server → returns file path + excerpt",
      "Client → returns result to LLM for synthesis"
    ]
  },
  computer_use: {
    headline: "Populate a Google Sheet with scale results",
    steps: [
      "Plan → open sheet; locate first empty row",
      "Computer Use → type values; paste timestamp",
      "Observe → screenshot confirms row appended",
      "Approval Gate → ask before sharing file link"
    ]
  },
  web_researcher: {
    headline: "Compare PERMA vs. Flourishing Scale in undergraduate samples",
    steps: [
      "Controller → craft two queries + inclusion criteria",
      "Retriever → collect results; filter duplicates",
      "Reader → extract N, reliability, findings",
      "Evidence → store quotes + links",
      "Synthesizer → write a 1‑paragraph comparison with citations"
    ]
  }
};

// ---------------- Glossary ----------------
const GLOSSARY: { term: string; def: string; example: string }[] = [
  { term: "Perceive", def: "Collect context from messages, memory, sensors, or retrieved docs.", example: "Read last 5 chat turns + fetch a FAQ snippet." },
  { term: "Plan", def: "Draft a short sequence of steps before acting.", example: "1) Search; 2) Open top 3 sources; 3) Extract quotes; 4) Summarize." },
  { term: "Act (Tool)", def: "Call a function/API with structured args.", example: "search_web({ q: 'WHO‑5 questionnaire site' })" },
  { term: "Observe", def: "Record tool results and update state/memory.", example: "Store page title, URL, and snippet to scratchpad after search." },
  { term: "Reflect", def: "Self‑critique and write guidance for next try.", example: "'Missed timing; include pre/post plan next time.'" },
  { term: "Router", def: "Policy node that chooses the next skill/node.", example: "Route to Deep Research if citations requested." },
  { term: "Scratchpad / Evidence Store", def: "Working memory for notes, quotes, URLs, and results.", example: "Append 'quote + url + timestamp'." },
  { term: "Verifier / Judge", def: "Checks claims or compares alternatives.", example: "Cross‑check a statistic across two sources; pick most supported." },
  { term: "Approval Gate", def: "Human confirmation before risky actions.", example: "Ask before sending email or making a purchase." },
  { term: "State Store", def: "Persistent variables/messages across nodes.", example: "Keep user_id, budget_left, evidence[]." }
];

function useDebounced<T>(value: T, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => { const id = setTimeout(() => setV(value), delay); return () => clearTimeout(id); }, [value, delay]);
  return v;
}

export default function MermaidPatternExplorer() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<"default" | "neutral" | "dark" | "forest" | "base">("default");
  const [scale, setScale] = useState(100);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [panning, setPanning] = useState(false);
  const panStart = useRef<{ x: number; y: number } | null>(null);

  const [activeKey, setActiveKey] = useState(PATTERNS[0].key);
  const active = useMemo(() => PATTERNS.find(p => p.key === activeKey)!, [activeKey]);
  const debouncedCode = useDebounced(active.code, 200);
  const renderRef = useRef<HTMLDivElement | null>(null);
  const renderIdRef = useRef(0);

  // Node click state
  const [selectedNode, setSelectedNode] = useState<NodePromptData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mermaid init & render
  useEffect(() => { mermaid.initialize({ startOnLoad: false, theme }); }, [theme]);

  useEffect(() => {
    if (!renderRef.current) return;
    renderIdRef.current += 1;
    const renderId = `mmd-${renderIdRef.current}`;

    (async () => {
      try {
        const { svg } = await mermaid.render(renderId, debouncedCode);
        if (renderRef.current) {
          renderRef.current.innerHTML = svg;
          applyTransform();
          attachNodeClickHandlers();
        }
      } catch (e: any) {
        if (renderRef.current) {
          renderRef.current.innerHTML = `<pre class='text-red-600 text-sm whitespace-pre-wrap'>${(e?.message || e).toString()}</pre>`;
        }
      }
    })();
  }, [debouncedCode]);

  // Attach click handlers to SVG nodes
  const attachNodeClickHandlers = () => {
    if (!renderRef.current) return;

    const svgEl = renderRef.current.querySelector("svg");
    if (!svgEl) return;

    // Find all node elements (rectangles, circles, etc. with labels)
    const nodes = svgEl.querySelectorAll(".node");

    nodes.forEach((node) => {
      const labelEl = node.querySelector(".nodeLabel, text");
      if (!labelEl) return;

      const labelText = labelEl.textContent?.trim() || "";

      // Make node interactive
      (node as SVGElement).style.cursor = "pointer";
      (node as SVGElement).style.transition = "opacity 0.2s";

      node.addEventListener("mouseenter", () => {
        (node as SVGElement).style.opacity = "0.7";
      });

      node.addEventListener("mouseleave", () => {
        (node as SVGElement).style.opacity = "1";
      });

      node.addEventListener("click", (e) => {
        e.stopPropagation();
        const nodeData = getNodePrompts(labelText);
        if (nodeData) {
          setSelectedNode(nodeData);
          setDialogOpen(true);
        }
      });
    });
  };

  // Pan/Zoom
  const applyTransform = () => {
    const svgEl = renderRef.current?.querySelector("svg") as SVGElement | null;
    if (svgEl) {
      svgEl.style.transformOrigin = "0 0";
      svgEl.style.transform = `translate(${offset.x}px, ${offset.y}px) scale(${scale / 100})`;
    }
  };

  useEffect(() => { applyTransform(); }, [scale, offset]);

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const delta = -Math.sign(e.deltaY) * 10;
    const newScale = Math.min(400, Math.max(25, scale + delta));
    if (!renderRef.current) return setScale(newScale);
    const rect = renderRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const factor = newScale / scale;
    setOffset(({ x, y }) => ({ x: cx - factor * (cx - x), y: cy - factor * (cy - y) }));
    setScale(newScale);
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    panStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    setPanning(true);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!panning || !panStart.current) return;
    setOffset({ x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y });
  };

  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    (e.currentTarget as HTMLDivElement).releasePointerCapture?.(e.pointerId);
    setPanning(false);
  };

  const fitToWidth = () => {
    const container = renderRef.current;
    const svg = container?.querySelector("svg") as SVGGraphicsElement | null;
    if (!container || !svg) return;
    const cW = container.clientWidth - 24;
    const b = svg.getBBox();
    if (b.width > 0) {
      const s = Math.max(10, Math.min(800, Math.floor((cW / b.width) * 100)));
      setScale(s);
      setOffset({ x: 0, y: 0 });
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") setScale(s => Math.min(400, s + 10));
      if (e.key === "-") setScale(s => Math.max(25, s - 10));
      if (e.key.toLowerCase() === "f") fitToWidth();
      if (e.key === "0") { setScale(100); setOffset({ x: 0, y: 0 }); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => PATTERNS.filter(p => p.title.toLowerCase().includes(query.toLowerCase())), [query]);

  // Downloads
  const downloadSVG = () => {
    const svg = renderRef.current?.querySelector("svg");
    if (!svg) return;
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${active.key}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    const svg = renderRef.current?.querySelector("svg");
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const svg64 = btoa(unescape(encodeURIComponent(xml)));
    const image64 = `data:image/svg+xml;base64,${svg64}`;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${active.key}.png`;
        a.click();
        URL.revokeObjectURL(url);
      });
    };
    img.src = image64;
  };

  const example = EXAMPLES[active.key];

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <aside className="lg:col-span-3 space-y-3">
        <Card className="shadow-md border-slate-200">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Agent Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-slate-500" />
              <Input
                placeholder="Search patterns…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-slate-300"
              />
            </div>
            <div className="space-y-1 max-h-[40vh] overflow-auto pr-1">
              {filtered.map(p => (
                <Button
                  key={p.key}
                  variant={p.key === activeKey ? "default" : "ghost"}
                  className="w-full justify-start text-left"
                  onClick={() => {
                    setActiveKey(p.key);
                    setOffset({ x: 0, y: 0 });
                    setScale(100);
                  }}
                >
                  {p.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-slate-200">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                Glossary
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings2 className="w-4 h-4" />
                    {theme}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mermaid theme</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {(["default", "neutral", "dark", "forest", "base"] as const).map(t => (
                    <DropdownMenuItem key={t} onClick={() => setTheme(t)}>
                      {t}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="max-h-[38vh] overflow-auto">
              {GLOSSARY.map((g, i) => (
                <AccordionItem key={i} value={`g-${i}`}>
                  <AccordionTrigger className="text-sm font-semibold hover:text-blue-600">
                    {g.term}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-slate-700 mb-2">{g.def}</p>
                    <p className="text-xs text-slate-500">
                      <span className="font-semibold">Example:</span> {g.example}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </aside>

      {/* Main */}
      <main className="lg:col-span-9 grid gap-3" style={{ gridTemplateRows: "auto 1fr auto" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {active.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setScale(s => Math.max(25, s - 10))}>
              <ZoomOut className="w-4 h-4" />
              <span className="hidden sm:inline">Zoom Out</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setScale(s => Math.min(400, s + 10))}>
              <ZoomIn className="w-4 h-4" />
              <span className="hidden sm:inline">Zoom In</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={fitToWidth}>
              <Maximize className="w-4 h-4" />
              <span className="hidden sm:inline">Fit</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => { setScale(100); setOffset({ x: 0, y: 0 }); }}>
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={downloadSVG}>Download SVG</DropdownMenuItem>
                <DropdownMenuItem onClick={downloadPNG}>Download PNG</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Card className="shadow-md border-slate-200 overflow-hidden min-h-[55vh]">
          <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-row items-center justify-between">
            <CardTitle className="text-base">Interactive Diagram</CardTitle>
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="w-3 h-3" />
              Click nodes for prompts
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 py-2 bg-slate-50 border-b text-xs text-slate-600 flex flex-wrap gap-2">
              <span>💡 <strong>Drag</strong> to pan</span>
              <span>•</span>
              <span>🖱️ <strong>Wheel</strong> to zoom</span>
              <span>•</span>
              <span>⌨️ <strong>f</strong> = fit</span>
              <span>•</span>
              <span>⌨️ <strong>0</strong> = reset</span>
              <span>•</span>
              <span className="font-semibold text-blue-600">👆 Click nodes for example prompts</span>
            </div>
            <div
              ref={renderRef}
              className="overflow-auto border-t p-4 bg-white cursor-grab active:cursor-grabbing min-h-[50vh]"
              onWheel={onWheel}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
            />
          </CardContent>
        </Card>

        {/* Real example panel */}
        <Card className="shadow-md border-slate-200">
          <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="text-base">Real-World Example</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3 text-slate-800 font-semibold text-base">{example?.headline}</div>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
              {example?.steps.map((s, i) => (<li key={i}>{s}</li>))}
            </ol>
            {example?.snippet && (
              <div className="mt-4 text-xs text-slate-600 border-l-4 border-blue-400 rounded-md p-3 bg-blue-50">
                <strong className="text-blue-700">Output:</strong> {example.snippet}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bottom controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="text-xs text-slate-600 font-medium">Scale</span>
          <Slider value={[scale]} min={25} max={400} step={5} onValueChange={(v) => setScale(v[0])} className="w-full sm:w-64" />
          <span className="text-xs text-slate-600 font-mono">{scale}%</span>
          <div className="flex-1" />
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => navigator.clipboard.writeText((example?.steps || []).join("\n"))}
          >
            <Copy className="w-4 h-4" />
            Copy Steps
          </Button>
        </div>
      </main>

      {/* Node Prompt Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              {selectedNode?.nodeType}
            </DialogTitle>
            <DialogDescription className="text-base">
              {selectedNode?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {selectedNode?.examples.map((example, idx) => (
              <Card key={idx} className="border-2 border-slate-200">
                <CardHeader className="pb-3 bg-slate-50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-blue-700">{example.title}</CardTitle>
                      {example.context && (
                        <p className="text-sm text-slate-600 mt-1">{example.context}</p>
                      )}
                    </div>
                    {example.source && (
                      <Badge variant="secondary" className="shrink-0">
                        {example.source}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="relative">
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                      {example.prompt}
                    </pre>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 gap-1"
                      onClick={() => navigator.clipboard.writeText(example.prompt)}
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </Button>
                  </div>
                  {example.sourceUrl && (
                    <a
                      href={example.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View source documentation
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
