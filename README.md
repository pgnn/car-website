# Car Shop (Harness demo app)

Minimal Node.js/Express app, built for triggering a Harness pipeline live in a demo.

## Why Node.js
- No compile step, but real `npm install` + `npm test` steps to show actual build/test stages (not just placeholders)
- Trivial single-stage Dockerfile - fast build, good for live demos
- One env var (`CAR_VERSION`) you can drive from a Harness pipeline/template runtime input to visibly prove "different value per environment" without touching code

## Run locally
```
npm install
npm test
npm start
# open http://localhost:3000
```

## What each part maps to in a Harness pipeline
| File | Pipeline stage |
|---|---|
| `package.json` / `server.js` | Build stage - `npm install` |
| `tests/app.test.js` | Test stage - `npm test` (real pass/fail, good for a live "watch it fail" moment if you break a test on purpose) |
| `Dockerfile` | Build & Push step - produces the artifact |
| `k8s/deployment.yaml` | Deploy stage - references `<+artifact.metadata.image>` and a `carVersion` stage variable, which is exactly the kind of field you'd mark as a template runtime input |

## Demo hook: CAR_VERSION
Set `CAR_VERSION` (env var / `carVersion` variable in the manifest) differently per service/repo or per environment. Deploying and refreshing the page shows the "Build: v2" text change immediately - a visual, non-technical way to prove a deploy happened and that the template's runtime input actually took effect.

## Suggested demo break points
- Break a test on purpose (typo an assertion) to show a red pipeline check on a PR, then fix it live
- Change `CAR_VERSION` per repo/service to show template reuse with different runtime input values
