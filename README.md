# 🧠 Course Platform with Admin Upload & Quiz Completion (Replit + Supabase)

## Features

- ✅ Admin Login via Supabase
- 🎥 Upload courses with video links and JSON-based quiz
- 👨‍🎓 Learners can view videos and take quizzes
- 📈 Course completion tracked on passing quiz

## How to Use

1. **Import this Gist into Replit**
2. Create a [Supabase](https://supabase.com) account
3. Create tables with SQL:
```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text,
  video_url text,
  quiz jsonb
);
create table user_progress (
  email text,
  course_id uuid,
  completed boolean default false,
  primary key(email, course_id)
);
