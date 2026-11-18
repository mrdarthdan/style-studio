# ✨ Style Studio

A dress-up and makeover game for kids. Style an avatar with hairstyles, makeup, outfits, shoes, accessories and fun backgrounds.

**Play it:** https://darthdan.vpages.site/style-studio/

## Features
- **Me** – skin tones, eye colors, lash styles, and a name for your star
- **Hair** – 9 styles (long, bob, ponytail, pigtails, top bun, space buns, curly, braids, pixie) in 12 colors
- **Makeup** – eyeshadow, blush, lip color and face sparkles
- **Clothes** – 7 tops, 6 bottoms, 5 dresses, 7 kinds of shoes, each in 12 colors
- **Extras** – tiaras, bows, hats, cat ears, unicorn horn, glasses, necklaces, earrings, and something to hold
- **Places** – 8 backgrounds: bedroom, beach, castle, stage, park, space, snow day, candy land
- **Surprise** for a random look, **Save Look** to keep favorites in the closet, **Show Off** for a runway with confetti
- **Accounts** – sign in (email or Google) to keep your closet in the cloud and see it on any device

## Tech
A single self-contained `index.html`: hand-drawn inline SVG art, vanilla JavaScript, no build step and no dependencies (aside from the Fredoka Google Font). Signed out, saved looks stay in the browser's `localStorage`. Signed in, they are stored in Supabase.

## Supabase

Style Studio uses an existing Supabase project's auth, so the same accounts work across apps. It adds one table:

```sql
create table public.stylestudio_looks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  avatar_name text check (char_length(avatar_name) <= 40),
  look jsonb not null check (jsonb_typeof(look) = 'object' and pg_column_size(look) < 8000),
  created_at timestamptz not null default now()
);
alter table public.stylestudio_looks enable row level security;
-- select / insert / update / delete policies: (select auth.uid()) = user_id, for the authenticated role only
```

A trigger caps each account at 100 saved looks. When someone signs in, any looks saved on that device move into their account. To point the game at a different project, change `SB_URL` and `SB_KEY` (the publishable key) in `index.html`.

Open `index.html` in any browser to play locally.
