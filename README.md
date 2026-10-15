# Jyotish Kumar: portfolio

React + Vite, Tailwind CSS v4, Three.js, GSAP and Locomotive Scroll. The contact form, the owner inbox and sign-in run on Supabase.

## Run it

```bash
npm install
cp .env.example .env      # then fill in the two Supabase values (see below)
npm run dev               # http://localhost:5173
npm run build             # production build in /dist
```

The site works without Supabase. Only the contact form needs it, and without keys it tells visitors to email you.

## Set up Supabase (about 5 minutes)

1. Create a project at supabase.com.
2. **Project Settings > API**: copy the Project URL and the `anon` public key into `.env` as `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Never use the `service_role` key in this project.
3. **SQL Editor**: paste and run `supabase/schema.sql`. It creates the `contact_messages` table with row-level security:
   visitors can only add messages; only `jyotishkumarjhar@gmail.com` can read or delete them.
4. **Authentication > Users > Add user**: create a user with that same email.
5. **Authentication > Sign In / Providers**: turn **off** "Allow new users to sign up".
6. **Authentication > URL Configuration**: add your deployed site URL (for example `https://your-site.vercel.app/?inbox=1`) to Redirect URLs.

## Read your messages

Open `/?inbox=1` on your site (there is an "Owner sign in" link in the footer), enter your email, and click the link Supabase sends you. Messages appear newest first, and you can delete them.

## Deploy

Vercel or Netlify: import the project, set the two `VITE_SUPABASE_*` environment variables, build command `npm run build`, output directory `dist`.

## Edit the content

Everything on the page (projects, experience, skills, links) lives in `src/data.js`.
To show a Resume button, put your PDF in `public/` and set `resume: '/your-file.pdf'` in that file.
Your portrait is `public/jyotish.jpg` (and `.webp`); replace both to change it.
