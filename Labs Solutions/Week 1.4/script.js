//Selecting the necessary elements
const galleryGrid = document.querySelector('#galleryGrid');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const lightboxCaption = document.querySelector('#lightboxCaption');
const lightboxClose = document.querySelector('#closeButton');
const lightboxPrev = document.querySelector('#prevButton');
const lightboxNext = document.querySelector('#nextButton');

//Creating an array of image objects data
const imageData = [
    {
        fullImage: 'assets/image (1).jpg',
        thumbImage: 'assets/image (1).jpg',
        caption: 'Image 1'
    },
    {
        fullImage: 'assets/image (2).jpg',
        thumbImage: 'assets/image (2).jpg',
        caption: 'Image 2'
    },
    {
        fullImage: 'assets/image (3).jpg',
        thumbImage: 'assets/image (3).jpg',
        caption: 'Image 3'
    },
    {
        fullImage: 'assets/image (4).jpg',
        thumbImage: 'assets/image (4).jpg',
        caption: 'Image 4'
    },
    {
        fullImage: 'assets/image (5).jpg',
        thumbImage: 'assets/image (5).jpg',
        caption: 'Image 5'
    }
];

//Implementation of the thumbnail creation function
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

//Implementation of the lightbox opening function
function openLightbox(event) {
    const lightboxImage = document.querySelector('#lightboxImage');
    const lightboxCaption = document.querySelector('#lightboxCaption');
    const fullImageUrl = event.target.dataset.full;
    const caption = event.target.dataset.caption;

    lightboxImage.src = fullImageUrl;
    lightboxCaption.alt = caption;
    lightboxCaption.textContent = caption;

    //Show the lightbox
    document.querySelector('#lightbox').classList.add('show');
}

//show the thumbnails
createThumbnails();