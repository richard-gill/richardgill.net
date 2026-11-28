-- Hot or Not Dog: run this once in Supabase → SQL Editor → New query → Run.

create table if not exists public.hotdog_votes (
	id bigint generated always as identity primary key,
	file text not null check (char_length(file) between 1 and 200),
	hot boolean not null,
	created_at timestamptz not null default now()
);

-- Row Level Security: the public (anon) key may only INSERT votes, never read or change raw rows.
alter table public.hotdog_votes enable row level security;

-- Newer Supabase projects don't grant table access to anon by default.
-- INSERT only (no SELECT/UPDATE/DELETE); the policy below still applies on top.
grant insert on public.hotdog_votes to anon;

-- Anyone can vote, but only for something that looks like a real picture name
-- (e.g. 'Les Arcs.webp', 'thgBlackFridayHotDog.jpg'), and with an honest timestamp.
-- Safe to re-run: this replaces the policy if it already exists.
drop policy if exists "anyone can vote" on public.hotdog_votes;
create policy "anyone can vote"
	on public.hotdog_votes for insert
	to anon
	with check (
		file ~ '^[A-Za-z0-9 _-]{1,100}\.(webp|jpg)$'
		and created_at between now() - interval '5 minutes' and now() + interval '1 minute'
	);

-- Public tallies: totals per picture, without exposing individual rows.
create or replace function public.hotdog_vote_totals()
returns table (file text, hot bigint, not_hot bigint)
language sql
stable
security definer
set search_path = public
as $$
	select file,
	       count(*) filter (where hot)     as hot,
	       count(*) filter (where not hot) as not_hot
	from public.hotdog_votes
	group by file;
$$;

grant execute on function public.hotdog_vote_totals() to anon;
