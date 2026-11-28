// The Daily Wiener: hot dog news, gathered at build time from Google News RSS.
// The site is static, so headlines refresh whenever it rebuilds. The deploy
// workflow rebuilds every morning (see .github/workflows/deploy.yml).

const FEED_URL =
	'https://news.google.com/rss/search?q=' +
	encodeURIComponent('"hot dog" OR "hot dogs" OR hotdog') +
	'&hl=en-GB&gl=GB&ceid=GB:en';

const MAX_ARTICLES = 40;

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

export function parseFeed(xml) {
	const items = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];
	const seen = new Set();
	const articles = [];

	for (const item of items) {
		const source = tag(item, 'source');
		const sourceUrl = (item.match(/<source[^>]*url="([^"]+)"/i) || [])[1] || '';
		let title = tag(item, 'title');
		// Google News titles look like "Headline - Source"; drop the duplicated source.
		if (source && title.endsWith(` - ${source}`)) title = title.slice(0, -(source.length + 3));
		const link = tag(item, 'link');
		const date = new Date(tag(item, 'pubDate'));

		if (!title || !/^https?:\/\//.test(link)) continue;
		const key = title.toLowerCase().replace(/\W+/g, ' ').trim();
		if (seen.has(key)) continue;
		seen.add(key);

		articles.push({
			title,
			link,
			source: source || (sourceUrl ? new URL(sourceUrl).hostname.replace(/^www\./, '') : ''),
			date: isNaN(date) ? null : date.toISOString(),
		});
	}

	return articles.sort((a, b) => (b.date || '').localeCompare(a.date || '')).slice(0, MAX_ARTICLES);
}

// Never throws: a news outage must not break the site build.
export async function getHotdogNews() {
	try {
		const res = await fetch(FEED_URL, {
			headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HotDogNewsBot/1.0)' },
			signal: AbortSignal.timeout(15000),
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		return parseFeed(await res.text());
	} catch (e) {
		console.warn(`[daily-wiener] Couldn't fetch hot dog news: ${e.cause?.code || e.message}`);
		return [];
	}
}
