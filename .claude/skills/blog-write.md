---
description: Generate a DP blog post end-to-end (auto topic selection → research → draft → strict review → image → commit & push)
---

# /blog-write

Run the full DP blog content pipeline. The pipeline picks a topic autonomously from `pipeline/topic_seeds.yaml` (avoiding overlap with existing posts in `content/posts/ko/`), researches it with parallel agents, synthesizes a Korean draft with strict citation requirements, applies strict QC, generates a thumbnail, and commits + pushes the result.

**You take no arguments.** The pipeline decides everything.

## Execution

Follow these steps exactly. Do NOT skip steps even if you think you can shortcut.

### Step 1. Initialize the run

Run via Bash:

```
python pipeline/orchestrator.py init
```

Capture the `RUN_DIR_ABS=...` value from stdout. Use this as `$RUN_DIR` for the rest of this skill.

### Step 2. Load the supervisor

Read `pipeline/orchestrator.md` in full. It defines:
- The stage execution protocol (CHECK → EXECUTE → QC → DECIDE)
- The 11 stages (0 through 8, with 2.5, 7a, 7b)
- Retry / fallback rules
- Critical rules (no silent publish, no force push, no fabricated citations, no self-promotion)

### Step 3. Execute the pipeline

For each stage in order (0 → 1 → 2 → 2.5 → 3 → 4 → 5 → 6 → 7a → 7b → 8):

1. Check `$RUN_DIR/retry_status.json` — skip stages already marked `ok`
2. Read the agent definition from `pipeline/agents/{name}.md`
3. Execute the stage:
   - LLM stages: spawn a Task subagent with `subagent_type: general-purpose`, passing the agent definition as instructions and the relevant input file paths
   - Deterministic stages: run the Python tool via Bash (`citation_verifier.py`, `thumbnail_generator.py`, `frontmatter_lint.py`)
4. Read the stage's QC output
5. If FAIL and attempts < 3: re-execute with QC feedback in the prompt
6. If FAIL and attempts == 3: trigger fallback (per orchestrator.md) OR write `BLOCKED.md` for Stage 5

**Special: Stage 2 (research) runs N workers in parallel.** Use a single message with N Task tool calls to maximize parallelism. N comes from `pipeline/.env` `RESEARCH_AGENT_COUNT` (default 4).

### Step 4. Report

After Stage 8 succeeds, print the success summary as specified in `orchestrator.md`. Include:
- Title, category, slug
- File path of the new post
- Image path
- Commit SHA
- Public URL

If the pipeline BLOCKED at any stage, print the failure summary and the path to `BLOCKED.md` or `publish_error.md`.

## Critical pre-flight checks

Before Step 1, verify:

1. **Python environment**: Run `python -c "import frontmatter, requests, yaml; from google import genai; print('ok')"`. If this fails, tell the user to run:
   ```
   cd pipeline
   python -m venv .venv
   .venv\Scripts\activate
   pip install -r requirements.txt
   ```
   Then stop and let them rerun the skill.

2. **GOOGLE_API_KEY**: Check `pipeline/.env` exists and `GOOGLE_API_KEY` is set. If not, tell the user to copy `.env.example` to `.env` and add their key. Stop.

3. **Git working tree**: Run `git status --short`. If there are uncommitted changes, warn the user but offer to proceed (the pipeline only stages its own files).

4. **Branch**: Confirm `git rev-parse --abbrev-ref HEAD` returns `main`. If not, stop — pipeline only publishes to `main`.

## What the pipeline guarantees

- ✅ No self-promotional content (TaupT, DP-Engine, AC-PQ, etc.)
- ✅ No fabricated citations — every URL verified via WebFetch
- ✅ No AI meta-statements ("이 글에서는…", "결론적으로…")
- ✅ No silent publishing — strict review failures block the pipeline
- ✅ Author = `정현진(Hyunjin Jeong)`, category ∈ {Technology, Research}
- ✅ Thumbnail generated to `public/images/blog/{slug}.png`
- ✅ Atomic git commit (post + image), no force push
