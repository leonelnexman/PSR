document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.menu-page__link');

    function setActiveLink(sectionId) {
        sections.forEach(link => {
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active');
                if (window.innerWidth <= 962) {
                    link.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                link.classList.remove('active');
            }
        });
    }

    function isInViewport(element) {
        if (!element) return false; // Добавляем проверку на существование элемента
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    document.addEventListener('scroll', () => {
        sections.forEach(link => {
            const sectionId = link.getAttribute('href');
            const section = document.querySelector(sectionId);
            if (section) {
                if (isInViewport(section)) {
                    setActiveLink(sectionId);
                } else if (link.classList.contains('active') && window.innerWidth <= 962) {
                    link.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });
});
