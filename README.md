# Arjun Portfolio

A full-stack portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, MongoDB, NextAuth, Server Actions, and Route Handlers.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- MongoDB
- NextAuth (Credentials)
- Framer Motion

## Features
- Dynamic public portfolio (projects, skills, achievements, education, experience)
- Admin dashboard with protected routes
- CRUD for portfolio content
- Project image uploads and resume upload
- Draft/Published status handling
- Featured projects
- Contact form backend handling
- Responsive UI + dark/light mode

## Project Structure
```txt
prisma/
  schema.prisma
  seed.ts
public/
  uploads/
src/
  actions/
  app/
    admin/
    api/
  components/
  data/
  lib/
  middleware.ts
```

## Environment Variables
Create `.env` with:

```env
DATABASE_URL="mongodb+srv://..."
NEXTAUTH_SECRET="replace-with-long-secret"
NEXTAUTH_URL="http://localhost:3000"
AUTH_SECRET="replace-with-long-secret"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="ChangeMe123!"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## Local Development
```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Admin Access
- Login URL: `/admin/login`
- Use `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`

## Deploy on Vercel
1. Push code to GitHub.
2. Import repo in Vercel.
3. Add all env vars from `.env` in Vercel Project Settings.
4. Set `NEXTAUTH_URL` to your Vercel domain.
5. Ensure MongoDB Atlas allows Vercel network access.
6. Deploy.

## Production Notes
- Keep secrets only in environment variables.
- Do not commit `.env`.
- Store uploaded files in cloud storage for scale (S3/Cloudinary) if needed.
