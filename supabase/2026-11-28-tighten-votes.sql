-- One-off update for an existing Hot or Not Dog database (2026-11-28).
-- Run once in Supabase → SQL Editor → New query → Run. Safe to re-run.
-- (New setups don't need this: supabase/hotornot.sql already includes it.)
--
-- Note: the SQL Editor runs a whole script as one transaction, so don't add
-- begin/rollback test blocks here: a rollback would undo the changes above it.

-- Only accept votes for real-looking picture names, with an honest timestamp.
drop policy if exists "anyone can vote" on public.hotdog_votes;
create policy "anyone can vote"
	on public.hotdog_votes for insert
	to anon
	with check (
		file ~ '^[A-Za-z0-9 _-]{1,100}\.(webp|jpg)$'
		and created_at between now() - interval '5 minutes' and now() + interval '1 minute'
	);

-- Remove test votes made while setting this up.
delete from public.hotdog_votes
where file in ('__connection_test__', '__junk_test__', '<script>.webp')
   or (file = 'Les Arcs.webp' and created_at < '2021-01-01');
