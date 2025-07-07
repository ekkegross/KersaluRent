document.querySelectorAll('.custom-carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const realSlideCount = slides.length - 2;
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const dots = [];

    let currentIndex = 1;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isAnimating = false;

    // --- Setup Position ---
    function setPositionByIndex(animate = true) {
        const width = carousel.offsetWidth;
        currentTranslate = -currentIndex * width;
        prevTranslate = currentTranslate;

        if (animate) {
            track.style.transition = 'transform 0.4s ease-out';
        } else {
            track.style.transition = 'none';
        }
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    // --- Dot Handling ---
    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        let index = currentIndex - 1;
        if (currentIndex === 0) index = realSlideCount - 1;
        if (currentIndex === slides.length - 1) index = 0;
        dots[index].classList.add('active');
    }

    // --- Button Clicks ---
    prevBtn.addEventListener('click', () => {
        if (isAnimating) return;
        currentIndex--;
        setPositionByIndex();
        updateDots();
    });
    nextBtn.addEventListener('click', () => {
        if (isAnimating) return;
        currentIndex++;
        setPositionByIndex();
        updateDots();
    });

    // --- Dots Setup ---
    dotsContainer.innerHTML = '';
    for (let i = 0; i < realSlideCount; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => {
            currentIndex = i + 1;
            setPositionByIndex();
            updateDots();
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
    }

    // --- Loop Fix ---
    track.addEventListener('transitionstart', () => {
        isAnimating = true;
        prevBtn.disabled = nextBtn.disabled = true;
    });
    track.addEventListener('transitionend', () => {
        isAnimating = false;
        prevBtn.disabled = nextBtn.disabled = false;

        const width = carousel.offsetWidth;
        if (currentIndex <= 0) currentIndex = slides.length - 2;
        if (currentIndex >= slides.length - 1) currentIndex = 1;

        track.style.transition = 'none';
        currentTranslate = -currentIndex * width;
        prevTranslate = currentTranslate;
        track.style.transform = `translateX(${currentTranslate}px)`;
    });

    window.addEventListener('resize', () => {
        setPositionByIndex(false);
    });

    setPositionByIndex(false);

    carousel.goToSlide = function(index) {
      if (typeof index !== 'number' || index < 0 || index >= slides.length) return;
      currentIndex = index;
      setPositionByIndex();
      updateDots();
    };
});