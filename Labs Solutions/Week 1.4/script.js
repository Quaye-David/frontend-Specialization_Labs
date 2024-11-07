// Selecting the necessary elements
const galleryGrid = document.querySelector('#galleryGrid');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxContent = document.getElementsByClassName('lightbox-content');
const lightboxCaption = document.querySelector('#lightboxCaption');
const lightboxClose = document.querySelector('#closeButton');
const lightboxPrev = document.querySelector('#prevButton');
const lightboxNext = document.querySelector('#nextButton');

// Creating an array of image objects data
const imageData = [
    {
        fullImage: 'assets/image (1).jpg',
        thumbImage: 'assets/image (1).jpg',
        caption: 'A highway in a surburban area during sunset'
    },
    {
        fullImage: 'assets/image (2).jpg',
        thumbImage: 'assets/image (2).jpg',
        caption: 'Old Nickel Hotel Signage in the city'
    },
    {
        fullImage: 'assets/image (3).jpg',
        thumbImage: 'assets/image (3).jpg',
        caption: 'A dog sitting in the grassy field'
    },
    {
        fullImage: 'assets/image (4).jpg',
        thumbImage: 'assets/image (4).jpg',
        caption: 'An aerial view of a beach'
    },
    {
        fullImage: 'assets/image (5).jpg',
        thumbImage: 'assets/image (5).jpg',
        caption: 'Mountain area during sunset with cloudy sky'
    }
];

// Implementation of the thumbnail creation function
function createThumbnails() {
    imageData.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const thumbnail = document.createElement('div');
        thumbnail.classList.add('gallery-thumbnail');
        thumbnail.style.backgroundImage = `url('${image.thumbImage}')`;
        thumbnail.style.backgroundSize = 'cover';
        thumbnail.style.backgroundPosition = 'center';
        thumbnail.dataset.full = image.fullImage;
        thumbnail.dataset.caption = image.caption;
        thumbnail.addEventListener('click', openLightbox);

        galleryItem.appendChild(thumbnail);
        galleryGrid.appendChild(galleryItem);
    });
}

// Show the thumbnails
createThumbnails();

// When the thumbnail is clicked, open the lightbox
function openLightbox(event) {
    if (event.target.classList.contains('gallery-thumbnail')) {
        const clickedIndex = Array.from(galleryGrid.children).indexOf(event.target.parentElement);

        lightboxImage.src = imageData[clickedIndex].fullImage;
        lightboxImage.alt = imageData[clickedIndex].caption;
        lightboxCaption.textContent = imageData[clickedIndex].caption;

        // Show the lightbox
        lightbox.style.display = 'flex';

        // // Style the lightbox content
        // lightboxContent.style.display = 'flex';
        // lightboxContent.style.flexDirection = 'column';
        // lightboxContent.style.alignItems = 'center';
        // lightboxContent.style.justifyContent = 'center';
        // lightboxContent.style.width = '100%';
        // lightboxContent.style.height = '100%';
        // lightboxImage.style.maxWidth = '90%';
        // lightboxImage.style.maxHeight = '80%';
        // lightboxImage.style.border = '5px solid white';
        lightboxImage.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        
        lightboxCaption.style.marginTop = '10px';
        lightboxCaption.style.color = 'white';
        lightboxCaption.style.fontSize = '1.2em';
        lightboxCaption.style.textAlign = 'center';
    }
}

// Close the lightbox
lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Adding an event listener to the gallery grid
galleryGrid.addEventListener('click', openLightbox);

// Add function to update button states
function updateNavigationButtons() {
    // Disable prev button if at start
    if (currentImageIndex === 0) {
        lightboxPrev.disabled = true;
        lightboxPrev.classList.add('disabled');
    } else {
        lightboxPrev.disabled = false;
        lightboxPrev.classList.remove('disabled');
    }

    // Disable next button if at end
    if (currentImageIndex === imageData.length - 1) {
        lightboxNext.disabled = true;
        lightboxNext.classList.add('disabled');
    } else {
        lightboxNext.disabled = false;
        lightboxNext.classList.remove('disabled');
    }
}

let currentImageIndex = 0;


function openLightbox(event) {
    if (event.target.classList.contains('gallery-thumbnail')) {
        currentImageIndex = Array.from(galleryGrid.children).indexOf(event.target.parentElement);
        updateLightboxImage(currentImageIndex);
        updateNavigationButtons();
        lightbox.style.display = 'flex';
    }
}


function updateLightboxImage(index) {
    lightboxImage.src = imageData[index].fullImage;
    lightboxImage.alt = imageData[index].caption;
    lightboxCaption.textContent = imageData[index].caption;
}

lightboxNext.addEventListener('click', () => {
    if (!lightboxNext.disabled) {
        currentImageIndex = (currentImageIndex + 1) % imageData.length;
        updateLightboxImage(currentImageIndex);
        updateNavigationButtons();
    }
});

lightboxPrev.addEventListener('click', () => {
    if (!lightboxPrev.disabled) {
        currentImageIndex = (currentImageIndex - 1 + imageData.length) % imageData.length;
        updateLightboxImage(currentImageIndex);
        updateNavigationButtons();
    }
});

