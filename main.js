// ============================================================
// GALLERY & LIGHTBOX — uses shared 'hotdogImages' array from images-data.js
// ============================================================

// Build masonry gallery
const gallery = document.getElementById('gallery');

hotdogImages.forEach(function (item, index) {
	const div = document.createElement('div');
	div.className = 'masonry-item loading';
	div.setAttribute('data-index', index);

	const img = document.createElement('img');
	img.src = 'images/' + item.file;
	img.alt = item.title;
	img.width = item.width;
	img.height = item.height;

	// First few images are above the fold — load eagerly with high priority
	if (index < 5) {
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
	const item = hotdogImages[currentIndex];
	lightboxImg.src = 'images/' + item.file;
	lightboxImg.alt = item.title;
	lightboxTitle.textContent = item.title;
	lightboxDesc.textContent = item.description;
	lightboxCounter.textContent = (currentIndex + 1) + ' / ' + hotdogImages.length;
}

function nextImage() {
	currentIndex = (currentIndex + 1) % hotdogImages.length;
	updateLightbox();
}

function prevImage() {
	currentIndex = (currentIndex - 1 + hotdogImages.length) % hotdogImages.length;
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
