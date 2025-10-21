// Node-level prompt examples for interactive exploration
// Maps node types/roles to example prompts and real-world implementations

export interface PromptExample {
  title: string;
  prompt: string;
  source?: string;
  sourceUrl?: string;
  context?: string;
}

export interface NodePromptData {
  nodeType: string;
  description: string;
  examples: PromptExample[];
}

export const NODE_PROMPTS: Record<string, NodePromptData> = {
  // Common agent roles
  "Planner": {
    nodeType: "Planner",
    description: "Breaks down complex tasks into actionable subtasks",
    examples: [
      {
        title: "LangChain PlanAndExecute",
        prompt: `Given the user query: "{query}"

Please create a step-by-step plan to answer this query. Each step should be a specific, actionable task.

Format your response as:
1. [First step]
2. [Second step]
...

Keep steps granular and executable by individual tools or agents.`,
        source: "LangChain",
        sourceUrl: "https://github.com/langchain-ai/langchain/tree/master/libs/langchain/langchain/experimental/plan_and_execute",
        context: "Used in LangChain's Plan-and-Execute agent pattern"
      },
      {
        title: "AutoGPT Task Decomposition",
        prompt: `You are a task planning AI. Break down this goal into concrete, achievable tasks:

GOAL: {user_goal}

For each task, specify:
- Task description
- Required resources/tools
- Expected output
- Dependencies on other tasks

Output as JSON array of task objects.`,
        source: "AutoGPT",
        sourceUrl: "https://github.com/Significant-Gravitas/AutoGPT",
        context: "AutoGPT's planning phase for autonomous goal achievement"
      },
      {
        title: "BabyAGI Task Creation",
        prompt: `Based on the objective and the result of the last completed task, create new tasks to be completed.

Objective: {objective}
Last completed task: {last_task}
Result: {result}

Return tasks as a numbered list.`,
        source: "BabyAGI",
        sourceUrl: "https://github.com/yoheinakajima/babyagi",
        context: "Creates new tasks dynamically based on progress"
      }
    ]
  },

  "Researcher": {
    nodeType: "Researcher",
    description: "Gathers information from various sources",
    examples: [
      {
        title: "LangChain Research Agent",
        prompt: `You are a research assistant. For the topic: "{topic}"

1. Identify 3-5 key questions to investigate
2. Search for authoritative sources
3. Extract relevant facts and quotes
4. Cite all sources with URLs

Provide a structured research summary with citations.`,
        source: "LangChain",
        context: "Research agent with tool access"
      },
      {
        title: "GPT Researcher",
        prompt: `Research Query: {query}

Execute comprehensive research:
1. Generate diverse search queries (minimum 5)
2. Scrape and analyze top 10 results per query
3. Extract key facts, statistics, and expert opinions
4. Cross-reference information across sources
5. Compile findings with source attribution

Output: Detailed research report with citations.`,
        source: "GPT Researcher",
        sourceUrl: "https://github.com/assafelovic/gpt-researcher",
        context: "Autonomous research agent for comprehensive reports"
      }
    ]
  },

  "Searcher": {
    nodeType: "Searcher",
    description: "Executes search queries to find relevant information",
    examples: [
      {
        title: "Web Search Tool Call",
        prompt: `Based on the research goal: "{goal}"

Generate 3-5 optimized search queries that will:
- Cover different aspects of the topic
- Use specific, targeted keywords
- Include relevant date ranges if needed

Format: Return queries as JSON array.`,
        source: "Generic RAG Pattern",
        context: "Query generation for web search"
      },
      {
        title: "Perplexity-style Search",
        prompt: `Question: {user_question}

Generate focused search queries to answer this question:
1. Main query covering the core question
2. Supporting queries for context and details
3. Validation queries for fact-checking

Return as list of search strings.`,
        source: "Perplexity AI Pattern",
        context: "Multi-query search strategy"
      }
    ]
  },

  "Reader": {
    nodeType: "Reader / Extractor",
    description: "Reads and extracts relevant information from documents",
    examples: [
      {
        title: "Document Extraction",
        prompt: `Document URL: {url}
Research Question: {question}

Extract:
1. Relevant quotes that directly answer the question
2. Supporting statistics or data points
3. Author credentials/source credibility indicators
4. Publication date

Format as structured JSON with page/section references.`,
        source: "Generic RAG",
        context: "Information extraction from documents"
      },
      {
        title: "LlamaIndex Document Parser",
        prompt: `Parse this document and extract:
- Main claims and arguments
- Supporting evidence
- Key entities (people, places, organizations)
- Dates and temporal information

Document: {document_text}

Create a structured summary suitable for semantic search.`,
        source: "LlamaIndex",
        sourceUrl: "https://github.com/run-llama/llama_index",
        context: "Document parsing for knowledge bases"
      }
    ]
  },

  "Think": {
    nodeType: "Think / Reason",
    description: "Reasons about the current state and decides next action",
    examples: [
      {
        title: "ReAct Thought",
        prompt: `Thought: Let me think about what I need to do next.

Current situation: {context}
Goal: {goal}
Tools available: {tools}

I should... [your reasoning]

Action: [tool_name]
Action Input: [tool_input]`,
        source: "ReAct Pattern",
        sourceUrl: "https://arxiv.org/abs/2210.03629",
        context: "Reasoning step in ReAct (Reason + Act) pattern"
      },
      {
        title: "Chain-of-Thought",
        prompt: `Let's solve this step by step:

Problem: {problem}

Step 1: [First reasoning step]
Step 2: [Second reasoning step]
...

Therefore, [conclusion]`,
        source: "Chain-of-Thought Prompting",
        context: "Explicit reasoning chain"
      }
    ]
  },

  "Act": {
    nodeType: "Act / Tool Call",
    description: "Executes actions using available tools",
    examples: [
      {
        title: "Function Calling",
        prompt: `Based on my reasoning, I will now execute:

Tool: {tool_name}
Parameters: {
  "param1": "value1",
  "param2": "value2"
}

Justification: {why_this_tool}`,
        source: "OpenAI Function Calling",
        context: "Structured tool execution"
      },
      {
        title: "LangChain Tool Use",
        prompt: `Action: {tool_name}
Action Input: {input_json}

[System will execute and return result]`,
        source: "LangChain",
        context: "Standardized tool invocation format"
      }
    ]
  },

  "Observe": {
    nodeType: "Observe",
    description: "Processes and records tool/action results",
    examples: [
      {
        title: "ReAct Observation",
        prompt: `Observation: {tool_result}

Analysis:
- What this tells us: [interpretation]
- How it relates to the goal: [relevance]
- What's still missing: [gaps]

Next: [continue/finish]`,
        source: "ReAct Pattern",
        context: "Processing tool results"
      }
    ]
  },

  "Reflect": {
    nodeType: "Reflect / Self-Critique",
    description: "Analyzes past attempts and generates improvement strategies",
    examples: [
      {
        title: "Reflexion Self-Reflection",
        prompt: `Trial: {trial_number}
Task: {task}
Outcome: {outcome}
Feedback: {feedback}

Reflection:
1. What went wrong? [analysis]
2. Why did this approach fail? [root cause]
3. What should I do differently? [strategy]

Memory: Store this lesson for future trials.`,
        source: "Reflexion",
        sourceUrl: "https://arxiv.org/abs/2303.11366",
        context: "Self-reflection after failed attempts"
      },
      {
        title: "Self-Refine Critique",
        prompt: `Generated Output: {output}
Criteria: {quality_criteria}

Critique:
- Strengths: [what works well]
- Weaknesses: [what needs improvement]
- Specific improvements: [actionable changes]

Refined Version: [improved output]`,
        source: "Self-Refine",
        sourceUrl: "https://arxiv.org/abs/2303.17651",
        context: "Iterative self-improvement"
      }
    ]
  },

  "Verifier": {
    nodeType: "Verifier / Judge",
    description: "Validates information or evaluates alternatives",
    examples: [
      {
        title: "Fact Verification",
        prompt: `Claim: {claim}
Source 1: {source1}
Source 2: {source2}

Verification:
- Do sources agree? [yes/no]
- Confidence level: [high/medium/low]
- Discrepancies: [list any conflicts]
- Verdict: [verified/unverified/conflicting]`,
        source: "Generic Verification Pattern",
        context: "Cross-checking facts across sources"
      },
      {
        title: "Constitutional AI Critic",
        prompt: `Review this output against our principles:

Output: {output}

Principles:
1. {principle1}
2. {principle2}
...

Evaluation:
- Principle 1: [pass/fail - explanation]
- Principle 2: [pass/fail - explanation]

Recommendation: [approve/revise/reject]`,
        source: "Constitutional AI",
        sourceUrl: "https://arxiv.org/abs/2212.08073",
        context: "Principle-based output validation"
      }
    ]
  },

  "Writer": {
    nodeType: "Writer / Synthesizer",
    description: "Synthesizes information into coherent output",
    examples: [
      {
        title: "Research Report Writer",
        prompt: `Evidence: {evidence_items}
Citations: {citations}

Create a comprehensive report:

## Executive Summary
[2-3 sentence overview]

## Key Findings
[Numbered findings with citations]

## Detailed Analysis
[In-depth discussion]

## Sources
[Formatted citations]

Ensure all claims are cited.`,
        source: "Generic Research Agent",
        context: "Final report synthesis"
      },
      {
        title: "Multi-Perspective Synthesis",
        prompt: `Synthesize these different perspectives:

Perspective A: {perspective_a}
Perspective B: {perspective_b}
Perspective C: {perspective_c}

Create a balanced synthesis that:
- Acknowledges all viewpoints
- Identifies common ground
- Notes key disagreements
- Provides nuanced conclusion`,
        source: "Multi-Agent Debate Pattern",
        context: "Synthesizing multiple agent outputs"
      }
    ]
  },

  "Router": {
    nodeType: "Router / Policy",
    description: "Decides which agent or skill to invoke next",
    examples: [
      {
        title: "Intent Classification",
        prompt: `User Input: {user_input}

Classify intent and route to appropriate handler:

Available Handlers:
- research_agent: For questions requiring web search
- calculator: For mathematical computations
- code_execution: For running code
- direct_response: For simple questions

Classification:
Intent: [handler_name]
Confidence: [0-1]
Reasoning: [why this handler]`,
        source: "Generic Routing Pattern",
        context: "Intent-based routing"
      },
      {
        title: "LangGraph Router",
        prompt: `Current State: {state}

Determine next node:
- If research_needed: goto researcher
- If code_needed: goto coder
- If ready_to_respond: goto writer
- Otherwise: goto planner

Decision: [node_name]
Reason: [explanation]`,
        source: "LangGraph",
        sourceUrl: "https://github.com/langchain-ai/langgraph",
        context: "State-based graph routing"
      }
    ]
  },

  "Coder": {
    nodeType: "Coder",
    description: "Writes and executes code",
    examples: [
      {
        title: "Code Generation",
        prompt: `Task: {task_description}

Generate code that:
1. Solves the specified problem
2. Includes error handling
3. Is well-commented
4. Follows best practices

Language: {language}

Provide:
- Complete code
- Usage example
- Expected output`,
        source: "Generic Code Agent",
        context: "Code generation task"
      },
      {
        title: "OpenDevin Code Agent",
        prompt: `Implement: {feature_description}

Steps:
1. Analyze requirements
2. Design solution
3. Write code
4. Add tests
5. Document usage

Files to create/modify: [list]
Implementation: [code]`,
        source: "OpenDevin",
        sourceUrl: "https://github.com/OpenDevin/OpenDevin",
        context: "Autonomous coding agent"
      }
    ]
  },

  "Tester": {
    nodeType: "Tester",
    description: "Tests and validates code or outputs",
    examples: [
      {
        title: "Test Case Generation",
        prompt: `Code: {code}

Generate comprehensive test cases:

1. Happy path tests
2. Edge cases
3. Error conditions
4. Performance considerations

For each test:
- Input
- Expected output
- Assertions`,
        source: "Generic Testing Pattern",
        context: "Automated test generation"
      }
    ]
  },

  "Judge": {
    nodeType: "Judge / Evaluator",
    description: "Evaluates competing options and makes decisions",
    examples: [
      {
        title: "Multi-Agent Debate Judge",
        prompt: `Debate Topic: {topic}

Agent A Position: {position_a}
Agent B Position: {position_b}

Evaluate:
1. Strength of arguments
2. Evidence quality
3. Logical consistency

Decision: [which position is stronger and why]`,
        source: "Multi-Agent Debate",
        context: "Judging debate outcomes"
      },
      {
        title: "Tree of Thoughts Evaluator",
        prompt: `Thought Branches: {branches}

Evaluate each branch:
- Likelihood of success: [score]
- Alignment with goal: [score]
- Feasibility: [score]

Select top 2 branches to explore further.`,
        source: "Tree of Thoughts",
        sourceUrl: "https://arxiv.org/abs/2305.10601",
        context: "Evaluating thought branches"
      }
    ]
  },

  "Controller": {
    nodeType: "Controller / Orchestrator",
    description: "Manages overall workflow and agent coordination",
    examples: [
      {
        title: "MetaGPT Orchestrator",
        prompt: `Project: {project_description}

Orchestration:
1. Assign roles: [PM, Architect, Engineer, QA]
2. Define workflow: [sequence of interactions]
3. Monitor progress
4. Coordinate handoffs
5. Ensure deliverables

Current Phase: {phase}
Next Action: [what to execute]`,
        source: "MetaGPT",
        sourceUrl: "https://github.com/geekan/MetaGPT",
        context: "Multi-agent software development orchestration"
      }
    ]
  },

  "Retriever": {
    nodeType: "Retriever",
    description: "Retrieves relevant information from knowledge bases",
    examples: [
      {
        title: "RAG Retrieval",
        prompt: `Query: {query}

Retrieve relevant documents:
1. Convert query to embedding
2. Search vector store
3. Rank by relevance
4. Return top-k results with scores

Parameters:
- top_k: 5
- min_similarity: 0.7`,
        source: "RAG Pattern",
        context: "Vector database retrieval"
      }
    ]
  },

  "Memory": {
    nodeType: "Memory / Evidence Store",
    description: "Stores and retrieves information from previous interactions",
    examples: [
      {
        title: "Episodic Memory Storage",
        prompt: `Store this experience:

Event: {event_description}
Outcome: {outcome}
Lesson: {lesson_learned}
Timestamp: {timestamp}

Tags: [relevant tags for retrieval]`,
        source: "Reflexion / Voyager",
        context: "Long-term memory storage"
      }
    ]
  }
};

// Helper function to get prompts for a specific node
export function getNodePrompts(nodeName: string): NodePromptData | null {
  // Normalize node name (remove numbers, special chars, lowercase)
  const normalized = nodeName.replace(/[0-9\[\]]/g, '').trim();

  // Try exact match first
  if (NODE_PROMPTS[normalized]) {
    return NODE_PROMPTS[normalized];
  }

  // Try partial match
  for (const [key, data] of Object.entries(NODE_PROMPTS)) {
    if (normalized.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(normalized.toLowerCase())) {
      return data;
    }
  }

  return null;
}
