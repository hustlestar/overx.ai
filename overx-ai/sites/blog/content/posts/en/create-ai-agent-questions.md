---
title: "AI Agent Design: A Technical Framework"
excerpt: "Production-grade AI agent development framework addressing core engineering challenges through seven technical questions. Based on practical development experience."
coverImage: "/images/posts/create-ai-agent-hero.png"
images:
  - url: "/images/posts/create-ai-agent-hero.png"
    alt:
      en: "Technical AI agent architecture planning with data flows and system design"
      es: "Planificación técnica de arquitectura de agentes de IA con flujos de datos y diseño de sistemas"
      ru: "Техническое планирование архитектуры ИИ-агента с потоками данных и дизайном системы"
    width: 1344
    height: 768
    type: "hero"
  - url: "/images/posts/ai-agent-7-questions-infographic.png"
    alt:
      en: "Technical framework: 7 engineering questions for production AI agent design"
      es: "Marco técnico: 7 preguntas de ingeniería para diseño de agentes de IA en producción"
      ru: "Техническая структура: 7 инженерных вопросов для разработки производственных ИИ-агентов"
    width: 1312
    height: 736
    type: "featured"
  - url: "/images/posts/ai-agent-decision-flow.png"
    alt:
      en: "Layered decision architecture with validation checkpoints and error handling"
      es: "Arquitectura de decisiones en capas con puntos de validación y manejo de errores"
      ru: "Многоуровневая архитектура принятия решений с контрольными точками и обработкой ошибок"
    width: 1152
    height: 896
    type: "content"
  - url: "/images/posts/ai-agent-comparison.png"
    alt:
      en: "Architecture comparison: experimental agent vs production-grade agent with failure handling"
      es: "Comparación de arquitectura: agente experimental vs agente de producción con manejo de fallos"
      ru: "Сравнение архитектуры: экспериментальный агент против производственного агента с обработкой сбоев"
    width: 1536
    height: 640
    type: "content"
date: "2025-11-03T09:00:00.000Z"
lastModified: "2025-11-03T09:00:00.000Z"
author: "jack-ma"
category: "ai-insights"
tags: ["ai-agents", "agent-architecture", "production-ai", "langchain", "langgraph", "llamaindex", "mcp", "ai-engineering"]
featured: true
seo:
  metaTitle: "AI Agent Design: Technical Framework for Production Systems | OverX AI"
  metaDescription: "Production-grade AI agent development framework addressing data architecture, tool integration, evaluation, and failure handling. LangChain vs LangGraph vs LlamaIndex."
  metaKeywords: ["AI agent architecture", "production AI agents", "LangChain vs LangGraph", "LlamaIndex", "MCP protocol", "AI agent evaluation", "agent failure handling", "RAG architecture"]
  canonicalUrl: "https://blog.overx.ai/post/create-ai-agent-questions"
---

## Introduction

Most AI agents fail in production not due to poor implementation, but due to inadequate architectural planning. This guide presents a technical framework for designing production-grade AI agents, based on practical development experience.

The framework consists of seven technical questions that address the core engineering challenges in agent development. Each question targets a specific failure mode commonly observed in production systems.

---

![Technical Framework](/images/posts/ai-agent-7-questions-infographic.png)

## Question 1: What data does the agent require, and how will it be accessed?

Data architecture for AI agents differs fundamentally from traditional applications. Agents need to retrieve, reason over, and sometimes modify data dynamically based on task requirements.

### Critical considerations:

**Storage architecture decisions:**

**When to use vector databases:**
- Agent needs semantic search over unstructured data
- Retrieval based on meaning, not exact matches
- Document collections, knowledge bases, conversation history
- Examples: Pinecone, Weaviate, Qdrant, Chroma
- Cost: Storage + embedding generation + query costs

**When to use RDBMS:**
- Structured data with relationships
- Transactional integrity required
- Complex filtering and joins needed
- Examples: Customer records, order history, inventory
- Agent queries via SQL generation or ORM

**When to use graph databases:**
- Entity relationships are central to reasoning
- Multi-hop queries across connections
- Knowledge graphs, organizational structures
- Examples: Neo4j, Amazon Neptune
- Agent traverses relationships for context

**When to use key-value stores:**
- Session state and conversation memory
- Rapid read/write for agent state
- Caching intermediate results
- Examples: Redis, DynamoDB
- Low latency critical for agent loops

**Hybrid architectures:**

Most production agents use multiple storage types:

Example: Customer support agent
- Vector DB: Product documentation, past tickets (semantic search)
- RDBMS: Customer data, order history (structured queries)
- Redis: Conversation state, recent context (fast access)
- S3: Attachments, images, files (blob storage)

**Data access patterns specific to agents:**

**Retrieval-augmented generation (RAG):**
- Agent queries vector DB for relevant context
- Context injected into LLM prompt
- Challenge: Balancing context size vs. relevance
- Strategy: Multi-stage retrieval (broad → narrow)

**Dynamic data fetching:**
- Agent decides which data to fetch based on task
- Tool calling to access different data sources
- Challenge: Latency compounds across multiple calls
- Strategy: Parallel fetching when dependencies allow

**State management:**
- Short-term memory: Current conversation (in-memory or Redis)
- Long-term memory: User preferences, history (RDBMS)
- Challenge: What to remember vs. what to forget
- Strategy: Summarization for older context, importance scoring

**Real-time vs. indexed data:**
- Indexed: Pre-embedded documents in vector DB (fast, potentially stale)
- Real-time: Fetch and embed on-demand (slow, always fresh)
- Challenge: When is staleness acceptable?
- Strategy: Hybrid—index static content, real-time for dynamic

**Data freshness strategies:**

**For vector databases:**
- Incremental updates: Re-embed only changed documents
- Scheduled rebuilds: Full re-indexing weekly/monthly
- Version tracking: Maintain multiple index versions
- Problem: Embeddings don't automatically update when source changes

**For RDBMS:**
- Cache with TTL for frequently accessed data
- Event-driven invalidation for critical updates
- Read replicas for scaling read-heavy agents
- Problem: Replication lag in distributed systems

**Agent-specific data quality issues:**

**Embedding quality:**
- Chunk size affects retrieval quality (too small: no context, too large: noise)
- Embedding model matters (OpenAI vs. open source vs. fine-tuned)
- Metadata filtering reduces search space but may miss relevant results
- Testing: Query test set and measure retrieval precision/recall

**Context window management:**
- Agent must decide what data fits in limited context
- Prioritization: Most relevant? Most recent? Highest confidence?
- Truncation strategy: Remove middle? Summarize? Split query?
- Testing: Verify critical information not lost in truncation

**Multi-source consistency:**
- Agent may get conflicting data from different sources
- Strategy: Source priority ranking, conflict resolution rules
- Example: Real-time API conflicts with cached data—which to trust?
- Testing: Inject conflicts and verify agent handles correctly

### Technical checklist:

- [ ] Storage types justified for each data category (vector/RDBMS/graph/KV)
- [ ] Embedding strategy defined (model, chunk size, update frequency)
- [ ] Context window management strategy documented
- [ ] Multi-source data consistency rules defined
- [ ] Memory strategy: what persists vs. what's ephemeral
- [ ] Data access latency measured per source
- [ ] Cost analysis: storage + embeddings + queries at expected scale
- [ ] Retrieval quality metrics: precision/recall on test queries
- [ ] Cache strategy: what to cache, TTL, invalidation triggers
- [ ] Fallback when primary data unavailable: degrade vs. fail

---

## Question 2: What is the appropriate architectural complexity?

Not every task requires an AI agent framework. Selecting the correct architecture prevents unnecessary complexity and reduces operational costs.

### Decision matrix:

**Deterministic logic (if-else):**
- All inputs are structured
- Output is fully deterministic
- Rule set is manageable (<50 rules)
- Example: Email routing by sender domain

**Workflow automation (n8n, Zapier, Airflow):**
- Sequential API calls
- No reasoning required
- State transitions are predefined
- Example: "New signup → Add to CRM → Send welcome email"

**When n8n is technically sufficient but suboptimal:**

n8n can handle many workflows that involve API orchestration and simple conditional logic. However, consider these limitations:

*Cons of n8n for agent-like tasks:*
- No native LLM reasoning or dynamic decision-making
- Limited error recovery and retry strategies
- Difficult to version control workflow changes
- Challenging to implement complex validation logic
- No built-in evaluation or testing frameworks
- Scaling requires managing multiple workflow instances
- Debugging complex flows is GUI-dependent
- Limited observability for decision traces
- Difficult to implement gradual rollout strategies

n8n works well for straightforward automation but becomes problematic when tasks require:
- Context-dependent decision making
- Dynamic tool selection based on intermediate results
- Complex error handling with backtracking
- Sophisticated validation and safety checks
- A/B testing of logic changes
- Detailed performance metrics per decision point

**LLM in pipeline (single model call):**
- Natural language understanding required
- Classification or generation task
- No multi-step reasoning
- Example: Sentiment analysis, content categorization

**Agent framework - LangChain:**
- Basic tool chaining needed
- Sequential reasoning workflows
- Simpler agent patterns (ReAct, conversational)
- Rapid prototyping priority
- Example: Customer support bot with knowledge base lookup

**Agent framework - LlamaIndex:**
- Data retrieval and search is central to the task
- RAG (Retrieval-Augmented Generation) workflows
- Working primarily with documents and knowledge bases
- Query understanding and routing needed
- Event-driven data ingestion workflows
- Example: Document Q&A system, research assistant

**Agent framework - LangGraph:**
- Complex multi-step reasoning with conditional paths
- Cyclic graphs and backtracking required
- State management across multiple agent calls
- Fine-grained control over execution flow
- Example: Research task requiring iteration and refinement

**Multi-agent system (CrewAI, AutoGen):**
- Task parallelization needed
- Role specialization improves results
- Complex coordination required
- Example: Competitive analysis with research, analysis, and reporting agents

### LlamaIndex vs LangGraph: Technical Comparison

**LlamaIndex strengths:**

**Specialized for data ingestion and retrieval workflows**
- Built-in connectors for 100+ data sources (databases, APIs, file systems)
- Optimized ingestion pipelines handle large document collections efficiently
- Automatic chunking strategies tested at scale

**Event-driven architecture**
- Workflow engine for building complex retrieval pipelines
- Event-driven approach allows reactive agent behaviors
- Faster development for retrieval-heavy applications
- Example: New document arrives → trigger embedding → update index → notify agent
- This reduces boilerplate significantly compared to LangGraph's manual state management

**Optimized indexing strategies**
- Vector indices, tree indices, keyword indices, knowledge graphs
- Composable indices for hierarchical retrieval
- Query routing across multiple indices automatically

**Query engines with sophisticated retrieval**
- Sub-question decomposition for complex queries
- Multi-document retrieval and synthesis
- Retrieval with filtering and metadata

**Agent capabilities are secondary to retrieval**

Meaning: LlamaIndex agents can use tools and make decisions, but the framework is optimized for the retrieval workflow, not general agent orchestration. If your agent's primary job is "find relevant information and answer questions," LlamaIndex excels. If your agent needs complex decision trees, conditional logic, or multi-step planning where retrieval is just one tool among many, LlamaIndex becomes awkward.

Example: Building a customer support agent
- LlamaIndex shines: 80% of work is searching documentation
- LlamaIndex struggles: Agent needs to check inventory, process refunds, update tickets—retrieval is 20% of task

**More opinionated architecture**

Meaning: LlamaIndex makes strong assumptions about how you structure data and retrieval workflows. It provides clear patterns (index types, query engines, retrievers) but deviating from these patterns requires fighting the framework.

Example: You want custom retrieval logic
- LlamaIndex: Must work within their Retriever abstraction, override specific methods
- LangGraph: Build whatever retrieval logic you want as a node in the graph

This is good when the opinions match your use case (faster development), bad when they don't (framework friction).

**LlamaIndex limitations:**

**Less flexible for non-RAG workflows**
- If agent needs to orchestrate APIs, databases, and external tools where retrieval is secondary, LlamaIndex adds overhead
- Framework assumes retrieval is central; other tasks feel bolted on

**Agent capabilities feel secondary**
- ReAct agents exist but are less mature than retrieval features
- Multi-agent orchestration possible but not the framework's strength
- Tool calling works but doesn't feel as natural as in LangGraph

**LangGraph strengths:**

**Full control over agent execution flow**
- Define exactly how agent moves between states
- Conditional branching, loops, parallel execution—all explicit
- No hidden logic; you see the entire execution path

**Explicit state management with StateGraph**
- Agent state is a typed object you define
- Each node reads and modifies state explicitly
- Easier to debug: inspect state at any point
- Easier to test: inject state and verify node behavior

**Supports cyclic workflows and conditional branching**
- Agent can revisit previous steps based on outcomes
- Essential for research tasks, iterative refinement, error recovery
- Example: Generate draft → Critique → Revise → Critique again → Finalize

**Better for complex multi-step reasoning**
- When agent needs to plan, execute, evaluate, replan
- When different paths through logic based on intermediate results
- When backtracking or trying alternative approaches needed

**Built-in checkpointing and replay**
- Save agent state at any point
- Resume from checkpoint after failure
- Replay execution for debugging
- Critical for long-running agent tasks

**LangGraph limitations:**

**More boilerplate for simple RAG workflows**
- Must explicitly define retrieval nodes, state updates, edges
- LlamaIndex gives you this out of the box
- Simple "retrieve and answer" takes more code

**Less optimized for pure search/retrieval**
- No built-in index types or retrieval strategies
- You integrate with vector DBs manually
- Retrieval quality depends on your implementation

**No event-driven patterns built in**
- You build reactive behaviors manually
- More code for workflows triggered by data changes
- LlamaIndex's event system handles this naturally

### Decision criteria:

**Choose LlamaIndex when:**
- Primary task is document search and Q&A
- You need sophisticated query understanding and decomposition
- RAG is the core pattern (80%+ of agent work)
- You want optimized indexing strategies out of the box
- You need event-driven data ingestion and updates
- Rapid development of retrieval-heavy applications is priority
- Example: Documentation chatbot, research assistant, knowledge base Q&A

**Choose LangGraph when:**
- Complex decision trees with conditional branching
- Multi-step reasoning requiring state management
- Cyclic workflows where agent revisits previous steps
- Retrieval is one tool among many (not the primary pattern)
- You need fine-grained control and debugging capabilities
- Long-running tasks requiring checkpointing
- Example: Research analyst, task automation, workflow orchestration

**Choose LangChain when:**
- Simple sequential chains sufficient
- Prototyping quickly is priority
- Standard patterns (ReAct, conversational) meet requirements
- You don't need complex state management or cycles

---

## Question 2.5: How should the agent access external systems—direct API calls, tools, or MCP?

This is a frequently overlooked decision that significantly impacts agent architecture, maintainability, and debugging complexity.

### The three approaches:

**1. Direct API calls in agent code**
**2. Tool/function calling abstractions**
**3. Model Context Protocol (MCP)**

Tool calling and MCP are related concepts on a spectrum of abstraction. Tool calling gives the LLM access to functions; MCP standardizes how those functions are exposed and discovered. Understanding when each is appropriate prevents over-engineering.

### When to use direct API calls:

**Appropriate scenarios:**
- Agent needs explicit control over request/response handling
- Custom error handling logic required per endpoint
- Complex authentication flows (OAuth, token refresh)
- Request/response transformation is non-trivial
- API rate limiting requires sophisticated logic
- You need request batching or caching strategies

**Example: Direct API control**

Consider a customer support agent that needs to check order status:

```
Direct API approach:
1. Agent retrieves customer ID from context
2. Your code explicitly calls OrderService.get_order(customer_id)
3. Your code handles timeout, retry, rate limiting
4. Your code transforms response into context for LLM
5. Your code validates response before passing to agent
6. Full visibility into what's happening
```

**Advantages:**
- Complete control over execution flow
- Easy to debug: set breakpoints, inspect requests/responses
- Custom caching, batching, circuit breakers
- Type safety with client libraries
- No abstraction layer hiding problems
- Clear error propagation

**Disadvantages:**
- More boilerplate code
- Agent doesn't "decide" when to call—you orchestrate
- Less flexible if agent needs to discover tools dynamically

**When this is optimal:**
- You have 3-10 well-defined integration points
- APIs require complex error handling
- You need predictable, debuggable execution
- Performance optimization critical (caching, batching)
- Security/compliance requires explicit control

### When to use tool/function calling:

**Appropriate scenarios:**
- Agent needs to decide which tool to use based on context
- Dynamic tool selection from larger set (10+ tools)
- You want LLM to reason about which API to call
- Tools are relatively independent (no complex orchestration)

**How it works:**
- You define tool schemas (name, description, parameters)
- LLM receives tool descriptions in every request
- LLM decides which tool to call and with what parameters
- Your code executes the tool and returns results
- LLM processes results and decides next action

**Advantages:**
- Agent autonomy: LLM chooses appropriate tool
- Easier to add new tools without changing orchestration logic
- Natural language to structured API calls
- Agent can chain tools based on intermediate results

**Disadvantages:**
- LLM may hallucinate tool parameters
- Debugging harder: Why did LLM choose this tool?
- Token costs: Tool schemas sent with every request
- Less control over execution order
- Error handling passed through LLM interpretation

**When this is optimal:**
- Agent needs to select from many possible actions
- Tool selection requires reasoning over context
- You want agent to discover optimal tool sequences
- Tools are mostly independent operations
- You can tolerate occasional tool selection errors

### When to use MCP (Model Context Protocol):

**What MCP actually is:**
- Standardized protocol for exposing data sources and tools to LLMs
- Server-side resources that agents can discover and use
- Abstracts tool implementations from agent code
- Promotes reusability across different agents/applications
- Think of it as: tool calling + standardization + remote execution + discoverability

**The relationship between tool calling and MCP:**

Tool calling is the mechanism; MCP is the standardization layer:
- Tool calling: LLM invokes functions you've defined
- MCP: Standardized way to expose those functions, run them on separate servers, share them across agents

MCP = Tool calling + Remote execution + Standardized protocol + Discovery

**Appropriate scenarios:**
- Multiple agents need same tool integrations
- You want to centralize tool governance
- Third-party tool providers expose MCP servers
- You're building a platform where users add custom tools
- Tool implementations change frequently, agents shouldn't

**Example architecture:**
```
Without MCP (tool calling):
Agent 1 code → defines Slack tool → executes locally
Agent 2 code → defines same Slack tool → executes locally (duplicated)
Agent 3 code → defines same Slack tool → executes locally (duplicated)

With MCP:
Agent 1 → MCP Client → (network) → MCP Slack Server
Agent 2 → MCP Client → (network) → MCP Slack Server
Agent 3 → MCP Client → (network) → MCP Slack Server
```

**Advantages:**
- Reusability: Write tool integration once, use in multiple agents
- Governance: Centralized control over tool access and permissions
- Discoverability: Agents can query available tools dynamically
- Security: Tools run on separate servers with their own auth
- Updates: Change tool implementation without touching agents
- Sandboxing: User-provided tools run isolated from agent code

**Disadvantages:**
- Additional infrastructure complexity (servers, networking, deployment)
- Network calls add latency (extra round-trip per tool execution)
- Harder to debug: tool execution happens remotely
- Another layer of abstraction to understand
- Limited ecosystem (new standard, few servers available)
- Version management across MCP servers and clients
- Operational overhead: monitoring, scaling MCP servers

### The abstraction spectrum:

```
Direct API calls → Tool calling → MCP
      ↓                ↓           ↓
Most control      Moderate      Least control
Least reuse       Some reuse    Most reuse
Easiest debug     Harder        Hardest
No overhead       Token cost    Token + network cost
```

### When MCP is actually valuable (not just hype):

**Multi-agent platforms:**
- You're building a platform with 10+ agents
- Different teams build different agents
- Tools need consistent behavior across agents
- Example: Enterprise AI platform with shared integrations

**User-extensible systems:**
- Users can add custom tools to their agents
- You don't want user code running in your agent
- MCP servers provide sandboxing
- Example: Agent marketplace with third-party tools

**Frequently changing tool implementations:**
- Tool APIs change often
- You don't want to redeploy all agents
- Update MCP server, agents automatically use new version

**Cross-organization tool sharing:**
- External partners expose MCP servers
- You consume their tools without implementing
- Example: Salesforce, Slack, GitHub expose MCP servers (future vision)

**Governance and compliance:**
- Need centralized audit logs of tool usage
- Different agents need different permissions
- MCP server enforces access control centrally

### When MCP is hype/premature:

**Single agent applications:**
- You're building one agent for specific use case
- Direct API calls or tool calling is simpler
- MCP adds complexity without benefit
- Overhead not justified by reusability gains

**Small number of stable integrations:**
- 3-5 APIs that rarely change
- Direct implementation is clearer and faster
- MCP abstraction obscures what's happening
- Tool calling provides sufficient abstraction

**Performance-critical applications:**
- Extra network hop unacceptable
- Need sub-100ms response times
- Direct API calls with caching required
- Each MCP call adds 50-200ms latency

**Early development/MVP:**
- Requirements still changing rapidly
- MCP standardization slows iteration
- Better to hardcode first, abstract later
- Tool definitions change frequently during prototyping

**Limited ecosystem:**
- Few third-party MCP servers exist today
- You'll be implementing most servers yourself
- Ecosystem immaturity means less value from standardization

### Decision framework:

**Start with direct API calls when:**
- Single agent or small project
- <5 external integrations
- Need debugging visibility
- Performance matters (<200ms total latency)
- Requirements unclear (iterate fast)
- Complex error handling needed

**Move to tool calling when:**
- Agent needs to choose from multiple actions (10+ tools)
- Tool selection requires reasoning
- Adding tools frequently
- Tools are relatively independent
- Acceptable latency: 500ms-2s

**Consider MCP only when:**
- Building multi-agent platform (5+ agents)
- Multiple teams/agents share tools
- User-extensible system (users add custom tools)
- Tool governance required (permissions, audit logs)
- Tool updates need to be independent of agent deployments
- Ecosystem support materializes (still early in 2025)
- Acceptable latency: 1s-5s

### Hybrid approach (recommended for most):

**Common pattern:**
```
Core integrations (3-5 critical APIs):
→ Direct API calls with explicit control
→ Custom error handling, caching, optimization
→ Performance critical, need <100ms latency

Secondary tools (10-20 optional actions):
→ Tool/function calling for flexibility
→ Agent decides when to use
→ Acceptable latency: 500ms-1s

Future: MCP integration when:
→ Ecosystem matures
→ Third parties expose servers
→ Multi-agent needs emerge
→ Can tolerate additional latency
```

### Real-world example:

**Customer support agent:**

**Direct API calls:**
- Customer database (needs caching, complex queries, <50ms)
- Order system (transactional, requires retries, <100ms)
- Inventory check (performance critical, needs batching, <100ms)

**Tool calling:**
- Search knowledge base (LLM chooses when to search)
- Create support ticket (agent decides priority)
- Send email notification (agent composes content)
- Check shipping status (optional tool)
- Process refund request (agent evaluates eligibility)
- Escalate to human (agent determines when needed)

**Not using MCP (yet):**
- Only one agent using these integrations
- Tools are stable, rarely change
- Need debugging visibility
- Performance requirements (<500ms) incompatible with MCP overhead
- MCP adds complexity without current benefit

**Future MCP consideration:**
- When building second agent (sales, marketing) that needs same tools
- When external partners want to integrate (expose our tools to their agents)
- When non-technical users need to add custom tools
- When governance requirements demand centralized control
- When ecosystem has matured with available servers

### Common mistakes:

**Over-engineering with MCP:**
- Using MCP for single agent with 3 tools
- Adding network layer for no reusability benefit
- Complexity outweighs gains

**Under-abstracting with direct calls:**
- 20+ direct API integrations in agent code
- Copy-pasting tool implementations across agents
- Should have used tool calling or MCP

**Wrong tool abstraction:**
- Using tool calling for 3 simple APIs (just use direct calls)
- Complex orchestration through tool calling (use direct control)
- LLM choosing tools that need specific order (use direct orchestration)

### Current recommendation (2025):

**Default to direct API calls for <5 integrations, tool calling for 5-15 integrations.**

MCP is promising but immature. Most projects don't need the abstraction yet. Re-evaluate MCP when:
- You're building your third agent with overlapping tools
- MCP server ecosystem has grown significantly
- Your use case specifically needs tool governance/sandboxing
- You're building a platform where users add tools
- Multiple teams need shared tool infrastructure

Don't use MCP because it's new and exciting. Use it when the architectural benefits (reusability, governance, sandboxing) clearly outweigh the complexity cost (infrastructure, latency, debugging difficulty).

---

![Decision Flow](/images/posts/ai-agent-decision-flow.png)

## Question 3: How will the agent's performance be evaluated?

Evaluation strategy must be defined before implementation. Without concrete metrics, iteration becomes guesswork.

### Core metrics:

**Task Success Rate (TSR)**

Task success rate measures whether the agent completed the intended task correctly, not just whether individual components functioned. This requires:

- Minimum 100 test cases for statistical significance
- Distribution matching production traffic patterns
- Edge cases representing 10-15% of dataset
- Version control for test cases with git
- Domain expert review and validation

Each test case should define:
- Input data and context
- Expected output or outcome
- Validation function to determine success
- Maximum acceptable latency
- Maximum acceptable cost

**Evaluation dataset construction:**

Structure test cases to cover:
- Happy path scenarios (50-60%)
- Common variations (25-30%)
- Edge cases (10-15%)
- Known failure modes (5-10%)

Test cases should be derived from:
- Production logs (real user interactions)
- Product requirements (specified behaviors)
- Error reports (previous failures)
- Domain expert input (expected behaviors)

**Continuous evaluation:**

Integrate evaluation into CI/CD pipeline:
- Run full test suite before deployment
- Block deployment if TSR drops below threshold
- Track metrics over time to detect degradation
- Alert on regression in any metric category

Establish baselines:
- Minimum acceptable TSR (typically >85% for production)
- Maximum acceptable P95 latency
- Maximum acceptable cost per task
- Maximum acceptable human intervention rate

**Production monitoring:**

Real-time tracking of:
- Success rate per hour/day
- Latency distribution (P50, P95, P99)
- Cost per task and total spend
- Human intervention frequency
- Error type distribution
- User satisfaction scores (when available)

Set up automated alerts for:
- TSR drops below 80%
- Latency P95 exceeds SLA by 50%
- Hourly costs exceed budget by 30%
- Error rate increases 2x over baseline
- Human intervention rate exceeds 20%

**Metric correlation analysis:**

Understand relationships between metrics:
- Does higher latency correlate with lower TSR?
- Do certain error types predict user dissatisfaction?
- Does time of day affect performance?
- Do specific user segments have different success rates?

---

## Question 4: What are the failure modes and mitigation strategies?

All systems fail. The distinction between production-grade and experimental code lies in failure handling.

### External dependency failures:

**Common failure modes:**
- API rate limits exceeded
- Network timeouts or connectivity issues
- Service downtime or degraded performance
- Authentication expiration
- Data format changes
- Version incompatibilities

**Mitigation strategies:**

Implement retry logic with exponential backoff:
- Start with 1-2 second delay
- Double delay after each failure
- Cap maximum delay at 30-60 seconds
- Limit total retry attempts to 3-5

Use circuit breakers to prevent cascade failures:
- Track failure rate over time window
- Open circuit after threshold failures (e.g., 5 failures in 60 seconds)
- Allow circuit to close after recovery period
- Provide fallback behavior when circuit is open

Implement request timeouts:
- Set aggressive timeouts (2-5 seconds for most APIs)
- Fail fast rather than blocking indefinitely
- Log timeout occurrences for monitoring
- Consider timeout as a failure for circuit breaker

### LLM-specific failures:

**Hallucination mitigation:**

Implement multi-layer validation:
- Output format validation (schema compliance)
- Business rule validation (logical consistency)
- Fact checking against knowledge base
- Confidence thresholding

Retry with enhanced prompts:
- Add explicit constraints based on validation failures
- Include examples of correct outputs
- Emphasize requirements that were violated
- Limit retries to 2-3 attempts

Use structured output formats:
- Request JSON with defined schema
- Validate against Pydantic models or JSON Schema
- Reject malformed responses early
- Provide schema examples in prompt

**Rate limit handling:**

Monitor API usage proactively:
- Track requests per minute/hour
- Alert when approaching limits
- Implement request queuing
- Scale API tier before hitting limits

When rate limited:
- Respect Retry-After headers
- Implement exponential backoff
- Queue requests for later processing
- Consider fallback to alternative models

**Context length management:**

Handle context overflow gracefully:
- Monitor token usage per request
- Implement chunking for long documents
- Use summarization for context compression
- Provide clear error messages when limits exceeded

### Tool/MCP-specific failures:

**Tool calling errors:**

LLM provides invalid parameters:
- Validate parameters before execution
- Return clear error message to LLM
- LLM retries with corrected parameters
- Limit retry attempts to prevent loops

Tool execution fails:
- Catch exceptions, return structured error
- LLM receives error and can try alternative
- Log failures for monitoring
- Circuit breaker for repeatedly failing tools

Tool selection errors:
- LLM chooses wrong tool for task
- Monitor tool selection accuracy
- Improve tool descriptions if confusion detected
- Add examples of when to use each tool

**MCP-specific failures:**

MCP server unavailable:
- Network timeout to MCP server
- Fallback to local tool implementation if available
- Graceful degradation: inform user, suggest alternatives
- Circuit breaker per MCP server

Discovery failures:
- Agent can't discover available tools
- Cache tool schemas locally
- Fallback to hardcoded tool list
- Alert on discovery service issues

Version mismatches:
- MCP server API changed
- Agent using outdated tool schema
- Version negotiation on connection
- Maintain backward compatibility period

### Monitoring and alerting:

**Health check implementation:**

Define health metrics:
- Error rate (target: <5%)
- Latency P95 (define based on requirements)
- Cost per task (monitor for unexpected increases)
- Human escalation rate (target: <20%)
- Tool success rate (per tool: >90%)
- MCP server availability (if using: >99%)

Set up monitoring dashboards:
- Real-time metrics display
- Historical trends
- Comparison to baseline
- Drill-down capabilities

Configure alerts for:
- Critical: Error rate >10%, service down, MCP servers unreachable
- Warning: Error rate >5%, cost increase >50%, tool failures increasing
- Info: Unusual patterns detected, tool selection accuracy declining

**Incident response procedures:**

When failure detected:
1. Identify affected scope (users, features, time period)
2. Assess severity and business impact
3. Implement immediate mitigation (rollback, circuit breaker, disable failing tools)
4. Communicate status to stakeholders
5. Root cause analysis after resolution
6. Update runbooks and monitoring

---

## Question 5: Where are decisions made and how are they explained?

Decision transparency is critical for debugging, compliance, and user trust.

### Layered decision architecture:

**Layer 1: Hard Rules (fail-fast)**
- Security and compliance checks
- Budget and resource constraints
- Data access authorization
- Regulatory requirements

These rules are non-negotiable and executed before any AI reasoning. If a hard rule fails, the request is rejected immediately without consuming AI resources.

Examples:
- User lacks required permissions → reject
- Request exceeds budget limit → reject
- Required data unavailable → degrade or reject
- Compliance violation detected → reject

**Layer 2: AI Reasoning (flexible)**
- Intent classification
- Context understanding
- Action planning
- Tool selection (if using tool calling)
- Response generation

This layer handles ambiguity and requires judgment. The AI makes decisions based on patterns, context, and training, but these decisions should be validated before execution.

Track reasoning metadata:
- Model used and version
- Confidence scores
- Token usage
- Reasoning steps taken
- Tools considered and selected
- Alternative actions considered

**Layer 3: Validation (safety net)**
- Output sanity checks
- Business logic validation
- Safety and appropriateness
- Confidence thresholds
- Human-in-loop triggers

This layer prevents the agent from taking actions that pass AI reasoning but violate practical constraints or safety requirements.

Validation checks:
- Output format correctness
- Logical consistency
- Potential negative impacts
- Anomaly detection
- Confidence threshold requirements
- Tool execution results validity

### Decision tracing:

**Comprehensive logging:**

For each decision, capture:
- Input data and context
- Decision made at each layer
- Reasoning or rule that led to decision
- Confidence scores
- Tools called (parameters, results, latency)
- Alternatives that were considered and why rejected
- Evidence supporting the decision
- Timestamp and execution path

**Explainability interface:**

Provide human-readable explanations:
- What decision was made
- Why that decision was chosen
- What information influenced the decision
- What tools were used
- What alternatives were considered
- How confident the system is
- What would need to change for a different decision

Structure explanations for different audiences:
- End users: Simple, non-technical language
- Customer support: Enough detail to address questions
- Developers: Full technical details and logs
- Auditors: Compliance-focused view

**Debugging support:**

Enable developers to:
- Replay decisions with same inputs
- Modify inputs and observe decision changes
- Step through decision layers
- View all considered alternatives
- Trace why specific rules or logic fired
- Inspect tool calls and responses
- Test with different tool availability

---

## Question 6: When does the agent require human intervention?

Autonomous operation must be balanced with safety constraints and task complexity.

### Intervention triggers:

**Mandatory escalation scenarios:**

Destructive actions:
- Data deletion
- Account modifications
- Service termination
- Irreversible operations

Financial impacts:
- Transactions above threshold (e.g., $1,000)
- Refunds or credits
- Subscription changes
- Budget allocation

Confidence thresholds:
- AI confidence below 75-80%
- Contradictory information
- Ambiguous user intent
- Novel situations outside training
- Tool selection uncertainty

Anomaly detection:
- Unusual behavior for user
- Actions inconsistent with history
- Patterns suggesting fraud or abuse
- Requests outside normal parameters

Sensitive contexts:
- Angry or distressed users
- Legal or compliance implications
- Security concerns
- Privacy-related requests

New users:
- Limited historical data
- Higher risk of misunderstanding
- Relationship building opportunity
- Learning patterns for future

Tool/MCP failures:
- Multiple tool execution failures
- MCP server unavailable for critical tool
- Unable to complete task due to tool issues

**Escalation urgency levels:**

Immediate (< 5 minutes):
- VIP customers
- Severe issues
- Revenue at risk
- Potential PR impact

High (< 1 hour):
- Multiple users affected
- Degraded service
- Repeated failures
- Escalating dissatisfaction

Normal (< 24 hours):
- Single user, non-urgent
- Clarification needed
- Edge cases
- Improvement opportunities

### Gradual autonomy rollout:

**Phase 1: Shadow Mode (Week 1-2)**

Agent operates but doesn't execute actions:
- Logs proposed actions
- Human performs tasks manually
- Compare agent proposals to human decisions
- Measure agreement rate

Success criteria:
- >95% agreement with human decisions
- No serious errors in proposals
- Latency within acceptable range
- Team confidence in agent reasoning
- Tool selection accuracy >90%

**Phase 2: Approval Required (Week 3-4)**

Agent proposes, human approves:
- Agent generates action plans
- Human reviews before execution
- Track approval/rejection rates
- Analyze rejection reasons

Success criteria:
- >90% approval rate
- Low modification frequency
- Fast approval process (< 2 minutes)
- Improving accuracy trends

**Phase 3: Supervised Autonomy (Month 2)**

Agent handles low-risk autonomously:
- Execute simple cases automatically
- Request approval for complex/high-risk
- Monitor all actions
- Ready rollback procedures

Success criteria:
- Error rate < 2%
- Escalation rate < 15%
- User satisfaction maintained
- Cost within projections

**Phase 4: Full Autonomy (Month 3+)**

Agent operates independently:
- Handle most cases automatically
- Escalate only edge cases
- Comprehensive audit logging
- Continuous monitoring

Maintain:
- Weekly review sessions
- Error analysis
- User feedback integration
- Performance optimization

---

## Question 7: What is the maintenance and evolution strategy?

### Agent-specific maintenance challenges:

**Prompt drift:**
- Model behavior changes over time even with same prompt
- Provider updates models without version notification (GPT-3.5, GPT-4, Claude)
- Previously working prompts may degrade
- Strategy: Continuous evaluation against test set, detect performance regression

**Embedding model evolution:**
- Switching embedding models invalidates vector DB
- Requires full re-indexing of all documents
- Cost and time for re-embedding large corpora
- Strategy: Version indices, A/B test new embeddings before migration

**Tool/function calling schema changes:**
- Models improve tool calling over time—or degrade
- Adding new tools may confuse agent's tool selection
- Function descriptions critically affect agent behavior
- Strategy: Regression test tool calling accuracy, version tool definitions

**MCP protocol evolution:**
- MCP standard is evolving (still early 2025)
- Server implementations may have version incompatibilities
- Breaking changes in protocol updates
- Strategy: Pin MCP protocol version, test upgrades thoroughly

**Agent behavior consistency:**
- Non-deterministic: same input may produce different outputs
- Temperature settings affect reproducibility
- Model updates change behavior silently
- Strategy: Snapshot model versions, use fixed seeds in testing, log all decisions

**Knowledge base staleness:**
- Documents in vector DB become outdated
- Agent provides incorrect information from old sources
- No automatic notification when source material changes
- Strategy: Document versioning, scheduled re-indexing, source freshness tracking

**Multi-agent coordination drift:**
- Individual agents updated independently
- Coordination protocols may break
- Emergent behaviors from interaction changes
- Strategy: Integration testing across agent team, version lock coordinating agents

**Tool availability changes:**
- APIs you depend on get deprecated
- Third-party MCP servers go offline
- Tool implementations break due to external changes
- Strategy: Monitor tool health, maintain fallbacks, abstract tool interfaces

### Framework-specific considerations:

**LangChain/LangGraph rapid evolution:**
- Breaking API changes in minor versions common
- Community examples become outdated quickly
- Migration guides often lag releases
- Strategy: Pin exact versions in production, maintain internal documentation, budget quarterly upgrade cycles

**LlamaIndex index format changes:**
- Index storage format may change between versions
- Migration scripts not always provided
- Risk: Stored indices become unreadable
- Strategy: Export/import testing, maintain index rebuild capability

**MCP ecosystem immaturity:**
- Standard still evolving, expect breaking changes
- Server availability not guaranteed
- Few production-tested implementations
- Strategy: Build abstraction layer over MCP, maintain non-MCP fallbacks

**Tool/integration deprecation:**
- Third-party integrations break when APIs change
- Framework may drop support for tools you depend on
- MCP servers may be abandoned by maintainers
- Strategy: Abstract tool implementations, own the integration layer, monitor ecosystem health

### Agent-specific monitoring:

**Agent behavior regression:**
- Track: Tool selection accuracy over time
- Track: Average steps to task completion
- Track: Error recovery success rate
- Track: Human intervention frequency trends
- Alert: Any metric degrades >10% week-over-week

**Retrieval quality drift:**
- Track: Retrieval precision/recall on fixed test set
- Track: Average relevance scores for retrieved chunks
- Track: User feedback on answer quality
- Alert: Retrieval metrics drop below baseline

**Tool performance degradation:**
- Track: Success rate per tool
- Track: Latency per tool call
- Track: Error types per tool
- Alert: Tool success rate drops below 90%

**MCP health monitoring:**
- Track: MCP server availability
- Track: Response time per MCP server
- Track: Version compatibility issues
- Alert: Server downtime, latency spikes, version conflicts

**Cost anomalies:**
- Track: Token usage per task type
- Track: Embedding costs per document batch
- Track: Vector DB query costs
- Track: MCP server usage if paid
- Alert: Any cost increases >30% without usage increase

**Agent loop detection:**
- Monitor: Agent stuck in repeated actions
- Monitor: Timeout frequency for agent tasks
- Monitor: Maximum steps reached without completion
- Monitor: Same tool called repeatedly without progress
- Alert: Loop patterns detected, implement circuit breakers

### Versioning strategies:

**Multi-version deployment:**
- Run old and new agent versions in parallel
- Route traffic based on user segment or A/B test
- Compare metrics between versions in production
- Rollback immediately if new version degrades

**Prompt versioning with evaluation:**
- Store prompts in version control
- Tag production versions
- Run eval suite on all prompt changes
- Require approval based on eval results before deploy

**Tool definition versioning:**
- Version control all tool schemas
- Track which agent version uses which tool definitions
- A/B test tool description changes
- Roll back tool definitions independently of code

**Index versioning:**
- Maintain multiple vector DB indices
- Route queries to specific index versions
- Test new indices with subset of traffic
- Cutover when metrics prove superiority

**MCP server versioning:**
- Deploy multiple versions of MCP servers
- Route agents to compatible server versions
- Gradual migration across server versions
- Maintain backward compatibility period

**Agent configuration as code:**
- Version control: Model selection, temperature, tools available, MCP servers
- Enable rollback of configuration separately from code
- A/B test configuration changes
- Track which config version produced which result

---

![Architecture Comparison](/images/posts/ai-agent-comparison.png)

## Implementation Checklist

Before deploying an AI agent to production, verify:

### Architecture
- [ ] Appropriate complexity level selected and justified
- [ ] Framework choice (LangChain/LangGraph/LlamaIndex) documented with rationale
- [ ] Data access patterns documented and tested
- [ ] Storage types justified (vector/RDBMS/graph/KV)
- [ ] Tool integration approach decided (direct/tool calling/MCP) with rationale
- [ ] Fallback strategies implemented for all dependencies
- [ ] Cost projections calculated for expected load
- [ ] Decision documented: n8n vs agent framework with specific reasoning

### Evaluation
- [ ] Test dataset created with 100+ cases
- [ ] Success metrics defined and measurable
- [ ] Continuous evaluation integrated into CI/CD
- [ ] Production monitoring dashboards configured
- [ ] Baseline metrics established
- [ ] Alert thresholds defined
- [ ] Retrieval quality metrics if using RAG

### Reliability
- [ ] All external API calls have timeout and retry logic
- [ ] Circuit breakers implemented for critical dependencies
- [ ] Tool execution error handling
- [ ] MCP server failover strategy (if applicable)
- [ ] Error handling covers all identified failure modes
- [ ] Graceful degradation strategy defined
- [ ] Rate limit handling implemented
- [ ] Context overflow handling defined

### Observability
- [ ] Structured logging implemented
- [ ] Decision traces captured for debugging
- [ ] Tool call logging (parameters, results, latency)
- [ ] MCP interaction logging (if applicable)
- [ ] Alerts configured for anomalies
- [ ] Audit logs for all actions
- [ ] Performance metrics tracked
- [ ] Cost tracking automated

### Safety
- [ ] Human intervention policy defined
- [ ] Gradual rollout plan documented
- [ ] Escalation paths implemented
- [ ] Rollback procedure tested
- [ ] Security review completed
- [ ] Compliance requirements verified
- [ ] Tool access controls defined
- [ ] MCP server authentication configured (if applicable)

### Maintenance
- [ ] Dependencies pinned with version ranges
- [ ] Prompt versions tracked in code
- [ ] Tool definitions versioned
- [ ] Model fallback chain configured
- [ ] MCP protocol version pinned (if applicable)
- [ ] Cost monitoring automated
- [ ] Update schedule defined
- [ ] Documentation complete
- [ ] Agent behavior regression monitoring
- [ ] Knowledge base update strategy

---

## Conclusion

These seven questions form a technical framework for AI agent development that addresses common production failure modes. The framework prioritizes reliability, observability, and maintainability over initial development speed.

Each question targets specific engineering challenges:
1. Data architecture and quality (storage types, retrieval patterns, freshness)
2. Appropriate technical complexity (including when to avoid overengineering with agent frameworks)
2.5. External system access strategy (direct API calls vs tool calling vs MCP)
3. Objective performance measurement
4. Systematic failure handling (including tool/MCP-specific failures)
5. Decision transparency
6. Human oversight strategy
7. Long-term maintenance planning (including agent-specific drift and evolution)

Implementation of this framework reduces production incidents, improves debugging efficiency, and provides clear metrics for iteration. The choice between workflow automation tools (n8n), different agent frameworks (LangChain, LangGraph, LlamaIndex), direct API control, tool calling abstractions, or MCP should be driven by task requirements and operational maturity, not technology preferences or hype cycles.

---

*Building production AI agents at OverX? [Contact our team](https://overx.ai/contact) for architectural review and implementation support.*
