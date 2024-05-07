// Espera fins que tot el contingut de la pàgina s'hagi carregat
document.addEventListener('DOMContentLoaded', function() {
    // Seleccioneu tots els enllaços de notícies
    const newsLinks = document.querySelectorAll('.news-link');
    // Afegiu un event listener a cada enllaç de notícies
    newsLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Preveniu la navegació estàndard
            const destination = this.getAttribute('href');
            window.location.href = destination; // Navegació programàtica amb efecte
        });
    });

    // Seleccioneu la secció hero
    const heroSection = document.getElementById('hero');
    // Afegiu un event listener per detectar el desplaçament de la finestra
    window.addEventListener('scroll', () => {
        const { height } = heroSection.getBoundingClientRect();
        // Ajusteu la opacitat de la secció hero en funció del desplaçament
        heroSection.style.opacity = 1 - window.pageYOffset / height;
    });
});
