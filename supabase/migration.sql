-- ============================================================
-- Couple Space — Initial Database Migration
-- ============================================================
-- Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  email text not null,
  avatar_url text,
  created_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. Couples table
create table public.couples (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  relationship_date date,
  name text,
  cover_image_url text,
  theme_color text default 'rose'
);

alter table public.couples enable row level security;

create policy "Couple members can view their couple"
  on public.couples for select
  using (
    id in (
      select couple_id from public.couple_members
      where user_id = auth.uid()
    )
  );

create policy "Couple members can update their couple"
  on public.couples for update
  using (
    id in (
      select couple_id from public.couple_members
      where user_id = auth.uid()
    )
  );

create policy "Authenticated users can create a couple"
  on public.couples for insert
  with check (auth.uid() is not null);


-- 3. Couple members junction table
create table public.couple_members (
  couple_id uuid references public.couples on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  joined_at timestamptz default now() not null,
  primary key (couple_id, user_id)
);

alter table public.couple_members enable row level security;

create policy "Users can view their own couple memberships"
  on public.couple_members for select
  using (user_id = auth.uid());

create policy "Users can view their partner's membership"
  on public.couple_members for select
  using (
    couple_id in (
      select couple_id from public.couple_members
      where user_id = auth.uid()
    )
  );

create policy "Authenticated users can insert couple members"
  on public.couple_members for insert
  with check (auth.uid() is not null);


-- 4. Invitations table
create table public.invitations (
  id uuid default gen_random_uuid() primary key,
  couple_id uuid references public.couples on delete cascade not null,
  code text unique not null,
  created_by uuid references auth.users not null,
  accepted_by uuid references auth.users,
  accepted_at timestamptz,
  expires_at timestamptz default (now() + interval '7 days') not null,
  created_at timestamptz default now() not null
);

alter table public.invitations enable row level security;

create policy "Invitation creator can view their invitations"
  on public.invitations for select
  using (created_by = auth.uid());

create policy "Anyone can view invitation by code for joining"
  on public.invitations for select
  using (true);

create policy "Authenticated users can create invitations"
  on public.invitations for insert
  with check (auth.uid() = created_by);

create policy "Authenticated users can accept invitations"
  on public.invitations for update
  using (auth.uid() is not null);


-- 5. Messages table
create table public.messages (
  id uuid default gen_random_uuid() primary key,
  couple_id uuid references public.couples on delete cascade not null,
  sender_id uuid references auth.users not null,
  content text not null,
  message_type text default 'text' not null,
  created_at timestamptz default now() not null,
  read_at timestamptz,
  deleted_at timestamptz
);

alter table public.messages enable row level security;

create policy "Couple members can view their messages"
  on public.messages for select
  using (
    couple_id in (
      select couple_id from public.couple_members
      where user_id = auth.uid()
    )
  );

create policy "Couple members can send messages"
  on public.messages for insert
  with check (
    couple_id in (
      select couple_id from public.couple_members
      where user_id = auth.uid()
    )
    and sender_id = auth.uid()
  );

create policy "Users can update their own messages"
  on public.messages for update
  using (sender_id = auth.uid());


-- 6. Memories table
create table public.memories (
  id uuid default gen_random_uuid() primary key,
  couple_id uuid references public.couples on delete cascade not null,
  uploaded_by uuid references auth.users not null,
  storage_path text not null,
  caption text,
  media_type text default 'image' not null,
  created_at timestamptz default now() not null,
  deleted_at timestamptz
);

alter table public.memories enable row level security;

create policy "Couple members can view their memories"
  on public.memories for select
  using (
    couple_id in (
      select couple_id from public.couple_members
      where user_id = auth.uid()
    )
  );

create policy "Couple members can upload memories"
  on public.memories for insert
  with check (
    couple_id in (
      select couple_id from public.couple_members
      where user_id = auth.uid()
    )
    and uploaded_by = auth.uid()
  );

create policy "Users can delete their own memories"
  on public.memories for update
  using (uploaded_by = auth.uid());


-- 7. Locations table
create table public.locations (
  id uuid default gen_random_uuid() primary key,
  couple_id uuid references public.couples on delete cascade not null,
  user_id uuid references auth.users not null,
  latitude double precision not null,
  longitude double precision not null,
  shared_until timestamptz not null,
  created_at timestamptz default now() not null
);

alter table public.locations enable row level security;

create policy "Couple members can view shared locations"
  on public.locations for select
  using (
    couple_id in (
      select couple_id from public.couple_members
      where user_id = auth.uid()
    )
  );

create policy "Users can share their own location"
  on public.locations for insert
  with check (
    couple_id in (
      select couple_id from public.couple_members
      where user_id = auth.uid()
    )
    and user_id = auth.uid()
  );

create policy "Users can update their own location"
  on public.locations for update
  using (user_id = auth.uid());

create policy "Users can delete their own location"
  on public.locations for delete
  using (user_id = auth.uid());


-- 8. Music sessions table
create table public.music_sessions (
  id uuid default gen_random_uuid() primary key,
  couple_id uuid references public.couples on delete cascade not null,
  track_url text,
  track_title text,
  track_artist text,
  position real default 0,
  is_playing boolean default false,
  updated_by uuid references auth.users,
  updated_at timestamptz default now() not null
);

alter table public.music_sessions enable row level security;

create policy "Couple members can view their music sessions"
  on public.music_sessions for select
  using (
    couple_id in (
      select couple_id from public.couple_members
      where user_id = auth.uid()
    )
  );

create policy "Couple members can create music sessions"
  on public.music_sessions for insert
  with check (
    couple_id in (
      select couple_id from public.couple_members
      where user_id = auth.uid()
    )
  );

create policy "Couple members can update music sessions"
  on public.music_sessions for update
  using (
    couple_id in (
      select couple_id from public.couple_members
      where user_id = auth.uid()
    )
  );


-- 9. Enable Realtime for key tables
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.locations;
alter publication supabase_realtime add table public.music_sessions;
alter publication supabase_realtime add table public.memories;


-- 10. Create storage bucket for memories
insert into storage.buckets (id, name, public)
values ('memories', 'memories', false);

create policy "Couple members can upload to memories bucket"
  on storage.objects for insert
  with check (
    bucket_id = 'memories'
    and auth.uid() is not null
  );

create policy "Couple members can view memories bucket"
  on storage.objects for select
  using (
    bucket_id = 'memories'
    and auth.uid() is not null
  );

create policy "Users can delete their own uploads"
  on storage.objects for delete
  using (
    bucket_id = 'memories'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
