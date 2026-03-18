// ============================================================
// IMAGE DATA — edit titles and descriptions here
// Add new images by adding an object to this array
// ============================================================
const images = [
	{
		file: 'amsterdam.webp',
		title: 'Amsterdam',
		description: 'A Dutch hot dog in the heart of Amsterdam.',
		width: 2688, height: 1520
	},
	{
		file: 'anfield.webp',
		title: 'Anfield',
		description: 'A matchday hot dog at the home of Liverpool FC.',
		width: 1920, height: 2560
	},
	{
		file: 'anglesey.webp',
		title: 'Anglesey',
		description: 'A seaside hot dog on the beautiful Isle of Anglesey.',
		width: 960, height: 720
	},
	{
		file: 'Barca.webp',
		title: 'Barcelona',
		description: 'A classic hot dog enjoyed in the heart of Catalonia.',
		width: 1200, height: 1600
	},
	{
		file: 'Berlin.webp',
		title: 'Berlin',
		description: 'The iconic currywurst — a Berlin street food staple.',
		width: 960, height: 960
	},
	{
		file: 'chamionx.webp',
		title: 'Chamonix',
		description: 'A mountain hot dog in the shadow of Mont Blanc.',
		width: 1200, height: 1600
	},
	{
		file: 'chamonixJack.webp',
		title: 'Chamonix Jack',
		description: 'Sharing a hot dog moment in the French Alps.',
		width: 1920, height: 2560
	},
	{
		file: 'chesterRaces.webp',
		title: 'Chester Races',
		description: 'A raceday hot dog at the historic Chester Racecourse.',
		width: 3072, height: 4096
	},
	{
		file: 'ChesterZoo.webp',
		title: 'Chester Zoo',
		description: 'Refuelling with a hot dog between animal enclosures.',
		width: 1200, height: 1600
	},
	{
		file: 'Copenhagen.webp',
		title: 'Copenhagen',
		description: 'A Danish pølse — the original Scandinavian street dog.',
		width: 1200, height: 1600
	},
	{
		file: 'costco.webp',
		title: 'Costco',
		description: 'The legendary £1.50 Costco hot dog — unbeatable value.',
		width: 3904, height: 5184
	},
	{
		file: 'disneylandParis.webp',
		title: 'Disneyland Paris',
		description: 'The happiest hot dog on earth, Disney style.',
		width: 1536, height: 2048
	},
	{
		file: 'dublin.webp',
		title: 'Dublin',
		description: 'An Irish hot dog in the heart of Dublin.',
		width: 3072, height: 4096
	},
	{
		file: 'etihad.webp',
		title: 'Etihad Stadium',
		description: 'A matchday hot dog at Manchester City\'s ground.',
		width: 3072, height: 4096
	},
	{
		file: 'hungary.webp',
		title: 'Hungary',
		description: 'A Hungarian hot dog — Central European flavours.',
		width: 1600, height: 1200
	},
	{
		file: 'Iceland.webp',
		title: 'Iceland',
		description: 'The famous Icelandic pylsur, best hot dog in the world.',
		width: 960, height: 720
	},
	{
		file: 'krakow.webp',
		title: 'Krakow',
		description: 'A Polish hot dog from the streets of Krakow.',
		width: 3072, height: 4096
	},
	{
		file: 'lasVegas.webp',
		title: 'Las Vegas',
		description: 'A hot dog on the Las Vegas Strip — high roller style.',
		width: 288, height: 512
	},
	{
		file: 'legoland.webp',
		title: 'Legoland',
		description: 'A brick-sized hot dog at Legoland.',
		width: 1536, height: 2048
	},
	{
		file: 'Les Arcs.webp',
		title: 'Les Arcs',
		description: 'A mountain hot dog after a day on the slopes.',
		width: 1152, height: 864
	},
	{
		file: 'liverpoolBombedOutChurch.webp',
		title: 'Liverpool Bombed Out Church',
		description: 'A hot dog by Liverpool\'s iconic Bombed Out Church Beer Festival.',
		width: 1600, height: 900
	},
	{
		file: 'Mayrhofen.webp',
		title: 'Mayrhofen',
		description: 'An Austrian hot dog in the Zillertal valley.',
		width: 1940, height: 2592
	},
	{
		file: 'Milan.webp',
		title: 'Milan',
		description: 'Italian style — a hot dog with a Milanese twist.',
		width: 720, height: 960
	},
	{
		file: 'Morzine.webp',
		title: 'Morzine',
		description: 'Après-ski perfection in the Portes du Soleil.',
		width: 540, height: 960
	},
	{
		file: 'porthAigo.webp',
		title: 'Porth Aigo',
		description: 'A coastal hot dog on the Welsh shoreline.',
		width: 5184, height: 3904
	},
	{
		file: 'ramp1.webp',
		title: 'Ramp 1',
		description: 'A hot dog at Ramp 1 — good times and good dogs.',
		width: 5760, height: 2592
	},
	{
		file: 'runcornAsdaHotdog.webp',
		title: 'Runcorn Asda',
		description: 'Lego hot dog - Runcorn Asda.',
		width: 1920, height: 2560
	},
	{
		file: 'runcornCricketClub.webp',
		title: 'Runcorn Cricket Club',
		description: 'A hot dog at the local cricket club — summer vibes.',
		width: 3904, height: 5184
	},
	{
		file: 'runcornGolfClub.webp',
		title: 'Runcorn Golf Club',
		description: 'A hot dog on the 19th hole at Runcorn Golf Club.',
		width: 3072, height: 4096
	},
	{
		file: 'tenerife.webp',
		title: 'Tenerife',
		description: 'A sun-soaked hot dog in the Canary Islands.',
		width: 3072, height: 4096
	},
	{
		file: 'Tignes.webp',
		title: 'Tignes',
		description: 'Fuel for the French Alps, served slope-side.',
		width: 768, height: 1024
	},
	{
		file: 'waringtonMarket.webp',
		title: 'Warrington Market',
		description: 'A market hot dog from Warrington\'s finest.',
		width: 1920, height: 1440
	},
	{
		file: 'wherenext.webp',
		title: 'Where Next?',
		description: 'The journey continues — where will the next hot dog be?',
		width: 1024, height: 768
	}
];

// Build masonry gallery
const gallery = document.getElementById('gallery');

images.forEach(function (item, index) {
	const div = document.createElement('div');
	div.className = 'masonry-item loading';
	div.setAttribute('data-index', index);

	const img = document.createElement('img');
	img.src = 'images/' + item.file;
	img.alt = item.title;
	img.width = item.width;
	img.height = item.height;

	// First few images are above the fold — load eagerly with high priority
	if (index < 4) {
		img.fetchPriority = 'high';
	} else {
		img.loading = 'lazy';
		img.fetchPriority = 'low';
	}

	// Remove skeleton once image has loaded
	img.addEventListener('load', function () {
		div.classList.remove('loading');
		div.classList.add('loaded');
	});

	const caption = document.createElement('div');
	caption.className = 'caption';
	caption.innerHTML = '<h3>' + item.title + '</h3><p>' + item.description + '</p>';

	div.appendChild(img);
	div.appendChild(caption);
	gallery.appendChild(div);

	div.addEventListener('click', function () {
		openLightbox(index);
	});
});

// Lightbox logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-desc');
const lightboxCounter = document.getElementById('lightbox-counter');
let currentIndex = 0;

function openLightbox(index) {
	currentIndex = index;
	updateLightbox();
	lightbox.classList.add('active');
	document.body.style.overflow = 'hidden';
}

function closeLightbox() {
	lightbox.classList.remove('active');
	document.body.style.overflow = '';
}

function updateLightbox() {
	const item = images[currentIndex];
	lightboxImg.src = 'images/' + item.file;
	lightboxImg.alt = item.title;
	lightboxTitle.textContent = item.title;
	lightboxDesc.textContent = item.description;
	lightboxCounter.textContent = (currentIndex + 1) + ' / ' + images.length;
}

function nextImage() {
	currentIndex = (currentIndex + 1) % images.length;
	updateLightbox();
}

function prevImage() {
	currentIndex = (currentIndex - 1 + images.length) % images.length;
	updateLightbox();
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-next').addEventListener('click', nextImage);
document.getElementById('lightbox-prev').addEventListener('click', prevImage);

// Close on background click
lightbox.addEventListener('click', function (e) {
	if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
	if (!lightbox.classList.contains('active')) return;
	if (e.key === 'Escape') closeLightbox();
	if (e.key === 'ArrowRight') nextImage();
	if (e.key === 'ArrowLeft') prevImage();
});

// Update copyright year
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
