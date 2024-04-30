document.addEventListener('DOMContentLoaded', function() {
    const newsLinks = document.querySelectorAll('.news-link');
    newsLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Previene la navegación estándar
            const destination = this.getAttribute('href');
            window.location.href = destination; // Navegación programática con efecto
        });
    });

    const heroSection = document.getElementById('hero');
    window.addEventListener('scroll', () => {
        const { height } = heroSection.getBoundingClientRect();
        heroSection.style.opacity = 1 - window.pageYOffset / height;
    });
});
