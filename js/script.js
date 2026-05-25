document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('reveal-ready');

    const navbar = document.getElementById('navbar');

    const updateNavbar = () => {
        if (!navbar) {
            return;
        }

        navbar.classList.toggle('navbar-scrolled', window.scrollY > 40);
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });

    const deviceStage = document.querySelector('.device-stage');
    const phoneFrames = document.querySelectorAll('.phone-frame');

    const focusPhoneFrame = (activeFrame) => {
        if (!deviceStage) {
            return;
        }

        deviceStage.classList.add('is-focusing');
        phoneFrames.forEach(frame => {
            frame.classList.toggle('is-focused', frame === activeFrame);
        });
    };

    const clearPhoneFrameFocus = () => {
        if (!deviceStage) {
            return;
        }

        deviceStage.classList.remove('is-focusing');
        phoneFrames.forEach(frame => frame.classList.remove('is-focused'));
    };

    phoneFrames.forEach(frame => {
        frame.setAttribute('tabindex', '0');
        frame.addEventListener('pointerenter', () => focusPhoneFrame(frame));
        frame.addEventListener('pointerleave', clearPhoneFrameFocus);
        frame.addEventListener('focus', () => focusPhoneFrame(frame));
        frame.addEventListener('blur', clearPhoneFrameFocus);
    });

    const revealItems = document.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
        revealItems.forEach(item => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15
    });

    revealItems.forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${Math.min(index * 80, 320)}ms`);
        observer.observe(item);
    });
});
