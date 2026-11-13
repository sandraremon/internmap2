# InternMap 2

A full-stack internship and job management platform that connects **students**, **recruiters**, and **admins**. Built with a **Laravel 12** REST API backend and a **React 19 + TypeScript** frontend using React Router v7.

---

## ✨ Features

| Role | Capabilities |
|---|---|
| **Student** | Register, build a CV, browse job postings, apply for jobs/internships, track application status, view learning roadmaps |
| **Recruiter** | Register a company, post job openings, view applicants, update application statuses |
| **Admin** | Manage all users, delete users and roadmaps, oversee platform content |
| **All users** | Browse roadmaps, view public job listings, manage profile |

---

## 🏗️ Tech Stack

### Backend
- **PHP 8.2+** / **Laravel 12**
- **Laravel Sanctum** – token-based API authentication
- **Inertia.js** (Laravel adapter) – SPA bridge
- **SQLite** (default) — easily switchable to MySQL/PostgreSQL via `.env`

### Frontend (`/frontend`)
- **React 19** + **TypeScript**
- **React Router v7** (file-based routing)
- **HeroUI** – component library
- **Tailwind CSS v4**
- **Framer Motion** – animations
- **Axios** – HTTP client
- **Vite 8** – build tool

---

## 📁 Project Structure

```
internmap2/
├── app/
│   ├── Http/Controllers/     # API controllers (Auth, Student, Recruiter, Admin, Job, CV, Roadmap…)
│   └── Models/
│       ├── User/             # User, Student, Recruiter, Admin
│       ├── JobPosting/       # JobPosting, Internship, FullTime, FreelanceProject
│       ├── Roadmap/          # Roadmap, RoadmapModule, Skill
│       ├── Application/
│       ├── Company/
│       └── CV/
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   ├── api.php               # JSON API routes
│   └── web.php               # Web routes
├── frontend/                 # React / TypeScript SPA
│   ├── app/
│   │   ├── FrontendWebpages/ # Page components (Dashboard, Profile, Roadmap, Jobs…)
│   │   ├── routes/           # React Router route definitions
│   │   └── services/         # API service layer (Axios calls)
│   └── package.json
└── composer.json
```

---

## 🚀 Getting Started

### Prerequisites
- PHP ≥ 8.2
- Composer
- npm
- Git

### Quick Setup (recommended)

```bash
git clone <repo-url>
cd internmap2

composer run setup
```

This single command installs PHP deps, copies `.env`, generates the app key, runs migrations, installs JS deps, and builds assets.

### Manual Setup

```bash
# 1. PHP dependencies
composer install

# 2. Environment
cp .env.example .env
# Edit .env as needed (DB, mail, etc.)
php artisan key:generate

# 3. Database
php artisan migrate

# 4. Frontend
npm install
npm run build        # production build
# or for hot-reload:
npm run dev
```

---

## 🖥️ Running Locally

**Simple (backend only):**
```bash
php artisan serve
```
> API available at `http://localhost:8000`

**Full dev mode** (backend + Vite HMR + queue worker + log tail concurrently):
```bash
composer run dev
```

**Frontend dev server** (from the `frontend/` directory):
```bash
cd frontend
npm run dev
```

---

## ⚙️ Environment Configuration

Key variables in `.env` (copy from `.env.example`):

| Variable | Default | Description |
|---|---|---|
| `APP_URL` | `http://localhost` | Base URL |
| `DB_CONNECTION` | `sqlite` | Database driver |
| `DB_DATABASE` | _(sqlite file)_ | Database path / name |
| `SESSION_DRIVER` | `database` | Session storage |
| `QUEUE_CONNECTION` | `database` | Queue driver |
| `MAIL_MAILER` | `log` | Mail driver (use `smtp` for production) |

---

## 🔑 Authentication

Authentication is handled by **Laravel Sanctum** (token-based). The frontend stores the token and attaches it to API requests via Axios.

| Endpoint | Method | Description |
|---|---|---|
| `/login` | `POST` | Log in and receive a token |
| `/logout` | `POST` | Revoke current token |
| `/api/student/register` | `POST` | Register as a student |
| `/api/recruiter/register` | `POST` | Register as a recruiter |
| `/api/admin/register` | `POST` | Register as an admin |

---

## 📡 Key API Endpoints

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/user/role` | `GET` | ✅ | Get the authenticated user's role |
| `/api/profile` | `GET` | ✅ | Get user profile |
| `/api/profile/update` | `PATCH` | ✅ | Update profile |
| `/api/jobposting/` | `GET` | ❌ | List all job postings |
| `/api/jobposting/new` | `POST` | ✅ | Create a job posting (recruiter) |
| `api/myJobPostings` | `GET` | ✅ | Recruiter's own job postings |
| `/api/job/{id}/applicants` | `GET` | ❌ | Applicants for a job |
| `/api/application/new/{jobposting}` | `POST` | ✅ | Apply for a job |
| `/api/application/{id}/status` | `PATCH` | ❌ | Update application status |
| `/api/roadmap/` | `GET` | ❌ | List all roadmaps |
| `/api/roadmap/{roadmap}` | `GET` | ❌ | Get a specific roadmap |
| `/api/roadmap/new` | `POST` | ❌ | Create a roadmap |
| `/api/roadmap/{roadmap}` | `DELETE` | ❌ | Delete a roadmap |
| `/company/new` | `POST` | ✅ | Create a company |
| `/cv/create` | `POST` | ✅ | Create/upload a CV |

- ❌ means the endpoint is public
- ✅ means the endpoint requires authentication (protected by Laravel Sanctum)
---

## 🧪 Testing

```bash
composer run test
# or
php artisan test
```

Tests are written with **Pest** and located in `tests/`.

---

## 🛠️ Other Useful Commands

```bash
# Run database migrations
php artisan migrate

# Link public storage
php artisan storage:link

# Build frontend assets (production)
npm run build

# Lint frontend
cd frontend && npm run lint
```

---

## 📄 License

MIT
