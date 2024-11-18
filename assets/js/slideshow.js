const imagesContainer = document.getElementById('ss-images');
const images = imagesContainer.getElementsByTagName('img');
let currentSlide = 0;

// Ensure container is always within screen limits
function adjustSlideshowSize() {
    const smallestImage = Array.from(images).reduce((smallest, img) => {
        return img.naturalWidth * img.naturalHeight < smallest.naturalWidth * smallest.naturalHeight ? img : smallest;
    });

    const aspectRatio = smallestImage.naturalWidth / smallestImage.naturalHeight;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const maxHeight = screenHeight;
    const maxWidth = maxHeight * aspectRatio;

    const slideshow = document.getElementById('slideshow');
    slideshow.style.width = Math.min(screenWidth, maxWidth) + "px";
    slideshow.style.height = maxHeight + "px";
}

// Slide navigation logic
function showSlide(index) {
    currentSlide = (index + images.length) % images.length;
    imagesContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// // Auto-slide every 3 seconds
// setInterval(() => {
//     nextSlide();
// }, 3000);

// Adjust slideshow size on load and resize
window.addEventListener('load', adjustSlideshowSize);
window.addEventListener('resize', adjustSlideshowSize);