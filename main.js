// ============================================================
// IMAGE DATA — edit titles and descriptions here
// Add new images by adding an object to this array
// ============================================================
const images = [
	{
		file: 'anfield.jpg',
		title: 'Anfield',
		description: 'A matchday hot dog at the home of Liverpool FC.'
	},
	{
		file: 'anglesey.jpg',
		title: 'Anglesey',
		description: 'A seaside hot dog on the beautiful Isle of Anglesey.'
	},
	{
		file: 'Barca.jpg',
		title: 'Barcelona',
		description: 'A classic hot dog enjoyed in the heart of Catalonia.'
	},
	{
		file: 'Berlin.jpg',
		title: 'Berlin',
		description: 'The iconic currywurst — a Berlin street food staple.'
	},
	{
		file: 'chamionx.jpg',
		title: 'Chamonix',
		description: 'A mountain hot dog in the shadow of Mont Blanc.'
	},
	{
		file: 'chamonixJack.jpg',
		title: 'Chamonix Jack',
		description: 'Sharing a hot dog moment in the French Alps.'
	},
	{
		file: 'chesterRaces.jpg',
		title: 'Chester Races',
		description: 'A raceday hot dog at the historic Chester Racecourse.'
	},
	{
		file: 'ChesterZoo.jpg',
		title: 'Chester Zoo',
		description: 'Refuelling with a hot dog between animal enclosures.'
	},
	{
		file: 'Copenhagen.jpg',
		title: 'Copenhagen',
		description: 'A Danish pølse — the original Scandinavian street dog.'
	},
	{
		file: 'costco.jpg',
		title: 'Costco',
		description: 'The legendary £1.50 Costco hot dog — unbeatable value.'
	},
	{
		file: 'disneylandParis.jpg',
		title: 'Disneyland Paris',
		description: 'The happiest hot dog on earth, Disney style.'
	},
	{
		file: 'dublin.jpg',
		title: 'Dublin',
		description: 'An Irish hot dog in the heart of Dublin.'
	},
	{
		file: 'etihad.jpg',
		title: 'Etihad Stadium',
		description: 'A matchday hot dog at Manchester City\'s ground.'
	},
	{
		file: 'hungary.jpg',
		title: 'Hungary',
		description: 'A Hungarian hot dog — Central European flavours.'
	},
	{
		file: 'Iceland.jpg',
		title: 'Iceland',
		description: 'The famous Icelandic pylsur, best hot dog in the world.'
	},
	{
		file: 'krakow.jpg',
		title: 'Krakow',
		description: 'A Polish hot dog from the streets of Krakow.'
	},
	{
		file: 'lasVegas.jpg',
		title: 'Las Vegas',
		description: 'A hot dog on the Las Vegas Strip — high roller style.'
	},
	{
		file: 'legoland.jpg',
		title: 'Legoland',
		description: 'A brick-sized hot dog at Legoland.'
	},
	{
		file: 'Les Arcs.jpg',
		title: 'Les Arcs',
		description: 'A mountain hot dog after a day on the slopes.'
	},
	{
		file: 'liverpoolBombedOutChurch.jpg',
		title: 'Liverpool Bombed Out Church',
		description: 'A hot dog by Liverpool\'s iconic Bombed Out Church Beer Festival.'
	},
	{
		file: 'Mayrhofen.jpg',
		title: 'Mayrhofen',
		description: 'An Austrian hot dog in the Zillertal valley.'
	},
	{
		file: 'Milan.jpg',
		title: 'Milan',
		description: 'Italian style — a hot dog with a Milanese twist.'
	},
	{
		file: 'Morzine.jpg',
		title: 'Morzine',
		description: 'Après-ski perfection in the Portes du Soleil.'
	},
	{
		file: 'porthAigo.jpg',
		title: 'Porth Aigo',
		description: 'A coastal hot dog on the Welsh shoreline.'
	},
	{
		file: 'ramp1.jpeg',
		title: 'Ramp 1',
		description: 'A hot dog at Ramp 1 — good times and good dogs.'
	},
	{
		file: 'runcornAsdaHotdog.jpg',
		title: 'Runcorn Asda',
		description: 'The classic Asda café hot dog — a Runcorn institution.'
	},
	{
		file: 'runcornCricketClub.jpg',
		title: 'Runcorn Cricket Club',
		description: 'A hot dog at the local cricket club — summer vibes.'
	},
	{
		file: 'runcornGolfClub.jpg',
		title: 'Runcorn Golf Club',
		description: 'A hot dog on the 19th hole at Runcorn Golf Club.'
	},
	{
		file: 'tenerife.jpg',
		title: 'Tenerife',
		description: 'A sun-soaked hot dog in the Canary Islands.'
	},
	{
		file: 'Tignes.jpg',
		title: 'Tignes',
		description: 'Fuel for the French Alps, served slope-side.'
	},
	{
		file: 'waringtonMarket.jpg',
		title: 'Warrington Market',
		description: 'A market hot dog from Warrington\'s finest.'
	},
	{
		file: 'wherenext.jpg',
		title: 'Where Next?',
		description: 'The journey continues — where will the next hot dog be?'
	}
];

// Build masonry gallery
const gallery = document.getElementById('gallery');

images.forEach(function (item, index) {
	const div = document.createElement('div');
	div.className = 'masonry-item';
	div.setAttribute('data-index', index);

	const img = document.createElement('img');
	img.src = 'images/' + item.file;
	img.alt = item.title;

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
