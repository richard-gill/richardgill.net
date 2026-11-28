// Hot or Not Dog: shared vote storage (Supabase REST API, no SDK needed).
//
// From Supabase → Project Settings → API.
// The publishable (anon) key is designed to be public: the database rules in
// supabase/hotornot.sql only let it add votes and read the totals.
const SUPABASE_URL = 'https://nyhqutvpgrtssvnuvhgf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_X2rODkYRNVHCJ97op4oVUw_5_waU_ZY';

export const votingEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const headers = {
	apikey: SUPABASE_ANON_KEY,
	'Content-Type': 'application/json',
	// Legacy "eyJ…" anon keys are JWTs and also go in Authorization;
	// newer "sb_publishable_…" keys must only be sent as `apikey`.
	...(SUPABASE_ANON_KEY.startsWith('eyJ') && { Authorization: `Bearer ${SUPABASE_ANON_KEY}` }),
};

// Remember which pictures this browser has voted on, so people get one vote each per picture.
// Change VOTE_ROUND to give every visitor a full deck again (e.g. after wiping the votes table).
// Round 2: votes remembered before Supabase was connected were never saved, so start fresh.
const VOTE_ROUND = 2;
const VOTED_KEY = `hotornot-voted-round${VOTE_ROUND}`;
export function getVoted() {
	try {
		return JSON.parse(localStorage.getItem(VOTED_KEY)) || {};
	} catch {
		return {};
	}
}
function markVoted(file, hot) {
	try {
		localStorage.setItem(VOTED_KEY, JSON.stringify({ ...getVoted(), [file]: hot }));
	} catch {
		/* storage unavailable: vote still counts */
	}
}

export async function castVote(file, hot) {
	if (!votingEnabled) return; // nothing is saved, so don't hide the picture next time
	const res = await fetch(`${SUPABASE_URL}/rest/v1/hotdog_votes`, {
		method: 'POST',
		headers: { ...headers, Prefer: 'return=minimal' },
		body: JSON.stringify({ file, hot }),
		keepalive: true,
	});
	if (!res.ok) throw new Error(`Vote failed (${res.status})`);
	markVoted(file, hot); // only remember votes that actually saved
}

// Returns { [file]: { hot, notHot } }
export async function fetchTotals() {
	if (!votingEnabled) return {};
	const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/hotdog_vote_totals`, {
		method: 'POST',
		headers,
		body: '{}',
	});
	if (!res.ok) throw new Error(`Couldn't load results (${res.status})`);
	const rows = await res.json();
	return Object.fromEntries(rows.map((r) => [r.file, { hot: Number(r.hot), notHot: Number(r.not_hot) }]));
}

const escapeHtml = (s) =>
	String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Renders a leaderboard of every picture into `container`, hottest first.
export async function renderResults(container, images) {
	container.innerHTML = '<p class="text-center text-gray-400">Loading results…</p>';
	if (!votingEnabled) {
		container.innerHTML =
			'<p class="text-center text-gray-400">Voting isn\'t connected yet, so there are no results to show.</p>';
		return;
	}
	let totals;
	try {
		totals = await fetchTotals();
	} catch (e) {
		container.innerHTML = `<p class="text-center text-red-400">${escapeHtml(e.message)}</p>`;
		return;
	}
	const mine = getVoted();
	const rows = images
		.map((img) => {
			const t = totals[img.file] || { hot: 0, notHot: 0 };
			const total = t.hot + t.notHot;
			return { img, ...t, total, pct: total ? Math.round((t.hot / total) * 100) : null };
		})
		.sort((a, b) => (b.pct ?? -1) - (a.pct ?? -1) || b.total - a.total);

	container.innerHTML = rows
		.map(({ img, hot, notHot, total, pct }, i) => {
			const you = img.file in mine ? (mine[img.file] ? ' · you said 🔥' : ' · you said ❄️') : '';
			return `
			<div class="flex items-center gap-3 bg-[#242424] rounded-xl p-2 pr-4">
				<span class="w-6 text-center text-gray-500 font-bold">${i + 1}</span>
				<img src="/images/thumbs/sm/${encodeURIComponent(img.file)}" alt="${escapeHtml(img.title)}"
					class="w-16 h-16 object-cover rounded-lg shrink-0" loading="lazy" width="64" height="64" />
				<div class="flex-1 min-w-0">
					<div class="flex justify-between gap-2">
						<span class="font-semibold truncate">${escapeHtml(img.title)}</span>
						<span class="font-bold ${pct === null ? 'text-gray-500' : 'text-red-400'}">${pct === null ? '–' : pct + '% 🔥'}</span>
					</div>
					<div class="h-2 bg-sky-900/60 rounded-full overflow-hidden my-1" role="img"
						aria-label="${hot} hot, ${notHot} not">
						<div class="h-full bg-gradient-to-r from-orange-500 to-red-500" style="width:${pct ?? 0}%"></div>
					</div>
					<div class="text-xs text-gray-400">🔥 ${hot} · ❄️ ${notHot} · ${total} vote${total === 1 ? '' : 's'}${you}</div>
				</div>
			</div>`;
		})
		.join('');
}
