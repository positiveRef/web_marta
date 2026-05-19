document.addEventListener('DOMContentLoaded', () => {
    // Scroll animations via IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    // FAQ slide animation: wrap the answer content and animate its height
    document.querySelectorAll('#faq details').forEach(detail => {
        const summary = detail.querySelector('summary');
        const wrapper = document.createElement('div');
        wrapper.className = 'details-content';

        const contentNodes = Array.from(detail.childNodes).filter(node => node !== summary);
        contentNodes.forEach(node => wrapper.appendChild(node));
        detail.appendChild(wrapper);

        summary.addEventListener('click', (e) => {
            e.preventDefault();

            if (detail.open) {
                wrapper.style.height = wrapper.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    wrapper.style.height = '0px';
                });
                wrapper.addEventListener('transitionend', function handler() {
                    detail.open = false;
                    wrapper.style.height = '';
                    wrapper.removeEventListener('transitionend', handler);
                });
            } else {
                detail.open = true;
                wrapper.style.height = '0px';
                requestAnimationFrame(() => {
                    wrapper.style.height = wrapper.scrollHeight + 'px';
                });
                wrapper.addEventListener('transitionend', function handler() {
                    wrapper.style.height = '';
                    wrapper.removeEventListener('transitionend', handler);
                });
            }
        });
    });
});
