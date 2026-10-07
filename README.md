# Euphoria Full Authentication Flow

Stack: Next.js + Node.js/Next.js API routes + TailwindCSS + MySQL + NextAuth.

## Pages
- `/login` Sign In
- `/signup` Sign Up
- `/reset-password` Reset Password
- `/check-email` Check Email
- `/verification` Verification
- `/create-new-password` Create New Password
- `/` Protected Home Page

## Database
Run `database.sql` in MySQL Workbench. It creates the `euphoria` database, `users` table and `password_resets` table.

Create `.env.local` in the same folder as `package.json` and add your MySQL credentials and `NEXTAUTH_SECRET`.

Google login needs `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from a Google OAuth app. Until those are added, the Email/Password login still works.

For local development, the password reset flow shows the generated 6-digit code on the Check Email step. In production, connect that API to an email provider instead of returning `devCode`.

## Run
```bash
npm install
npm run dev
```
Then open `http://localhost:3000`.
