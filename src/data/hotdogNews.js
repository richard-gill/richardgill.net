// The Daily Wiener: hot dog news, gathered at build time.
// The site is static, so headlines refresh whenever it rebuilds. The deploy
// workflow rebuilds every morning (see .github/workflows/deploy.yml).
//
// Two sections: UK stories (rare, so we search UK sites specifically and keep
// them for longer) and the newest stories from around the world.
//
// Sources: Bing News RSS (real article URLs, summaries, usually a thumbnail),
// plus Google News UK edition for extra UK coverage (headlines only). Articles
// without a thumbnail get the publisher's own og:image where possible.

const UK_SITES = 'site:co.uk OR site:bbc.com OR site:theguardian.com';
const BING_QUERIES = [
	// World
	'"hot dog"',
	'"hot dogs"',
	'hotdog',
	// UK
	`"hot dog" (${UK_SITES})`,
	`"hot dogs" (${UK_SITES})`,
	`hotdog (${UK_SITES})`,
	`intitle:"hot dog" (${UK_SITES})`,
	`intitle:"hot dogs" (${UK_SITES})`,
];
const bingUrl = (q) =>
	`https://www.bing.com/news/search?q=${encodeURIComponent(q)}&format=rss&qft=${encodeURIComponent('sortbydate="1"')}&mkt=en-GB`;

const GOOGLE_URL =
	'https://news.google.com/rss/search?q=' +
	encodeURIComponent('"hot dog" OR "hot dogs" OR hotdog when:90d') +
	'&hl=en-GB&gl=GB&ceid=GB:en';

const MAX_WORLD = 30;
const MAX_UK = 15;
const UK_MAX_AGE_DAYS = 90;

// UK outlets: any .uk domain, plus big UK publishers on .com domains.
const UK_DOMAINS = ['bbc.com', 'theguardian.com', 'standard.co.uk', 'thetimes.com', 'gbnews.com', 'thelondoneconomic.com'];
export const isUK = (a) =>
	[hostname(a.link), hostname(a.sourceUrl || '')].some(
		(h) => /\.uk$/.test(h) || UK_DOMAINS.some((d) => h === d || h.endsWith(`.${d}`)),
	);

// Only stories actually about hot dogs (not a passing mention deep in the article).
export const isAboutHotDogs = (a) => /\bhot[\s-]?dogs?\b|\bhotdogs?\b/i.test(`${a.title} ${a.summary}`);
const UA = 'Mozilla/5.0 (compatible; HotDogNewsBot/1.0; +https://richardgill.net/dailywiener)';

const decodeEntities = (s) =>
	s
		.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
		.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
		.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
		.replace(/&quot;/g, '"')
		.replace(/&apos;|&#39;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.trim();

const tag = (xml, name) => {
	const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'));
	return m ? decodeEntities(m[1]) : '';
};

const isHttp = (u) => /^https?:\/\//i.test(u);

// Bing wraps links in a click-tracking redirect; link straight to the article instead.
function unwrapLink(link) {
	try {
		const u = new URL(link);
		if (u.hostname.endsWith('bing.com') && u.searchParams.get('url')) return u.searchParams.get('url');
	} catch {
		/* not a URL */
	}
	return link;
}

// Bing thumbnails: force https and ask for a 16:9 crop at a sensible size.
function sizeBingImage(src) {
	if (!src) return '';
	try {
		const u = new URL(src.replace(/^http:/, 'https:'));
		if (u.hostname.endsWith('bing.com')) {
			u.searchParams.set('w', '480');
			u.searchParams.set('h', '270');
			u.searchParams.set('c', '7'); // smart crop
		}
		return u.toString();
	} catch {
		return '';
	}
}

const hostname = (url) => {
	try {
		return new URL(url).hostname.replace(/^www\./, '');
	} catch {
		return '';
	}
};

/** Parses a Bing or Google News RSS document into article objects. */
export function parseFeed(xml) {
	const items = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];
	return items
		.map((item) => {
			const source = tag(item, 'News:Source') || tag(item, 'source');
			let title = tag(item, 'title');
			// Google News titles look like "Headline - Source"; drop the duplicated source.
			if (source && title.endsWith(` - ${source}`)) title = title.slice(0, -(source.length + 3));
			const link = unwrapLink(tag(item, 'link'));
			const date = new Date(tag(item, 'pubDate'));
			const rawDesc = tag(item, 'description');
			// Google's description is just the headline as HTML; only keep real summaries.
			const summary = /<a\s/i.test(rawDesc) ? '' : rawDesc.replace(/<[^>]+>/g, '').trim();
			return {
				title,
				link,
				source: source || hostname(link),
				sourceUrl: (item.match(/<source[^>]*url="([^"]+)"/i) || [])[1] || '',
				summary,
				image: sizeBingImage(tag(item, 'News:Image')),
				date: isNaN(date) ? null : date.toISOString(),
			};
		})
		.filter((a) => a.title && isHttp(a.link));
}

/**
 * Removes repeats (same story via several searches/outlets) and sorts newest first.
 * When a story appears twice, the copy from the earlier list wins, so pass Bing
 * lists (real links + images) before Google's.
 */
export function mergeArticles(lists, limit = Infinity) {
	const seen = new Set();
	return lists
		.flat()
		.filter((a) => {
			const key = a.title.toLowerCase().replace(/\W+/g, ' ').trim();
			const url = a.link.replace(/[?#].*$/, '');
			if (seen.has(key) || seen.has(url)) return false;
			seen.add(key);
			seen.add(url);
			return true;
		})
		.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
		.slice(0, limit);
}

/** Splits a pool of articles into { uk, world } sections. */
export function splitSections(lists, now = Date.now()) {
	const pool = mergeArticles(lists).filter(isAboutHotDogs);
	const ukCutoff = new Date(now - UK_MAX_AGE_DAYS * 864e5).toISOString();
	const uk = pool.filter((a) => isUK(a) && (!a.date || a.date >= ukCutoff)).slice(0, MAX_UK);
	const world = pool.filter((a) => !uk.includes(a)).slice(0, MAX_WORLD);
	return { uk, world };
}

async function fetchText(url, ms = 15000) {
	const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(ms) });
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.text();
}

// Reads the publisher's og:image / twitter:image from the article page.
async function findPageImage(url) {
	try {
		const html = (await fetchText(url, 6000)).slice(0, 300_000);
		const meta = (prop) =>
			html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]*content=["']([^"']+)["']`, 'i'))?.[1] ||
			html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${prop}["']`, 'i'))?.[1];
		const src = meta('og:image') || meta('og:image:url') || meta('twitter:image');
		if (!src) return '';
		const abs = new URL(decodeEntities(src), url).toString();
		return abs.startsWith('https://') ? abs : ''; // avoid mixed-content images
	} catch {
		return '';
	}
}

// Runs fn over items with limited concurrency.
async function mapLimit(items, limit, fn) {
	const out = new Array(items.length);
	let i = 0;
	const worker = async () => {
		while (i < items.length) {
			const idx = i++;
			out[idx] = await fn(items[idx]);
		}
	};
	await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
	return out;
}

const warn = (msg, e) => console.warn(`[daily-wiener] ${msg}: ${e?.cause?.code || e?.message || e}`);

// Returns { uk, world }. Never throws: a news outage must not break the site build.
export async function getHotdogNews() {
	// Offline/dev: DAILY_WIENER_FIXTURES=path/a.xml,path/b.xml uses saved RSS files instead of the network.
	const fixtures = process.env.DAILY_WIENER_FIXTURES;
	if (fixtures) {
		const { readFileSync } = await import('node:fs');
		return splitSections(fixtures.split(',').map((f) => parseFeed(readFileSync(f.trim(), 'utf8'))));
	}

	const load = (url, label) =>
		fetchText(url)
			.then(parseFeed)
			.catch((e) => (warn(`${label} failed`, e), []));

	const lists = await Promise.all([
		...BING_QUERIES.map((q) => load(bingUrl(q), `Bing "${q}"`)),
		load(GOOGLE_URL, 'Google News'), // last, so Bing's copy of a story (with image) wins
	]);
	const { uk, world } = splitSections(lists);

	// Fill in missing pictures from the article pages themselves (Google links can't be followed).
	const missing = [...uk, ...world].filter((a) => !a.image && hostname(a.link) !== 'news.google.com');
	await mapLimit(missing, 6, async (a) => {
		a.image = await findPageImage(a.link);
	});

	const count = (l) => `${l.length} (${l.filter((a) => a.image).length} with images)`;
	console.log(`[daily-wiener] UK: ${count(uk)}, world: ${count(world)}`);
	if (!uk.length && !world.length) warn("Couldn't fetch hot dog news", 'no articles from any source');
	return { uk, world };
}
