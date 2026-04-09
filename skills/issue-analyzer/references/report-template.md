# Report Template

Use this as the structure guide for the Markdown report output. The report follows a **problem-solving narrative**: each section answers one key question to guide the reader from "what happened" to "how to fix it".

---

## [Report Title]

**ROOT CAUSE** | **[CRASH_SIGNAL] ([Signal detail])**

[One-paragraph root cause summary — the most important finding, stated upfront so the reader immediately knows the conclusion. Use inline code for function/variable names.]

## 基本信息

| Field | Value |
|-------|-------|
| **进程** | [process name] |
| **PID** | [PID] |
| **崩溃时间** | [timestamp] |
| **系统平台** | [OS version, architecture] |
| **设备** | [device model if available] |
| **构建版本** | [app version / build number] |
| **崩溃信号** | [SIGSEGV / SIGABRT / Exception type] |
| **故障地址** | [address if available] |

## 事件时间线

[Group events into logical phases. Each phase has a title and a list of timestamped events with status markers.]

### 阶段 1: [Phase Title]

| Time | Event | Status |
|------|-------|--------|
| HH:MM:SS.mmm | Event description | ✅ 正常 / ⚠️ 警告 / ❌ 错误 / 🐛 根因 |

### 阶段 2: [Phase Title]

| Time | Event | Status |
|------|-------|--------|
| HH:MM:SS.mmm | Event description | Status |

## 根因分析

### 直接原因

> [What immediately triggered the crash. Be specific with file paths, line numbers, function names.]

### 触发条件：[Question — why did it crash this time?]

[One sentence explaining the key differentiating variable.]

| 特征 | 正常情况 | 异常情况 |
|------|---------|---------|
| [factor] | [normal value] | [crash value] |

### 完整调用链

1. **[触发]** [Entry point description]
2. **[过程]** [Processing step]
3. **[异常]** [Error path] ← **问题在这里**
4. **[结果]** [Final crash]

### 关键证据

**证据 1: [title]**
```
[Key crash data / log lines]
```

**证据 2: [title]**
```
[Key crash data / log lines]
```

## 修复建议

### 诊断结论

> [Summary paragraph of the root cause]

- [Bullet point 1]
- [Bullet point 2]
- [Bullet point 3]

### 修复方案

**[推荐] 方案 1: [title]**
[Description of the fix]

**[推荐] 方案 2: [title]**
[Description of the fix]

**[备选] 方案 3: [title]**
[Description of the fix]

### 预防措施

| 措施 | 工作量 | 影响 | 说明 |
|------|--------|------|------|
| [measure] | Low/Medium/High | [impact] | [description] |

### 待进一步调查

[If evidence is insufficient:]

- [What additional data would help]
- [What tests to run]
