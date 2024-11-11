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
    },
    //Video object
    // {
    //     fullImage: 'assets/video.mp4',
    //     thumbImage: 'assets/video.mp4',
    //     caption: 'A video of a city at night'
    // }
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
        currentImageIndex = Array.from(galleryGrid.children).indexOf(event.target.parentElement);
        lightbox.style.display = 'flex';
        // Force reflow
        void lightbox.offsetWidth;
        lightbox.classList.add('active');
        updateLightboxImage(currentImageIndex);
        updateNavigationButtons();
    }
}


// Close the lightbox
lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Adding an event listener to the gallery grid
galleryGrid.addEventListener('click', openLightbox);

// Function to update the navigation buttons
function updateNavigationButtons() {
    // Disable previous button if at start
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

function updateLightboxImage(index) {
    const direction = index > currentImageIndex ? 'next' : 'prev';
    
    // Remove previous animation classes
    lightboxImage.classList.remove('slide-in-next', 'slide-in-prev');
    
    // Set new image
    lightboxImage.src = imageData[index].fullImage;
    lightboxImage.alt = imageData[index].caption;
    lightboxCaption.textContent = imageData[index].caption;
    
    // Add new animation class
    lightboxImage.classList.add(`slide-in-${direction}`);
}


lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 300); // Match the transition duration in CSS
});

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

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            lightboxClose.click();
        } else if (e.key === 'ArrowRight' && !lightboxNext.disabled) {
            lightboxNext.click();
        } else if (e.key === 'ArrowLeft' && !lightboxPrev.disabled) {
            lightboxPrev.click();
        }
    }
});

// TODO: Implementing a video lightbox in the future

// function openLightbox(event) {
//     const target = event.target;
//     const video = target.closest('video');
//     if (video) {
//         lightbox.style.display = 'flex';
//         lightbox.classList.add('active');
//         lightboxVideo.src = video.src;
//         lightboxVideo.play();
//     }
// }
// lightbox.addEventListener('click', openLightbox);
// lightboxClose.addEventListener('click', () => {
    //     lightbox.classList.remove('active');
    //     lightboxVideo.pause();
    //     lightboxVideo.src = '';
    // });
    

