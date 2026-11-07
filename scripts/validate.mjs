#!/usr/bin/env node
// Validates skills, commands and agents: frontmatter present, name matches folder, description sane.
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const errors = [];

function frontmatter(file) {
  const text = readFileSync(file, "utf8");
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z-]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2];
  }
  return out;
}

const skillsDir = join(root, "skills");
for (const name of readdirSync(skillsDir)) {
  const dir = join(skillsDir, name);
  if (!statSync(dir).isDirectory()) continue;
  const file = join(dir, "SKILL.md");
  if (!existsSync(file)) { errors.push(`skills/${name}: missing SKILL.md`); continue; }
  const fm = frontmatter(file);
  if (!fm) { errors.push(`skills/${name}: missing frontmatter`); continue; }
  if (fm.name !== name) errors.push(`skills/${name}: frontmatter name "${fm.name}" does not match folder`);
  if (!fm.description || fm.description.length < 40) errors.push(`skills/${name}: description missing or too short`);
}

for (const [dirName, required] of [["commands", ["description"]], ["agents", ["name", "description"]]]) {
  const dir = join(root, dirName);
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".md"))) {
    const fm = frontmatter(join(dir, f));
    if (!fm) { errors.push(`${dirName}/${f}: missing frontmatter`); continue; }
    for (const key of required) if (!fm[key]) errors.push(`${dirName}/${f}: missing "${key}"`);
  }
}

for (const f of [".claude-plugin/plugin.json", ".claude-plugin/marketplace.json", "hooks/hooks.json"]) {
  try { JSON.parse(readFileSync(join(root, f), "utf8")); } catch (e) { errors.push(`${f}: invalid JSON (${e.message})`); }
}

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log("✓ all skills, commands, agents and manifests are valid");
