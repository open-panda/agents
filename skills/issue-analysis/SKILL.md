---
name: issue-analysis
description: Analyze program issues including crashes, bugs, and errors by examining crash stacks, core dumps, and log files alongside source code. Generates a detailed analysis report with root cause, call flow, and fix recommendations. Use when the user provides a "crash stack", "crash log", "core dump", "daydrive", "error log", "bug report", "stack trace", "exception", "panic trace", "SIGABRT", "SIGSEGV", "segfault", "ANR trace", or asks to "analyze this crash", "debug this issue", "find the root cause", "why did this crash", or "what caused this error".
user-invocable: true
argument-hint: "[crash log / stack trace file path]"
---

# Issue Analysis

Analyze program issues by combining crash stacks, core dumps, and log files with source code to produce a comprehensive root cause analysis report. The output includes both a Markdown document and a styled HTML file.

## When To Use

Use this skill when the user:

- Provides a crash stack trace and wants to understand why the crash happened
- Shares a core dump or daydrive for analysis
- Has log files showing errors and wants root cause analysis
- Wants to understand the call flow leading to a crash
- Needs a fix recommendation for a program issue
- Says "analyze this crash" or "debug this issue"

## Input

The user provides one or more of:

1. **Crash stack trace** - Raw stack trace, crash dump, or panic output
2. **Core dump / Daydrive** - Binary crash dump files
3. **Log files** - Application logs, system logs, error logs
4. **Source code path** - Directory containing the relevant source code (optional but recommended)

If the source code path is not provided, ask the user. If the user cannot provide source code, perform analysis based on the available crash data alone.

## Analysis Workflow

### Phase 1: Information Gathering

Collect and organize all available crash data:

1. **Crash stack parsing**: Extract the full stack trace, identify the crashing thread, and parse frame information (function names, file paths, line numbers, addresses).
2. **Signal/Exception info**: Identify the crash signal (SIGSEGV, SIGABRT, etc.) or exception type, fault address, and register state if available.
3. **Process metadata**: Extract process name, PID, timestamp, OS version, architecture, build version.
4. **Log context**: If logs are provided, find entries around the crash timestamp to establish timeline.
5. **Thread state**: If multiple threads are present, identify the crashing thread and note other thread states.

### Phase 2: Stack Trace Analysis

Deeply analyze the crash stack:

1. **Crash point identification**: Pinpoint the exact function and line where the crash occurred.
2. **Call chain reconstruction**: Trace the full call chain from entry point to crash point.
3. **Frame categorization**: Separate system/library frames from application frames.
4. **Symbol resolution**: If symbols are available, resolve addresses to function names.
5. **Pattern recognition**: Identify common crash patterns:
   - Null pointer dereference
   - Use-after-free
   - Buffer overflow
   - Stack overflow
   - Race condition indicators
   - Deadlock patterns
   - Memory corruption
   - Assertion failures
   - Unhandled exceptions

### Phase 3: Source Code Correlation

If source code is available, correlate the crash with the codebase:

1. **Crash site code review**: Read the source file and function at the crash point.
2. **Call path tracing**: Follow the call chain through the source code to understand the execution path.
3. **Variable state inference**: Based on the crash type and location, infer likely variable states.
4. **Related code inspection**: Check:
   - Memory management around the crash point
   - Thread synchronization mechanisms
   - Error handling paths
   - Input validation
   - Resource lifecycle (open/close, alloc/free)
5. **Historical context**: If git is available, check recent changes to the crash-related files.

### Phase 4: Root Cause Analysis

Synthesize findings into a root cause determination:

1. **Direct cause**: What immediately caused the crash (e.g., "null pointer dereference at line X").
2. **Underlying cause**: Why the direct cause occurred (e.g., "object was freed in thread A while thread B still held a reference").
3. **Contributing factors**: Conditions that enabled the bug (e.g., "race window between operation X and Y", "missing null check after API call").
4. **Reproduction conditions**: What conditions would trigger this crash (timing, input, state).

### Phase 5: Impact Assessment

Evaluate the severity and scope:

1. **Crash frequency estimation**: Is this likely a rare edge case or a common path?
2. **User impact**: What was the user experiencing when this crashed?
3. **Data integrity**: Could this crash lead to data corruption or loss?
4. **Security implications**: Could this be exploited? (Do NOT provide exploitation details)
5. **Blast radius**: What other components or features could be affected?

### Phase 6: Solution Development

Develop fix recommendations:

1. **Immediate fix**: The minimum change to prevent this specific crash.
2. **Proper fix**: A more thorough fix addressing the underlying cause.
3. **Preventive measures**: Changes to prevent similar issues in the future (e.g., adding assertions, improving error handling, static analysis rules).
4. **Confidence level**: Rate confidence in each recommendation (High/Medium/Low) based on evidence quality.

## Output

Generate two files in the current directory (or a user-specified directory):

1. `issue-analysis.md` - Markdown report
2. `issue-analysis.html` - Styled HTML report

If either file already exists, back up as `issue-analysis-backup-YYYYMMDD-HHMMSS.md` (or `.html`).

### Report Structure

Use the template in `references/report-template.md` for the Markdown structure.

The report must contain these sections:

1. **Basic Information** - Process info, timestamp, environment, build version
2. **Core Data** - Crash stack, signal/exception info, key frames
3. **Deep Analysis**
   - Root cause analysis with evidence chain
   - Related source files with specific line references
   - Complete call flow reconstruction
   - Variable state analysis
4. **Solution** - Recommended fixes with confidence ratings

### HTML Generation

After writing the Markdown report, generate the HTML version using the template structure in `references/html-template.html`.

The HTML report must:
- Be a single self-contained file (all CSS inline)
- Use a clean, professional design optimized for crash analysis readability
- Highlight the crash stack with proper syntax coloring
- Color-code severity and confidence levels
- Include a navigation sidebar for section jumping
- Support both light and dark mode viewing
- Be printable with good formatting
- Render well on both desktop and mobile

### Evidence Rules

- Cite exact file paths and line numbers for every claim
- Distinguish between confirmed facts and inferences
- Rate confidence for each conclusion
- Do NOT include any credentials, API keys, tokens, or secrets found in logs
- Do NOT provide exploitation details for security-sensitive crashes
- If evidence is insufficient for a definitive conclusion, say so explicitly and describe what additional information would help

## Writing Quality

The report should read like an expert engineer's incident analysis:

- Be precise and technical but clear
- Lead with the most important findings
- Connect evidence to conclusions explicitly
- Prioritize actionable insights over exhaustive description
- Use concrete code references, not vague descriptions
