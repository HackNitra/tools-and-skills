#!/usr/bin/env node
// Blocks `git commit` / `git push` when staged changes contain likely secrets.
// Reads the hook payload from stdin; exit code 2 blocks the tool call.
import { execSync } from "node:child_process";

const PATTERNS = [
  /AKIA[0-9A-Z]{16}/,
  /sk-ant-[A-Za-z0-9_-]{20,}/,
  /sk-[A-Za-z0-9]{32,}/,
  /gh[pousr]_[A-Za-z0-9]{36,}/,
  /xox[baprs]-[A-Za-z0-9-]{10,}/,
  /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /[MN][A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27,}/, // Discord bot token
  /postgres(ql)?:\/\/[^:\s]+:[^@\s]+@/,
];

let raw = "";
for await (const chunk of process.stdin) raw += chunk;

let command = "";
try {
  command = JSON.parse(raw)?.tool_input?.command ?? "";
} catch {
  process.exit(0);
}
if (!/\bgit\s+(commit|push)\b/.test(command)) process.exit(0);

let diff = "";
try {
  diff = execSync("git diff --cached -U0", { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });
} catch {
  process.exit(0);
}

const added = diff.split("\n").filter((l) => l.startsWith("+") && !l.startsWith("+++"));
const hits = added.filter((l) => PATTERNS.some((p) => p.test(l)));
if (hits.length > 0) {
  console.error(
    `secret-guard: ${hits.length} staged line(s) look like secrets (API key, token, private key or DB URL with password).\n` +
      "Remove them, move the value to .env, and rotate it if it was ever pushed."
  );
  process.exit(2);
}
process.exit(0);
