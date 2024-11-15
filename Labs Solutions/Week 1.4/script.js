// Selecting the necessary elements
const galleryGrid = document.querySelector('#galleryGrid');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxCaption = document.querySelector('#lightboxCaption');
const lightboxClose = document.querySelector('#closeButton');
const lightboxPrev = document.querySelector('#prevButton');
const lightboxNext = document.querySelector('#nextButton');

// Creating an array of image objects data
const imageData = [
    {
        fullImage: 'assets/image (1).jpg',
        thumbImage: 'assets/image (1).jpg',
        caption: 'A highway in a suburban area during sunset'
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
        caption: 'A close-up photo of a deer'
    },
    // Future Video Object
    // {
    //     fullImage: 'assets/video.mp4',
    //     thumbImage: 'assets/video-thumbnail.jpg',
    //     caption: 'A video of a city at night'
    // }
];

// Error handling interface
const GalleryErrors = {
    INVALID_IMAGE: 'Invalid image data provided',
    MISSING_IMAGE: 'Image source is required',
    INVALID_INDEX: 'Invalid image index',
    LIGHTBOX_ERROR: 'Lightbox operation failed',
    DOM_ERROR: 'DOM element not found'
};

// Helper function to validate image object data
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

// Error display utility function
const showError = (message, duration = 3000) => {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'gallery-error';
    errorContainer.textContent = message;
    document.body.appendChild(errorContainer);
    
    setTimeout(() => errorContainer.remove(), duration);
};

// Function to create and append thumbnail elements
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

            galleryItem.appendChild(thumbnail);
            galleryGrid.appendChild(galleryItem);
        });
    } catch (error) {
        showError(`Gallery creation failed: ${error.message}`);
    }
}

// Show the thumbnails
createThumbnails();

// Initialize current image index
let currentImageIndex = 0;

// Function to update the lightbox image
function updateLightboxImage(index, direction = 'next') {
    try {
        if (index < 0 || index >= imageData.length) {
            throw new Error(GalleryErrors.INVALID_INDEX);
        }

        const { fullImage, caption } = imageData[index];
        
        // Update image and caption
        lightboxImage.src = fullImage;
        lightboxImage.alt = caption;
        lightboxCaption.textContent = caption;

        // Add slide-in animation class based on direction
        lightboxImage.classList.remove('slide-in-next', 'slide-in-prev');
        lightboxImage.classList.add(`slide-in-${direction}`);
    } catch (error) {
        showError(`Failed to update image: ${error.message}`);
    }
}

// Function to update navigation buttons state
function updateNavigationButtons() {
    const disablePrev = currentImageIndex === 0;
    const disableNext = currentImageIndex === imageData.length - 1;

    toggleButtonState(lightboxPrev, disablePrev);
    toggleButtonState(lightboxNext, disableNext);
}

// Helper function to toggle button state
function toggleButtonState(button, shouldDisable) {
    button.disabled = shouldDisable;
    button.classList.toggle('disabled', shouldDisable);
}

// Function to open the lightbox
function openLightbox(event) {
    try {
        const target = event.target;
        if (!target.classList.contains('gallery-thumbnail')) {
            throw new Error(GalleryErrors.INVALID_IMAGE);
        }

        const galleryItems = Array.from(galleryGrid.children);
        const currentItem = target.parentElement;

        if (!currentItem) {
            throw new Error(GalleryErrors.DOM_ERROR);
        }

        const newIndex = galleryItems.indexOf(currentItem);
        if (newIndex === -1) {
            throw new Error(GalleryErrors.INVALID_INDEX);
        }

        currentImageIndex = newIndex;

        lightbox.style.display = 'flex';
        void lightbox.offsetWidth; // Force reflow
        lightbox.classList.add('active');

        updateLightboxImage(currentImageIndex);
        updateNavigationButtons();
    } catch (error) {
        showError(`Failed to open lightbox: ${error.message}`);
    }
}

// Function to close the lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 300); // Match the transition duration in CSS
}

// Function to navigate to the next image
function nextImage() {
    if (currentImageIndex < imageData.length - 1) {
        currentImageIndex++;
        updateLightboxImage(currentImageIndex, 'next');
        updateNavigationButtons();
    }
}

// Function to navigate to the previous image
function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateLightboxImage(currentImageIndex, 'prev');
        updateNavigationButtons();
    }
}

// Event Listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

// Event delegation for gallery grid
galleryGrid.addEventListener('click', openLightbox);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// Adding CSS for error messages
// It's better to include this in your CSS file instead of injecting via JS
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

    /* Example styles for slide-in animations */
    .slide-in-next {
        animation: slideInNext 0.3s forwards;
    }

    .slide-in-prev {
        animation: slideInPrev 0.3s forwards;
    }

    @keyframes slideInNext {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }

    @keyframes slideInPrev {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
    }

    /* Disabled button styles */
    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);

// TODO: Implementing a video lightbox in the future