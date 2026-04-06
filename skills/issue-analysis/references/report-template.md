# Report Template

Use this as the structure guide for the Markdown report output.

## Basic Information

| Field | Value |
|-------|-------|
| **Process** | [process name and PID] |
| **Crash Time** | [timestamp] |
| **OS / Platform** | [OS version, architecture] |
| **Build Version** | [app version / build number] |
| **Device / Host** | [device model or host info if available] |
| **Crash Signal** | [SIGSEGV / SIGABRT / Exception type] |
| **Fault Address** | [address if available] |

### Timeline

[If log context is available, present a timeline of events leading to the crash:]

| Time | Event | Source |
|------|-------|--------|
| [T-N] | [event description] | [log file:line] |
| [T-0] | **CRASH** | [crash dump] |

## Core Data

### Crash Stack

```
[Full formatted crash stack trace with frame numbers]
#0  0x... in function_name at file.cpp:123
#1  0x... in caller_function at file.cpp:456
#2  ...
```

### Key Frames Analysis

| Frame | Function | File | Line | Significance |
|-------|----------|------|------|-------------|
| #0 | [crash point function] | [file] | [line] | **Crash Site** - [what happened here] |
| #1 | [caller] | [file] | [line] | [why this call matters] |
| #N | [relevant frame] | [file] | [line] | [significance] |

### Thread Information

| Thread | State | Role |
|--------|-------|------|
| Thread 0 (crashed) | [state] | [what this thread was doing] |
| Thread 1 | [state] | [role, if relevant to crash] |

### Register State

[If available, present key register values:]

| Register | Value | Interpretation |
|----------|-------|---------------|
| [reg] | [value] | [what it points to or means] |

## Deep Analysis

### Root Cause

**Confidence: {{HIGH/MEDIUM/LOW}}**

[One-paragraph clear statement of the root cause.]

#### Direct Cause

[What immediately triggered the crash. Be specific: "Null pointer dereference when accessing `obj->field` at `file.cpp:123` because `obj` was not initialized after the error path at line 100."]

#### Underlying Cause

[Why the direct cause happened. Dig deeper: "The object initialization was skipped when `init_function()` returned an error code, but the caller did not check the return value and proceeded to use the uninitialized pointer."]

#### Contributing Factors

- [Factor 1: e.g., "Missing null check after fallible operation"]
- [Factor 2: e.g., "No RAII wrapper for the resource lifecycle"]
- [Factor 3: e.g., "Error handling path not tested"]

### Related Files

| File | Role | Key Lines | Relevance |
|------|------|-----------|-----------|
| [file path] | [role in crash] | [line range] | [how it relates to the crash] |

### Call Flow

[Reconstruct the complete execution path leading to the crash. Use a numbered sequence:]

1. **Entry**: `main()` at `main.cpp:50` - Application starts event loop
2. **Trigger**: `handleEvent()` at `handler.cpp:120` - Receives user input event
3. **Processing**: `processData()` at `processor.cpp:89` - Begins data processing
4. **Error path**: `loadResource()` at `resource.cpp:45` - Returns error (resource not found)
5. **Missing check**: `processData()` at `processor.cpp:95` - Does NOT check return value
6. **CRASH**: `useResource()` at `processor.cpp:102` - Dereferences null pointer

```
main() → handleEvent() → processData() → loadResource() [FAILS]
                                       → useResource() [CRASH: null deref]
```

### Variable State Analysis

[Based on crash data and source code, infer the state of key variables at crash time:]

| Variable | Expected State | Likely Actual State | Evidence |
|----------|---------------|-------------------|----------|
| [var name] | [what it should be] | [what it likely was] | [why we think so] |

## Solution

### Recommended Fix

**Confidence: {{HIGH/MEDIUM/LOW}}**

#### Immediate Fix (Stop the Bleeding)

[Minimum change to prevent this specific crash:]

```diff
// file.cpp:95
- resource_t* res = loadResource(path);
- useResource(res);
+ resource_t* res = loadResource(path);
+ if (res == nullptr) {
+     LOG_ERROR("Failed to load resource: %s", path);
+     return ERROR_RESOURCE_NOT_FOUND;
+ }
+ useResource(res);
```

**Files to modify:**
- `[file path]`: [what to change]

#### Proper Fix (Address Root Cause)

[More thorough fix addressing the underlying issue:]

- [Step 1: description and code change]
- [Step 2: description and code change]
- [Step 3: description and code change]

**Files to modify:**
- `[file path]`: [what to change]
- `[file path]`: [what to change]

#### Preventive Measures

| Measure | Effort | Impact | Description |
|---------|--------|--------|-------------|
| [measure 1] | Low/Medium/High | [impact] | [description] |
| [measure 2] | Low/Medium/High | [impact] | [description] |

### Confidence Assessment

| Conclusion | Confidence | Basis |
|-----------|-----------|-------|
| Root cause identification | High/Medium/Low | [what evidence supports this] |
| Immediate fix effectiveness | High/Medium/Low | [why we believe this will work] |
| Proper fix completeness | High/Medium/Low | [what might be missed] |

### Additional Investigation Needed

[If the available evidence is insufficient for high-confidence conclusions:]

- [What additional data would help: e.g., "full core dump", "logs from 5 minutes before crash"]
- [What tests to run: e.g., "reproduce with AddressSanitizer enabled"]
- [What to check: e.g., "verify thread safety of SharedCache class"]
