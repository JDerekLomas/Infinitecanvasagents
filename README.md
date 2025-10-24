# Mermaid Pattern Explorer

An interactive visualization tool for exploring AI agent patterns with real-world prompt examples from open systems like LangChain, AutoGPT, and more.

## ✨ Features

- **Interactive Diagrams**: Click on nodes to see example prompts and real implementations
- **10+ Agent Patterns**: ReAct, Reflexion, Tree of Thoughts, Multi-Agent Debate, and more
- **30+ Wellbeing Examples**: Real scenarios across Mental Health, Education, Personal Growth, Workplace, Community, and Physical Health domains
- **Evidence-Based**: Research-backed interventions, validated assessments, and practical implementations
- **Pan & Zoom**: Smooth navigation with mouse, trackpad, and keyboard shortcuts
- **Export**: Download diagrams as SVG or PNG
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Theme Options**: Multiple Mermaid diagram themes
- **Domain Badges**: Color-coded examples with contextual icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 How to Use

1. **Browse Patterns**: Select an agent pattern from the sidebar
2. **Explore Diagrams**: Pan (drag), zoom (scroll/wheel), or use keyboard shortcuts:
   - `+`/`-`: Zoom in/out
   - `f`: Fit to width
   - `0`: Reset view
3. **Click Nodes**: Click any node in the diagram to see example prompts
4. **View Examples**: See real-world examples at the bottom of each pattern
5. **Export**: Download diagrams for documentation or presentations

## 📚 Included Patterns

- **Deep Research**: Multi-stage research with verification
- **ReAct**: Reason + Act loop for tool use
- **Reflexion**: Self-reflection and improvement
- **Tree of Thoughts**: Parallel thought exploration
- **Multi-Agent Debate**: Collaborative reasoning
- **Assembly Line**: Sequential specialist agents
- **Router + Graph**: Dynamic skill routing
- **MCP**: Model Context Protocol integration
- **Computer Use**: UI automation agents
- **Web Researcher**: Search → Read → Cite workflow

## 🛠️ Tech Stack

- **React** + **TypeScript**: UI framework
- **Vite**: Build tool
- **Mermaid**: Diagram rendering
- **shadcn/ui**: UI components
- **Tailwind CSS**: Styling
- **Radix UI**: Accessible primitives

## 📦 Project Structure

```
src/
├── components/
│   ├── ui/                        # shadcn/ui components
│   └── MermaidPatternExplorer.tsx # Main component
├── data/
│   ├── nodePrompts.ts             # Technical prompt examples
│   └── wellbeingExamples.ts       # Wellbeing-focused scenarios
├── lib/
│   └── utils.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🌐 Deployment

### Vercel (Recommended)

This project is optimized for Vercel with zero-configuration deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JDerekLomas/Infinitecanvasagents)

**Option 1: Deploy via Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite settings
5. Click "Deploy"

**Option 2: Deploy via Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

The `vercel.json` configuration handles:
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing redirects
- Framework: Vite (auto-detected)

### Netlify

Alternative deployment to Netlify:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

Or via CLI:

```bash
# Build the project
npm run build

# Deploy the dist/ folder to Netlify
netlify deploy --prod
```

The `netlify.toml` configuration handles:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA routing redirects

### Other Platforms

The built `dist/` folder can be deployed to:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static hosting service

## 🤝 Contributing

Contributions welcome! To add new patterns or examples:

1. **Add a new pattern**: Update `PATTERNS` array in `MermaidPatternExplorer.tsx` with Mermaid diagram code
2. **Add wellbeing examples**: Add scenarios to `src/data/wellbeingExamples.ts` (categorized by domain)
3. **Add node prompts**: Add technical prompts to `src/data/nodePrompts.ts` (mapped to node types)

Example domains for wellbeing scenarios:
- Mental Health, Education, Personal Growth
- Workplace, Community, Physical Health

## 📝 License

MIT

## 🙏 Acknowledgments

Built with prompts and examples from:
- [LangChain](https://github.com/langchain-ai/langchain)
- [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT)
- [BabyAGI](https://github.com/yoheinakajima/babyagi)
- [MetaGPT](https://github.com/geekan/MetaGPT)
- [GPT Researcher](https://github.com/assafelovic/gpt-researcher)
- [OpenDevin](https://github.com/OpenDevin/OpenDevin)
- And many other open-source AI agent projects

---

Made with ❤️ for the AI agent community
