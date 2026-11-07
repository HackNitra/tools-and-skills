---
name: soc2-audit
description: Use when the user wants a SOC 2 readiness audit, compliance gap analysis or security review of their app. Discovers the stack, checks code, config and the live page against the Trust Services Criteria, and writes an evidence-based report with a fix list. Invoke with "/soc2-audit" or "audit this for SOC 2".
allowed-tools: Read, Grep, Glob, Write, Bash(git log:*), Bash(git grep:*), Bash(npm audit:*), Bash(pnpm audit:*), Bash(curl -sI:*)
---

# SOC 2 Audit

Readiness self-assessment against the SOC 2 Trust Services Criteria. Read-only: never change code, config or data, never send messages. Optional arguments: repo path, live URL.

## Steps

1. **Scope.** Discover the stack: frontend, backend/functions, database, auth provider, hosting, CI, third-party processors, any MCP or webhook endpoints. Note what you could not find. Ask for the live URL only if the README, `.env.example` and code do not reveal it.
2. **Collect evidence** with Grep/Read, `git log`, the package manager's audit command and `curl -sI <url>`. Each finding needs a file:line, command output or header. No evidence means "Not verified", never "Pass".
3. **Check each criterion** and rate it Pass, Gap or Not verified.
4. **Report** to `audits/soc2-YYYY-MM-DD.md`, then summarize in chat in at most 10 lines.

## Checklist

**Security (mandatory)**
- Authentication: every backend function, API route and server action checks identity; list each and whether it is gated. No public endpoint returns user data.
- Authorization: data scoped per user/tenant on every query, least privilege, admin paths protected.
- Secrets: no keys in git (`git log -p -S` for key patterns), none in client bundles (`NEXT_PUBLIC_`/`VITE_`), tokens long, random, rotatable, compared in constant time, not logged.
- Boundary: HTTPS, HSTS, CSP, frame-ancestors, X-Content-Type-Options, referrer policy, no wildcard CORS on data routes, cookie flags (Secure, HttpOnly, SameSite).
- Vulnerabilities: dependency audit, committed lockfile, unpinned `@latest` runners, input validation on every argument, XSS sinks (`dangerouslySetInnerHTML`), prompt-injection exposure if user or third-party text reaches an LLM that can act.
- Logging and incidents: audit log of reads, writes and sends; errors logged without personal data; alerting; incident runbook.
- Change management: branch protection, PR review, CI tests, separate dev and prod environments.
- Vendors: list every sub-processor, what data it sees, DPA/terms status.

**Availability**: backups and export, tested restore, rate limits, uptime monitoring, RTO/RPO.

**Confidentiality**: data classification, retention and deletion policy, data minimization, personal data absent from logs, local browser profiles and credential stores gitignored and disk-encrypted.

**Processing integrity**: idempotent writes, validation of incoming data, failed operations visible.

**Privacy** (if personal data): notice and consent, data of third parties who never signed up, GDPR lawful basis, export and delete path, LLM provider retention and training terms, cross-border transfers.

## Report format

1. Summary: counts of Pass / Gap / Not verified, top 5 risks.
2. Table: Criterion, Status, Evidence, Fix, Effort (S/M/L).
3. Gaps by severity: Critical (data exposure), High, Medium, Low.
4. Needs a human: security policy, access reviews, vendor DPAs, risk assessment, training, pen test, incident runbook. Offer templates.
5. Caveat: this is a readiness assessment, not an attestation. Only a licensed CPA firm issues a SOC 2 report; compliance platforms (Vanta, Drata, Secureframe) automate continuous evidence.

Never paste secrets or personal message content into the report; redact to the first 4 characters. End by asking whether to open issues or fix the Critical items.
