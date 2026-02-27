# Run & Work Locally

Prereqs
- PHP (see [composer.json](composer.json) requirement)
- Composer
- Node.js & npm
- Git

Quick setup (recommended)
- Use the provided Composer script: [`scripts.setup`](composer.json)

```bash
composer run setup
```

Manual setup (equivalent)
```bash
git clone <repo-url>
cd <repo>

# PHP deps
composer install

# Copy env (env is ignored: see [.gitignore](.gitignore))
cp .env.example .env
# Edit .env if you need to change DB or services

php artisan key:generate
php artisan migrate --force
php artisan db:seed   # optional

# JS/CSS
npm install
npm run build   # production assets (see [package.json](package.json) / `scripts.build`)
# or for development hot-reload:
npm run dev
```

Run dev server
- Option A (simple):
```bash
php artisan serve
```
- Option B (concurrent dev with queues & vite): run the composer dev script [`scripts.dev`](composer.json)
```bash
composer run dev
```

Common commands
- Build assets: `npm run build` ([package.json](package.json))
- Start vite dev: `npm run dev` ([package.json](package.json))
- Run migrations: `php artisan migrate`
- Link storage (public storage is gitignored): `php artisan storage:link`
- Run tests: `composer run test` ([composer.json](composer.json))

Notes
- .env, vendor/, node_modules/, and public/build are ignored — teammates must run the install/build steps locally (see [.gitignore](.gitignore)).
- Vite configuration: [vite.config.js](vite.config.js)
- Entrypoint: [artisan](artisan)

If you want, add these instructions to the repo README ([README.md](README.md)).