(function() {
    const input = document.getElementById('slideSearch');
    const btn   = document.getElementById('searchBtn');
    const toggleBtn = document.getElementById('menu-toggle');

    function findAndActivate() {
        const q = input.value.trim().toLowerCase();
        if (!q) return;
        const containers = document.querySelectorAll('.carousel-container');
        for (let cont of containers) {
            const topTitle = cont.querySelector('.carousel-top h1').textContent.toLowerCase();
            if (topTitle.includes(q)) {
                scrollAndJump(cont, q);
                toggleBtn.click(); 
                return;
            }
            const realSlides = Array.from(cont.querySelectorAll('.carousel-slide'))
                .filter(sl => !sl.classList.contains('clone'));
            const matchIndex = realSlides.findIndex(sl =>
                sl.querySelector('h1').textContent.toLowerCase().includes(q)
            );
            if (matchIndex !== -1) {
                scrollAndJump(cont, null, matchIndex);
                toggleBtn.click();
                return;
            }
        }
        const byId = document.getElementById(q);
        if (byId && byId.classList.contains('carousel-container')) {
            scrollAndJump(byId);
            toggleBtn.click(); 
            return;
        }
        alert('Sellist toodet/sektsiooni ei leidu.');
    }

    function scrollAndJump(container, titleMatch, slideIdx) {
        container.scrollIntoView({ behavior: 'smooth' });
        const carouselEl = container.querySelector('.custom-carousel');
        if (!carouselEl || typeof carouselEl.goToSlide !== 'function') return;
        let targetInternalIndex = 1; 
        if (typeof slideIdx === 'number') {
            targetInternalIndex = slideIdx + 1;
        } else if (titleMatch) {
            targetInternalIndex = 1;
        }
        carouselEl.goToSlide(targetInternalIndex);
    }
    btn.addEventListener('click', findAndActivate);
    input.addEventListener('keyup', e => { if (e.key === 'Enter') findAndActivate(); });
})();