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
    {
        fullImage: 'assets/image (6).jpg',
        thumbImage: 'assets/image (6).jpg',
        caption: 'A close-up photo of a dear'
    },
    //Video object
    // {
    //     fullImage: 'assets/video.mp4',
    //     thumbImage: 'assets/video.mp4',
    //     caption: 'A video of a city at night'
    // }
];

//Error handling interface
const GalleryErrors = {
    INVALID_IMAGE: 'Invalid image data provided',
    MISSING_IMAGE: 'Image source is required',
    INVALID_INDEX: 'Invalid image index',
    LIGHTBOX_ERROR: 'Lightbox operation failed',
    DOM_ERROR: 'DOM element not found'
};

//Helper function to validate image object data
const validateImageData = ({ fullImage, thumbImage, caption }) => {
    const errors = [];

    if (!fullImage?.trim()) {
        errors.push('Full image path is required');
    }
    if (!thumbImage?.trim()) {
        errors.push('Thumbnail image path is required');
    }
    if (!caption?.trim()) {
        errors.push('Image caption is required');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

//Error display utility function
const showError = (message, duration = 3000) => {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'gallery-error';
    errorContainer.textContent = message;
    document.body.appendChild(errorContainer);
    
    setTimeout(() => errorContainer.remove(), duration);
};


// Updated Implementation of the thumbnail creation function with error handling
function createThumbnails() {
    try {
        imageData.forEach((imageItem, index) => {
            const { fullImage, thumbImage, caption } = imageItem;
            
            const validation = validateImageData({ fullImage, thumbImage, caption });
            if (!validation.isValid) {
                throw new Error(`Image ${index + 1}: ${validation.errors.join(', ')}`);
            }

            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');

            const thumbnail = document.createElement('div');
            thumbnail.classList.add('gallery-thumbnail');
            thumbnail.style.backgroundImage = `url('${thumbImage}')`;
            thumbnail.style.backgroundSize = 'cover';
            thumbnail.style.backgroundPosition = 'center';
            thumbnail.dataset.full = fullImage;
            thumbnail.dataset.caption = caption;
            thumbnail.addEventListener('click', openLightbox);

            galleryItem.appendChild(thumbnail);
            galleryGrid.appendChild(galleryItem);
        });
    } catch (error) {
        showError(`Gallery creation failed: ${error.message}`);
    }
}

// Show the thumbnails
createThumbnails();

// When the thumbnail is clicked, open the lightbox
// Updated openLightbox with error handling
function openLightbox(event) {
    try {
        const { target } = event;
        if (!target.classList.contains('gallery-thumbnail')) {
            throw new Error(GalleryErrors.INVALID_IMAGE);
        }

        const galleryItems = Array.from(galleryGrid.children);
        const currentItem = target.parentElement;
        
        if (!currentItem) {
            throw new Error(GalleryErrors.DOM_ERROR);
        }

        currentImageIndex = galleryItems.indexOf(currentItem);
        
        if (currentImageIndex === -1) {
            throw new Error(GalleryErrors.INVALID_INDEX);
        }

        lightbox.style.display = 'flex';
        void lightbox.offsetWidth; // Force reflow
        lightbox.classList.add('active');
        
        updateLightboxImage(currentImageIndex);
        updateNavigationButtons();
    } catch (error) {
        showError(`Failed to open lightbox: ${error.message}`);
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

// Updated updateLightboxImage with error handling
function updateLightboxImage(index) {
    try {
        if (index < 0 || index >= imageData.length) {
            throw new Error(GalleryErrors.INVALID_INDEX);
        }

        const { fullImage, caption } = imageData[index];
        const direction = index > currentImageIndex ? 'next' : 'prev';

        lightboxImage.classList.remove('slide-in-next', 'slide-in-prev');
        
        lightboxImage.src = fullImage;
        lightboxImage.alt = caption;
        lightboxCaption.textContent = caption;
        
        lightboxImage.classList.add(`slide-in-${direction}`);
    } catch (error) {
        showError(`Failed to update image: ${error.message}`);
    }
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

// Add CSS for error messages
const style = document.createElement('style');
style.textContent = `
    .gallery-error {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #ff4444;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

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
    

