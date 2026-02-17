# Arjun Portfolio (Next.js Full Stack)

Production-ready, database-driven portfolio built with Next.js App Router, TypeScript, Tailwind, Prisma, MongoDB, NextAuth, Server Actions, and Route Handlers.

## 1. Folder Structure

```txt
.
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   └── uploads/
│       ├── images/
│       └── resume/
├── src/
│   ├── actions/
│   │   ├── auth.ts
│   │   ├── content.ts
│   │   └── projects.ts
│   ├── app/
│   │   ├── (public routes)
│   │   │   ├── page.tsx
│   │   │   ├── blog/page.tsx
│   │   │   └── blog/[slug]/page.tsx
│   │   ├── admin/
│   │   │   ├── login/page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── projects/*
│   │   │   ├── achievements/page.tsx
│   │   │   ├── certifications/page.tsx
│   │   │   ├── blog/page.tsx
│   │   │   ├── skills/page.tsx
│   │   │   └── profile/page.tsx
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── contact/route.ts
│   │   │   └── upload/
│   │   │       ├── image/route.ts
│   │   │       └── resume/route.ts
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── admin/*
│   │   ├── public/*
│   │   ├── providers/*
│   │   └── ui/*
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── prisma.ts
│   │   ├── utils.ts
│   │   └── validations.ts
│   └── middleware.ts
├── package.json
└── README.md
```

## 2. Prisma Schema

Defined in `/prisma/schema.prisma` with scalable models:
- `User` (admin auth)
- `Profile`
- `SocialLink`
- `Project`
- `Achievement`
- `Certification`
- `BlogPost`
- `Skill`
- `Experience`
- `Resume`
- `ContactMessage`

Includes:
- `slug` fields for SEO (where relevant)
- `createdAt` and `updatedAt`
- `ContentStatus` (`DRAFT` / `PUBLISHED`)
- indexing on status, timestamps, and high-query fields
- `featured` toggle for projects

## 3. API Route Structure (/app/api)

- `POST /api/auth/[...nextauth]` - NextAuth handlers
- `POST /api/contact` - contact form backend persistence
- `POST /api/upload/image` - admin image uploads
- `POST /api/upload/resume` - admin resume upload + versioning

## 4. Authentication Flow (NextAuth + Middleware)

1. Admin signs in at `/admin/login` using credentials.
2. `NextAuth` validates against Prisma `User` and `bcrypt` hash.
3. Session is JWT-based with role in token/session.
4. `src/middleware.ts` protects `/admin/*` routes.
5. Unauthorized users are redirected to `/admin/login`.

## 5. Admin Dashboard Structure

- SaaS-style sidebar layout (`/admin/layout.tsx`)
- Sections:
  - Overview
  - Projects (full CRUD + pagination + featured/status toggles + image upload)
  - Achievements (create/delete)
  - Certifications (create/delete)
  - Blog (create/delete markdown posts)
  - Skills (create/delete)
  - Profile (bio/socials/experience/resume upload)
- Loading states and toasts included for async client actions.

## 6. Example CRUD Implementation (Projects)

Projects CRUD is fully implemented with:
- `src/actions/projects.ts`:
  - `createProjectAction`
  - `updateProjectAction`
  - `deleteProjectAction`
- `src/app/admin/projects/page.tsx`:
  - list view + pagination
- `src/app/admin/projects/new/page.tsx`:
  - create form
- `src/app/admin/projects/[id]/edit/page.tsx`:
  - edit form
- `src/components/admin/project-form.tsx`:
  - validation-friendly form, image upload preview, featured + status control

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Configure env:

```bash
cp .env.example .env
```

3. Generate Prisma client and sync schema:

```bash
npm run prisma:generate
npm run prisma:migrate
```

4. Seed admin and starter content:

```bash
npm run prisma:seed
```

5. Start dev server:

```bash
npm run dev
```

Admin login uses `.env` values:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
