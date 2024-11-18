document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('character-length');

    function updateSliderBackground(slider) {
        const value = slider.value;
        const min = slider.min ? slider.min : 0;
        const max = slider.max ? slider.max : 100;
        const percentage = ((value - min) * 100) / (max - min);
        slider.style.background = `linear-gradient(to right, var(--neon-green) ${percentage}%, var(--very-dark-grey) ${percentage}%)`;
    }

    slider.addEventListener('input', function() {
        updateSliderBackground(slider);
    });
});