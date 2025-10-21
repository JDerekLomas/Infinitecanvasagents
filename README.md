# Mermaid Pattern Explorer

An interactive visualization tool for exploring AI agent patterns with real-world prompt examples from open systems like LangChain, AutoGPT, and more.

## ✨ Features

- **Interactive Diagrams**: Click on nodes to see example prompts and real implementations
- **10+ Agent Patterns**: ReAct, Reflexion, Tree of Thoughts, Multi-Agent Debate, and more
- **Real-World Examples**: Prompts from LangChain, AutoGPT, BabyAGI, MetaGPT, GPT Researcher, and other open systems
- **Pan & Zoom**: Smooth navigation with mouse, trackpad, and keyboard shortcuts
- **Export**: Download diagrams as SVG or PNG
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Theme Options**: Multiple Mermaid diagram themes

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
│   ├── ui/              # shadcn/ui components
│   └── MermaidPatternExplorer.tsx
├── data/
│   └── nodePrompts.ts   # Prompt examples database
├── lib/
│   └── utils.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🌐 Deployment

### Netlify (Recommended)

This project is configured for one-click deployment to Netlify:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

Or manually:

```bash
# Build the project
npm run build

# Deploy the dist/ folder to Netlify
```

The `netlify.toml` configuration handles:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA routing redirects

### Other Platforms

The built `dist/` folder can be deployed to:
- Vercel
- GitHub Pages
- Cloudflare Pages
- Any static hosting service

## 🤝 Contributing

Contributions welcome! To add new patterns or prompts:

1. Add pattern to `PATTERNS` array in `MermaidPatternExplorer.tsx`
2. Add example to `EXAMPLES` object
3. Add node prompts to `src/data/nodePrompts.ts`

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
