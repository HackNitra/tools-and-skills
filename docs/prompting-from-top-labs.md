# Prompting advice from people at top AI labs

Notes collected 2026-11-07 from public posts, talks and write-ups. Everything below is paraphrased from search snippets and secondary write-ups, not verified against the full original posts. Check the linked source before quoting anyone.

## Anthropic

### Boris Cherny (creator of Claude Code)

- Prompting matters less than it did in the Sonnet 3.5 days. Talk to Claude like a coworker, give it a goal and don't over-scaffold.
- Communicate three things: what you want done, how much effort to spend, and how Claude should verify it did the right thing.
- Giving Claude a way to check its own work is probably the biggest lever for good results.
- Challenge Claude as a reviewer: "Grill me on these changes and don't make a PR until I pass your test", or "Prove to me this works" and have it diff behavior between main and your branch.
- After a mediocre fix, ask for a redo using everything it now knows.
- Setup habits: about 5 parallel sessions in numbered tabs, plan mode first (shift+tab twice), slash commands for repeated "inner loop" workflows, `/permissions` to pre-allow safe commands.

Sources:
- [X: "Level up your prompting" thread](https://x.com/bcherny/status/2017742752566632544)
- [X: how I use Claude Code thread](https://x.com/bcherny/status/2007179863862751572)
- [Threads: "I'm Boris and I created Claude Code"](https://www.threads.com/@boris_cherny/post/DTBVlMIkpcm/im-boris-and-i-created-claude-code-lots-of-people-have-asked-how-i-use-claude)
- [XDA: Claude Code's creator says better prompts need just 3 things](https://www.xda-developers.com/claude-codes-creator-says-better-prompts-need-just-3-things/)
- [10 Tips for Using Claude Code from Its Creator (study notes)](https://snowan.gitbook.io/study-notes/ai/claude-code/boris-cherny-cc-tips)

### Dario Amodei (CEO)

No X posts on prompting were found. The advice below comes from a podcast.

- Top advice for new users: play with the models.
- Admits to lazy prompting, hoping Claude works out what he means instead of spelling it out.
- Note: the line "prompting matters mainly at the margins" in the same conversation came from another speaker, not from him.

Source:
- [Lex Fridman: Dario Amodei transcript](https://lexfridman.com/dario-amodei-transcript/)

### Cat Wu and Thariq Shihipar (Claude Code team)

- Let the model use its own judgment instead of dictating how it should work.
- The Claude Code system prompt was reportedly cut by about 80% with Fable. This challenges the old advice to always supply examples. Cat said the team has no hard data on it.
- Thariq argues for HTML over Markdown as an output format.

Source:
- [Simon Willison: A Fireside Chat with Cat and Thariq](https://simonwillison.net/2026/Jul/21/cat-and-thariq/)

### Amanda Askell (personality alignment)

- Experiment boldly and treat prompting as iterative, not one-shot.
- Clear, philosophical thinking about what you want matters more than trial and error.
- Example prompt: pick a graduate-level concept from a field, explain it indirectly through a fable, then add a plain explanation.

Sources:
- [Jeremy Nguyen on X: Amanda Askell's curiosity prompt](https://x.com/JeremyNguyenPhD/status/2047187180821647608)
- [Amanda Askell's Prompt Engineering Secrets](https://startupspells.com/p/amanda-askell-prompt-engineering-secrets)
- [Amanda Askell: AI Prompting Techniques & Claude's Design](https://www.toolmesh.ai/news/amanda-askell-ai-prompting-claude-design)

## OpenAI

### Andrej Karpathy (founding member)

- Ask for output that is easy to review: diagrams, HTML pages, custom explainer videos.
- For dense text, the aerospace controlled-English standard ASD-STE100 (he sometimes asks for "80% of the way" there).
- Reportedly advises treating an LLM as a simulator, not an entity (third-party summary).

Sources:
- [Search Engine Journal: Make LLMs write like an aircraft manual](https://www.searchenginejournal.com/karpathy-llm-aircraft-manual-writing/591813/)
- [explainx.ai: Karpathy on understanding LLM output](https://www.explainx.ai/blog/karpathy-understand-llm-outputs-ste100-diagrams-html-video-2026)

## Aggregator (no lab affiliation)

- [Simon Willison: prompt-engineering tag](https://simonwillison.net/tags/prompt-engineering/). A running log of what lab people say about prompting.

## Common threads

1. Say the goal and how to verify it, not step-by-step instructions.
2. Let newer models use their judgment. Over-specified prompts and long example lists may now hurt.
3. Make output easy to review (diagrams, HTML) and make the model prove its work.
4. Iterate and experiment. Prompting is not one-shot.

## Gaps

- No Google DeepMind engineers found.
- OpenAI's own GPT-5.6 prompting best-practices guide was mentioned in results but not read.
- Boris's posts from the last six months were not pulled in full. Dates in the search results were inconsistent.
