# Publishing

This repo publishes to npm as `opencode-clauddy-auth`.

## One-time setup (GitHub Actions)

1. Create an npm Automation token with permission to publish this package.
2. In GitHub repo settings → Secrets and variables → Actions → add `NPM_TOKEN`.

## Publish a release

1. Bump version: `npm version patch` (or `minor` / `major`)
2. Push commits + tags: `git push --follow-tags`

The GitHub Actions workflow `.github/workflows/npm-publish.yml` will publish on tag push (`v*`).

## Manual publish (local)

```bash
bun install
bun run build
npm login
npm publish
```
