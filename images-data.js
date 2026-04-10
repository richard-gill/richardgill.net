
var hotdogImages = [
	{
		file: 'amsterdam.webp',
		title: 'Amsterdam',
		description: 'A Dutch hot dog in the heart of Amsterdam.',
		width: 2688, height: 1520,
		lat: 52.3728, lng: 4.8922
	},
	{
		file: 'anfield.webp',
		title: 'Anfield',
		description: 'A matchday hot dog at the home of Liverpool FC.',
		width: 1920, height: 2560,
		lat: 53.4308, lng: -2.9608
	},
	{
		file: 'anglesey.webp',
		title: 'Anglesey',
		description: 'A seaside hot dog on the beautiful Isle of Anglesey.',
		width: 960, height: 720,
		lat: 53.2537, lng: -4.3168
	},
	{
		file: 'Barca.webp',
		title: 'Barcelona',
		description: 'A classic hot dog enjoyed in the heart of Catalonia.',
		width: 1200, height: 1600,
		lat: 41.3874, lng: 2.1686
	},
	{
		file: 'Berlin.webp',
		title: 'Berlin',
		description: 'The iconic currywurst — a Berlin street food staple.',
		width: 960, height: 960,
		lat: 52.5200, lng: 13.4050
	},
	{
		file: 'chamionx.webp',
		title: 'Chamonix',
		description: 'A mountain hot dog in the shadow of Mont Blanc.',
		width: 1200, height: 1600,
		lat: 45.9237, lng: 6.8694
	},
	{
		file: 'chamonixJack.webp',
		title: 'Chamonix Jack',
		description: 'Sharing a hot dog moment in the French Alps.',
		width: 1920, height: 2560,
		lat: 45.9237, lng: 6.8750
	},
	{
		file: 'chesterRaces.webp',
		title: 'Chester Races',
		description: 'A raceday hot dog at the historic Chester Racecourse.',
		width: 3072, height: 4096,
		lat: 53.1875, lng: -2.8937
	},
	{
		file: 'ChesterZoo.webp',
		title: 'Chester Zoo',
		description: 'Refuelling with a hot dog between animal enclosures.',
		width: 1200, height: 1600,
		lat: 53.2274, lng: -2.8849
	},
	{
		file: 'Copenhagen.webp',
		title: 'Copenhagen',
		description: 'A Danish pølse — the original Scandinavian street dog.',
		width: 1200, height: 1600,
		lat: 55.6761, lng: 12.5683
	},
	{
		file: 'costco.webp',
		title: 'Costco',
		description: 'The legendary £1.50 Costco hot dog — unbeatable value.',
		width: 3904, height: 5184,
		lat: 53.3340, lng: -2.7700
	},
	{
		file: 'disneylandParis.webp',
		title: 'Disneyland Paris',
		description: 'The happiest hot dog on earth, Disney style.',
		width: 1536, height: 2048,
		lat: 48.8674, lng: 2.7836
	},
	{
		file: 'dublin.webp',
		title: 'Dublin',
		description: 'An Irish hot dog in the heart of Dublin.',
		width: 3072, height: 4096,
		lat: 53.3498, lng: -6.2603
	},
	{
		file: 'etihad.webp',
		title: 'Etihad Stadium',
		description: 'A matchday hot dog at Manchester City\'s ground.',
		width: 3072, height: 4096,
		lat: 53.4831, lng: -2.2004
	},
	{
		file: 'hungary.webp',
		title: 'Hungary',
		description: 'A Hungarian hot dog — Central European flavours.',
		width: 1600, height: 1200,
		lat: 47.4979, lng: 19.0402
	},
	{
		file: 'Iceland.webp',
		title: 'Iceland',
		description: 'The famous Icelandic pylsur, best hot dog in the world.',
		width: 960, height: 720,
		lat: 64.1466, lng: -21.9426
	},
	{
		file: 'krakow.webp',
		title: 'Krakow',
		description: 'A Polish hot dog from the streets of Krakow.',
		width: 3072, height: 4096,
		lat: 50.0647, lng: 19.9450
	},
	{
		file: 'lasVegas.webp',
		title: 'Las Vegas',
		description: 'A hot dog on the Las Vegas Strip — high roller style.',
		width: 288, height: 512,
		lat: 36.1699, lng: -115.1398
	},
	{
		file: 'legoland.webp',
		title: 'Legoland',
		description: 'A brick-sized hot dog at Legoland.',
		width: 1536, height: 2048,
		lat: 51.6865, lng: -0.6484
	},
	{
		file: 'Les Arcs.webp',
		title: 'Les Arcs',
		description: 'A mountain hot dog after a day on the slopes.',
		width: 1152, height: 864,
		lat: 45.5733, lng: 6.8281
	},
	{
		file: 'liverpoolBombedOutChurch.webp',
		title: 'Liverpool Bombed Out Church',
		description: 'A hot dog by Liverpool\'s iconic Bombed Out Church Beer Festival.',
		width: 1600, height: 900,
		lat: 53.4055, lng: -2.9690
	},
	{
		file: 'Mayrhofen.webp',
		title: 'Mayrhofen',
		description: 'An Austrian hot dog in the Zillertal valley.',
		width: 1940, height: 2592,
		lat: 47.1590, lng: 11.8614
	},
	{
		file: 'Milan.webp',
		title: 'Milan',
		description: 'Italian style — a hot dog with a Milanese twist.',
		width: 720, height: 960,
		lat: 45.4642, lng: 9.1900
	},
	{
		file: 'Morzine.webp',
		title: 'Morzine',
		description: 'Après-ski perfection in the Portes du Soleil.',
		width: 540, height: 960,
		lat: 46.1797, lng: 6.7094
	},
	{
		file: 'porthAigo.webp',
		title: 'Porth Aigo',
		description: 'A coastal hot dog on the Welsh shoreline.',
		width: 5184, height: 3904,
		lat: 53.3050, lng: -4.6300
	},
	{
		file: 'ramp1.webp',
		title: 'Ramp 1',
		description: 'A hot dog at Ramp 1 — good times and good dogs.',
		width: 5760, height: 2592,
		lat: 53.3900, lng: -2.5950
	},
	{
		file: 'runcornAsdaHotdog.webp',
		title: 'Runcorn Asda',
		description: 'Lego hot dog - Runcorn Asda.',
		width: 1920, height: 2560,
		lat: 53.3380, lng: -2.7290
	},
	{
		file: 'runcornCricketClub.webp',
		title: 'Runcorn Cricket Club',
		description: 'A hot dog at the local cricket club — summer vibes.',
		width: 3904, height: 5184,
		lat: 53.3350, lng: -2.7250
	},
	{
		file: 'runcornGolfClub.webp',
		title: 'Runcorn Golf Club',
		description: 'A hot dog on the 19th hole at Runcorn Golf Club.',
		width: 3072, height: 4096,
		lat: 53.3300, lng: -2.7100
	},
	{
		file: 'tenerife.webp',
		title: 'Tenerife',
		description: 'A sun-soaked hot dog in the Canary Islands.',
		width: 3072, height: 4096,
		lat: 28.2916, lng: -16.6291
	},
	{
		file: 'Tignes.webp',
		title: 'Tignes',
		description: 'Fuel for the French Alps, served slope-side.',
		width: 768, height: 1024,
		lat: 45.4685, lng: 6.9054
	},
	{
		file: 'waringtonMarket.webp',
		title: 'Warrington Market',
		description: 'A market hot dog from Warrington\'s finest.',
		width: 1920, height: 1440,
		lat: 53.3900, lng: -2.5970
	},
	{
		file: 'wherenext.webp',
		title: 'Where Next?',
		description: 'The journey continues — where will the next hot dog be?',
		width: 1024, height: 768
	}
];
