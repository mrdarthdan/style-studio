# ✨ Style Studio

A creative studio game for kids, made of modules:

- **👗 Dress Up** – style an avatar with hairstyles, makeup, outfits, shoes, accessories and fun backgrounds.
- **🛏️ Room Designer** – design a bedroom, decorate it, then move one of your avatars in.
- **🐾 Pet Studio** – design a pet (puppy, kitty, bunny, unicorn, dragon, hamster), then bring it home to your room.
- **⭐ Style Challenge** – dress up for a theme, tick off the checklist and earn up to 3 stars per challenge.
- **🎤 Fashion Show** – your looks walk the runway with music while pet judges hold up scores.
- **🖍️ Coloring Studio** – 9 tap-to-fill pictures, a 24-color palette, a magic rainbow brush, eraser and undo.
- **💅 Nail Salon** – nail shapes, polish, patterns and nail art for all nails or one at a time, plus rings and bracelets.
- **🧁 Cake & Cupcake Bakery** – cupcakes or layer cakes with flavors, frosting, toppings and toppers; make a wish and blow out the candles.

**Play it:** https://darthdan.vpages.site/style-studio/

## Dress Up
- **Me** – skin tones, eye colors, lash styles, and a name for your star
- **Hair** – 9 styles (long, bob, ponytail, pigtails, top bun, space buns, curly, braids, pixie) in 12 colors
- **Makeup** – eyeshadow, blush, lip color and face sparkles
- **Clothes** – 7 tops, 6 bottoms, 5 dresses, 7 kinds of shoes, each in 12 colors
- **Extras** – tiaras, bows, hats, cat ears, unicorn horn, glasses, necklaces, earrings, and something to hold
- **Places** – 8 backgrounds: bedroom, beach, castle, stage, park, space, snow day, candy land
- **Surprise** for a random look, **Save Look** to keep favorites in the closet, **Show Off** for a runway with confetti
## Room Designer
- **Walls** – 12 paint colors and 8 wallpapers
- **Floor, window, bed, rug, lights** – 7 floors, 4 window shapes with 6 views and curtains, 5 beds (cozy, princess canopy, bunk, cloud, heart), 7 rugs, 6 kinds of lights
- **Decorate** – 27 things to add (furniture, toys and pets, wall decor, plants); drag them anywhere, resize, flip, recolor, layer, remove
- **Move In** – put your current look or any saved look into the room
- **Surprise**, **Save Room**, **Show Off**, and a closet of saved rooms

## Everywhere
- **Accounts** – sign in (email or Google) to keep your closet in the cloud and see it on any device

## Tech
Plain HTML, CSS and vanilla JavaScript with hand-drawn inline SVG art. No build step.

```
index.html        page shell + home screen; wires the modules together
css/style.css     all styles
js/art.js         avatar artwork (shared by every module)
js/room-art.js    room artwork and the decoration catalog
js/core.js        storage, sound, accounts, cloud closets, progress, studio registry, navigation
js/kit.js         makeStudio(): the shared layout, option tabs, closet and buttons for a standard studio
js/dressup.js     Dress Up            js/room.js       Room Designer
js/pets.js        Pet Studio          js/challenge.js  Style Challenge
js/fashion.js     Fashion Show        js/coloring.js   Coloring Studio
js/nails.js       Nail Salon          js/bakery.js     Cake & Cupcake Bakery
```

To add a studio: write `js/<studio>.js` that calls `makeStudio({...})` (or `registerStudio({...})` for a custom layout), then add its `<script>` tag to `index.html` before `Core.start()`. Its home card appears automatically. Signed out, saved creations stay in the browser's `localStorage`. Signed in, they are stored in Supabase.

## Supabase

Style Studio uses an existing Supabase project's auth, so the same accounts work across apps. It adds four tables: `stylestudio_looks` (avatars), `stylestudio_rooms` (same shape, with a `room` column and a 50-room cap), `stylestudio_items` (everything made with the studio kit: pets, coloring pages, nail designs, bakery treats; one row per item with a `kind`, a `name` and a `data` object, up to 60 per kind) and `stylestudio_progress` (one row per account holding challenge stars). All use the same owner-only row level security:

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

Serve the folder with any static web server to play locally (e.g. `npx serve .`).
