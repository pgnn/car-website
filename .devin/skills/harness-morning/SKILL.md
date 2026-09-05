---
name: harness-morning
description: A brief description, shown to the model to help it understand when to use this skill
---

Goal: answer "what happened to my code overnight, and do I need to do anything?"
Skip anything already green. Never narrate tool calls — report conclusions only.

1. Local warm-up (no tools):
   - git pull
   - git log -3 --oneline
   - One line: anything new since yesterday.

2. Project health snapshot:
   - Call harness_status for the current org/project (auto-discovered if not pinned via
     HARNESS_ORG/HARNESS_PROJECT). This returns recent executions, failure rate, and deep links —
     use it as the entry point before drilling into specifics.

3. Deployment reality check — lead with this if anything's here:
   - harness_list(resource_type="execution", search_term=<service>, size=5) to see the
     last few runs across environments.
   - If the most recent one is Failed/Aborted/ExpiredApproval, call
     harness_diagnose(execution_id=<id>) for the stage/step breakdown and root cause.
   - If a rollback stage ran, say it plainly: "Your last deploy to prod got rolled back —
     [diagnose's root cause], here's what it reverted to." No CV anomaly score exists yet
     via MCP, so ground this in execution status + diagnose output, not a claimed metric.

4. Waiting on me:
   - harness_list(resource_type="approval_instance") filtered to pending, where I'm the approver.
   - harness_list(resource_type="feature_flag" or "fme_feature_flag") filtered to partial
     rollout state on my service — flag only if paired with a failure signal from step 3.