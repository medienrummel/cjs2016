(function () {
    const slides = document.getElementById('slides');
    if (!slides) return;
    const slideEls = Array.from(slides.children);
    const total = slideEls.length;
    let index = 0; let auto;


    const dotsWrap = document.getElementById('dots');
    slideEls.forEach((_, i) => {
        const b = document.createElement('button'); b.className = 'dot' + (i === 0 ? ' active' : ''); b.addEventListener('click', () => go(i)); dotsWrap.appendChild(b);
    });


    function go(i) {
        index = (i + total) % total;
        slides.style.transform = `translateX(-${index * 100}%)`;
        dotsWrap.querySelectorAll('.dot').forEach((d, di) => { d.classList.toggle('active', di === index) });
        restart();
    }
    function next() { go(index + 1) }
    function prev() { go(index - 1) }
    document.getElementById('next').addEventListener('click', next);
    document.getElementById('prev').addEventListener('click', prev);


    function start() { auto = setInterval(next, 4500) }
    function stop() { clearInterval(auto) }
    function restart() { stop(); start() }
    start();


    slides.addEventListener('mouseenter', stop);
    slides.addEventListener('mouseleave', start);


    let sx = 0, dx = 0;
    slides.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; dx = 0; stop() }, { passive: true });
    slides.addEventListener('touchmove', (e) => { dx = e.touches[0].clientX - sx }, { passive: true });
    slides.addEventListener('touchend', () => { if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); } start(); });
})();