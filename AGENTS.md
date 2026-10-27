# AGENTS.md

Instructions for AI coding agents working in this repository. Human contributors: see [README.md](./README.md).

## Project

SIGAP-UMKM is a web application for Indonesian MSMEs (UMKM).

- Next.js 14.1, React 18, TypeScript 5
- Prisma 5 with PostgreSQL
- NextAuth.js 4, Zod
- Tailwind CSS 3, Radix Slot, class-variance-authority, lucide-react, Recharts
- Package manager: npm (`package-lock.json` is committed)

Top-level layout: `prisma/` (schema, migrations), `public/` (static assets), `src/` (application code).

## Commands

Run from the repository root.

```bash
npm install
npm run dev              # dev server on :3000
npm run lint             # ESLint
npx tsc --noEmit         # type check
npm run build            # production build
npx prisma generate      # regenerate client after schema changes
npx prisma migrate dev   # create and apply a migration locally
```

There is no test runner configured. Do not claim tests passed. If you add tests, add the script to `package.json` and document it here.

Before reporting a task as done, run `npm run lint`, `npx tsc --noEmit`, and `npm run build` for any change that touches code. Report the actual result. If a command fails or cannot be run, say so.

## Working Method

1. Read before writing. Open the files you will touch and their neighbours. Check whether the project uses `src/app` or `src/pages` and follow that one.
2. Match existing conventions: naming, file layout, import style, component patterns, error handling.
3. Make the smallest change that solves the request. Do not touch unrelated files.
4. Verify claims. Do not invent APIs, props, config keys, or library behaviour. If unsure, read the installed package's types or docs in `node_modules`, or ask.
5. If the request is ambiguous and a wrong guess is costly, ask one specific question. Otherwise state your assumption in one line and proceed.

## Code Standards

- TypeScript strict. No `any`, no `@ts-ignore`, no non-null assertions to silence errors. Use `unknown` and narrow, or define the type.
- Validate all external input (request bodies, query params, form data, env vars) with Zod at the boundary.
- Use the existing `cn()` helper (`clsx` + `tailwind-merge`) for conditional class names. Check the repo for it before creating another.
- Use Prisma for all database access. Reuse the existing Prisma client singleton; never instantiate `new PrismaClient()` in feature code.
- Prefer Server Components. Add `"use client"` only when the component needs state, effects, or browser APIs.
- Use `@/` path aliases if configured in `tsconfig.json`. No deep relative imports (`../../../`).
- Use Tailwind utilities. No inline `style` unless a value is truly dynamic.
- Handle errors where they can be acted on. Do not wrap code in empty or log-only `try/catch`. Do not swallow errors.
- UI text is Indonesian unless the surrounding code is not. Identifiers in code are English.

## Security

- Never commit `.env` or any secret. Only `.env.example` is tracked, and it holds placeholders.
- Never hardcode credentials, tokens, or connection strings.
- Authorize on the server for every protected route, action, and API handler. Client-side checks are not authorization.
- Do not log personal or business data, tokens, or session objects.
- Use parameterized access through Prisma. Do not build raw SQL from user input. If `$queryRaw` is unavoidable, use tagged-template parameters.
- Do not add a dependency without a clear need. State why in your summary. Prefer what is already installed.

## Database

- Schema changes go through `prisma/schema.prisma` and a migration. Never edit applied migration files.
- Never run destructive commands (`migrate reset`, `db push --force-reset`, `DROP`, bulk `deleteMany`) without explicit instruction.
- Do not point commands at a production database.

## Avoiding AI Slop

Output must read like it was written by a careful senior engineer who values the reader's time.

Do not:

- Add features, options, abstractions, config flags, or "future-proofing" that were not requested.
- Create helpers, wrappers, or base classes used in only one place.
- Leave placeholders: `TODO` stubs, `// implement later`, mock data, fake endpoints, `lorem ipsum`, or functions that return hardcoded values pretending to work.
- Leave dead code, unused imports, unused variables, or commented-out code.
- Leave `console.log` or debug output. Use the project's logging approach if one exists.
- Duplicate logic that already exists. Search the repo first.
- Rewrite, reformat, or rename code outside the scope of the task.
- Add files nobody asked for (extra READMEs, docs, summaries, example files, scripts).
- Use filler naming: `data2`, `handleStuff`, `utils.ts` dumping grounds, `Manager`, `Helper`, `Processor` without a real responsibility.
- Use emojis in code, comments, commit messages, logs, or UI strings unless the existing UI already does.
- Pad responses with praise, apologies, restated requests, or long recaps of what you just did.

Do:

- Delete what you make obsolete.
- Prefer plain, direct code over clever code.
- Prefer one clear implementation over several options.
- Keep functions short and single-purpose. Extract only when it removes real duplication or clarifies intent.
- Name things by what they are or do. A good name replaces a comment.
- Keep diffs reviewable. Split unrelated changes into separate tasks.

## Comments

Default to no comment. Code and names should explain what happens. A comment is allowed only when it explains something the code cannot:

- Why a non-obvious choice was made (workaround, business rule, performance trade-off, browser or library quirk).
- A constraint or invariant that is not enforced by types.
- A link to the ticket, spec, or upstream bug that justifies odd behaviour.

Rules:

- One line is the norm. Two or three lines is the ceiling. If you need more, the code is probably too complex; simplify it or put the explanation in the PR description.
- Do not restate the code (`// loop through users`, `// return the result`, `// set state`).
- Do not write docblocks (`/** @param ... @returns ... */`) for functions whose name and TypeScript signature already say it. Use JSDoc only on exported public utilities where behaviour is not obvious from the types.
- No section banners or dividers (`// ===== Helpers =====`).
- No commented-out code. Git keeps history.
- No change-log or authorship comments (`// added`, `// updated`, `// fixed bug`, `// AI generated`).
- No `TODO` without an owner or issue reference. Prefer opening an issue.
- Do not leave explanatory notes to the reviewer inside the code. Put them in your response or the PR description.
- Write comments in English, matching the existing codebase.

Before finishing, reread your diff and delete every comment that does not meet the criteria above.

## Git and Pull Requests

- Branch names: `feat/...`, `fix/...`, `refactor/...`, `docs/...`, `chore/...`.
- Commit messages follow Conventional Commits: `type(scope): imperative summary`, under 72 characters. Body only when the reason is not obvious from the diff.
- One logical change per commit.
- Do not commit, push, or open a PR unless asked.
- Do not edit `package-lock.json` by hand. Change dependencies with `npm install` / `npm uninstall`.
- PR description: what changed, why, how it was verified, and any follow-up. No marketing language.

## Final Response Format

When you finish a task, reply briefly:

1. What changed (files and the essential behaviour).
2. Verification actually performed and its result.
3. Assumptions, open questions, or known limitations. Omit this if there are none.

Do not repeat the code in the reply. Do not list every file you read.
