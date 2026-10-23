# Contributing

Thanks for considering a contribution! This project uses a **trunk-based** workflow.

## Workflow

1. Branch off `main` with a short-lived branch, e.g. `feat/article-pagination` or `fix/rtl-menu`.
2. Keep the change small and focused; open a pull request early (drafts are welcome).
3. CI must be green: lint, typecheck, unit tests, build and end-to-end tests.
4. Pull requests are **squash-merged** into `main`. The PR title becomes the commit message,
   so it must follow [Conventional Commits](https://www.conventionalcommits.org/)
   (`feat: …`, `fix: …`, `docs: …`, `chore: …`, …).
5. Delete the branch after merging. `main` should always be deployable.

## Local setup

```bash
corepack enable
pnpm install          # also installs the Git hooks
pnpm dev
```

Git hooks (via Husky):

- **pre-commit** runs ESLint on staged files (`lint-staged`).
- **commit-msg** validates the message with `commitlint`.

## Before pushing

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build && pnpm test:e2e
```

## Guidelines

- Add or update tests for behaviour changes.
- Add new UI strings to **every** file in `i18n/locales/`.
- Keep secrets out of the repository; document new variables in `.env.example`.
