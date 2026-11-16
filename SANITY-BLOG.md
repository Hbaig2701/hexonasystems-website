# Sanity blog (new posts)

New articles are written in a separate Sanity project (Hexona Systems Blog, project 3uamydx4, dataset production). Existing articles stay as TypeScript files in content/blog/articles and are never read from or moved into Sanity.

## How it works

1. An editor writes and publishes a Blog article in the Studio (sanity-studio/).
2. A Sanity webhook calls a Vercel deploy hook.
3. The build runs scripts/sync-sanity.mjs, which fetches published posts and writes content/blog/articles/sanity.generated.json.
4. content/blog/articles/index.ts appends those articles after the hand-written ones. A hand-written slug always wins.
5. Routes, sitemap, RSS, llms.txt, schema and covers read the same ARTICLES list, so a Sanity article behaves like any other.

With no SANITY_PROJECT_ID the sync writes an empty list and the build continues. If Sanity is unreachable the previous generated file is kept. A post that breaks the content rules (bad slug, fewer than 5 FAQs, fewer than 2 sources, related not exactly 3) is skipped with a log line, so one bad draft cannot break the build.

## Environment variables (Vercel, all environments)

- SANITY_PROJECT_ID=3uamydx4
- SANITY_DATASET=production
- SANITY_READ_TOKEN only if the dataset becomes private

## Studio

cd sanity-studio, npm install, npm run dev for local, npm run deploy for a hosted Studio. The Studio has its own package.json and is excluded from the site's tsconfig and eslint.

## Webhook

1. Vercel: project Settings, Git, Deploy Hooks. Create a hook on main and copy the URL.
2. Sanity manage, project 3uamydx4, API, Webhooks. Create one: URL is the deploy hook, method POST, dataset production, trigger on create, update and delete, filter: _type == "post" && !(_id in path("drafts.**")), projection empty.

## Writing rules

See content/blog/README.md. npm test is the hard gate for every article.
